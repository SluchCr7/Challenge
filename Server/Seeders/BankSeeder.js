const mongoose = require("mongoose");
const { Bank } = require("../Modules/Bank");

require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables");
}

const questions = [
    {
        question: "من هو مدرب مولودية الجزائر الذي رفع كاس دوري ابطال اوروبا بالفوز علي بايرن ميونخ",
        Answer: "ارتور جورج"
    },
    {
        question: "من هو مدرب منتخب مصر السابق الذي رفع كاس دوري ابطال اوروبا عام 1975 و 1976",
        Answer: "ديتمار كريمر"
    },
    {
        question: "زين الدين زيدان وبوب بيزلي و بيب جوارديولا حصلوا علي دوري ابطال اوروبا 3 مرات فمن هو الرابع",
        Answer: "لويس انريكي"
    },
    {
        question: "كارلو انشيلوتي فاز بكام دوري ابطال في مجمل مسيرته كلاعب ومدرب ",
        Answer: "7"
    },
    {
        question: " براين كلوف المدرب الانجليزي الاسطوري الذي فاز ب 2 دوري ابطال اوروبا مع نوتنجهام فروست ضد اي فريق حصد اول بطولة عام 1979 ",
        Answer: "مالمو"
    },
    
];
const seedBank = async () => {
    try {
        console.log("🔌 Connecting to MongoDB...");

        await mongoose.connect(MONGO_URI);

        console.log("✅ MongoDB connected");

        const result = await Bank.bulkWrite(
            questions.map((item) => ({
                updateOne: {
                    filter: {
                        question: item.question
                    },
                    update: {
                        $set: item
                    },
                    upsert: true
                }
            }))
        );

        console.log("=================================");
        console.log("⚽ Football Question Seeder");
        console.log("=================================");
        console.log(`📚 Questions: ${questions.length}`);
        console.log(`🆕 Inserted: ${result.upsertedCount}`);
        console.log(`🔄 Updated: ${result.modifiedCount}`);
        console.log("=================================");

    } catch (error) {

        console.error("❌ Seeder Error:");
        console.error(error);

    } finally {

        await mongoose.disconnect();

        console.log("🔌 MongoDB disconnected");
    }
};

seedBank();