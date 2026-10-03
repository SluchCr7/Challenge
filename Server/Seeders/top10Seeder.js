require('dotenv').config();

const mongoose = require('mongoose');
const { TopTen } = require('../Modules/TopTen');

const topTenData = [
    {
  title: "اكثر 13 لاعب سجلوا في الكلاسيكو",
  answers: [
    "ليونيل ميسي",
    "ألفريدو دي ستيفانو",
    "كريستيانو رونالدو",
    "كريم بنزيما",
    "راؤول",
    "سيزار رودريغيز",
    "باكو خينتو",
    "فيرينتس بوشكاش",
    "سانتيانا",
    "لويس سواريز",
    "هوجو سانشيز",
    "خوانيتو",
    "جوزيب ساميتيير"
  ]
    },
{
  title: "اكثر 13 لاعب سجلوا في ديربي مانشستر",
  answers: [
    "واين روني",
    "جو هايز",
    "فرانسيس لي",
    "سيرجيو أجويرو",
    "بوبي تشارلتون",
    "إيريك كانتونا",
    "إيرلينج هالاند",
    "جو سبينس",
    "برايان كيد",
    "كولين بيل",
    "دينيس فيوليت",
    "فيل فودين",
    "بول سكولز"
  ]
    },
    {
  title: "اخر 13 كابتن رفعوا كاس العالم",
  answers: [
    "رودري",
    "ليونيل ميسي",
    "هوغو لوريس",
    "فيليب لام",
    "إيكر كاسياس",
    "فابيو كانافارو",
    "كافو",
    "ديدييه ديشامب",
    "دونغا",
    "لوثار ماتيوس",
    "دييغو مارادونا",
    "دينو زوف",
    "دانييل باساريلا"
  ]
    },
{
  title: "اخر 13 كابتن رفعوا كاس دوري الابطال",
  answers: [
    "ماركينيوس",
    "ناتشو",
    "إلكاي غوندوغان",
    "كريم بنزيما",
    "سيزار أزبيليكويتا",
    "مانويل نوير",
    "جوردان هندرسون",
    "سيرجيو راموس",
    "تشافي هيرنانديز",
    "إيكر كاسياس",
    "فيليب لام",
    "فرانك لامبارد",
    "إريك أبيدال"
  ]
    },
{
  title: "اكثر 13 لاعب فاز ببطولات رسمية في التاريخ",
  answers: [
    "ليونيل ميسي",
    "ماركينيوس",
    "داني ألفيس",
    "حسام حسن",
    "حسام عاشور",
    "سيرجيو بوسكيتس",
    "أنخيل دي ماريا",
    "أندريس إنييستا",
    "جيرارد بيكيه",
    "دافيد ألابا",
    "كريم بنزيما",
    "توماس مولر",
    "ريان غيغز"
  ]
},
{
  title: "اكثر 13 لاعب تمثيلا لمنتخب بلادهم",
  answers: [
    "كريستيانو رونالدو",
    "ليونيل ميسي",
    "لوكا مودريتش",
    "بدر المطوع",
    "سوه تشين آن",
    "أحمد مبارك",
    "أحمد حسن",
    "حسن الهيدوس",
    "سيرجيو راموس",
    "أندريس جواردادو",
    "كلاوديو سواريز",
    "حسام حسن",
    "جيانلويجي بوفون"
  ]
},
{
  title: "اكثر 13 لاعب سجلوا اهدافا بالرأس",
  answers: [
    "جيمي ماكجروي",
    "كريستيانو رونالدو",
    "فريد روبرتس",
    "ماريو جارديل",
    "سانتيانا",
    "خارد بورجيتي",
    "ديكسي دين",
    "تيلمو زارا",
    "روبرت ليفاندوفسكي",
    "هاكان شوكور",
    "لوك دي يونج",
    "ألكسندر ميتروفيتش",
    "ساندور كوتشيس"
  ]
}
 
];


// =========================================================
// Build MongoDB document from the answers array
// =========================================================

const buildTopTen = (data) => {

    const questions = {};

    data.answers.forEach((name, index) => {

        const questionNumber = index + 1;

        let value;

        if (questionNumber <= 10) {
            value = questionNumber;
        } else {
            value = -(questionNumber - 10);
        }

        questions[`question${getNumberWord(questionNumber)}`] = {
            name,
            value
        };
    });

    return {
        title: data.title,
        ...questions
    };
};


// =========================================================
// Convert 1 -> One, 2 -> Two ...
// =========================================================

const getNumberWord = (number) => {

    const numbers = [
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six",
        "Seven",
        "Eight",
        "Nine",
        "Ten",
        "Eleven",
        "Twelve",
        "Thirteen"
    ];

    return numbers[number - 1];
};


// =========================================================
// Seeder
// =========================================================

const seedTopTen = async () => {

    try {

        if (!process.env.MONGO_URI) {
            throw new Error(
                "MONGO_URI is not defined in environment variables"
            );
        }

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected successfully");


        const documents = topTenData.map(buildTopTen);


        // Safe seeding:
        // لا نحذف أي بيانات موجودة
        // نحدث الموجود ونضيف الجديد

        const operations = documents.map((document) => ({

            updateOne: {

                filter: {
                    title: document.title
                },

                update: {
                    $set: document
                },

                upsert: true
            }

        }));


        const result = await TopTen.bulkWrite(operations);


        console.log("TopTen seeding completed");

        console.log({
            inserted: result.upsertedCount,
            updated: result.modifiedCount,
            matched: result.matchedCount
        });

    }

    catch (error) {

        console.error(
            "TopTen Seeder Error:",
            error.message
        );

    }

    finally {

        await mongoose.connection.close();

        console.log("MongoDB connection closed");

    }
};


seedTopTen();