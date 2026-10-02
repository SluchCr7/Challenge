const mongoose = require("mongoose");
const { Resk } = require("./Modules/Resk");
require("dotenv").config();
// ======================================================
// MongoDB
// ======================================================

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables");
}

// ======================================================
// Resk Seed Data
// ======================================================

const resks = [
    {
    name: "فضيحة البرازيل 2014",

    Easy: {
        question: "من اللاعب الذي سجل هدف المانيا الاول امام البرازيل ",
        answer: "توماس مولر",
        value: 5
    },

    Medium: {
        question: "من لاعب الدفاع الذي غاب عن مبارة المانيا في نصف النهائي",
        answer: "تياجو سيلفا",
        value: 10
    },

    Hard: {
        question: "ما هو المصطلح الشعبي الذي أطلقه البرازيليون على هذه الهزيمة المذلة تخليداً لاسم ملعب المباراة واسم كارثة سابقة مشابهة؟",
        answer: "المينيريازاو",
        value: 20
    },

    Expert: {
        question: "من هو المدرب الذي خلف المدرب اسكولاري بعد البطولة",
        answer: "كارلوس دونغا",
        value: 40
    }
},

];
// ======================================================
// Seeder
// ======================================================

const seedResks = async () => {
    try {
        await mongoose.connect(MONGO_URI);

        console.log("MongoDB connected");
        console.log(`Seeding ${resks.length} categories...`);

        const operations = resks.map((resk) => ({
            updateOne: {
                filter: {
                    name: resk.name
                },

                update: {
                    $set: resk
                },

                upsert: true
            }
        }));

        const result = await Resk.bulkWrite(operations);

        console.log("=================================");
        console.log("Resk seeding completed successfully");
        console.log("=================================");

        console.log({
            categories: resks.length,
            inserted: result.upsertedCount,
            updated: result.modifiedCount,
            matched: result.matchedCount
        });

    } catch (error) {
        console.error("Resk seeding failed:");
        console.error(error);

        process.exitCode = 1;

    } finally {
        await mongoose.disconnect();
        console.log("MongoDB disconnected");
    }
};

seedResks();