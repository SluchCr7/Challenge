require('dotenv').config()
const mongoose = require('mongoose')

const { Squad } = require('../Modules/Squad') // عدّل المسار حسب مشروعك

const squads = [
    {
        title: "نهائي دوري أبطال أفريقيا 2016 - الإياب - الزمالك 1 × 0 صن داونز",
        TeamOne: {
            name: "الزمالك",
            members: [
                "محمود جنش",
                "أحمد دويدار",
                "علي جبر",
                "معروف يوسف",
                "رمزي خالد",
                "طارق حامد",
                "أحمد توفيق",
                "أيمن حفني",
                "مصطفى فتحي",
                "ستانلي أوهاويتشي",
                "باسم مرسي"
            ]
        },
        TeamTwo: {
            name: "صن داونز",
            members: [
                "دينيس أونيانغو",
                "ثابو نثيتي",
                "بانغالي سوماهورو",
                "تيبوغو لانغيرمان",
                "أسافيلا مبكيلي",
                "هلومفو كيكانا",
                "تياني مابودا",
                "بيرسي تاو",
                "كيغان دولي",
                "أنتوني لافور",
                "خاما بيليات"
            ]
        }
    },

    {
        title: "نهائي دوري أبطال أفريقيا 2017 - الإياب - الوداد 1 × 0 الأهلي",
        TeamOne: {
            name: "الوداد",
            members: [
                "زهير العروبي",
                "أمين عطوشي",
                "يوسف رابح",
                "بدر كدارين",
                "عبد اللطيف نصير",
                "صلاح الدين السعيدي",
                "إبراهيم النقاش",
                "وليد الكرتي",
                "أشرف بن شرقي",
                "إسماعيل الحداد",
                "عبد العظيم خضروف"
            ]
        },
        TeamTwo: {
            name: "الأهلي",
            members: [
                "شريف إكرامي",
                "رامي ربيعة",
                "سعد سمير",
                "حسين السيد",
                "أحمد فتحي",
                "محمد هاني",
                "عبد الله السعيد",
                "عمرو السولية",
                "جونيور أجايي",
                "مؤمن زكريا",
                "وليد أزارو"
            ]
        }
    },

    {
        title: "نهائي دوري أبطال أفريقيا 2018 - الإياب - الترجي 3 × 0 الأهلي",
        TeamOne: {
            name: "الترجي",
            members: [
                "معز بن شريفية",
                "خليل شمام",
                "محمد علي اليعقوبي",
                "فوسيني كوليبالي",
                "أيمن بن محمد",
                "سامح الدربالي",
                "غيلان الشعلالي",
                "سعد بقير",
                "يوسف البلايلي",
                "أنيس البدري",
                "طه ياسين الخنيسي"
            ]
        },
        TeamTwo: {
            name: "الأهلي",
            members: [
                "محمد الشناوي",
                "أيمن أشرف",
                "ساليف كوليبالي",
                "سعد سمير",
                "محمد هاني",
                "حسام عاشور",
                "عمرو السولية",
                "إسلام محارب",
                "محمد جابر",
                "وليد سليمان",
                "مروان محسن"
            ]
        }
    },

    {
        title: "نهائي دوري أبطال أفريقيا 2019 - الإياب - الترجي 1 × 0 الوداد",
        TeamOne: {
            name: "الترجي",
            members: [
                "رامي الجريدي",
                "خليل شمام",
                "محمد علي اليعقوبي",
                "فوسيني كوليبالي",
                "أيمن بن محمد",
                "سامح الدربالي",
                "فرانك كوم",
                "سعد بقير",
                "يوسف البلايلي",
                "أنيس البدري",
                "طه ياسين الخنيسي"
            ]
        },
        TeamTwo: {
            name: "الوداد",
            members: [
                "رضا التكناوتي",
                "أشرف داري",
                "محمد الناهيري",
                "أيوب العملود",
                "عبد اللطيف نصير",
                "يحيى جبران",
                "صلاح الدين السعيدي",
                "وليد الكرتي",
                "عبد الله الحسوني",
                "إسماعيل الحداد",
                "محمد أوناجم"
            ]
        }
    }
];

module.exports = squads;


// =====================================================
// SEED
// =====================================================

const seedSquads = async () => {

    try {

        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables")
        }

        await mongoose.connect(process.env.MONGO_URI)

        console.log("MongoDB connected")


        // Upsert بدل deleteMany
        // حتى لا نحذف أي بيانات موجودة في الـCollection

        const operations = squads.map((squad) => ({
            updateOne: {
                filter: {
                    title: squad.title
                },

                update: {
                    $set: squad
                },

                upsert: true
            }
        }))


        const result = await Squad.bulkWrite(operations)

        console.log("================================")
        console.log("Squads Seeder Finished")
        console.log("Inserted:", result.upsertedCount)
        console.log("Updated:", result.modifiedCount)
        console.log("Matched:", result.matchedCount)
        console.log("================================")

    } catch (error) {

        console.error("Seeder Error:", error.message)

    } finally {

        await mongoose.connection.close()

        console.log("MongoDB connection closed")
    }
}


seedSquads()