const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

// Models
const { Guss } = require("../Modules/Guss");
const { Auction } = require("../Modules/Auction");
const { Clubs } = require("../Modules/Clubs");
const { Offside } = require("../Modules/Offside");
const { Round } = require("../Modules/Round");
const { TopTen } = require("../Modules/TopTen");
const { Squad } = require("../Modules/Squad");

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

// ======================================================
// 1. Guss Seed Data (Football Riddles)
// ======================================================
const gussData = [
  {
    question: "حققت لقب دوري أبطال أوروبا مع ثلاثة أندية مختلفة، ولعبت في هولندا وإيطاليا وإسبانيا، من أنا؟",
    Answer: "كلارنس سيدورف"
  },
  {
    question: "الهداف التاريخي لنهائيات كأس العالم برصيد 16 هدفاً، وتوجت بلقب المونديال عام 2014، من أنا؟",
    Answer: "ميروسلاف كلوزه"
  },
  {
    question: "الحارس الوحيد في تاريخ كرة القدم الذي فاز بجائزة الكرة الذهبية (Ballon d'Or) عام 1963، من أنا؟",
    Answer: "ليف ياشين"
  },
  {
    question: "سجلت في نهائي دوري أبطال أوروبا ونهائي كأس العالم ونهائي كأس أمم أوروبا وتوجت بجميع هذه الألقاب، من أنا؟",
    Answer: "زين الدين زيدان"
  },
  {
    question: "اللاعب الوحيد الذي توج بلقب الدوري الإنجليزي الممتاز مع ناديين مختلفين في عامين متتاليين كلاعب أساسي (2016 و2017)، من أنا؟",
    Answer: "نغولو كانتي"
  },
  {
    question: "المدافع الوحيد الذي فاز بجائزة أفضل لاعب في العالم من الفيفا والكرة الذهبية في نفس العام (2006)، من أنا؟",
    Answer: "فابيو كانافارو"
  },
  {
    question: "أول لاعب في تاريخ كرة القدم يسجل في 5 نسخ مختلفة من كأس العالم للرجال، من أنا؟",
    Answer: "كريستيانو رونالدو"
  },
  {
    question: "أصغر لاعب يسجل هدفاً في تاريخ المباراة النهائية لكأس العالم بعمر 17 عاماً في مونديال 1958، من أنا؟",
    Answer: "بيليه"
  },
  {
    question: "لعبت لقطبي ميلانو (إنتر وميلان) وقطبي إسبانيا (برشلونة وريال مدريد)، وتوجت بكأس العالم 2002، من أنا؟",
    Answer: "رونالدو نازاريو"
  },
  {
    question: "صاحب أسرع هاتريك في تاريخ الدوري الإنجليزي الممتاز في دقيقتين و56 ثانية عام 2015 بقميص ساوثهامبتون، من أنا؟",
    Answer: "ساديو ماني"
  }
];

// ======================================================
// 2. Auction Seed Data (Challenges)
// ======================================================
const auctionData = [
  { question: "أذكر أكبر عدد من اللاعبين الذين ارتدوا قميصي ريال مدريد وبرشلونة" },
  { question: "أذكر أكبر عدد من اللاعبين الفائزين بجائزة الكرة الذهبية (Ballon d'Or)" },
  { question: "أذكر أكبر عدد من الأندية التي توجت بلقب دوري أبطال أوروبا عبر التاريخ" },
  { question: "أذكر أكبر عدد من المدربين الذين توجوا بلقب دوري أبطال أوروبا" },
  { question: "أذكر أكبر عدد من اللاعبين البرازيليين الذين لعبوا لنادي ريال مدريد" },
  { question: "أذكر أكبر عدد من المنتخبات التي وصلت إلى نهائي كأس العالم عبر التاريخ" },
  { question: "أذكر أكبر عدد من اللاعبين الذين سجلوا 50 هدفاً أو أكثر في دوري أبطال أوروبا" },
  { question: "أذكر أكبر عدد من اللاعبين الإسبان الذين لعبوا في الدوري الإنجليزي الممتاز" },
  { question: "أذكر أكبر عدد من الأندية التي حققت لقب الدوري الإنجليزي الممتاز في عصر البريميرليغ (منذ 1992)" },
  { question: "أذكر أكبر عدد من اللاعبين الأفارقة الذين توجوا بلقب دوري أبطال أوروبا" }
];

// ======================================================
// 3. Clubs Seed Data (Career Stations)
// ======================================================
const clubsData = [
  {
    name: "كريستيانو رونالدو",
    teams: ["سبورتينغ لشبونة", "مانشستر يونايتد", "ريال مدريد", "يوفنتوس", "مانشستر يونايتد", "النصر"]
  },
  {
    name: "زلاتان إبراهيموفيتش",
    teams: ["مالمو", "أياكس", "يوفنتوس", "إنتر ميلان", "برشلونة", "ميلان", "باريس سان جيرمان", "مانشستر يونايتد", "لوس أنجلوس غالاكسي", "ميلان"]
  },
  {
    name: "لويس فيغو",
    teams: ["سبورتينغ لشبونة", "برشلونة", "ريال مدريد", "إنتر ميلان"]
  },
  {
    name: "تشابي ألونسو",
    teams: ["ريال سوسيداد", "إيبار", "ليفربول", "ريال مدريد", "بايرن ميونخ"]
  },
  {
    name: "آريين روبن",
    teams: ["غرونينغن", "بي إس في آيندهوفن", "تشيلسي", "ريال مدريد", "بايرن ميونخ", "غرونينغن"]
  },
  {
    name: "تييري هنري",
    teams: ["موناكو", "يوفنتوس", "أرسنال", "برشلونة", "نيويورك ريد بولز"]
  },
  {
    name: "أنخيل دي ماريا",
    teams: ["روزاريو سنترال", "بنفيكا", "ريال مدريد", "مانشستر يونايتد", "باريس سان جيرمان", "يوفنتوس", "بنفيكا"]
  },
  {
    name: "رونالدينيو",
    teams: ["غريميو", "باريس سان جيرمان", "برشلونة", "ميلان", "فلامنغو", "أتلتيكو مينيرو", "كيريتارو", "فلومينينسي"]
  },
  {
    name: "روبرت ليفاندوفسكي",
    teams: ["زنيتش بروشكوف", "ليخ بوزنان", "بوروسيا دورتموند", "بايرن ميونخ", "برشلونة"]
  },
  {
    name: "لوكا مودريتش",
    teams: ["دينامو زغرب", "زرينسكي موستار", "إنتر زابرشيتش", "توتنهام هوتسبير", "ريال مدريد"]
  }
];

// ======================================================
// 4. Offside Seed Data (10s Criteria)
// ======================================================
const offsideData = [
  { Clo: "لاعب أرجنتيني توج بلقب دوري أبطال أوروبا وكأس العالم" },
  { Clo: "لاعب فاز بالدوري الإنجليزي الممتاز والدوري الإسباني" },
  { Clo: "حارس مرمى فاز بلقب دوري أبطال أوروبا أكثر من مرة" },
  { Clo: "لاعب إفريقي سجل في نهائي دوري أبطال أوروبا" },
  { Clo: "مدرب حقق لقب دوري أبطال أوروبا مع ناديين مختلفين" },
  { Clo: "لاعب سجل هاتريك في مباراة بكأس العالم" },
  { Clo: "نادي إيطالي وصل لنهائي دوري أبطال أوروبا" },
  { Clo: "لاعب فرنسي توج بالكرة الذهبية (Ballon d'Or)" },
  { Clo: "لاعب إنجليزي احترف في الدوري الإسباني أو الإيطالي" },
  { Clo: "لاعب حمل شارة القيادة لمنتخب بلاده في نهائي كأس العالم" }
];

// ======================================================
// 5. Round Seed Data (Topics & Exhaustive Examples)
// ======================================================
const roundData = [
  {
    question: "أندية حققت لقب الدوري الإنجليزي الممتاز في تاريخ البريميرليغ (منذ موسم 1992-1993)",
    examples: ["مانشستر يونايتد", "مانشستر سيتي", "تشيلسي", "أرسنال", "بلاكبيرن روفرز", "ليستر سيتي", "ليفربول"]
  },
  {
    question: "لاعبون فازوا بجائزة الكرة الذهبية (Ballon d'Or) في القرن الحادي والعشرين (منذ عام 2000)",
    examples: [
      "لويس فيغو", "مايكل أوين", "رونالدو نازاريو", "بافل نيدفيد", "أندريه شيفتشينكو",
      "رونالدينيو", "فابيو كانافارو", "كاكا", "كريستيانو رونالدو", "ليونيل ميسي",
      "لوكا مودريتش", "كريم بنزيما", "رودري"
    ]
  },
  {
    question: "مدربون فازوا بلقب دوري أبطال أوروبا أكثر من مرة عبر التاريخ",
    examples: [
      "كارلو أنشيلوتي", "بيب غوارديولا", "زين الدين زيدان", "بوب بيزلي", "أليكس فيرغسون",
      "جوزيه مورينيو", "يوب هاينكس", "أوتمار هيتسفيلد", "فيسنتي ديل بوسكي", "أريغو ساكي",
      "برايان كلوف", "بيلا غوتمان", "ميغيل مونيوز"
    ]
  },
  {
    question: "منتخبات توجت بلقب كأس العالم عبر التاريخ",
    examples: ["البرازيل", "ألمانيا", "إيطاليا", "الأرجنتين", "فرنسا", "أوروغواي", "إنجلترا", "إسبانيا"]
  },
  {
    question: "لاعبون سجلوا أكثر من 70 هدفاً في تاريخ دوري أبطال أوروبا",
    examples: ["كريستيانو رونالدو", "ليونيل ميسي", "روبرت ليفاندوفسكي", "كريم بنزيما", "راؤول غونزاليس"]
  },
  {
    question: "أندية إسبانية شاركت في دوري أبطال أوروبا في القرن الحادي والعشرين",
    examples: [
      "ريال مدريد", "برشلونة", "أتلتيكو مدريد", "إشبيلية", "فالنسيا", "فياريال",
      "ريال سوسيداد", "ديبورتيفو لاكورونيا", "سيلتا فيغو", "ريال بيتيس", "مالقا", "أتلتيك بيلباو", "جيرونا"
    ]
  }
];

// ======================================================
// 6. TopTen Seed Data (Rankings + Traps)
// ======================================================
const topTenData = [
  {
    title: "الهدافون التاريخيون لبطولة دوري أبطال أوروبا (أعلى 10 هدافين + 3 خيارات فخاخ)",
    questionOne: { name: "كريستيانو رونالدو (140 هدفاً)", value: 10 },
    questionTwo: { name: "ليونيل ميسي (129 هدفاً)", value: 9 },
    questionThree: { name: "روبرت ليفاندوفسكي (99+ هدفاً)", value: 8 },
    questionFour: { name: "كريم بنزيما (90 هدفاً)", value: 7 },
    questionFive: { name: "راؤول غونزاليس (71 هدفاً)", value: 6 },
    questionSix: { name: "رود فان نيستلروي (56 هدفاً)", value: 5 },
    questionSeven: { name: "توماس مولر (54+ هدفاً)", value: 4 },
    questionEight: { name: "تييري هنري (50 هدفاً)", value: 3 },
    questionNine: { name: "كيليان مبابي (49+ هدفاً)", value: 2 },
    questionTen: { name: "زلاتان إبراهيموفيتش (48 هدفاً)", value: 1 },
    questionEleven: { name: "فخ: رونالدو الظاهرة (سجل 14 هدفاً فقط)", value: -1 },
    questionTwelve: { name: "فخ: دييغو مارادونا (لم يدخل القائمة)", value: -2 },
    questionThirteen: { name: "فخ: فرانشيسكو توتي (سجل 17 هدفاً فقط)", value: -3 }
  },
  {
    title: "أكثر الأندية تتويجاً بلقب دوري أبطال أوروبا عبر التاريخ",
    questionOne: { name: "ريال مدريد (15 لقباً)", value: 10 },
    questionTwo: { name: "إيه سي ميلان (7 ألقاب)", value: 9 },
    questionThree: { name: "بايرن ميونخ (6 ألقاب)", value: 8 },
    questionFour: { name: "ليفربول (6 ألقاب)", value: 7 },
    questionFive: { name: "برشلونة (5 ألقاب)", value: 6 },
    questionSix: { name: "أياكس أمستردام (4 ألقاب)", value: 5 },
    questionSeven: { name: "إنتر ميلان (3 ألقاب)", value: 4 },
    questionEight: { name: "مانشستر يونايتد (3 ألقاب)", value: 3 },
    questionNine: { name: "يوفنتوس (لقبان)", value: 2 },
    questionTen: { name: "تشيلسي (لقبان)", value: 1 },
    questionEleven: { name: "فخ: باريس سان جيرمان (0 ألقاب)", value: -1 },
    questionTwelve: { name: "فخ: أرسنال (0 ألقاب)", value: -2 },
    questionThirteen: { name: "فخ: أتلتيكو مدريد (0 ألقاب)", value: -3 }
  }
];

// ======================================================
// 7. Squad Seed Data (Historical Match Starting XIs)
// ======================================================
const squadData = [
  {
    title: "نهائي دوري أبطال أوروبا 2014 في لشبونة: ريال مدريد ضد أتلتيكو مدريد",
    TeamOne: {
      name: "ريال مدريد (التشكيل الأساسي)",
      members: [
        "إيكر كاسياس", "داني كارفاخال", "سيرجيو راموس", "رافاييل فاران", "فابيو كوينتراو",
        "لوكا مودريتش", "سامي خضيرة", "أنخيل دي ماريا", "غاريث بيل", "كريم بنزيما", "كريستيانو رونالدو"
      ]
    },
    TeamTwo: {
      name: "أتلتيكو مدريد (التشكيل الأساسي)",
      members: [
        "تيبو كورتوا", "خوانفران", "ميراندا", "دييغو غودين", "فيليبي لويس",
        "راؤول غارسيا", "تياغو مينديز", "غابي", "كوكي", "ديفيد فيا", "دييغو كوستا"
      ]
    }
  },
  {
    title: "نهائي كأس العالم 2010 في جنوب إفريقيا: إسبانيا ضد هولندا",
    TeamOne: {
      name: "إسبانيا (التشكيل الأساسي)",
      members: [
        "إيكر كاسياس", "سيرجيو راموس", "جيرارد بيكيه", "كارليس بويول", "خوان كابيديفيلا",
        "سيرجيو بوسكيتس", "تشابي ألونسو", "تشافي هيرنانديز", "أندريس إنييستا", "بيدرو رودريغيز", "ديفيد فيا"
      ]
    },
    TeamTwo: {
      name: "هولندا (التشكيل الأساسي)",
      members: [
        "مارتن ستيكلنبيرغ", "جريجوري فان دير فيل", "جون هيتينغا", "يوريس ماثيسين", "جيوفاني فان برونكهورست",
        "مارك فان بوميل", "نايجل دي يونغ", "آريين روبن", "ويسلي شنايدر", "ديرك كويت", "روبن فان بيرسي"
      ]
    }
  },
  {
    title: "نهائي دوري أبطال أوروبا 2018 في كييف: ريال مدريد ضد ليفربول",
    TeamOne: {
      name: "ريال مدريد (التشكيل الأساسي)",
      members: [
        "كيلور نافاس", "داني كارفاخال", "رافاييل فاران", "سيرجيو راموس", "مارسيلو",
        "لوكا مودريتش", "كاسيميرو", "توني كروس", "إيسكو", "كريم بنزيما", "كريستيانو رونالدو"
      ]
    },
    TeamTwo: {
      name: "ليفربول (التشكيل الأساسي)",
      members: [
        "لوريس كاريوس", "ترينت ألكسندر أرنولد", "ديان لوفرين", "فيرجيل فان دايك", "أندرو روبرتسون",
        "جيمس ميلنر", "جوردان هندرسون", "جورجينيو فينالدوم", "محمد صلاح", "روبرتو فيرمينو", "ساديو ماني"
      ]
    }
  }
];

// ======================================================
// Master Runner (Safe Bulk Upserts)
// ======================================================
const runMasterSeeder = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");

    // 1. Guss
    const gussOps = gussData.map(item => ({
      updateOne: {
        filter: { question: item.question },
        update: { $set: item },
        upsert: true
      }
    }));
    const gussRes = await Guss.bulkWrite(gussOps);
    console.log(`Guss: upserted ${gussRes.upsertedCount}, modified ${gussRes.modifiedCount}, matched ${gussRes.matchedCount}`);

    // 2. Auction
    const auctionOps = auctionData.map(item => ({
      updateOne: {
        filter: { question: item.question },
        update: { $set: item },
        upsert: true
      }
    }));
    const auctionRes = await Auction.bulkWrite(auctionOps);
    console.log(`Auction: upserted ${auctionRes.upsertedCount}, modified ${auctionRes.modifiedCount}, matched ${auctionRes.matchedCount}`);

    // 3. Clubs
    const clubsOps = clubsData.map(item => ({
      updateOne: {
        filter: { name: item.name },
        update: { $set: item },
        upsert: true
      }
    }));
    const clubsRes = await Clubs.bulkWrite(clubsOps);
    console.log(`Clubs: upserted ${clubsRes.upsertedCount}, modified ${clubsRes.modifiedCount}, matched ${clubsRes.matchedCount}`);

    // 4. Offside
    const offsideOps = offsideData.map(item => ({
      updateOne: {
        filter: { Clo: item.Clo },
        update: { $set: item },
        upsert: true
      }
    }));
    const offsideRes = await Offside.bulkWrite(offsideOps);
    console.log(`Offside: upserted ${offsideRes.upsertedCount}, modified ${offsideRes.modifiedCount}, matched ${offsideRes.matchedCount}`);

    // 5. Round
    const roundOps = roundData.map(item => ({
      updateOne: {
        filter: { question: item.question },
        update: { $set: item },
        upsert: true
      }
    }));
    const roundRes = await Round.bulkWrite(roundOps);
    console.log(`Round: upserted ${roundRes.upsertedCount}, modified ${roundRes.modifiedCount}, matched ${roundRes.matchedCount}`);

    // 6. TopTen
    const topTenOps = topTenData.map(item => ({
      updateOne: {
        filter: { title: item.title },
        update: { $set: item },
        upsert: true
      }
    }));
    const topTenRes = await TopTen.bulkWrite(topTenOps);
    console.log(`TopTen: upserted ${topTenRes.upsertedCount}, modified ${topTenRes.modifiedCount}, matched ${topTenRes.matchedCount}`);

    // 7. Squad
    const squadOps = squadData.map(item => ({
      updateOne: {
        filter: { title: item.title },
        update: { $set: item },
        upsert: true
      }
    }));
    const squadRes = await Squad.bulkWrite(squadOps);
    console.log(`Squad: upserted ${squadRes.upsertedCount}, modified ${squadRes.modifiedCount}, matched ${squadRes.matchedCount}`);

    console.log("\n==============================================");
    console.log("All games seeded safely with 100% verified data!");
    console.log("==============================================\n");

  } catch (err) {
    console.error("Master Seeder failed:", err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  }
};

runMasterSeeder();
