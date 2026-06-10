// STATE MANAGEMENT
let booksState = [];
let activeView = 'authors'; // 'authors', 'alphabet', 'all-books'
let selectedRatingForNewBook = null; // null means unrated
let selectedAlphabetLetter = 'א';
let selectedAuthorDetail = null; // null means no author detail is active
let isBackupDropdownOpen = false;

// Supabase Cloud Sync State
let supabaseClient = null;
let isSyncActive = false;

// Hebrew letters definition
const HEBREW_LETTERS = [
    'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'כ', 
    'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ', 'ק', 'ר', 'ש', 'ת'
];

// DOM ELEMENTS
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const backupBtn = document.getElementById('backup-btn');
const backupDropdown = document.getElementById('backup-dropdown');
const exportBackupBtn = document.getElementById('export-backup-btn');
const importBackupBtnTrigger = document.getElementById('import-backup-btn-trigger');
const importFileInput = document.getElementById('import-file-input');

const totalBooksStat = document.getElementById('total-books-stat');
const totalAuthorsStat = document.getElementById('total-authors-stat');
const ratedBooksStat = document.getElementById('rated-books-stat');

const addBookForm = document.getElementById('add-book-form');
const bookTitleInput = document.getElementById('book-title-input');
const bookAuthorInput = document.getElementById('book-author-input');
const autocompleteList = document.getElementById('autocomplete-list');
const selectorStars = document.querySelectorAll('.selector-star');
const ratingHelpText = document.getElementById('rating-help-text');

const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search-btn');
const sortSelect = document.getElementById('sort-select');
const sortSelectWrapper = document.getElementById('sort-select-wrapper');
const ratingFilter = document.getElementById('rating-filter');
const viewTabs = document.querySelectorAll('.tab-btn');
const viewContentContainer = document.getElementById('view-content-container');
const toast = document.getElementById('toast');

// Supabase Sync DOM Elements
const syncSettingsBtn = document.getElementById('sync-settings-btn');
const syncModal = document.getElementById('sync-modal');
const closeSyncModalBtn = document.getElementById('close-sync-modal-btn');
const syncConfigForm = document.getElementById('sync-config-form');
const supabaseUrlInput = document.getElementById('supabase-url-input');
const supabaseKeyInput = document.getElementById('supabase-key-input');
const syncStatusArea = document.getElementById('sync-status-area');
const disconnectSyncBtn = document.getElementById('disconnect-sync-btn');
const syncBtnLabel = document.getElementById('sync-btn-label');
const syncCloudIcon = document.querySelector('.cloud-icon');

// INITIALIZATION
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Initialize Theme
    initTheme();
    
    // 2. Load Data (async from cloud or local cache)
    await loadData();
    
    // 3. Setup Event Listeners
    setupEventListeners();
    
    // 4. Render initial view
    render();
});

// THEME MANAGEMENT
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    showToast(`מצב התצוגה שונה ל-${newTheme === 'dark' ? 'כהה' : 'בהיר'}`, 'success');
}

// DATA LOADING & STORAGE
async function loadData() {
    const savedUrl = localStorage.getItem('supabase_url');
    const savedKey = localStorage.getItem('supabase_key');
    
    if (savedUrl && savedKey) {
        try {
            // Load Supabase Client SDK globally loaded from script tag
            supabaseClient = supabase.createClient(savedUrl, savedKey);
            isSyncActive = true;
            updateHeaderSyncUI(true);
            
            const { data, error } = await supabaseClient
                .from('books')
                .select('*');
                
            if (error) throw error;
            
            booksState = data.map(book => ({
                id: book.id,
                title: book.title.trim(),
                author: book.author.trim(),
                rating: book.rating
            }));
            
            // Mirror cache copy locally
            localStorage.setItem('book_catalog', JSON.stringify(booksState));
        } catch (err) {
            console.error('Failed to load books from Supabase:', err);
            showToast('חיבור לענן נכשל. מציג נתונים מקומיים.', 'error');
            loadLocalData();
        }
    } else {
        loadLocalData();
    }
    
    // Update stats after loading
    updateStats();
}

function loadLocalData() {
    const storedBooks = localStorage.getItem('book_catalog');
    if (storedBooks) {
        try {
            booksState = JSON.parse(storedBooks);
        } catch (e) {
            console.error('Error parsing stored books, falling back to INITIAL_BOOKS', e);
            useFallbackBooks();
        }
    } else {
        useFallbackBooks();
    }
    
    // If booksState is empty but INITIAL_BOOKS exists (loaded from books_data.js)
    if (booksState.length === 0) {
        useFallbackBooks();
    }
}

function useFallbackBooks() {
    if (typeof INITIAL_BOOKS !== 'undefined' && Array.isArray(INITIAL_BOOKS)) {
        booksState = INITIAL_BOOKS.map(book => ({
            ...book,
            id: generateId()
        }));
        saveToStorage();
    } else {
        booksState = [];
    }
}

function saveToStorage() {
    localStorage.setItem('book_catalog', JSON.stringify(booksState));
    updateStats();
}

function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// STATS UPDATING
function updateStats() {
    const totalBooks = booksState.length;
    
    // Get unique authors
    const uniqueAuthors = new Set(booksState.map(b => b.author.trim()));
    const totalAuthors = uniqueAuthors.size;
    
    // Rated books
    const ratedBooks = booksState.filter(b => b.rating !== null && b.rating !== undefined && b.rating > 0);
    const totalRated = ratedBooks.length;
    
    // Average rating
    let avgRating = 0.0;
    if (totalRated > 0) {
        const sum = ratedBooks.reduce((acc, curr) => acc + curr.rating, 0);
        avgRating = (sum / totalRated).toFixed(1);
    }
    
    // Update DOM
    totalBooksStat.textContent = totalBooks;
    totalAuthorsStat.textContent = totalAuthors;
    ratedBooksStat.textContent = totalRated;
}

// EVENT LISTENERS SETUP
function setupEventListeners() {
    // Theme toggle
    themeToggleBtn.addEventListener('click', toggleTheme);
    
    // Backup Menu toggle
    backupBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        isBackupDropdownOpen = !isBackupDropdownOpen;
        backupDropdown.classList.toggle('hidden', !isBackupDropdownOpen);
    });
    
    document.addEventListener('click', () => {
        isBackupDropdownOpen = false;
        backupDropdown.classList.add('hidden');
    });
    
    backupDropdown.addEventListener('click', (e) => e.stopPropagation());
    
    // Backup Actions
    exportBackupBtn.addEventListener('click', exportBackup);
    importBackupBtnTrigger.addEventListener('click', () => importFileInput.click());
    importFileInput.addEventListener('change', importBackup);
    
    // Sync Settings Modal Listeners
    syncSettingsBtn.addEventListener('click', openSyncModal);
    closeSyncModalBtn.addEventListener('click', closeSyncModal);
    syncModal.addEventListener('click', (e) => {
        if (e.target === syncModal) closeSyncModal();
    });
    syncConfigForm.addEventListener('submit', handleSyncConfigSubmit);
    disconnectSyncBtn.addEventListener('click', handleDisconnectSync);
    
    // Star Selector in Form
    selectorStars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            setNewBookRating(rating);
        });
        
        star.addEventListener('mouseover', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            highlightSelectorStars(rating);
        });
        
        star.addEventListener('mouseleave', () => {
            highlightSelectorStars(selectedRatingForNewBook || 0);
        });
    });
    
    // Autocomplete for Author Field
    bookAuthorInput.addEventListener('input', handleAuthorAutocomplete);
    
    // Close autocomplete on clicking outside
    document.addEventListener('click', (e) => {
        if (e.target !== bookAuthorInput) {
            autocompleteList.classList.add('hidden');
        }
    });
    
    // Submit Add Book Form
    addBookForm.addEventListener('submit', handleAddBookSubmit);
    
    // Live Search
    searchInput.addEventListener('input', () => {
        clearSearchBtn.classList.toggle('hidden', !searchInput.value);
        render();
    });
    
    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearSearchBtn.classList.add('hidden');
        render();
    });
    
    // Filters and Sorting
    sortSelect.addEventListener('change', render);
    ratingFilter.addEventListener('change', render);
    
    // View Tabs
    viewTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            viewTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            activeView = tab.getAttribute('data-view');
            selectedAuthorDetail = null; // Reset author detail when switching tabs
            
            // Show/Hide sort selector (only useful for All Books view)
            sortSelectWrapper.classList.toggle('hidden', activeView !== 'all-books');
            
            render();
        });
    });
}

// NEW BOOK RATING SELECTOR LOGIC
function setNewBookRating(rating) {
    selectedRatingForNewBook = rating;
    highlightSelectorStars(rating);
    ratingHelpText.textContent = `נבחר דירוג של ${rating} כוכבים`;
    ratingHelpText.style.color = 'var(--star-color)';
}

function highlightSelectorStars(rating) {
    selectorStars.forEach(star => {
        const starVal = parseInt(star.getAttribute('data-rating'));
        star.classList.toggle('active', starVal <= rating);
    });
}

// AUTOCOMPLETE FOR AUTHORS
function handleAuthorAutocomplete() {
    const inputVal = bookAuthorInput.value.trim().toLowerCase();
    autocompleteList.innerHTML = '';
    
    if (!inputVal) {
        autocompleteList.classList.add('hidden');
        return;
    }
    
    // Get unique authors
    const uniqueAuthors = Array.from(new Set(booksState.map(b => b.author.trim())));
    
    // Filter matching authors
    const matches = uniqueAuthors.filter(author => 
        author.toLowerCase().includes(inputVal)
    ).slice(0, 5); // Limit to 5 options
    
    if (matches.length === 0) {
        autocompleteList.classList.add('hidden');
        return;
    }
    
    matches.forEach(match => {
        const item = document.createElement('div');
        // Highlight the matched part
        const index = match.toLowerCase().indexOf(inputVal);
        const before = match.substring(0, index);
        const matchText = match.substring(index, index + inputVal.length);
        const after = match.substring(index + inputVal.length);
        
        item.innerHTML = `${before}<strong>${matchText}</strong>${after}`;
        
        item.addEventListener('click', () => {
            bookAuthorInput.value = match;
            autocompleteList.classList.add('hidden');
        });
        
        autocompleteList.appendChild(item);
    });
    
    autocompleteList.classList.remove('hidden');
}

// ADD BOOK SUBMISSION
async function handleAddBookSubmit(e) {
    e.preventDefault();
    
    const title = bookTitleInput.value.trim();
    const author = bookAuthorInput.value.trim();
    const rating = selectedRatingForNewBook;
    
    if (!title || !author) {
        showToast('אנא מלאי את כל שדות החובה', 'error');
        return;
    }
    
    // Check for duplicate title + author
    const isDuplicate = booksState.some(b => 
        b.title.trim().toLowerCase() === title.toLowerCase() && 
        b.author.trim().toLowerCase() === author.toLowerCase()
    );
    
    if (isDuplicate) {
        showToast('הספר כבר קיים בקטלוג', 'error');
        return;
    }
    
    const newBook = {
        id: generateId(),
        title,
        author,
        rating
    };
    
    if (isSyncActive && supabaseClient) {
        try {
            const { error } = await supabaseClient
                .from('books')
                .insert([newBook]);
            if (error) throw error;
        } catch (err) {
            console.error('Failed to save book to Supabase:', err);
            showToast('שגיאה בשמירת הספר בענן', 'error');
            return;
        }
    }
    
    booksState.push(newBook);
    saveToStorage();
    
    // Reset Form
    bookTitleInput.value = '';
    bookAuthorInput.value = '';
    selectedRatingForNewBook = null;
    highlightSelectorStars(0);
    ratingHelpText.textContent = 'טרם נבחר דירוג (ניתן לדרג גם בהמשך)';
    ratingHelpText.style.color = 'var(--text-muted)';
    
    showToast(`הספר "${title}" נוסף בהצלחה!`, 'success');
    
    // Re-render
    render();
}

// UPDATE BOOK RATING DIRECTLY FROM CARD
async function updateBookRating(bookId, newRating) {
    const bookIndex = booksState.findIndex(b => b.id === bookId);
    if (bookIndex !== -1) {
        const oldRating = booksState[bookIndex].rating;
        const targetRating = oldRating === newRating ? null : newRating;
        
        if (isSyncActive && supabaseClient) {
            try {
                const { error } = await supabaseClient
                    .from('books')
                    .update({ rating: targetRating })
                    .eq('id', bookId);
                if (error) throw error;
            } catch (err) {
                console.error('Failed to update rating in Supabase:', err);
                showToast('שגיאה בעדכון הדירוג בענן', 'error');
                return;
            }
        }
        
        booksState[bookIndex].rating = targetRating;
        saveToStorage();
        showToast(
            booksState[bookIndex].rating 
                ? `הדירוג עודכן ל-${booksState[bookIndex].rating} כוכבים` 
                : 'הדירוג הוסר', 
            'success'
        );
        
        render();
    }
}

// DELETE BOOK
async function deleteBook(bookId, bookTitle) {
    if (confirm(`האם את בטוחה שברצונך למחוק את הספר "${bookTitle}"?`)) {
        const bookToDelete = booksState.find(b => b.id === bookId);
        const author = bookToDelete ? bookToDelete.author : null;
        
        if (isSyncActive && supabaseClient) {
            try {
                const { error } = await supabaseClient
                    .from('books')
                    .delete()
                    .eq('id', bookId);
                if (error) throw error;
            } catch (err) {
                console.error('Failed to delete book from Supabase:', err);
                showToast('שגיאה במחיקת הספר מהענן', 'error');
                return;
            }
        }
        
        booksState = booksState.filter(b => b.id !== bookId);
        saveToStorage();
        showToast(`הספר "${bookTitle}" נמחק מהקטלוג`, 'success');
        
        // If we are in detail view and no books left for this author in database
        if (selectedAuthorDetail && author && selectedAuthorDetail === author) {
            const authorHasBooksLeft = booksState.some(b => b.author.trim() === author.trim());
            if (!authorHasBooksLeft) {
                selectedAuthorDetail = null;
            }
        }
        
        render();
    }
}

// HELPERS FOR FILTERING & SORTING
function getStartingLetter(title) {
    if (!title) return '';
    const clean = title.trim().replace(/^["'\'`„“«\s\(-]+/, '');
    if (clean.length === 0) return '';
    const firstChar = clean.charAt(0);
    if (HEBREW_LETTERS.includes(firstChar)) {
        return firstChar;
    }
    return firstChar.toUpperCase();
}

function getFilteredBooks() {
    const query = searchInput.value.trim().toLowerCase();
    const ratingFilterVal = ratingFilter.value;
    
    return booksState.filter(book => {
        // 1. Search Query filter (title or author)
        const matchesQuery = book.title.toLowerCase().includes(query) || 
                             book.author.toLowerCase().includes(query);
                             
        // 2. Rating Filter
        let matchesRating = true;
        if (ratingFilterVal === '5') {
            matchesRating = book.rating === 5;
        } else if (ratingFilterVal === '4') {
            matchesRating = book.rating >= 4;
        } else if (ratingFilterVal === '3') {
            matchesRating = book.rating >= 3;
        } else if (ratingFilterVal === 'unrated') {
            matchesRating = book.rating === null || book.rating === undefined || book.rating === 0;
        }
        
        return matchesQuery && matchesRating;
    });
}

// TOAST NOTIFICATIONS
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.remove('hidden');
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// BACKUP ACTIONS
function exportBackup() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(booksState, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "catalog_books_backup.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('קובץ הגיבוי הורד בהצלחה', 'success');
    isBackupDropdownOpen = false;
    backupDropdown.classList.add('hidden');
}

function importBackup(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const importedData = JSON.parse(event.target.result);
            
            // Validation: must be an array of book objects
            if (!Array.isArray(importedData)) {
                throw new Error('הקובץ אינו מכיל רשימת ספרים תקינה');
            }
            
            // Check essential fields
            const isValid = importedData.every(book => 
                typeof book === 'object' && book !== null && 'title' in book && 'author' in book
            );
            
            if (!isValid) {
                throw new Error('חלק מהספרים בקובץ חסרים שדות חובה (שם או סופר)');
            }
            
            // Format data, add IDs if missing, handle ratings
            const cleanedData = importedData.map(book => ({
                id: book.id || generateId(),
                title: book.title.trim(),
                author: book.author.trim(),
                rating: book.rating !== undefined ? book.rating : null
            }));
            
            if (confirm(`נמצאו ${cleanedData.length} ספרים בקובץ הגיבוי. האם ברצונך להחליף את הקטלוג הנוכחי בנתונים אלו?`)) {
                booksState = cleanedData;
                saveToStorage();
                showToast('הקטלוג שוחזר בהצלחה מתוך הגיבוי!', 'success');
                render();
            }
        } catch (err) {
            showToast('שגיאה בקריאת קובץ הגיבוי: ' + err.message, 'error');
        }
    };
    reader.readAsText(file);
    // Reset file input value so same file can be loaded again
    e.target.value = '';
    isBackupDropdownOpen = false;
    backupDropdown.classList.add('hidden');
}

// MAIN RENDER SELECTOR
function render() {
    viewContentContainer.innerHTML = '';
    
    const filteredBooks = getFilteredBooks();
    
    // If we are in detail view and there are no books matching search/filters for this author, 
    // we still want to show the detail page with empty message, not the general empty state.
    if (filteredBooks.length === 0 && !selectedAuthorDetail) {
        renderEmptyState();
        return;
    }
    
    if (activeView === 'authors') {
        if (selectedAuthorDetail) {
            renderAuthorDetailView(filteredBooks, selectedAuthorDetail);
        } else {
            renderAuthorsView(filteredBooks);
        }
    } else if (activeView === 'alphabet') {
        renderAlphabetView(filteredBooks);
    } else if (activeView === 'all-books') {
        renderAllBooksView(filteredBooks);
    }
}

// RENDER EMPTY STATE
function renderEmptyState() {
    const container = document.createElement('div');
    container.className = 'empty-state card';
    
    container.innerHTML = `
        <svg class="empty-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
        </svg>
        <h3>לא נמצאו ספרים תואמים</h3>
        <p>נסה לשנות את מילות החיפוש או את מסנני הדירוג.</p>
    `;
    viewContentContainer.appendChild(container);
}

// RENDER STAR UTILITY FOR CARDS
function getStarsHTML(bookId, currentRating) {
    let starsHTML = `<div class="star-rating-display" data-book-id="${bookId}">`;
    for (let i = 1; i <= 5; i++) {
        const isFilled = currentRating !== null && currentRating !== undefined && i <= currentRating;
        starsHTML += `
            <span class="display-star ${isFilled ? 'filled' : ''}" 
                  data-star-val="${i}" 
                  title="דרג ${i} כוכבים">
                ★
            </span>`;
    }
    starsHTML += '</div>';
    return starsHTML;
}

function bindStarClickEvents() {
    const displays = document.querySelectorAll('.star-rating-display');
    displays.forEach(display => {
        const bookId = display.getAttribute('data-book-id');
        const stars = display.querySelectorAll('.display-star');
        
        stars.forEach(star => {
            star.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent accordion toggling if inside header
                const rating = parseInt(star.getAttribute('data-star-val'));
                updateBookRating(bookId, rating);
            });
        });
    });
}

// 1. RENDER VIEW: AUTHORS (GRID/LIST)
function renderAuthorsView(books) {
    const authorsContainer = document.createElement('div');
    authorsContainer.className = 'authors-list';
    
    // Group books by author
    const booksByAuthor = {};
    books.forEach(book => {
        const author = book.author.trim();
        if (!booksByAuthor[author]) {
            booksByAuthor[author] = [];
        }
        booksByAuthor[author].push(book);
    });
    
    // Get authors sorted alphabetically
    const sortedAuthors = Object.keys(booksByAuthor).sort((a, b) => a.localeCompare(b, 'he'));
    
    sortedAuthors.forEach(author => {
        const authorBooks = booksByAuthor[author];
        
        // Calculate average rating for this author
        const ratedBooks = authorBooks.filter(b => b.rating !== null && b.rating > 0);
        let avgRatingText = '';
        let avgRatingVal = 0;
        if (ratedBooks.length > 0) {
            const sum = ratedBooks.reduce((acc, curr) => acc + curr.rating, 0);
            avgRatingVal = (sum / ratedBooks.length).toFixed(1);
            avgRatingText = `${avgRatingVal} ★`;
        }
        
        const authorCard = document.createElement('div');
        authorCard.className = 'author-card';
        authorCard.setAttribute('data-author', author);
        authorCard.style.cursor = 'pointer';
        
        authorCard.innerHTML = `
            <div class="author-header">
                <div class="author-meta">
                    <span class="author-name">${author}</span>
                </div>
                <div class="author-stats">
                    <span class="badge count">${authorBooks.length} ספרים</span>
                    ${avgRatingText ? `<span class="badge rating">${avgRatingText}</span>` : ''}
                    <svg class="icon chevron-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="15 18 9 12 15 6"/>
                    </svg>
                </div>
            </div>
        `;
        
        // Click handler to view author details
        authorCard.addEventListener('click', () => {
            selectedAuthorDetail = author;
            render();
        });
        
        authorsContainer.appendChild(authorCard);
    });
    
    viewContentContainer.appendChild(authorsContainer);
}

// 1B. RENDER VIEW: AUTHOR DETAIL (DEDICATED VIEW FOR AUTHOR BOOKS)
function renderAuthorDetailView(books, authorName) {
    const container = document.createElement('div');
    container.className = 'author-detail-view';
    
    // Get books for this author
    const authorBooks = books.filter(b => b.author.trim() === authorName.trim());
    
    // Calculate stats for this author
    const ratedBooks = authorBooks.filter(b => b.rating !== null && b.rating > 0);
    let avgRatingText = '';
    let avgRatingVal = 0;
    if (ratedBooks.length > 0) {
        const sum = ratedBooks.reduce((acc, curr) => acc + curr.rating, 0);
        avgRatingVal = (sum / ratedBooks.length).toFixed(1);
        avgRatingText = `${avgRatingVal} ★`;
    }
    
    container.innerHTML = `
        <div class="detail-header card" style="margin-bottom: 20px; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 16px;">
                <button id="back-to-authors-btn" class="action-btn outline" title="חזור לרשימת הסופרים">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"/>
                    </svg>
                    <span>חזור</span>
                </button>
                <h2 style="font-size: 1.3rem; font-weight: 700; margin: 0;">הספרים של ${authorName}</h2>
            </div>
            <div class="author-stats" style="display: flex; align-items: center; gap: 10px;">
                <span class="badge count">${authorBooks.length} ספרים</span>
                ${avgRatingText ? `<span class="badge rating">${avgRatingText}</span>` : ''}
            </div>
        </div>
        
        <div class="author-books-list card" style="display: flex; flex-direction: column; gap: 10px;">
            <!-- Books will be listed here -->
        </div>
    `;
    
    const booksListEl = container.querySelector('.author-books-list');
    
    if (authorBooks.length === 0) {
        booksListEl.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 20px;">אין ספרים של סופר זה התואמים את מסנני החיפוש.</p>`;
    } else {
        authorBooks.sort((a,b) => a.title.localeCompare(b.title, 'he')).forEach(book => {
            const bookRow = document.createElement('div');
            bookRow.className = 'book-item';
            bookRow.innerHTML = `
                <span class="book-title">${book.title}</span>
                <div class="book-controls">
                    ${getStarsHTML(book.id, book.rating)}
                    <button class="delete-btn" title="מחק ספר" data-id="${book.id}" data-title="${book.title}">
                        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                    </button>
                </div>
            `;
            
            bookRow.querySelector('.delete-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                deleteBook(book.id, book.title);
            });
            
            booksListEl.appendChild(bookRow);
        });
    }
    
    // Back button event listener
    container.querySelector('#back-to-authors-btn').addEventListener('click', () => {
        selectedAuthorDetail = null;
        render();
    });
    
    viewContentContainer.appendChild(container);
    bindStarClickEvents();
}

// 2. RENDER VIEW: ALPHABET (GRID)
function renderAlphabetView(books) {
    const alphabetContainer = document.createElement('div');
    alphabetContainer.className = 'alphabet-container';
    
    // Group books by starting letter of title
    const booksByLetter = {};
    HEBREW_LETTERS.forEach(letter => {
        booksByLetter[letter] = [];
    });
    
    // Non-Hebrew starting letters fallback container
    const otherLetterGroup = [];
    
    books.forEach(book => {
        const letter = getStartingLetter(book.title);
        if (booksByLetter[letter]) {
            booksByLetter[letter].push(book);
        } else {
            otherLetterGroup.push(book);
        }
    });
    
    // Create alphabet buttons grid
    const alphabetGridEl = document.createElement('div');
    alphabetGridEl.className = 'alphabet-grid';
    
    HEBREW_LETTERS.forEach(letter => {
        const count = booksByLetter[letter].length;
        const letterBtn = document.createElement('button');
        letterBtn.className = `letter-btn ${count > 0 ? 'has-books' : ''} ${selectedAlphabetLetter === letter ? 'active' : ''}`;
        letterBtn.innerHTML = `
            <span>${letter}</span>
            <span class="letter-count-badge">${count}</span>
        `;
        
        letterBtn.addEventListener('click', () => {
            selectedAlphabetLetter = letter;
            renderAlphabetView(books); // Re-render alphabet view to update active letter selection
        });
        
        alphabetGridEl.appendChild(letterBtn);
    });
    
    // If there are non-hebrew letters, add an 'Other' button
    if (otherLetterGroup.length > 0) {
        const otherBtn = document.createElement('button');
        otherBtn.className = `letter-btn has-books ${selectedAlphabetLetter === 'other' ? 'active' : ''}`;
        otherBtn.innerHTML = `
            <span>אחר</span>
            <span class="letter-count-badge">${otherLetterGroup.length}</span>
        `;
        otherBtn.addEventListener('click', () => {
            selectedAlphabetLetter = 'other';
            renderAlphabetView(books);
        });
        alphabetGridEl.appendChild(otherBtn);
    }
    
    alphabetContainer.appendChild(alphabetGridEl);
    
    // Display books for selected letter
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'alphabet-results';
    
    const activeLetterBooks = selectedAlphabetLetter === 'other' ? otherLetterGroup : (booksByLetter[selectedAlphabetLetter] || []);
    
    if (activeLetterBooks.length === 0) {
        resultsContainer.innerHTML = `
            <div class="empty-state card" style="padding: 30px 20px;">
                <p>אין ספרים המתחילים באות <strong>"${selectedAlphabetLetter}"</strong></p>
            </div>
        `;
    } else {
        const headerEl = document.createElement('h3');
        headerEl.className = 'alphabet-results-header';
        headerEl.textContent = `ספרים המתחילים באות "${selectedAlphabetLetter === 'other' ? 'אחר' : selectedAlphabetLetter}" (${activeLetterBooks.length}):`;
        resultsContainer.appendChild(headerEl);
        
        const listEl = document.createElement('div');
        listEl.className = 'authors-books-list';
        listEl.style.padding = '0';
        listEl.style.border = 'none';
        
        // Sort active books by title
        activeLetterBooks.sort((a,b) => a.title.localeCompare(b.title, 'he')).forEach(book => {
            const bookRow = document.createElement('div');
            bookRow.className = 'book-item';
            bookRow.innerHTML = `
                <span class="book-title">
                    <strong>${book.title}</strong> 
                    <span style="color: var(--text-muted); font-size: 0.85rem; margin-right: 8px;">מאת ${book.author}</span>
                </span>
                <div class="book-controls">
                    ${getStarsHTML(book.id, book.rating)}
                    <button class="delete-btn" title="מחק ספר" data-id="${book.id}" data-title="${book.title}">
                        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                    </button>
                </div>
            `;
            
            bookRow.querySelector('.delete-btn').addEventListener('click', () => {
                deleteBook(book.id, book.title);
            });
            
            listEl.appendChild(bookRow);
        });
        
        resultsContainer.appendChild(listEl);
    }
    
    alphabetContainer.appendChild(resultsContainer);
    viewContentContainer.appendChild(alphabetContainer);
    bindStarClickEvents();
}

// 3. RENDER VIEW: ALL BOOKS (GRID LAYOUT)
function renderAllBooksView(books) {
    const gridContainer = document.createElement('div');
    gridContainer.className = 'all-books-grid';
    
    // Sort books based on sortSelect value
    const sortVal = sortSelect.value;
    const sortedBooks = [...books];
    
    sortedBooks.sort((a, b) => {
        if (sortVal === 'title-asc') {
            return a.title.localeCompare(b.title, 'he');
        } else if (sortVal === 'author-asc') {
            return a.author.localeCompare(b.author, 'he') || a.title.localeCompare(b.title, 'he');
        } else if (sortVal === 'rating-desc') {
            // Unrated books are treated as 0 for sorting
            const rA = a.rating || 0;
            const rB = b.rating || 0;
            return rB - rA || a.title.localeCompare(b.title, 'he');
        } else if (sortVal === 'rating-asc') {
            const rA = a.rating || 0;
            const rB = b.rating || 0;
            return rA - rB || a.title.localeCompare(b.title, 'he');
        }
        return 0;
    });
    
    sortedBooks.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <div class="book-card-header">
                <div>
                    <h3 class="book-card-title" title="${book.title}">${book.title}</h3>
                    <div class="book-card-author">${book.author}</div>
                </div>
                <button class="delete-btn" title="מחק ספר" data-id="${book.id}" data-title="${book.title}">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                </button>
            </div>
            <div class="book-card-footer">
                ${getStarsHTML(book.id, book.rating)}
            </div>
        `;
        
        bookCard.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteBook(book.id, book.title);
        });
        
        gridContainer.appendChild(bookCard);
    });
    
    viewContentContainer.appendChild(gridContainer);
    bindStarClickEvents();
}

// ==========================================
// CLOUD SYNC SETTINGS & DELEGATES (SUPABASE)
// ==========================================

function openSyncModal() {
    syncModal.classList.remove('hidden');
    
    const savedUrl = localStorage.getItem('supabase_url');
    const savedKey = localStorage.getItem('supabase_key');
    
    if (savedUrl && savedKey) {
        supabaseUrlInput.value = savedUrl;
        supabaseKeyInput.value = savedKey;
        disconnectSyncBtn.classList.remove('hidden');
        showSyncStatus('מחובר לענן ומסונכרן בזמן אמת', 'success');
    } else {
        supabaseUrlInput.value = '';
        supabaseKeyInput.value = '';
        disconnectSyncBtn.classList.add('hidden');
        syncStatusArea.className = 'sync-status-area hidden';
    }
}

function closeSyncModal() {
    syncModal.classList.add('hidden');
}

function showSyncStatus(message, type) {
    syncStatusArea.textContent = message;
    syncStatusArea.className = `sync-status-area ${type}`;
}

function updateHeaderSyncUI(connected) {
    if (connected) {
        syncCloudIcon.classList.add('connected');
        syncBtnLabel.textContent = 'מחובר לענן';
    } else {
        syncCloudIcon.classList.remove('connected');
        syncBtnLabel.textContent = 'חיבור לענן';
    }
}

async function handleSyncConfigSubmit(e) {
    e.preventDefault();
    const url = supabaseUrlInput.value.trim();
    const key = supabaseKeyInput.value.trim();
    
    showSyncStatus('מתחבר לענן ובודק תקינות...', 'loading');
    
    try {
        const client = supabase.createClient(url, key);
        
        // Test query (check connection and if books table exists)
        const { data: dbBooks, error: fetchErr } = await client.from('books').select('*');
        if (fetchErr) throw fetchErr;
        
        // Save config
        localStorage.setItem('supabase_url', url);
        localStorage.setItem('supabase_key', key);
        supabaseClient = client;
        isSyncActive = true;
        
        updateHeaderSyncUI(true);
        
        // Migration: If DB is empty, but local storage has books, upload them!
        if (dbBooks.length === 0 && booksState.length > 0) {
            showSyncStatus('מעלה ספרים קיימים לענן...', 'loading');
            
            const dbPayload = booksState.map(b => ({
                id: b.id,
                title: b.title.trim(),
                author: b.author.trim(),
                rating: b.rating
            }));
            
            const { error: upsertErr } = await client.from('books').upsert(dbPayload);
            if (upsertErr) throw upsertErr;
            showToast('הספרים המקומיים הועלו לענן בהצלחה', 'success');
        } else if (dbBooks.length > 0) {
            // Overwrite local cache with DB books
            booksState = dbBooks.map(book => ({
                id: book.id,
                title: book.title.trim(),
                author: book.author.trim(),
                rating: book.rating
            }));
            localStorage.setItem('book_catalog', JSON.stringify(booksState));
            showToast('הספרים נטענו מהענן בהצלחה', 'success');
        }
        
        showSyncStatus('חיבור הצליח! האתר מסונכרן כעת.', 'success');
        disconnectSyncBtn.classList.remove('hidden');
        
        // Update Stats and Render
        updateStats();
        render();
        
        // Close modal
        setTimeout(() => {
            closeSyncModal();
        }, 1500);
        
    } catch (err) {
        console.error('Sync connection error:', err);
        showSyncStatus('חיבור נכשל: ' + err.message + '. ודאי שהמפתח נכון ושהטבלה "books" נוצרה ב-Supabase.', 'error');
    }
}

function handleDisconnectSync() {
    if (confirm('האם את בטוחה שברצונך לנתק את הסנכרון לענן? הנתונים יישארו בזיכרון המקומי.')) {
        localStorage.removeItem('supabase_url');
        localStorage.removeItem('supabase_key');
        supabaseClient = null;
        isSyncActive = false;
        
        updateHeaderSyncUI(false);
        disconnectSyncBtn.classList.add('hidden');
        syncStatusArea.className = 'sync-status-area hidden';
        
        supabaseUrlInput.value = '';
        supabaseKeyInput.value = '';
        
        showToast('הסנכרון לענן הופסק', 'success');
        closeSyncModal();
        render();
    }
}
