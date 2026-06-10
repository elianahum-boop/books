// הקובץ נוצר אוטומטית על ידי תסריט החילוץ
const INITIAL_BOOKS = [
  {
    "title": "רצח בראשי תיבות",
    "author": "אגתה כריסטי",
    "rating": null
  },
  {
    "title": "משוואה עם נעלם",
    "author": "אורי אדלמן",
    "rating": null
  },
  {
    "title": "שעות מתות",
    "author": "אורי אדלמן",
    "rating": null
  },
  {
    "title": "אהבה לפי הספר",
    "author": "אורלי קראוס - ויינר",
    "rating": null
  },
  {
    "title": "הנסיך",
    "author": "אורלי קראוס - ויינר",
    "rating": null
  },
  {
    "title": "כמעט מושלם",
    "author": "אורלי קראוס - ויינר",
    "rating": null
  },
  {
    "title": "האור של לוס",
    "author": "אלסה אוסורין",
    "rating": null
  },
  {
    "title": "סראיא, בת השד הרע",
    "author": "אמיל חביבי",
    "rating": null
  },
  {
    "title": "בועה",
    "author": "אנדרס דה לה מוטה",
    "rating": null
  },
  {
    "title": "לקום ולהרוג",
    "author": "ארן אראל",
    "rating": null
  },
  {
    "title": "משאלה אחת ימינה",
    "author": "אשכול נבון",
    "rating": null
  },
  {
    "title": "קרוב ממה שנדמה",
    "author": "בראד פרקס",
    "rating": null
  },
  {
    "title": "תגובה נגדית",
    "author": "בראד תור",
    "rating": null
  },
  {
    "title": "עוד תזרח השמש בחלוני",
    "author": "ברטה מטייב",
    "rating": null
  },
  {
    "title": "רצח בדרך לבית לחם",
    "author": "בתיה גור",
    "rating": null
  },
  {
    "title": "רצח בשבת בבוקר",
    "author": "בתיה גור",
    "rating": null
  },
  {
    "title": "המנכ\"ל",
    "author": "ג'וזף פיינדר",
    "rating": null
  },
  {
    "title": "השטלטות עוינת",
    "author": "ג'וזף פיינדר",
    "rating": null
  },
  {
    "title": "משחקי כוח",
    "author": "ג'וזף פיינדר",
    "rating": null
  },
  {
    "title": "סודות קבורים",
    "author": "ג'וזף פיינדר",
    "rating": null
  },
  {
    "title": "פרנויה",
    "author": "ג'וזף פיינדר",
    "rating": null
  },
  {
    "title": "רצח בעיניים",
    "author": "ג'וזף פיינדר",
    "rating": null
  },
  {
    "title": "בית צבוע",
    "author": "ג'ון גרישם",
    "rating": null
  },
  {
    "title": "בר התרנגול",
    "author": "ג'ון גרישם",
    "rating": null
  },
  {
    "title": "האחווה",
    "author": "ג'ון גרישם",
    "rating": null
  },
  {
    "title": "האי קמינו",
    "author": "ג'ון גרישם",
    "rating": null
  },
  {
    "title": "הברוקר",
    "author": "ג'ון גרישם",
    "rating": null
  },
  {
    "title": "ההודאה",
    "author": "ג'ון גרישם",
    "rating": null
  },
  {
    "title": "הזימון",
    "author": "ג'ון גרישם",
    "rating": null
  },
  {
    "title": "הלקוח",
    "author": "ג'ון גרישם",
    "rating": null
  },
  {
    "title": "המושבע האחרון",
    "author": "ג'ון גרישם",
    "rating": null
  },
  {
    "title": "המתריעים",
    "author": "ג'ון גרישם",
    "rating": null
  },
  {
    "title": "הנערים מבילוקסי",
    "author": "ג'ון גרישם",
    "rating": null
  },
  {
    "title": "הסחטן",
    "author": "ג'ון גרישם",
    "rating": null
  },
  {
    "title": "הערעור",
    "author": "ג'ון גרישם",
    "rating": null
  },
  {
    "title": "הפירמה",
    "author": "ג'ון גרישם",
    "rating": null
  },
  {
    "title": "הצוואה",
    "author": "ג'ון גרישם",
    "rating": null
  },
  {
    "title": "השומרים",
    "author": "ג'ון גרישם",
    "rating": null
  },
  {
    "title": "השותף",
    "author": "ג'ון גרישם",
    "rating": null
  },
  {
    "title": "התחשבות",
    "author": "ג'ון גרישם",
    "rating": null
  },
  {
    "title": "חף מפשע",
    "author": "ג'ון גרישם",
    "rating": null
  },
  {
    "title": "מדלגים על החג",
    "author": "ג'ון גרישם",
    "rating": null
  },
  {
    "title": "מוניטין מפוקפק",
    "author": "ג'ון גרישם",
    "rating": null
  },
  {
    "title": "מוריד הגשם",
    "author": "ג'ון גרישם",
    "rating": null
  },
  {
    "title": "מלך הנזיקין",
    "author": "ג'ון גרישם",
    "rating": null
  },
  {
    "title": "משחק המושבעים",
    "author": "ג'ון גרישם",
    "rating": null
  },
  {
    "title": "סחיטה",
    "author": "ג'ון גרישם",
    "rating": null
  },
  {
    "title": "עת להרוג",
    "author": "ג'ון גרישם",
    "rating": null
  },
  {
    "title": "עת לחמול",
    "author": "ג'ון גרישם",
    "rating": null
  },
  {
    "title": "פרקליט רחוב",
    "author": "ג'ון גרישם",
    "rating": null
  },
  {
    "title": "שדרת השקמים",
    "author": "ג'ון גרישם",
    "rating": null
  },
  {
    "title": "החותם השחור",
    "author": "ג'ון סטיבנס",
    "rating": null
  },
  {
    "title": "יומן האש",
    "author": "ג'ון סטיבנס",
    "rating": null
  },
  {
    "title": "אסיר מלידה",
    "author": "ג'פרי ארצ'ר",
    "rating": null
  },
  {
    "title": "ימים יגידו",
    "author": "ג'פרי ארצ'ר",
    "rating": null
  },
  {
    "title": "האיקונין",
    "author": "גיל אולסון",
    "rating": null
  },
  {
    "title": "הלוחש",
    "author": "דונאטו קאריזי",
    "rating": null
  },
  {
    "title": "איש הזיכרון",
    "author": "דיוויד באלדאצ'י",
    "rating": null
  },
  {
    "title": "גאולה",
    "author": "דיוויד באלדאצ'י",
    "rating": null
  },
  {
    "title": "גאון פשוט",
    "author": "דיוויד באלדאצ'י",
    "rating": null
  },
  {
    "title": "דו קרב (וגה ג'יין)",
    "author": "דיוויד באלדאצ'י",
    "rating": null
  },
  {
    "title": "דרך ארוכה",
    "author": "דיוויד באלדאצ'י",
    "rating": null
  },
  {
    "title": "האיש השישי",
    "author": "דיוויד באלדאצ'י",
    "rating": null
  },
  {
    "title": "האמת הפשוטה",
    "author": "דיוויד באלדאצ'י",
    "rating": null
  },
  {
    "title": "האספנים",
    "author": "דיוויד באלדאצ'י",
    "rating": null
  },
  {
    "title": "האשם",
    "author": "דיוויד באלדאצ'י",
    "rating": null
  },
  {
    "title": "הבריחה",
    "author": "דיוויד באלדאצ'י",
    "rating": null
  },
  {
    "title": "החיסול",
    "author": "דיוויד באלדאצ'י",
    "rating": null
  },
  {
    "title": "המייל האחרון",
    "author": "דיוויד באלדאצ'י",
    "rating": null
  },
  {
    "title": "המשפחה הראשונה",
    "author": "דיוויד באלדאצ'י",
    "rating": null
  },
  {
    "title": "הנופלים",
    "author": "דיוויד באלדאצ'י",
    "rating": null
  },
  {
    "title": "הנשכחים",
    "author": "דיוויד באלדאצ'י",
    "rating": null
  },
  {
    "title": "התיקון",
    "author": "דיוויד באלדאצ'י",
    "rating": null
  },
  {
    "title": "וגה ג'יין ומבוך המפלצות",
    "author": "דיוויד באלדאצ'י",
    "rating": null
  },
  {
    "title": "יום האפס",
    "author": "דיוויד באלדאצ'י",
    "rating": null
  },
  {
    "title": "כל האמת",
    "author": "דיוויד באלדאצ'י",
    "rating": null
  },
  {
    "title": "להציל את פייט",
    "author": "דיוויד באלדאצ'י",
    "rating": null
  },
  {
    "title": "מטען חורג",
    "author": "דיוויד באלדאצ'י",
    "rating": null
  },
  {
    "title": "מטרה סופית",
    "author": "דיוויד באלדאצ'י",
    "rating": null
  },
  {
    "title": "מרסי",
    "author": "דיוויד באלדאצ'י",
    "rating": null
  },
  {
    "title": "משחק השעות",
    "author": "דיוויד באלדאצ'י",
    "rating": null
  },
  {
    "title": "נאמנות כחולה",
    "author": "דיוויד באלדאצ'י",
    "rating": null
  },
  {
    "title": "נשיא מעל החוק",
    "author": "דיוויד באלדאצ'י",
    "rating": null
  },
  {
    "title": "פינת הגיהינום",
    "author": "דיוויד באלדאצ'י",
    "rating": null
  },
  {
    "title": "קר כקרח",
    "author": "דיוויד באלדאצ'י",
    "rating": null
  },
  {
    "title": "שבריר שניה",
    "author": "דיוויד באלדאצ'י",
    "rating": null
  },
  {
    "title": "שטח הפקר",
    "author": "דיוויד באלדאצ'י",
    "rating": null
  },
  {
    "title": "שם הצופן: מבצר דיגיטלי",
    "author": "דן בראון",
    "rating": null
  },
  {
    "title": "מבחן בוזגלו",
    "author": "דן גורן",
    "rating": null
  },
  {
    "title": "בית המרגלים",
    "author": "דניאל סילבה",
    "rating": null
  },
  {
    "title": "הבחורה האנגלייה",
    "author": "דניאל סילבה",
    "rating": null
  },
  {
    "title": "פרשת רמברנדט",
    "author": "דניאל סילבה",
    "rating": null
  },
  {
    "title": "אפשרות של אלימות",
    "author": "דרור משעני",
    "rating": null
  },
  {
    "title": "תיק נעדר",
    "author": "דרור משעני",
    "rating": null
  },
  {
    "title": "האיש שצפה בנשים",
    "author": "האנס רוזנפלדט",
    "rating": null
  },
  {
    "title": "אבק שרפה",
    "author": "הרלן קובן",
    "rating": null
  },
  {
    "title": "אדם זר",
    "author": "הרלן קובן",
    "rating": null
  },
  {
    "title": "אל תגלה",
    "author": "הרלן קובן",
    "rating": null
  },
  {
    "title": "אל תעזוב",
    "author": "הרלן קובן",
    "rating": null
  },
  {
    "title": "דיו חיוור",
    "author": "הרלן קובן",
    "rating": null
  },
  {
    "title": "דם חם",
    "author": "הרלן קובן",
    "rating": null
  },
  {
    "title": "הבטיחי לי",
    "author": "הרלן קובן",
    "rating": null
  },
  {
    "title": "הזדמנות אחרונה",
    "author": "הרלן קובן",
    "rating": null
  },
  {
    "title": "הילד מהיער",
    "author": "הרלן קובן",
    "rating": null
  },
  {
    "title": "היער",
    "author": "הרלן קובן",
    "rating": null
  },
  {
    "title": "הנעדרים",
    "author": "הרלן קובן",
    "rating": null
  },
  {
    "title": "הנעלמים",
    "author": "הרלן קובן",
    "rating": null
  },
  {
    "title": "התמימים",
    "author": "הרלן קובן",
    "rating": null
  },
  {
    "title": "מהלך מוטעה",
    "author": "הרלן קובן",
    "rating": null
  },
  {
    "title": "מחסה",
    "author": "הרלן קובן",
    "rating": null
  },
  {
    "title": "מירוץ מטורף",
    "author": "הרלן קובן",
    "rating": null
  },
  {
    "title": "מלכודת מאוחרת",
    "author": "הרלן קובן",
    "rating": null
  },
  {
    "title": "מסלול מכשולים",
    "author": "הרלן קובן",
    "rating": null
  },
  {
    "title": "מרחק של שניות",
    "author": "הרלן קובן",
    "rating": null
  },
  {
    "title": "משחק מסוכן",
    "author": "הרלן קובן",
    "rating": null
  },
  {
    "title": "ניצחון",
    "author": "הרלן קובן",
    "rating": null
  },
  {
    "title": "קרבת דם",
    "author": "הרלן קובן",
    "rating": null
  },
  {
    "title": "שש שנים",
    "author": "הרלן קובן",
    "rating": null
  },
  {
    "title": "תחזיקו חזק",
    "author": "הרלן קובן",
    "rating": null
  },
  {
    "title": "תחשוב פעמיים",
    "author": "הרלן קובן",
    "rating": null
  },
  {
    "title": "טיסת רפאים",
    "author": "ויליאם כץ",
    "rating": null
  },
  {
    "title": "רודף העפיפונים",
    "author": "חאלד חוסייני",
    "rating": null
  },
  {
    "title": "החווה",
    "author": "טום רוב סמית",
    "rating": null
  },
  {
    "title": "הנאום הסודי",
    "author": "טום רוב סמית",
    "rating": null
  },
  {
    "title": "נערה עם עגיל פנינה",
    "author": "טרייסי שבלייה",
    "rating": null
  },
  {
    "title": "אמנות ההקשבה לפעימות הלב",
    "author": "יאן פיליפ סנדרק",
    "rating": null
  },
  {
    "title": "אדל",
    "author": "יוכי ברנדס",
    "rating": null
  },
  {
    "title": "היהדות שלא הכרנו",
    "author": "יוכי ברנדס",
    "rating": null
  },
  {
    "title": "מלכים ג",
    "author": "יוכי ברנדס",
    "rating": null
  },
  {
    "title": "בוגד",
    "author": "יונתן דה שליט",
    "rating": null
  },
  {
    "title": "גאולה",
    "author": "יוסי אדלר - אולסן",
    "rating": null
  },
  {
    "title": "בחזרה מטואיצ'י",
    "author": "יוסי גינסברג",
    "rating": null
  },
  {
    "title": "חתול אשמורת",
    "author": "יוסף כהן",
    "rating": null
  },
  {
    "title": "סוד אכזר",
    "author": "יוסף שביט",
    "rating": null
  },
  {
    "title": "בתו",
    "author": "יורם קניוק",
    "rating": null
  },
  {
    "title": "הברלינאי האחרון",
    "author": "יורם קניוק",
    "rating": null
  },
  {
    "title": "המטרה מקדשת",
    "author": "יריב ענבר",
    "rating": null
  },
  {
    "title": "סוד אכזר",
    "author": "כרמי גילון",
    "rating": null
  },
  {
    "title": "מבוקש",
    "author": "לי צ'יילד",
    "rating": null
  },
  {
    "title": "שלג על עצי הדובדבן",
    "author": "ליאן הרן",
    "rating": null
  },
  {
    "title": "בלי לומר שלום",
    "author": "לינווד ברקלי",
    "rating": null
  },
  {
    "title": "האשם",
    "author": "ליסה בלנטיין",
    "rating": null
  },
  {
    "title": "המיסתורין",
    "author": "ליסה טאטל",
    "rating": null
  },
  {
    "title": "אם המושבות",
    "author": "ליעד שהם",
    "rating": null
  },
  {
    "title": "הערעור האחרון",
    "author": "ליעד שהם",
    "rating": null
  },
  {
    "title": "יום הדין",
    "author": "ליעד שהם",
    "rating": null
  },
  {
    "title": "למראית עין",
    "author": "ליעד שהם",
    "rating": null
  },
  {
    "title": "מסדר זיהוי",
    "author": "ליעד שהם",
    "rating": null
  },
  {
    "title": "מספר חסוי",
    "author": "ליעד שהם",
    "rating": null
  },
  {
    "title": "משחק הראיות",
    "author": "ליעד שהם",
    "rating": null
  },
  {
    "title": "סיכון כפול",
    "author": "ליעד שהם",
    "rating": null
  },
  {
    "title": "עד מפתח",
    "author": "ליעד שהם",
    "rating": null
  },
  {
    "title": "עיר מקלט",
    "author": "ליעד שהם",
    "rating": null
  },
  {
    "title": "עניין משפחתי",
    "author": "ליעד שהם",
    "rating": null
  },
  {
    "title": "קרדיט",
    "author": "ליעד שהם",
    "rating": null
  },
  {
    "title": "שבוע באמצע החיים",
    "author": "ליעד שהם",
    "rating": null
  },
  {
    "title": "ספר האוויר והצללים",
    "author": "מייקל גרובר",
    "rating": null
  },
  {
    "title": "עד במנוסה",
    "author": "מייקל קוריטה",
    "rating": null
  },
  {
    "title": "סיכון אחרון",
    "author": "מייקל רידפאת",
    "rating": null
  },
  {
    "title": "האיש שצפה בנשים",
    "author": "מיכאל יורת",
    "rating": null
  },
  {
    "title": "נדיר",
    "author": "מיכל פלג",
    "rating": null
  },
  {
    "title": "מאה חורפים",
    "author": "מיכל שלו",
    "rating": null
  },
  {
    "title": "רחמים",
    "author": "מיכל שלו",
    "rating": null
  },
  {
    "title": "שבועת רחל",
    "author": "מיכל שלו",
    "rating": null
  },
  {
    "title": "רחוב במנוסה",
    "author": "מיק הרון",
    "rating": null
  },
  {
    "title": "הייתי מאחוריך",
    "author": "ניקולא פארג",
    "rating": null
  },
  {
    "title": "בידך אפקיד רוחי",
    "author": "נעמי רגן",
    "rating": null
  },
  {
    "title": "הברית",
    "author": "נעמי רגן",
    "rating": null
  },
  {
    "title": "השיר העשירי",
    "author": "נעמי רגן",
    "rating": null
  },
  {
    "title": "הת יפתח",
    "author": "נעמי רגן",
    "rating": null
  },
  {
    "title": "ואל - אישך תשוקתך",
    "author": "נעמי רגן",
    "rating": null
  },
  {
    "title": "כמיהה לעדן",
    "author": "נעמי רגן",
    "rating": null
  },
  {
    "title": "עקדת תמר",
    "author": "נעמי רגן",
    "rating": null
  },
  {
    "title": "הכתובים הסודיים",
    "author": "סבסטיאן בארי",
    "rating": null
  },
  {
    "title": "אש זרה",
    "author": "סטיבן קינג",
    "rating": null
  },
  {
    "title": "הולי",
    "author": "סטיבן קינג",
    "rating": null
  },
  {
    "title": "קארי",
    "author": "סטיבן קינג",
    "rating": null
  },
  {
    "title": "הנערה שבעטה בקן הצרעות",
    "author": "סטינג לרסון",
    "rating": null
  },
  {
    "title": "שאלימר הליצן",
    "author": "סלמאן רושדי",
    "rating": null
  },
  {
    "title": "נקמת הקנרית",
    "author": "עלמה גניהר",
    "rating": null
  },
  {
    "title": "אף יהודי",
    "author": "ענת עינהר",
    "rating": null
  },
  {
    "title": "לא לגמרי מת",
    "author": "פיטר ג'יימס",
    "rating": null
  },
  {
    "title": "למצוא אותן מתות",
    "author": "פיטר ג'יימס",
    "rating": null
  },
  {
    "title": "הפיתוי של בלוגרי",
    "author": "פיי ולדון",
    "rating": null
  },
  {
    "title": "קשר עין",
    "author": "קאמי מקגאוורן",
    "rating": null
  },
  {
    "title": "עיוורון שלגים",
    "author": "קן פולט",
    "rating": null
  },
  {
    "title": "צופן אפס",
    "author": "קן פולט",
    "rating": null
  },
  {
    "title": "פרש בלי ראש",
    "author": "קפטן תומאס מיין ריד",
    "rating": null
  },
  {
    "title": "לב של דיו",
    "author": "קרולינה פונקה",
    "rating": null
  },
  {
    "title": "הנערה בטופרי העיט",
    "author": "קרין סמירנוף",
    "rating": null
  },
  {
    "title": "האיש על החוף",
    "author": "קתרין סטדמן",
    "rating": null
  },
  {
    "title": "הראיות נגדה",
    "author": "רוב פורמן דיו",
    "rating": null
  },
  {
    "title": "זורקי הלהבות",
    "author": "רייצ'ל קושנר",
    "rating": null
  },
  {
    "title": "אהבה בדלתיים סגורות",
    "author": "רם אורן",
    "rating": null
  },
  {
    "title": "אהובי, אויבי",
    "author": "רם אורן",
    "rating": null
  },
  {
    "title": "אות קין",
    "author": "רם אורן",
    "rating": null
  },
  {
    "title": "אחות קטנה",
    "author": "רם אורן",
    "rating": null
  },
  {
    "title": "אש חיה",
    "author": "רם אורן",
    "rating": null
  },
  {
    "title": "אשרם",
    "author": "רם אורן",
    "rating": null
  },
  {
    "title": "בשידור חי",
    "author": "רם אורן",
    "rating": null
  },
  {
    "title": "היורשת",
    "author": "רם אורן",
    "rating": null
  },
  {
    "title": "המטרה: תל-אביב",
    "author": "רם אורן",
    "rating": null
  },
  {
    "title": "השבועה",
    "author": "רם אורן",
    "rating": null
  },
  {
    "title": "זהות כפולה",
    "author": "רם אורן",
    "rating": null
  },
  {
    "title": "חוה ואדם",
    "author": "רם אורן",
    "rating": null
  },
  {
    "title": "ילד אחד יותר מדי",
    "author": "רם אורן",
    "rating": null
  },
  {
    "title": "ימים אדומים",
    "author": "רם אורן",
    "rating": null
  },
  {
    "title": "כבשה שחורה",
    "author": "רם אורן",
    "rating": null
  },
  {
    "title": "כוח עליון",
    "author": "רם אורן",
    "rating": null
  },
  {
    "title": "לב",
    "author": "רם אורן",
    "rating": null
  },
  {
    "title": "לטרון",
    "author": "רם אורן",
    "rating": null
  },
  {
    "title": "משחק מכור",
    "author": "רם אורן",
    "rating": null
  },
  {
    "title": "נסיכה אפריקאית",
    "author": "רם אורן",
    "rating": null
  },
  {
    "title": "נפש הומיה",
    "author": "רם אורן",
    "rating": null
  },
  {
    "title": "סודות גלויים",
    "author": "רם אורן",
    "rating": null
  },
  {
    "title": "פיתוי",
    "author": "רם אורן",
    "rating": null
  },
  {
    "title": "דרך עלמה",
    "author": "שלומית גלבוע",
    "rating": null
  },
  {
    "title": "הפרטיה הגדולה",
    "author": "שלמה בלישה",
    "rating": null
  },
  {
    "title": "בלתי צפוי",
    "author": "שמואל ארגמן",
    "rating": null
  },
  {
    "title": "אגדת נדיה ונדב",
    "author": "שמואל פרץ",
    "rating": null
  },
  {
    "title": "כפור",
    "author": "שמעון אדף",
    "rating": null
  },
  {
    "title": "בחורים טובים",
    "author": "שרה אנג'ל",
    "rating": null
  },
  {
    "title": "מלאך או שטן",
    "author": "שרה אנג'ל",
    "rating": null
  },
  {
    "title": "שנת החתול",
    "author": "שרה אנג'ל",
    "rating": null
  },
  {
    "title": "סטילר",
    "author": "שרון חיון גינת",
    "rating": null
  },
  {
    "title": "חמש אצבעות על היעד 1",
    "author": "שרון צוהר",
    "rating": null
  },
  {
    "title": "תאיר",
    "author": "שרון רופא אופיר",
    "rating": null
  }
];
