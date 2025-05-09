/**
 * ملف بيانات تمارين الترايسبس
 * يحتوي على مجموعة من تمارين الترايسبس المختلفة
 */

// تهيئة كائن التطبيق إذا لم يكن موجوداً
window.workoutScheduleApp = window.workoutScheduleApp || {};
window.workoutScheduleApp.exerciseData = window.workoutScheduleApp.exerciseData || {};

// بيانات تمارين الترايسبس
window.workoutScheduleApp.exerciseData.tricepsExercises = [
    {
        "id": "triceps-001",
        "name": "ترايسبس بوش داون (Triceps Pushdown)",
        "muscle": "triceps",
        "equipment": "cable",
        "difficulty": "beginner",
        "description": "تمرين أساسي لعضلات الترايسبس. قف أمام جهاز الكيبل، أمسك المقبض، وادفعه لأسفل عن طريق مد المرفقين.",
        "instructions": [
            "قف أمام جهاز الكيبل مع إمساك المقبض بكلتا يديك",
            "اجعل مرفقيك بجانب جسمك وثنيهما بزاوية 90 درجة",
            "ادفع المقبض لأسفل حتى تمتد ذراعيك بالكامل",
            "اضغط على عضلات الترايسبس في نهاية الحركة",
            "أعد المقبض ببطء إلى وضع البداية"
        ],
        "tips": [
            "حافظ على ثبات الجزء العلوي من الجسم",
            "أبقِ مرفقيك بجانب جسمك طوال التمرين",
            "ركز على استخدام عضلات الترايسبس فقط"
        ]
    },
    {
        "id": "triceps-002",
        "name": "ترايسبس ديب (Triceps Dip)",
        "muscle": "triceps",
        "equipment": "bodyweight",
        "difficulty": "intermediate",
        "description": "تمرين لعضلات الترايسبس باستخدام وزن الجسم. استند على مقعدين أو جهاز الديب، وأنزل جسمك ثم ادفعه لأعلى.",
        "instructions": [
            "استند على مقعدين أو جهاز الديب مع وضع يديك على حافة المقعد",
            "مد ساقيك للأمام وارفع جسمك قليلاً عن الأرض",
            "أنزل جسمك عن طريق ثني مرفقيك حتى تصل إلى زاوية 90 درجة",
            "ادفع جسمك لأعلى حتى تمتد ذراعيك بالكامل",
            "كرر الحركة للعدد المطلوب من التكرارات"
        ],
        "tips": [
            "حافظ على قرب جسمك من المقعد",
            "تجنب ثني المرفقين بشكل مفرط",
            "للتمرين الأسهل، اثنِ ركبتيك بدلاً من مد الساقين"
        ]
    },
    {
        "id": "triceps-003",
        "name": "سكل كراشر (Skull Crusher)",
        "muscle": "triceps",
        "equipment": "barbell",
        "difficulty": "intermediate",
        "description": "تمرين لعضلات الترايسبس. استلقِ على مقعد مستوٍ، أمسك البار فوق رأسك، واثنِ مرفقيك لإنزال البار نحو جبهتك.",
        "instructions": [
            "استلقِ على مقعد مستوٍ مع وضع قدميك على الأرض",
            "أمسك البار بقبضة ضيقة وارفعه فوق صدرك مع مد ذراعيك",
            "اثنِ مرفقيك لإنزال البار نحو جبهتك",
            "توقف قبل أن يلمس البار جبهتك",
            "ارفع البار ببطء إلى وضع البداية عن طريق مد مرفقيك"
        ],
        "tips": [
            "حافظ على ثبات الجزء العلوي من الذراعين",
            "استخدم وزناً خفيفاً في البداية",
            "يمكن استخدام الدمبل أو البار EZ بدلاً من البار المستقيم"
        ]
    },
    {
        "id": "triceps-004",
        "name": "كلوز جريب بنش بريس (Close Grip Bench Press)",
        "muscle": "triceps",
        "equipment": "barbell",
        "difficulty": "intermediate",
        "description": "تمرين مركب لعضلات الترايسبس والصدر. استلقِ على مقعد مستوٍ، أمسك البار بقبضة ضيقة، وادفعه لأعلى.",
        "instructions": [
            "استلقِ على مقعد مستوٍ مع وضع قدميك على الأرض",
            "أمسك البار بقبضة ضيقة (أضيق من عرض الكتفين)",
            "ارفع البار من الحاملات وأنزله ببطء نحو منتصف الصدر",
            "ادفع البار لأعلى حتى تمتد ذراعيك بالكامل",
            "كرر الحركة للعدد المطلوب من التكرارات"
        ],
        "tips": [
            "حافظ على ثبات كتفيك على المقعد طوال التمرين",
            "ركز على استخدام عضلات الترايسبس للدفع",
            "تجنب تباعد المرفقين بشكل مفرط"
        ]
    },
    {
        "id": "triceps-005",
        "name": "ترايسبس كيك باك (Triceps Kickback)",
        "muscle": "triceps",
        "equipment": "dumbbell",
        "difficulty": "beginner",
        "description": "تمرين عزل لعضلات الترايسبس. انحنِ للأمام، اثنِ مرفقك بزاوية 90 درجة، ثم مد ذراعك للخلف.",
        "instructions": [
            "قف مع وضع قدم واحدة أمام الأخرى وانحنِ للأمام بزاوية 45 درجة",
            "أمسك دمبل في يد واحدة واسند المرفق بجانب جسمك",
            "اثنِ مرفقك بزاوية 90 درجة",
            "مد ذراعك للخلف حتى تصبح موازية للأرض",
            "اضغط على عضلة الترايسبس في نهاية الحركة",
            "أعد ذراعك ببطء إلى وضع البداية",
            "أكمل جميع التكرارات ثم بدل إلى الذراع الأخرى"
        ],
        "tips": [
            "حافظ على ثبات المرفق بجانب جسمك طوال التمرين",
            "تجنب استخدام قوة الدفع من الكتف",
            "استخدم وزناً خفيفاً للحفاظ على التقنية الصحيحة"
        ]
    }
];
