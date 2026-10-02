const mongoose = require("mongoose");
const { Password } = require("./Modules/Password");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables");
}

const players = [
    // =========================
    // 🔴 الأهلي
    // =========================

    {
        name: "شريف إكرامي",
        Photo: [],
        keywords: ["مصر", "حارس مرمى سابق", "الأهلي"]
    },
    {
        name: "أحمد عادل عبد المنعم",
        Photo: [],
        keywords: ["مصر", "حارس مرمى سابق", "الأهلي"]
    },
    {
        name: "أمير عبد الحميد",
        Photo: [],
        keywords: ["مصر", "حارس مرمى سابق", "الأهلي"]
    },
    {
        name: "أحمد السيد",
        Photo: [],
        keywords: ["مصر", "مدافع سابق", "الأهلي"]
    },
    {
        name: "شريف عبد الفضيل",
        Photo: [],
        keywords: ["مصر", "مدافع سابق", "الأهلي"]
    },
    {
        name: "سعد سمير",
        Photo: [],
        keywords: ["مصر", "مدافع سابق", "الأهلي"]
    },
    {
        name: "رامي ربيعة",
        Photo: [],
        keywords: ["مصر", "مدافع", "الأهلي"]
    },
    {
        name: "محمد نجيب",
        Photo: [],
        keywords: ["مصر", "مدافع سابق", "الأهلي"]
    },
    {
        name: "سيد معوض",
        Photo: [],
        keywords: ["مصر", "ظهير أيسر سابق", "الأهلي"]
    },
    {
        name: "أحمد شديد قناوي",
        Photo: [],
        keywords: ["مصر", "ظهير أيسر سابق", "الأهلي"]
    },
    {
        name: "صبري رحيل",
        Photo: [],
        keywords: ["مصر", "ظهير أيسر سابق", "الأهلي"]
    },
    {
        name: "أحمد فتحي",
        Photo: [],
        keywords: ["مصر", "ظهير أيمن سابق", "الأهلي"]
    },
    {
        name: "محمد هاني",
        Photo: [],
        keywords: ["مصر", "ظهير أيمن", "الأهلي"]
    },
    {
        name: "حسام عاشور",
        Photo: [],
        keywords: ["مصر", "لاعب وسط سابق", "الأهلي"]
    },
    {
        name: "حسام غالي",
        Photo: [],
        keywords: ["مصر", "لاعب وسط سابق", "الأهلي"]
    },
    {
        name: "شهاب الدين أحمد",
        Photo: [],
        keywords: ["مصر", "لاعب وسط سابق", "الأهلي"]
    },
    {
        name: "أحمد نبيل مانجا",
        Photo: [],
        keywords: ["مصر", "لاعب وسط سابق", "الأهلي"]
    },
    {
        name: "مصطفى شبيطة",
        Photo: [],
        keywords: ["مصر", "لاعب وسط سابق", "الأهلي"]
    },
    {
        name: "حسام حسن",
        Photo: [],
        keywords: ["مصر", "مهاجم سابق", "الأهلي"]
    },
    {
        name: "محمد طلعت",
        Photo: [],
        keywords: ["مصر", "مهاجم سابق", "الأهلي"]
    },
    {
        name: "أسامة حسني",
        Photo: [],
        keywords: ["مصر", "مهاجم سابق", "الأهلي"]
    },
    {
        name: "محمد ناجي جدو",
        Photo: [],
        keywords: ["مصر", "مهاجم سابق", "الأهلي"]
    },
    {
        name: "عماد متعب",
        Photo: [],
        keywords: ["مصر", "مهاجم سابق", "الأهلي"]
    },
    {
        name: "عمرو جمال",
        Photo: [],
        keywords: ["مصر", "مهاجم سابق", "الأهلي"]
    },
    {
        name: "مؤمن زكريا",
        Photo: [],
        keywords: ["مصر", "جناح سابق", "الأهلي"]
    },
    {
        name: "رمضان صبحي",
        Photo: [],
        keywords: ["مصر", "جناح سابق", "الأهلي"]
    },
    {
        name: "عمرو السولية",
        Photo: [],
        keywords: ["مصر", "لاعب وسط", "الأهلي"]
    },
    {
        name: "عبد الله السعيد",
        Photo: [],
        keywords: ["مصر", "لاعب وسط سابق", "الأهلي"]
    },
    {
        name: "وليد سليمان",
        Photo: [],
        keywords: ["مصر", "جناح سابق", "الأهلي"]
    },
    {
        name: "حسين السيد",
        Photo: [],
        keywords: ["مصر", "ظهير أيسر سابق", "الأهلي"]
    },
    {
        name: "كريم نيدفيد",
        Photo: [],
        keywords: ["مصر", "لاعب وسط", "الأهلي"]
    },
    {
        name: "صالح جمعة",
        Photo: [],
        keywords: ["مصر", "لاعب وسط سابق", "الأهلي"]
    },
    {
        name: "أحمد الشيخ",
        Photo: [],
        keywords: ["مصر", "جناح سابق", "الأهلي"]
    },
    {
        name: "محمود وحيد",
        Photo: [],
        keywords: ["مصر", "ظهير أيسر سابق", "الأهلي"]
    },
    {
        name: "مروان محسن",
        Photo: [],
        keywords: ["مصر", "مهاجم سابق", "الأهلي"]
    },
    {
        name: "كهربا",
        Photo: [],
        keywords: ["مصر", "مهاجم", "الأهلي"]
    },
    {
        name: "حسين الشحات",
        Photo: [],
        keywords: ["مصر", "جناح", "الأهلي"]
    },
    {
        name: "محمد شريف",
        Photo: [],
        keywords: ["مصر", "مهاجم سابق", "الأهلي"]
    },
    {
        name: "أفشة",
        Photo: [],
        keywords: ["مصر", "لاعب وسط", "الأهلي"]
    },
    {
        name: "حمدي فتحي",
        Photo: [],
        keywords: ["مصر", "لاعب وسط سابق", "الأهلي"]
    },
    {
        name: "أليو ديانج",
        Photo: [],
        keywords: ["مالي", "لاعب وسط سابق", "الأهلي"]
    },
    {
        name: "علي معلول",
        Photo: [],
        keywords: ["تونس", "ظهير أيسر سابق", "الأهلي"]
    },
    {
        name: "جونيور أجايي",
        Photo: [],
        keywords: ["نيجيريا", "مهاجم سابق", "الأهلي"]
    },
    {
        name: "باكاماني ماهلامبي",
        Photo: [],
        keywords: ["جنوب أفريقيا", "جناح سابق", "الأهلي"]
    },
    {
        name: "فلافيو",
        Photo: [],
        keywords: ["أنغولا", "مهاجم سابق", "الأهلي"]
    },
    {
        name: "دومينيك دا سيلفا",
        Photo: [],
        keywords: ["موريتانيا", "مهاجم سابق", "الأهلي"]
    },
    {
        name: "سليمان كوليبالي",
        Photo: [],
        keywords: ["كوت ديفوار", "مهاجم سابق", "الأهلي"]
    },

    // =========================
    // ⚪ الزمالك
    // =========================

    {
        name: "عبد الواحد السيد",
        Photo: [],
        keywords: ["مصر", "حارس مرمى سابق", "الزمالك"]
    },
    {
        name: "محمود عبد الرحيم جنش",
        Photo: [],
        keywords: ["مصر", "حارس مرمى سابق", "الزمالك"]
    },
    {
        name: "أحمد الشناوي",
        Photo: [],
        keywords: ["مصر", "حارس مرمى سابق", "الزمالك"]
    },
    {
        name: "محمد أبو جبل",
        Photo: [],
        keywords: ["مصر", "حارس مرمى سابق", "الزمالك"]
    },
    {
        name: "عمر صلاح",
        Photo: [],
        keywords: ["مصر", "حارس مرمى سابق", "الزمالك"]
    },
    {
        name: "محمود علاء",
        Photo: [],
        keywords: ["مصر", "مدافع سابق", "الزمالك"]
    },
    {
        name: "إسلام جمال",
        Photo: [],
        keywords: ["مصر", "مدافع سابق", "الزمالك"]
    },
    {
        name: "علي جبر",
        Photo: [],
        keywords: ["مصر", "مدافع سابق", "الزمالك"]
    },
    {
        name: "محمد كوفي",
        Photo: [],
        keywords: ["بوركينا فاسو", "مدافع سابق", "الزمالك"]
    },
    {
        name: "حمادة طلبة",
        Photo: [],
        keywords: ["مصر", "مدافع سابق", "الزمالك"]
    },
    {
        name: "أحمد دويدار",
        Photo: [],
        keywords: ["مصر", "مدافع سابق", "الزمالك"]
    },
    {
        name: "عمر جابر",
        Photo: [],
        keywords: ["مصر", "ظهير سابق", "الزمالك"]
    },
    {
        name: "حازم إمام",
        Photo: [],
        keywords: ["مصر", "ظهير أيمن سابق", "الزمالك"]
    },
    {
        name: "أحمد سمير",
        Photo: [],
        keywords: ["مصر", "ظهير سابق", "الزمالك"]
    },
    {
        name: "محمد عبد الشافي",
        Photo: [],
        keywords: ["مصر", "ظهير أيسر سابق", "الزمالك"]
    },
    {
        name: "حمادة طلبة",
        Photo: [],
        keywords: ["مصر", "مدافع سابق", "الزمالك"]
    },
    {
        name: "إبراهيم صلاح",
        Photo: [],
        keywords: ["مصر", "لاعب وسط سابق", "الزمالك"]
    },
    {
        name: "أحمد توفيق",
        Photo: [],
        keywords: ["مصر", "لاعب وسط سابق", "الزمالك"]
    },
    {
        name: "نور السيد",
        Photo: [],
        keywords: ["مصر", "لاعب وسط سابق", "الزمالك"]
    },
    {
        name: "مؤمن زكريا",
        Photo: [],
        keywords: ["مصر", "جناح سابق", "الزمالك"]
    },
    {
        name: "أحمد عيد عبد الملك",
        Photo: [],
        keywords: ["مصر", "جناح سابق", "الزمالك"]
    },
    {
        name: "محمد إبراهيم",
        Photo: [],
        keywords: ["مصر", "لاعب وسط سابق", "الزمالك"]
    },
    {
        name: "أيمن حفني",
        Photo: [],
        keywords: ["مصر", "لاعب وسط سابق", "الزمالك"]
    },
    {
        name: "مصطفى فتحي",
        Photo: [],
        keywords: ["مصر", "جناح سابق", "الزمالك"]
    },
    {
        name: "طارق حامد",
        Photo: [],
        keywords: ["مصر", "لاعب وسط سابق", "الزمالك"]
    },
    {
        name: "فرجاني ساسي",
        Photo: [],
        keywords: ["تونس", "لاعب وسط سابق", "الزمالك"]
    },
    {
        name: "معروف يوسف",
        Photo: [],
        keywords: ["نيجيريا", "لاعب وسط سابق", "الزمالك"]
    },
    {
        name: "ستانلي أوهاويتشي",
        Photo: [],
        keywords: ["نيجيريا", "مهاجم سابق", "الزمالك"]
    },
    {
        name: "إيمانويل مايوكا",
        Photo: [],
        keywords: ["زامبيا", "مهاجم سابق", "الزمالك"]
    },
    {
        name: "باسم مرسي",
        Photo: [],
        keywords: ["مصر", "مهاجم سابق", "الزمالك"]
    },
    {
        name: "أحمد جعفر",
        Photo: [],
        keywords: ["مصر", "مهاجم سابق", "الزمالك"]
    },
    {
        name: "خالد قمر",
        Photo: [],
        keywords: ["مصر", "مهاجم سابق", "الزمالك"]
    },
    {
        name: "كهربا",
        Photo: [],
        keywords: ["مصر", "مهاجم سابق", "الزمالك"]
    },
    {
        name: "أوباما",
        Photo: [],
        keywords: ["مصر", "مهاجم", "الزمالك"]
    },
    {
        name: "مصطفى محمد",
        Photo: [],
        keywords: ["مصر", "مهاجم سابق", "الزمالك"]
    },
    {
        name: "أشرف بن شرقي",
        Photo: [],
        keywords: ["المغرب", "جناح سابق", "الزمالك"]
    },
    {
        name: "زيزو",
        Photo: [],
        keywords: ["مصر", "جناح سابق", "الزمالك"]
    },
    {
        name: "يوسف أوباما",
        Photo: [],
        keywords: ["مصر", "مهاجم سابق", "الزمالك"]
    },
    {
        name: "سيف الدين الجزيري",
        Photo: [],
        keywords: ["تونس", "مهاجم", "الزمالك"]
    },
    {
        name: "حمزة المثلوثي",
        Photo: [],
        keywords: ["تونس", "ظهير أيمن", "الزمالك"]
    },
    {
        name: "نبيل عماد دونجا",
        Photo: [],
        keywords: ["مصر", "لاعب وسط", "الزمالك"]
    },
    {
        name: "محمد أشرف روقا",
        Photo: [],
        keywords: ["مصر", "لاعب وسط سابق", "الزمالك"]
    },
    {
        name: "عمر السعيد",
        Photo: [],
        keywords: ["مصر", "مهاجم سابق", "الزمالك"]
    },
    {
        name: "كاسونجو كابونجو",
        Photo: [],
        keywords: ["الكونغو الديمقراطية", "مهاجم سابق", "الزمالك"]
    },
    {
        name: "رزاق سيسيه",
        Photo: [],
        keywords: ["كوت ديفوار", "جناح سابق", "الزمالك"]
    },
    {
        name: "محمد كاسونجو",
        Photo: [],
        keywords: ["الكونغو الديمقراطية", "مهاجم سابق", "الزمالك"]
    }
];
const seedPasswords = async () => {
    try {
        console.log("🔌 Connecting to MongoDB...");

        await mongoose.connect(MONGO_URI);

        console.log("✅ MongoDB connected");

        const result = await Password.bulkWrite(
            players.map((player) => ({
                updateOne: {
                    filter: {
                        name: player.name
                    },
                    update: {
                        $set: player
                    },
                    upsert: true
                }
            }))
        );

        console.log("=================================");
        console.log("✅ Password Seeder Completed");
        console.log(`👤 Players: ${players.length}`);
        console.log(`🆕 Inserted: ${result.upsertedCount}`);
        console.log(`🔄 Updated: ${result.modifiedCount}`);
        console.log("=================================");

    } catch (error) {
        console.error("❌ Password Seeder Error:");
        console.error(error);

    } finally {
        await mongoose.disconnect();
        console.log("🔌 MongoDB disconnected");
    }
};

seedPasswords();