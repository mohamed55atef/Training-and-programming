/**
 * قاعدة بيانات الوجبات السريعة - الجزء الأول
 */

// تصدير مصفوفة الوجبات السريعة
const fastFood1 = [
    {
        id: "ff-001",
        name: "برجر لحم",
        calories: 550,
        protein: 25,
        carbs: 40,
        fat: 35,
        serving: "ساندويتش واحد (250 جرام)",
        category: "fast-food",
        description: "ساندويتش برجر لحم بقري مع الخس والطماطم والبصل والجبن والصلصة."
    },
    {
        id: "ff-002",
        name: "برجر دجاج",
        calories: 450,
        protein: 28,
        carbs: 40,
        fat: 22,
        serving: "ساندويتش واحد (230 جرام)",
        category: "fast-food",
        description: "ساندويتش برجر دجاج مقرمش مع الخس والطماطم والمايونيز."
    },
    {
        id: "ff-003",
        name: "بطاطس مقلية",
        calories: 320,
        protein: 4,
        carbs: 42,
        fat: 17,
        serving: "وجبة متوسطة (150 جرام)",
        category: "fast-food",
        description: "بطاطس مقلية في الزيت، تقدم مع الكاتشب أو صلصة الجبن."
    },
    {
        id: "ff-004",
        name: "بيتزا مارجريتا",
        calories: 280,
        protein: 12,
        carbs: 35,
        fat: 10,
        serving: "شريحة واحدة (120 جرام)",
        category: "fast-food",
        description: "بيتزا بصلصة الطماطم وجبن الموزاريلا والريحان."
    },
    {
        id: "ff-005",
        name: "بيتزا بيبروني",
        calories: 320,
        protein: 14,
        carbs: 35,
        fat: 15,
        serving: "شريحة واحدة (120 جرام)",
        category: "fast-food",
        description: "بيتزا بصلصة الطماطم وجبن الموزاريلا وشرائح البيبروني."
    },
    {
        id: "ff-006",
        name: "بيتزا خضار",
        calories: 260,
        protein: 10,
        carbs: 35,
        fat: 9,
        serving: "شريحة واحدة (120 جرام)",
        category: "fast-food",
        description: "بيتزا بصلصة الطماطم وجبن الموزاريلا والخضروات المشكلة."
    },
    {
        id: "ff-007",
        name: "ناجتس دجاج",
        calories: 280,
        protein: 18,
        carbs: 15,
        fat: 18,
        serving: "6 قطع (120 جرام)",
        category: "fast-food",
        description: "قطع دجاج مغطاة بطبقة مقرمشة ومقلية، تقدم مع صلصات متنوعة."
    },
    {
        id: "ff-008",
        name: "أصابع موزاريلا",
        calories: 320,
        protein: 15,
        carbs: 20,
        fat: 22,
        serving: "5 قطع (120 جرام)",
        category: "fast-food",
        description: "أصابع جبن الموزاريلا المغطاة بالبقسماط والمقلية، تقدم مع صلصة المارينارا."
    },
    {
        id: "ff-009",
        name: "سندويتش فيليه دجاج",
        calories: 480,
        protein: 30,
        carbs: 45,
        fat: 20,
        serving: "ساندويتش واحد (250 جرام)",
        category: "fast-food",
        description: "ساندويتش دجاج مقرمش مع الخس والطماطم والمايونيز."
    },
    {
        id: "ff-010",
        name: "هوت دوج",
        calories: 350,
        protein: 15,
        carbs: 30,
        fat: 20,
        serving: "ساندويتش واحد (150 جرام)",
        category: "fast-food",
        description: "نقانق لحم في خبز طويل مع الخردل والكاتشب والبصل المحمر."
    }
];

// تصدير البيانات
window.fastFood1 = fastFood1;
