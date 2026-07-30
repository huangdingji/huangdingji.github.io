// Replace these two values with your real contact information before publishing.
const CONTACT_EMAIL = "fujianteflontape@gmail.com";
const WHATSAPP_NUMBER = "+852 6895 4159";
// Temporary Meta Pixel ID. Replace this with the real Pixel ID before running ads.
const TEMP_META_PIXEL_ID = "123456789012345";
const PRODUCTION_HOSTS = ["qzjy.store", "www.qzjy.store"];

function isProductionHost() {
  return typeof window !== "undefined" && PRODUCTION_HOSTS.includes(window.location.hostname);
}

function initMetaPixel() {
  if (!isProductionHost()) {
    console.info("[Meta Pixel] Disabled on non-production host:", window.location.hostname || window.location.protocol);
    return;
  }

  if (!TEMP_META_PIXEL_ID || TEMP_META_PIXEL_ID === "REPLACE_WITH_META_PIXEL_ID") return;
  if (typeof window.fbq === "function") return;

  (function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

  window.fbq("init", TEMP_META_PIXEL_ID);
  window.fbq("track", "PageView");
}

initMetaPixel();

const LANGUAGES = {
  en: "English",
  zh: "中文",
  ar: "العربية",
  es: "Español",
};

const EMPTY_TRANSLATIONS = {
  TRANSLATIONS: { zh: {}, es: {}, ar: {} },
  ATTRIBUTE_TRANSLATIONS: { zh: {}, es: {}, ar: {} },
  EXTRA_TRANSLATIONS: { zh: {}, es: {}, ar: {} },
};

let translationBundlePromise;

function getTranslationData() {
  return window.SiteTranslations || EMPTY_TRANSLATIONS;
}

function getTranslationBundleUrl() {
  const mainScript = document.querySelector('script[src*="assets/js/main.min.js"], script[src*="assets/js/main.js"]');
  return mainScript
    ? new URL('translations.min.js?v=20260726-perf2', mainScript.src).href
    : '/assets/js/translations.min.js?v=20260726-perf2';
}

function loadTranslationBundle() {
  if (window.SiteTranslations) return Promise.resolve();
  if (translationBundlePromise) return translationBundlePromise;

  translationBundlePromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = getTranslationBundleUrl();
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return translationBundlePromise;
}

function setSiteLanguage(lang) {
  const activeLang = LANGUAGES[lang] ? lang : 'en';
  localStorage.setItem('siteLanguage', activeLang);
  document.querySelectorAll('.language-select').forEach((select) => {
    select.value = activeLang;
  });

  if (activeLang === 'en') {
    applyLanguage(activeLang);
    return;
  }

  loadTranslationBundle()
    .then(() => applyLanguage(activeLang))
    .catch(() => {
      // Keep the English page usable if a non-essential language bundle fails.
      console.warn('[Language] Translation bundle could not be loaded.');
      localStorage.setItem('siteLanguage', 'en');
      document.querySelectorAll('.language-select').forEach((select) => {
        select.value = 'en';
      });
      applyLanguage('en');
    });
}

function getTranslation(lang, text) {
  if (lang === "en") return text;
  const { EXTRA_TRANSLATIONS, TRANSLATIONS } = getTranslationData();
  const extra = EXTRA_TRANSLATIONS[lang]?.[text];
  if (extra) return extra;
  const direct = TRANSLATIONS[lang]?.[text];
  if (direct) return direct;

  const productNames = {
    "standard PTFE thread seal tape": {
      zh: "标准 PTFE 螺纹密封带",
      es: "cinta selladora PTFE estándar",
      ar: "شريط PTFE قياسي لإحكام القلاوظ",
    },
    "yellow gas PTFE tape": {
      zh: "黄色燃气 PTFE 生料带",
      es: "cinta PTFE amarilla para gas",
      ar: "شريط PTFE أصفر للغاز",
    },
    "high density PTFE tape": {
      zh: "高密度 PTFE 生料带",
      es: "cinta PTFE de alta densidad",
      ar: "شريط PTFE عالي الكثافة",
    },
    "OEM PTFE tape": {
      zh: "OEM PTFE 生料带",
      es: "cinta PTFE OEM",
      ar: "شريط PTFE OEM",
    },
    "plumbing seal tape": {
      zh: "水暖密封带",
      es: "cinta selladora para plomería",
      ar: "شريط إحكام السباكة",
        "Color: White, yellow, blue, pink, red, green, black or customized": "اللون: أبيض، أصفر، أزرق، وردي، أحمر، أخضر، أسود أو مخصص",
    "FuJianTeflonTape": "FuJianTeflonTape",
    "Length: 1m / 4m / 6m / 10m / 14m / 15m / 20m / 30m": "الطول: 1 م / 4 م / 6 م / 10 م / 14 م / 15 م / 20 م / 30 م",
    "Net tape weight: 1g": "الوزن الصافي للشريط: 1 جم",
    "Net tape weight: 2g": "الوزن الصافي للشريط: 2 جم",
    "Net tape weight: 2.5g": "الوزن الصافي للشريط: 2.5 جم",
    "Net tape weight: 3g": "الوزن الصافي للشريط: 3 جم",
    "Net tape weight: 4g": "الوزن الصافي للشريط: 4 جم",
    "Net tape weight: 6g": "الوزن الصافي للشريط: 6 جم",
    "Net tape weight: 6.5g": "الوزن الصافي للشريط: 6.5 جم",
    "Net tape weight: 8g": "الوزن الصافي للشريط: 8 جم",
    "Net tape weight: 15g": "الوزن الصافي للشريط: 15 جم",
    "Net tape weight: 20g": "الوزن الصافي للشريط: 20 جم",
    "Net tape weight: 50g": "الوزن الصافي للشريط: 50 جم",
    "PTFE Tape Products | Plumber Tape Wholesale Supplier": "منتجات شريط PTFE | مورد بالجملة لشريط السباكة",
    "Packaging: Spool, individual wrap, bag, carton, display box, custom label": "التغليف: بكرة، غلاف فردي، كيس، كرتون، صندوق عرض، ملصق مخصص",
    "Packing: 100 rolls/bag": "التعبئة: 100 لفة/كيس",
    "Packing: 100 rolls/carton": "التعبئة: 100 لفة/كرتون",
    "Packing: 1000 rolls/carton": "التعبئة: 1000 لفة/كرتون",
    "Packing: 5000 rolls/bag": "التعبئة: 5000 لفة/كيس",
    "Packing: 5000 rolls/carton": "التعبئة: 5000 لفة/كرتون",
    "Thickness: 0.04mm / 0.075mm / 0.08mm / 0.1mm / 0.15mm / 0.2mm": "السماكة: 0.04 مم / 0.075 مم / 0.08 مم / 0.1 مم / 0.15 مم / 0.2 مم",
    "Width: 12mm / 14mm / 17mm / 18mm / 19mm / 20mm / 30mm / 50mm or customized": "العرض: 12 مم / 14 مم / 17 مم / 18 مم / 19 مم / 20 مم / 30 مم / 50 مم أو مخصص",
      "Color: White, yellow, blue, pink, red, green, black or customized": "اللون: أبيض، أصفر، أزرق، وردي، أحمر، أخضر، أسود أو مخصص",
      "PTFE Thread Seal Tape Supplier in India": "مورد شريط إحكام القلاوظ PTFE في الهند",
    "PTFE thread seal tape for India wholesale, hardware, and OEM markets. HS code 3920.99, BIS standards reference, Nhava Sheva and Mundra ports, import duty and GST. Direct factory quotation from China.": "شريط إحكام قلاوظ PTFE لأسواق الجملة والأجهزة والمنتجات الأصلية في الهند. رمز النظام المنسق 3920.99، مرجع معايير BIS، ميناءي نهافا شيفا وموندرا، رسوم الاستيراد وضريبة GST. عرض أسعار مباشر من المصنع في الصين.",
      "Standard PTFE Tape Is Sufficient for Most Hot Water": "شريط PTFE القياسي كافٍ لمعظم تطبيقات الماء الساخن",
    "When to Upgrade to a Higher-Density Tape": "متى يجب الترقية إلى شريط أعلى كثافة",
    "Avoiding Common Hot Water Failure Modes": "تجنب أعطال الماء الساخن الشائعة",
    "Hot Water Compatibility with Other Materials": "توافق الماء الساخن مع المواد الأخرى",
    "Best Practices for Hot Water Applications": "أفضل الممارسات لتطبيقات الماء الساخن",
    "Can I use white plumber tape on hot water lines?": "هل يمكنني استخدام شريط السباكة الأبيض على خطوط الماء الساخن؟",
    "What tape should I use for solar water heating?": "أي شريط أستخدم لتسخين المياه بالطاقة الشمسية؟",
    "Does PTFE tape work on PEX fittings?": "هل يعمل شريط PTFE على تجهيزات PEX؟",
    "How many turns of tape should I wrap on a hot water joint?": "كم لفة من الشريط يجب أن أضع على وصلة الماء الساخن؟",
    "Performance Comparison": "مقارنة الأداء",
    "When to Use Each": "متى تستخدم كل واحد",
    "White PTFE Tape — General Purpose Plumbing": "شريط PTFE أبيض — سباكة عامة",
    "Yellow PTFE Tape — Gas Line and Propane": "شريط PTFE أصفر — خط الغاز والبروبان",
    "Green PTFE Tape — Oxygen and Oil-Resistant Lines": "شريط PTFE أخضر — أنابيب الأكسين والمقاومة للزيت",
    "Red PTFE Tape — High Temperature and Industrial": "شريط PTFE أحمر — درجة حرارة عالية وصناعي",
    "Pink PTFE Tape — Potable Water and Food Grade": "شريط PTFE وردي — ماء صالح للشرب ودرجة غذائية",
    "Blue PTFE Tape — Industrial and Custom OEM": "شريط PTFE أزرق — صناعي و OEM مخصص",
    "Black PTFE Tape — Heavy Duty and Engineering": "شريط PTFE أسود — ثقيل وهندسي",
    "How to Plan a Color Mix for Your Market": "كيف تخطط لمزيج ألوان لسوقك",
    "FAQ": "الأسئلة الشائعة",
    "Does the color of PTFE tape change its chemical properties?": "هل يغير لون شريط PTFE خصائصه الكيميائية؟",
    "Can I use white PTFE tape on a gas line?": "هل يمكنني استخدام شريط PTFE أبيض على خط غاز؟",
    "Is pink PTFE tape the same as NSF certified tape?": "هل شريط PTFE الوردي هو نفسه الشريط المعتمد من NSF؟",
    "Which color is best for OEM private label?": "أي لون أفضل للعلامة الخاصة OEM؟",
    "Color Coding": "ترميز الألوان",
    "What is PTFE tape?": "ما هو شريط PTFE؟",
    "Why tape density matters": "لماذا كثافة الشريط مهمة",
    "Common density confusion": "الارتباك الشائع حول الكثافة",
    "Common Misconceptions About PTFE Tape": "المفاهيم الخاطئة الشائعة حول شريط PTFE",
    "Material Grades and Quality Indicators": "درجات المواد ومؤشرات الجودة",
    "Are PTFE tape and Teflon tape the same?": "هل شريط PTFE وشريط تفلون متماثلان؟",
    "Why is Teflon tape more expensive?": "لماذا شريط تفلون أغلى؟",
    "Can I relabel generic PTFE tape as Teflon?": "هل يمكنني إعادة تسمية شريط PTFE العام كتفلون؟",
    "Is generic PTFE tape lower quality?": "هل شريط PTFE العام أقل جودة؟",
    "Manufacturing Process Overview": "نظرة عامة على عملية التصنيع",
    "The Chemistry of PTFE": "كيمياء PTFE",
    "Where PTFE Tape Is Used": "أين يُستخدم شريط PTFE",
    "The Future of Thread Seal Materials": "مستقبل مواد إحكام القلاوظ",
    "Standard Density (0.3-0.4 g/cm³)": "الكثافة القياسية (0.3-0.4 جم/سم³)",
    "High Density (0.4-0.5 g/cm³)": "كثافة عالية (0.4-0.5 جم/سم³)",
    "Gas-Rated Density (0.8-1.0 g/cm³)": "كثافة مخصصة للغاز (0.8-1.0 جم/سم³)",
    "How to Test Density at Home": "كيف تختبر الكثافة في المنزل",
    "What Buyers Should Confirm Before Ordering": "ما يجب على المشترين التأكد منه قبل الطلب",
    "Important Safety Note": "ملاحظة سلامة مهمة",
    "Is PTFE tape safe for drinking water?": "هل شريط PTFE آمن لمياه الشرب؟",
    "What is the best tape for stainless steel threads?": "ما أفضل شريط لقلاوظ الستانلس ستيل؟",
    "How do I store PTFE tape for maximum shelf life?": "كيف أخزن شريط PTFE لأقصى مدة صلاحية؟",
    "Can PTFE tape freeze or become brittle in cold weather?": "هل يمكن أن يتجمد شريط PTFE أو يصبح هشاً في الطقس البارد؟",
    "Step-by-Step Application": "التطبيق خطوة بخطوة",
    "Common Mistakes to Avoid": "الأخطاء الشائعة التي يجب تجنبها",
    "How to apply PTFE tape on a tapered thread": "كيفية وضع شريط PTFE على قلاووط مخروطي",
    "How to apply PTFE tape on a parallel thread": "كيفية وضع شريط PTFE على قلاووط متوازي",
    "Should I use tape or paste on compression fittings?": "هل أستخدم شريطاً أم معجوناً على تجهيزات الضغط؟",
    "How do I know if a joint is properly sealed?": "كيف أعرف أن الوصلة مغلقة بإحكام؟",
    "What is the standard thickness for PTFE thread seal tape?": "ما هي السماكة القياسية لشريط إحكام PTFE؟",
    "Does thicker tape always seal better?": "هل الشريط الأسمك دائماً يغلق بشكل أفضل؟",
    "Is 0.1 mm PTFE tape suitable for hot water lines?": "هل شريط PTFE بسمك 0.1 مم مناسب لخطوط الماء الساخن؟",
    "Can thin PTFE tape be used for gas?": "هل يمكن استخدام شريط PTFE الرفيع للغاز؟",
    "Is PTFE tape better than pipe dope?": "هل شريط PTFE أفضل من معجون الأنابيب؟",
    "Can I use PTFE tape and pipe dope together?": "هل يمكنني استخدام شريط PTFE ومعجون الأنابيب معاً؟",
    "Which sealant is more reliable for water lines?": "أي مانع تسرب أكثر موثوقية لخطوط المياه؟",
    "Which sealant is better for gas lines?": "أي مانع تسرب أفضل لخطوط الغاز؟",
    "What is the difference between PTFE tape and anaerobic sealant?": "ما الفرق بين شريط PTFE ومانع التسرب اللاهوائي؟",
    "Industry Standards and Tolerance": "معايير الصناعة والتسامح",
    "How Density Affects Sealing Performance": "كيف تؤثر الكثافة على أداء الإحكام",
    "Recommended Specifications by Application": "المواصفات الموصى بها حسب التطبيق",
    "Tolerance and Quality Control": "التسامح ومراقبة الجودة",
    "Choosing the Right Thickness": "اختيار السماكة المناسبة",
    "Frequently Asked Questions: PTFE Tape Thickness": "الأسئلة الشائعة: سماكة شريط PTFE",
    "How density affects sealing": "كيف تؤثر الكثافة على الإحكام",
    "How thickness affects fit": "كيف تؤثر السماكة على التركيب",
    "Why density matters more than thickness": "لماذا الكثافة أهم من السماكة",
    "PTFE Tape vs Thread Sealant Paste": "شريط PTFE مقابل معجون إحكام القلاوظ",
    "How Thread Sealants Work": "كيف تعمل مانعات تسرب القلاوظ",
    "Key Differences at a Glance": "الفروق الرئيسية بنظرة سريعة",
    "When to Choose Tape vs Paste": "متى تختار الشريط مقابل المعجون",
    "Pipe Dope vs Tape: Quick Answer": "معجون الأنابيب مقابل الشريط: إجابة سريعة",
    "The Five Best Applications for Pipe Dope": "أفضل خمسة تطبيقات لمعجون الأنابيب",
    "Five Situations Where PTFE Tape Wins": "خمس حالات يتفوق فيها شريط PTFE",
    "When Not to Mix Tape and Paste": "متى لا تخلط الشريط والمعجون",
    "Temperature Range and Performance": "نطاق درجة الحرارة والأداء",
    "Maximum Operating Temperature": "درجة حرارة التشغيل القصوى",
    "Minimum Operating Temperature": "درجة حرارة التشغيل الدنيا",
    "Chemical Resistance by Fluid": "المقاومة الكيميائية حسب السائل",
    "Comparing PTFE Tape to Other Sealing Methods": "مقارنة شريط PTFE بطرق الإحكام الأخرى",
    "What Buyers Should Confirm for Temperature-Sensitive Applications": "ما يجب على المشترين التأكد منه للتطبيقات الحساسة للحرارة",
    "Why shelf life matters for B2B": "لماذا مدة الصلاحية مهمة في B2B",
    "How to read the batch number": "كيف تقرأ رقم الدفعة",
    "Storage conditions that extend shelf life": "ظروف التخزين التي تطيل العمر الافتراضي",
    "How to spot expired tape before it fails": "كيف تكتشف الشريط منتهي الصلاحية قبل فشله",
    "Recyclable and Reusable?": "قابل لإعادة التدوير وإعادة الاستخدام؟",
    "What Buyers Should Confirm for Bulk Storage": "ما يجب على المشترين التأكد منه للتخزين بالجملة",
    "Shelf Life and Storage Conditions": "مدة الصلاحية وظروف التخزين",
    "What is the standard width for PTFE tape?": "ما هو العرض القياسي لشريط PTFE؟",
    "Can I use 12mm tape on 1-inch pipe?": "هل يمكنني استخدام شريط 12 مم على أنبوب 1 بوصة؟",
    "What is the best tape width for gas lines?": "ما أفضل عرض للشريط لخطوط الغاز؟",
    "Is wider tape always better?": "هل الشريط الأعرض دائماً أفضل؟",
    "Width and Length Combinations": "تركيبات العرض والطول",
    "Standard Thickness Grades": "درجات السماكة القياسية",
    "Common Industries and Applications": "الصناعات والتطبيقات الشائعة",
    "Important Notice for Gas Applications": "إشعار مهم لتطبيقات الغاز",
    "The Material Science Behind Gas-Rated Tape": "علم المواد وراء شريط الغاز",
    "Choosing the Correct Density for Gas": "اختيار الكثافة الصحيحة للغاز",
    "Gas Code Requirements by Market": "متطلبات كود الغاز حسب السوق",
    "Safety Considerations and Best Practices": "اعتبارات السلامة وأفضل الممارسات",
    "Frequently Asked Questions: Gas PTFE Tape": "الأسئلة الشائعة: شريط PTFE للغاز",
    "What density should PTFE tape have for gas lines?": "ما الكثافة التي يجب أن يكون عليها شريط PTFE لخطوط الغاز؟",
    "Is yellow PTFE tape required by code for natural gas?": "هل شريط PTFE الأصفر مطلوب بموجب الكود للغاز الطبيعي؟",
    "Can I use white PTFE tape for propane gas fittings?": "هل يمكنني استخدام شريط PTFE أبيض لتجهيزات غاز البروبان؟",
    "What's the difference between gas tape and standard plumber tape?": "ما الفرق بين شريط الغاز وشريط السباكة القياسي؟",
    "How many wraps of gas PTFE tape are recommended?": "كم لفة من شريط PTFE للغاز موصى بها؟",
    "Best for cold water residential plumbing": "الأفضل لسباكة المياه الباردة السكنية",
    "Common installation mistakes on cold water lines": "أخطاء التركيب الشائعة على خطوط الماء البارد",
    "Compatibility with copper, PEX and PVC": "التوافق مع النحاس و PEX و PVC",
    "Storage and shelf life considerations": "اعتبارات التخزين ومدة الصلاحية",
    "When to choose a different tape": "متى تختار شريطاً مختلفاً",
    "How many times should I wrap PTFE tape around a pipe thread?": "كم مرة يجب أن ألف شريط PTFE حول قلاووط الأنبوب؟",
    "Which direction do I wrap PTFE tape on threads?": "في أي اتجاه ألف شريط PTFE على القلاوظ؟",
    "Should PTFE tape go on male or female threads?": "هل يوضع شريط PTFE على القلاوظ الذكري أم الأنثوي؟",
    "Can I use PTFE tape on compression fittings?": "هل يمكنني استخدام شريط PTFE على تجهيزات الضغط؟",
    "What should I do if a fitting still leaks after using PTFE tape?": "ماذا أفعل إذا كان التجهيز لا يزال يتسرب بعد استخدام شريط PTFE؟",
    "Choosing the Right Density for Your Application": "اختيار الكثافة المناسبة لتطبيقك",
    "Standard vs High-Density: When to Upgrade": "قياسي مقابل عالي الكثافة: متى تتم الترقية",
    "Comparison with Alternative Sealing Methods": "المقارنة مع طرق الإحكام البديلة",
    "Pillar Guide": "الدليل الأساسي",
    "Understanding the Three Core Properties": "فهم الخصائص الأساسية الثلاث",
    "Reading the Specification Table": "قراءة جدول المواصفات",
    "Selecting the Right Product Form": "اختيار الشكل المناسب للمنتج",
    "A 5-minute decision framework": "إطار قرار في 5 دقائق",
    "How to Plan Your First Order": "كيف تخطط لطلبك الأول",
    "How to Choose PTFE Tape: A B2B Buyer's Framework": "كيف تختار شريط PTFE: إطار لمشتري B2B",
    "The 4 decision filters": "مرشحات القرار الأربعة",
    "By application": "حسب التطبيق",
    "By market and certification": "حسب السوق والشهادات",
    "By packaging and supply chain": "حسب التغليف وسلسلة التوريد",
    "Custom items": "عناصر مخصصة",
    "Artwork": "التصميم",
    "Density": "الكثافة",
    "Length": "الطول",
    "Packing": "التعبئة",
    "Delivery": "التسليم",
    "HS code:": "رمز النظام المنسق:",
    "Temperature": "درجة الحرارة",
    "How to order": "كيف تطلب",
    "What is the difference between yellow gas PTFE tape and white plumber tape?": "ما الفرق بين شريط PTFE الأصفر للغاز وشريط السباكة الأبيض؟",
    "Why is gas PTFE tape thicker and denser?": "لماذا شريط PTFE للغاز أسمك وأكثر كثافة؟",
    "Can gas PTFE tape be used on water lines?": "هل يمكن استخدام شريط PTFE للغاز على خطوط المياه؟",
    "How do I know if a gas line is properly sealed?": "كيف أعرف أن خط الغاز مغلق بإحكام؟",
    "What density and thickness should I use for natural gas?": "ما الكثافة والسماكة التي يجب أن أستخدمها للغاز الطبيعي؟",
    "What industries use high-density PTFE tape?": "ما الصناعات التي تستخدم شريط PTFE عالي الكثافة؟",
    "How is high-density tape different from standard tape?": "كيف يختلف الشريط عالي الكثافة عن الشريط القياسي؟",
    "When should I use high-density tape instead of standard?": "متى يجب أن أستخدم شريط عالي الكثافة بدلاً من القياسي؟",
    "Can high-density PTFE tape be used for gas?": "هل يمكن استخدام شريط PTFE عالي الكثافة للغاز؟",
    "What density and thickness are best for hot water?": "ما أفضل كثافة وسماكة للماء الساخن؟",
    "What density and thickness are best for cold water?": "ما أفضل كثافة وسماكة للماء البارد؟",
    "Can I use PTFE tape on fuel lines?": "هل يمكنني استخدام شريط PTFE على خطوط الوقود؟",
    "What colors are available for PTFE tape?": "ما الألوان المتاحة لشريط PTFE؟",
    "What is the standard length of a PTFE tape roll?": "ما الطول القياسي لفة شريط PTFE؟",
    "What is the standard width of a PTFE tape roll?": "ما العرض القياسي لفة شريط PTFE؟",
    "What is the standard thickness of a PTFE tape roll?": "ما السماكة القياسية لفة شريط PTFE؟",
    "What is the shelf life of PTFE tape?": "ما هي مدة صلاحية شريط PTFE؟",
    "What is the temperature range of PTFE tape?": "ما هو نطاق درجة حرارة شريط PTFE؟",
    "What is the density of PTFE tape?": "ما هي كثافة شريط PTFE؟",
    "What is the weight of a PTFE tape roll?": "ما وزن لفة شريط PTFE؟",
    "What is the HS code for PTFE tape?": "ما هو رمز النظام المنسق لشريط PTFE؟",
    "What is the minimum order quantity for PTFE tape?": "ما هي الحد الأدنى لكمية الطلب لشريط PTFE؟",
    "What is the lead time for PTFE tape orders?": "ما هي مدة التسليم لطلبات شريط PTFE؟",
    "What is the payment term for PTFE tape?": "ما هي شروط الدفع لشريط PTFE؟",
    "What is the packaging method for PTFE tape?": "ما هي طريقة تعبئة شريط PTFE؟",
    "What is the warranty for PTFE tape?": "ما هي ضمانة شريط PTFE؟",
    "What is the return policy for PTFE tape?": "ما هي سياسة إرجاع شريط PTFE؟",
    "What is the shipping method for PTFE tape?": "ما هي طريقة شحن شريط PTFE؟",
    "What is the sample policy for PTFE tape?": "ما هي سياسة العينات لشريط PTFE؟",
    "What is the OEM/ODM service for PTFE tape?": "ما هي خدمة OEM/ODM لشريط PTFE؟",
    "What is the factory production capacity for PTFE tape?": "ما هي الطاقة الإنتاجية للمصنع لشريط PTFE؟",
    "What is the certification for PTFE tape?": "ما هي شهادة شريط PTFE؟",
    "What is the material composition of PTFE tape?": "ما هي تركيبة مادة شريط PTFE؟",
    "What is the application method for PTFE tape?": "ما هي طريقة استخدام شريط PTFE؟",
    "What is the safety standard for PTFE tape?": "ما هو معيار السلامة لشريط PTFE؟",
    "What is the storage condition for PTFE tape?": "ما هي ظروف تخزين شريط PTFE؟",
    "What is the quality control process for PTFE tape?": "ما هي عملية مراقبة الجودة لشريط PTFE؟",
    "What is the inspection method for PTFE tape?": "ما هي طريقة فحص شريط PTFE؟",
    "What is the testing standard for PTFE tape?": "ما هو معيار الاختبار لشريط PTFE؟",
    "What is the tolerance for PTFE tape?": "ما هو التفاوت المسموح لشريط PTFE؟",
    "What is the color code for PTFE tape?": "ما هو رمز اللون لشريط PTFE؟",
    "What is the spool size for PTFE tape?": "ما هو حجم البكرة لشريط PTFE؟",
    "What is the carton size for PTFE tape?": "ما هو حجم الكرتون لشريط PTFE؟",
    "What is the loading quantity for PTFE tape?": "ما هي كمية التحميل لشريط PTFE؟",
    "What is the delivery time for PTFE tape?": "ما هي مدة التسليم لشريط PTFE؟",
    "What is the shipping port for PTFE tape?": "ما هو ميناء الشحن لشريط PTFE؟",
    "What is the destination port for PTFE tape?": "ما هو ميناء الوجهة لشريط PTFE？",
    "What is the Incoterm for PTFE tape?": "ما هو Incoterm لشريط PTFE؟",
    "What is the document for PTFE tape?": "ما هي الوثيقة لشريط PTFE؟",
    "What is the certificate of origin for PTFE tape?": "ما هي شهادة المنشأ لشريط PTFE؟",
    "What is the commercial invoice for PTFE tape?": "ما هي الفاتورة التجارية لشريط PTFE؟",
    "What is the packing list for PTFE tape?": "ما هي قائمة التعبئة لشريط PTFE؟",
    "What is the bill of lading for PTFE tape?": "ما هي بوليصة الشحن لشريط PTFE؟",
    "What is the certificate of conformity for PTFE tape?": "ما هي شهادة المطابقة لشريط PTFE؟",
    "What is the test report for PTFE tape?": "ما هو تقرير الاختبار لشريط PTFE؟",
    "What is the MSDS for PTFE tape?": "ما هي MSDS لشريط PTFE؟",
    "What is the REACH compliance for PTFE tape?": "ما هو الامتثال لـ REACH لشريط PTFE؟",
    "What is the RoHS compliance for PTFE tape?": "ما هو الامتثال لـ RoHS لشريط PTFE؟",
    "What is the FDA compliance for PTFE tape?": "ما هو امتثال FDA لشريط PTFE؟",
    "What is the CE marking for PTFE tape?": "ما هي علامة CE لشريط PTFE؟",
    "What is the ISO certification for PTFE tape?": "ما هي شهادة ISO لشريط PTFE؟",
    "What is the WRAS approval for PTFE tape?": "ما هي موافقة WRAS لشريط PTFE؟",
    "What is the NSF approval for PTFE tape?": "ما هي موافقة NSF لشريط PTFE؟",
    "What is the KTW approval for PTFE tape?": "ما هي موافقة KTW لشريط PTFE؟",
    "What is the W270 approval for PTFE tape?": "ما هي موافقة W270 لشريط PTFE؟",
    "What is the ACS approval for PTFE tape?": "ما هي موافقة ACS لشريط PTFE؟",
    "What is the DVGW approval for PTFE tape?": "ما هي موافقة DVGW لشريط PTFE؟",
    "What is the EN 751-3 standard for PTFE tape?": "ما هو معيار EN 751-3 لشريط PTFE؟",
    "What is the DIN 30660 standard for PTFE tape?": "ما هو معيار DIN 30660 لشريط PTFE؟",
    "What is the ASTM D3308 standard for PTFE tape?": "ما هو معيار ASTM D3308 لشريط PTFE؟",
    "What is the UL listing for PTFE tape?": "ما هي قائمة UL لشريط PTFE؟",
    "What is the CSA certification for PTFE tape?": "ما هي شهادة CSA لشريط PTFE؟",
    "What is the WaterMark certification for PTFE tape?": "ما هي شهادة WaterMark لشريط PTFE؟",
    "What is the GasSafe registration for PTFE tape?": "ما هو تسجيل GasSafe لشريط PTFE؟",
    "What is the GASTEC certification for PTFE tape?": "ما هي شهادة GASTEC لشريط PTFE؟",
    "What is the SAI Global certification for PTFE tape?": "ما هي شهادة SAI Global لشريط PTFE؟",
    "What is the SIRIM certification for PTFE tape?": "ما هي شهادة SIRIM لشريط PTFE؟",
    "What is the BSI Kitemark for PTFE tape?": "ما هو BSI Kitemark لشريط PTFE؟",
    "What is the JIS standard for PTFE tape?": "ما هو معيار JIS لشريط PTFE؟",
      "PTFE thread seal tape is manufactured in a range of colors, and although the color itself does not change the chemical composition of the tape (all are made from expanded PTFE), colors serve as a visual code that helps plumbers, gas fitters and buyers quickly identify the right grade for the job. The most common colors are white, yellow, green, red, pink, blue and black, each tied to a specific application standard or market convention.": "يُصنع شريط إحكام القلاوظ PTFE بمجموعة من الألوان، وعلى الرغم من أن اللون نفسه لا يغير التركيب الكيميائي للشريط (جميعها مصنوعة من PTFE الموسع)، إلا أن الألوان تعمل كرمز مرئي يساعد السباكين وفنيي الغاز والمشترين على التعرف بسرعة على الدرجة المناسبة للعمل. الألوان الأكثر شيوعاً هي الأبيض والأصفر والأخضر والأحمر والوردي والأزرق والأسود، وكل منها مرتبط بمعيار تطبيق محدد أو عرف سوقي.",
    "White is the most common PTFE tape color worldwide. It is the standard retail plumber tape used on cold and hot water lines in residential plumbing. White tape is typically standard density (0.3-0.4 g/cm³) and 0.075mm thick, and is sold in hardware stores for general DIY plumbing repairs. In most markets, white is the default color unless a specific application requires another color code.": "الأبيض هو اللون الأكثر شيوعاً لشريط PTFE في جميع أنحاء العالم. إنه شريط السباكة القياسي بالتجزئة المستخدم على خطوط الماء البارد والساخن في السباكة السكنية. الشريط الأبيض عادة ما يكون بكثافة قياسية (0.3-0.4 جم/سم³) وسمك 0.075 مم، ويُباع في متاجر الأجهزة لإصلاحات السباكة العامة. في معظم الأسواق، الأبيض هو اللون الافتراضي ما لم يتطلب تطبيق معين رمز لون آخر.",
    "White tape is not approved for gas lines in most regulated markets. In Saudi Arabia, the UAE, the United States, Canada, the UK and the EU, yellow gas-rated tape is mandatory for natural gas, propane, butane and LPG installations. Using white plumber tape on gas lines is a code violation and a safety risk.": "الشريط الأبيض غير معتمد لخطوط الغاز في معظم الأسواق المنظمة. في السعودية والإمارات والولايات المتحدة وكندا والمملكة المتحدة والاتحاد الأوروبي، شريط الغاز الأصفر إلزامي لتركيبات الغاز الطبيعي والبروبان والبيوتان وغاز البترول المسال. استخدام شريط السباكة الأبيض على خطوط الغاز انتهاك للوائح وخطر على السلامة.",
    "Yellow is the universal signal for gas-rated PTFE tape. The yellow color is not decorative: it is a regulatory marker that indicates the tape has been manufactured and tested to gas-service specifications. Gas-rated yellow tape is typically 0.8-1.0 g/cm³ density (compared to 0.3-0.4 g/cm³ for white plumber tape) and 0.2mm thick, providing the additional sealing mass required for hydrocarbon service.": "الأصفر هو الإشارة العالمية لشريط PTFE المخصص للغاز. اللون الأصفر ليس للزينة: إنه علامة تنظيمية تشير إلى أن الشريط تم تصنيعه واختباره وفقاً لمواصفات خدمة الغاز. الشريط الأصفر المخصص للغاز عادة ما يكون بكثافة 0.8-1.0 جم/سم³ (مقارنة بـ 0.3-0.4 جم/سم³ لشريط السباكة الأبيض) وسمك 0.2 مم، مما يوفر كتلة الإحكام الإضافية المطلوبة لخدمة الهيدروكربونات.",
    "For natural gas, propane, butane and LPG lines, yellow gas tape should be used. Some jurisdictions require the tape to carry a certification mark (e.g., UL, CSA, EN 751-3, GASTEC, WaterMark). When buying yellow gas tape for a regulated market, confirm the tape carries the certification mark accepted in that market.": "لخطوط الغاز الطبيعي والبروبان والبيوتان وغاز البترول المسال، يجب استخدام شريط الغاز الأصفر. تتطلب بعض الولايات القضائية أن يحمل الشريط علامة اعتماد (مثل UL أو CSA أو EN 751-3 أو GASTEC أو WaterMark). عند شراء شريط غاز أصفر لسوق منظم، تأكد من أن الشريط يحمل علامة الاعتماد المقبولة في تلك السوق.",
    "Green PTFE tape is a specialty color used in two distinct applications. First, in the United States and Canada, green tape is sometimes used on oxygen lines in medical, welding and industrial gas systems. Oxygen-compatible green tape is cleaned and degreased to ASTM G93 standards to prevent combustion when in contact with high-pressure oxygen. Second, in some Middle Eastern markets, green tape is used for water service lines, although this is not a universal convention.": "شريط PTFE الأخضر هو لون متخصص يستخدم في تطبيقين متميزين. أولاً، في الولايات المتحدة وكندا، يُستخدم الشريط الأخضر أحياناً على خطوط الأكسجين في الأنظمة الطبية واللحام والغازات الصناعية. يتم تنظيف الشريط الأخضر المتوافق مع الأكسجين وإزالة الشحوم منه وفقاً لمعايير ASTM G93 لمنع الاحتراق عند ملامسته للأكسجين عالي الضغط. ثانياً، في بعض أسواق الشرق الأوسط، يُستخدم الشريط الأخضر لخطوط خدمة المياه، على الرغم من أن هذه ليست اتفاقية عالمية.",
    "Red PTFE tape is the high-temperature and industrial marker. Red tape is typically thicker (0.1-0.2mm) and denser (0.5-0.8 g/cm³) than standard white plumber tape, making it suitable for hot water lines, steam lines (up to 250°C / 480°F intermittent), and industrial hydraulic systems. Red is also used in OEM private label programs where high-temperature performance is a brand differentiator.": "شريط PTFE الأحمر هو علامة الحرارة العالية والصناعية. الشريط الأحمر عادة ما يكون أسمك (0.1-0.2 مم) وأكثر كثافة (0.5-0.8 جم/سم³) من شريط السباكة الأبيض القياسي، مما يجعله مناسباً لخطوط الماء الساخن وخطوط البخار (حتى 250 درجة مئوية / 480 فهرنهايت متقطع) والأنظمة الهيدروليكية الصناعية. يُستخدم الأحمر أيضاً في برامج العلامات الخاصة OEM حيث يكون أداء الحرارة العالية كمميز للعلامة التجارية.",
    "Pink PTFE tape is the potable water and food grade marker. Pink tape is manufactured from virgin PTFE (no recycled content) under FDA Title 21 CFR and EU 10/2011 food contact standards, and is NSF/ANSI 61 certified for drinking water systems. Pink is the universal code for water service lines in residential, commercial and institutional buildings where the water is consumed by humans.": "شريط PTFE الوردي هو علامة المياه الصالحة للشرب والدرجة الغذائية. يُصنع الشريط الوردي من PTFE بكر (بدون محتوى معاد تدويره) وفقاً لمعايير FDA العنوان 21 CFR والاتحاد الأوروبي 10/2011 لملامسة الطعام، ومعتمد من NSF/ANSI 61 لأنظمة مياه الشرب. الوردي هو الرمز العالمي لخطوط خدمة المياه في المباني السكنية والتجارية والمؤسسية حيث يستهلك الإنسان المياه.",
    "Blue PTFE tape is most often used for industrial and custom OEM applications. In some markets, blue is associated with high-purity applications (pharmaceutical, semiconductor, food processing), where low extractables and low contamination are critical. Blue is also a popular OEM color for private label programs, because it is distinct from the standard white, yellow, red and green codes and allows brand differentiation.": "يُستخدم شريط PTFE الأزرق في الغالب للتطبيقات الصناعية و OEM المخصصة. في بعض الأسواق، يرتبط الأزرق بالتطبيقات عالية النقاء (الأدوية وأشباه الموصلات ومعالجة الأغذية)، حيث تكون المستخلصات المنخفضة والتلوث المنخفض أمراً بالغ الأهمية. الأزرق هو أيضاً لون OEM شائع لبرامج العلامات الخاصة، لأنه يختلف عن الرموز القياسية الأبيض والأصفر والأحمر والأخضر ويسمح بتمييز العلامة التجارية.",
    "Black PTFE tape is the heavy-duty and engineering marker. Black tape is typically high-density (0.4-0.5 g/cm³) and high-tensile, designed for industrial applications including chemical lines, oil and fuel lines, hydraulic systems, and high-pressure pneumatic systems. Black is also used in automotive, marine, and military specifications where durability and chemical resistance are required.": "شريط PTFE الأسود هو علامة الخدمة الشاقة والهندسية. الشريط الأسود عادة ما يكون بكثافة عالية (0.4-0.5 جم/سم³) ومقاومة شد عالية، مصمم للتطبيقات الصناعية بما في ذلك الخطوط الكيميائية وخطوط الزيت والوقود والأنظمة الهيدروليكية والأنظمة الهوائية عالية الضغط. يُستخدم الأسود أيضاً في مواصفات السيارات والبحرية والعسكرية حيث تكون المتانة والمقاومة الكيميائية مطلوبة.",
    "For an OEM private label program, color choice is part of your brand strategy. Common strategies include: (1) use one color per SKU line to differentiate gas, water, hot water, and industrial grades; (2) use brand colors (your company colors) across all SKUs to build visual identity; (3) use color to encode density and grade, with packaging label showing the technical spec. When designing a color program, confirm the chosen color does not conflict with local market conventions (e.g., do not use yellow for water in a market where yellow means gas).": "بالنسبة لبرنامج العلامة الخاصة OEM، فإن اختيار اللون جزء من استراتيجية علامتك التجارية. تشمل الاستراتيجيات الشائعة: (1) استخدام لون واحد لكل خط SKU للتفريق بين درجات الغاز والماء والماء الساخن والصناعية؛ (2) استخدام ألوان العلامة التجارية (ألوان شركتك) عبر جميع وحدات SKU لبناء الهوية البصرية؛ (3) استخدام اللون لترميز الكثافة والدرجة، مع ملصق التغليف الذي يوضح المواصفات الفنية. عند تصميم برنامج ألوان، تأكد من أن اللون المختار لا يتعارض مع أعراف السوق المحلية (على سبيل المثال، لا تستخدم الأصفر للماء في سوق حيث الأصفر يعني الغاز).",
    "Some Middle Eastern markets use specific color conventions that differ from the global standard. For example, in Saudi Arabia, some distributors sell green tape for water service lines (where globally green is for oxygen). When exporting to a new market, confirm the local color convention with a distributor or end-user before finalising your color SKU range. Misreading a market's color convention can lead to buyers receiving the wrong grade and returns.": "تستخدم بعض أسواق الشرق الأوسط اتفاقيات ألوان محددة تختلف عن المعيار العالمي. على سبيل المثال، في السعودية، يبيع بعض الموزعين الشريط الأخضر لخطوط خدمة المياه (حيث يكون الأخضر عالمياً للأكسجين). عند التصدير إلى سوق جديد، تأكد من اتفاقية الألوان المحلية مع الموزع أو المستخدم النهائي قبل الانتهاء من نطاق SKU للألوان. قد يؤدي سوء فهم اتفاقية ألوان السوق إلى استلام المشترين للدرجة الخاطئة والمرتجعات.",
    "For quotation, please send the SKU code or required size, quantity, packaging method and destination country or port. We can reply with price, MOQ, carton details and estimated delivery time.": "للحصول على عرض أسعار، يرجى إرسال رمز SKU أو الحجم المطلوب والكمية وطريقة التغليف وبلد الوجهة أو الميناء. يمكننا الرد بالسعر والحد الأدنى للطلب وتفاصيل الكرتون والوقت المقدر للتسليم.",
    "To help our factory prepare accurate pricing and lead time, please share: (1) the SKU code (e.g., SKU-A1, SKU-F1) or the exact specification (width × length × thickness × density × color), (2) the order quantity per SKU, (3) the required packaging (spool, shrink wrap, individual wrap, bag, display box, carton), (4) the destination country and port, and (5) any private label artwork or label requirements. A clear inquiry helps us reply with price, MOQ, carton details and estimated delivery in 24 hours.": "لمساعدة مصنعنا في إعداد أسعار دقيقة وأوقات تسليم، يرجى مشاركة: (1) رمز SKU (على سبيل المثال، SKU-A1، SKU-F1) أو المواصفات الدقيقة (العرض × الطول × السماكة × الكثافة × اللون)، (2) كمية الطلب لكل SKU، (3) التغليف المطلوب (بكرة، غلاف انكماش، غلاف فردي، كيس، صندوق عرض، كرتون)، (4) بلد وميناء الوجهة، و(5) أي تصميم علامة خاصة أو متطلبات الملصق. يساعدنا الاستفسار الواضح في الرد بالسعر والحد الأدنى للطلب وتفاصيل الكرتون ووقت التسليم المقدر في 24 ساعة.",
    "The base price reference above is for white, single-color, standard density PTFE thread seal tape (0.3-0.4 g/cm³, 0.075 mm). High-density tape (0.4-0.5 g/cm³) and gas-rated tape (0.8-1.0 g/cm³) are typically quoted separately. Color customization (yellow, green, red, blue, pink, black or custom Pantone) is available with an MOQ of 50,000 rolls per color per size. Contact our sales team for a tailored quotation based on your target specifications.": "مرجع السعر الأساسي أعلاه هو لشريط إحكام القلاوظ PTFE أبيض، بلون واحد، بكثافة قياسية (0.3-0.4 جم/سم³، 0.075 مم). يتم عرض أسعار الشريط عالي الكثافة (0.4-0.5 جم/سم³) والشريط المخصص للغاز (0.8-1.0 جم/سم³) عادة بشكل منفصل. تخصيص اللون (أصفر، أخضر، أحمر، أزرق، وردي، أسود أو Pantone مخصص) متاح بحد أدنى 50,000 لفة لكل لون لكل حجم. اتصل بفريق المبيعات لدينا للحصول على عرض أسعار مخصص بناءً على مواصفاتك المستهدفة.",
    "For the full quotation, please share the SKU code, color, density, quantity, packaging, and destination. We can reply with FOB Ningbo, CIF Jeddah, CIF Nhava Sheva, CIF Mundra, or DDP terms depending on your market.": "للحصول على عرض الأسعار الكامل، يرجى مشاركة رمز SKU واللون والكثافة والكمية والتغليف والوجهة. يمكننا الرد بشروط FOB Ningbo أو CIF Jeddah أو CIF Nhava Sheva أو CIF Mundra أو DDP حسب سوقك.",
    "We have supplied PTFE thread seal tape to wholesale buyers, hardware distributors, water pipe and valve brands, OEM private label programs, and industrial MRO customers in the Middle East (Saudi Arabia, UAE, Iraq, Egypt, Pakistan, India), Africa (Nigeria, Kenya, South Africa), South America (Brazil, Chile, Peru), Eastern Europe (Poland, Romania), and Southeast Asia (Vietnam, Indonesia, Philippines).": "لقد قمنا بتوريد شريط إحكام القلاوظ PTFE إلى مشترين بالجملة وموزعين للأجهزة وعلامات تجارية لأنابيب المياه والصمامات وبرامج العلامات الخاصة OEM وعملاء MRO الصناعيين في الشرق الأوسط (السعودية والإمارات والعراق ومصر وباكستان والهند) وأفريقيا (نيجيريا وكينيا وجنوب أفريقيا) وأمريكا الجنوبية (البرازيل وشيلي وبيرو) وأوروبا الشرقية (بولندا ورومانيا) وجنوب شرق آسيا (فيتنام وإندونيسيا والفلبين).",
    "We support FOB Ningbo, CIF destination port (Jeddah, Jebel Ali, Nhava Sheva, Mundra, Alexandria, Karachi, etc.), and DDP warehouse terms. For DDP, we coordinate with the customer's nominated freight forwarder and prepare the export documentation including commercial invoice, packing list, bill of lading, certificate of origin, and (where required) conformity certificate. Custom clearance and import documentation in the destination country is the buyer's responsibility unless DDP is agreed.": "ندعم شروط FOB نينغبو و CIF ميناء الوجهة (جدة، جبل علي، نهافا شيفا، موندرا، الإسكندرية، كراتشي، إلخ) ومستودع DDP. بالنسبة لـ DDP، ننسق مع وكيل الشحن المعين من العميل ونعد وثائق التصدير بما في ذلك الفاتورة التجارية وقائمة التعبئة وبوليصة الشحن وشهادة المنشأ و(عند الطلب) شهادة المطابقة. التخليص الجمركي ووثائق الاستيراد في بلد الوجهة هي مسؤولية المشتري ما لم يتم الاتفاق على DDP.",
    "We treat every inquiry as the start of a long-term supply relationship. Our sales team replies within 24 hours, including weekends. For complex OEM or first-time orders, our team will follow up with a call (in English, Chinese, Spanish or Arabic) to clarify specifications and lead time. As a direct manufacturer, we coordinate production, packaging, quality inspection and shipping to give you one point of contact for the full order.": "نتعامل مع كل استفسار على أنه بداية لعلاقة توريد طويلة الأمد. يرد فريق المبيعات لدينا في غضون 24 ساعة، بما في ذلك عطلات نهاية الأسبوع. بالنسبة لطلبات OEM المعقدة أو الطلبات الأولى، سيتابع فريقنا بمكالمة (بالإنجليزية أو الصينية أو الإسبانية أو العربية) لتوضيح المواصفات وأوقات التسليم. بصفتنا مصنعاً مباشراً، ننسق الإنتاج والتغليف وفحص الجودة والشحن لنمنحك جهة اتصال واحدة للطلب الكامل.",
    "Yes. We support private label and OEM programs. Custom artwork (logo, brand name, label design) is free with an MOQ of 50,000 rolls per size. Custom spool colour, custom carton printing, custom display box, blister card with logo, and individually wrapped OEM packs are all available. Lead time for OEM is typically 30-45 days after artwork confirmation. Contact our sales team with your packaging preferences to receive a tailored OEM quotation.": "نعم. نحن ندعم برامج العلامات الخاصة و OEM. التصميم المخصص (الشعار، اسم العلامة التجارية، تصميم الملصق) مجاني بحد أدنى للطلب 50,000 لفة لكل حجم. لون البكرة المخصص وطباعة الكرتون المخصصة وصندوق العرض المخصص والبطاقة الفقاعية مع الشعار ومعبوات OEM المغلفة بشكل فردي كلها متاحة. عادة ما يكون وقت التسليم لـ OEM من 30 إلى 45 يوماً بعد تأكيد التصميم. اتصل بفريق المبيعات لدينا مع تفضيلات التغليف الخاصة بك لتلقي عرض أسعار OEM مخصص.",
      "A complete PTFE tape specification includes six parameters: width, length, thickness, density, color and spool. This article explains each parameter, gives the most common values in each market, and provides a reference specification table that buyers can use when requesting a quotation.": "تتضمن مواصفات شريط PTFE الكامل ستة معايير: العرض، الطول، السماكة، الكثافة، اللون، والقلب البلاستيكي. تشرح هذه المقالة كل معيار، وتعرض القيم الأكثر شيوعاً في كل سوق، وتوفر جدول مواصفات مرجعي يمكن للمشترين استخدامه عند طلب عرض سعر.",
    "Width is the most standardised PTFE tape parameter. The most common widths are 12mm (retail consumer packs, the most common size worldwide), 19mm (professional plumbing and gas fitting, the standard for natural gas and LPG lines), 25mm (industrial applications, larger pipe threads), and 50mm (extra-wide industrial use, ship engine rooms, factory piping). For most B2B buyers, 12mm and 19mm account for 95% of order volume; 25mm and 50mm are specialty SKUs for industrial customers.": "العرض هو المعيار الأكثر توحيداً في شريط PTFE. تشمل الأعرض الشائعة 12 مم (عبوات التجزئة، المقاس الأكثر انتشاراً في العالم)، 19 مم (السباكة المهنية وتركيب الغاز، المعيار لخطوط الغاز الطبيعي وغاز البترول المسال)، 25 مم (التطبيقات الصناعية، الوصلات螺纹 ذات القطر الكبير)، و50 مم (استخدام صناعي عريض جداً، غرف محركات السفن، أنابيب المصانع). بالنسبة لمعظم مشتري B2B، يمثل 12 مم و19 مم نسبة 95% من حجم الطلب؛ أما 25 مم و50 مم فهي SKU مخصصة للعملاء الصناعيين.",
    "For residential plumbing, 12mm is the standard. For gas fitting, 19mm is the standard in most markets. For 1/2 inch and 3/4 inch NPT or BSP threads, 12mm is sufficient. For 1 inch and above, 19mm is preferred. For 2 inch and above industrial threads, 25mm or 50mm is used.": "في السباكة السكنية، يُعد 12 مم هو المعيار. أما في تركيب الغاز، فإن 19 مم هو المعيار في معظم الأسواق. بالنسبة للوصلات螺纹 NPT أو BSP مقاس 1/2 بوصة و3/4 بوصة، يكفي استخدام 12 مم. للمقاس 1 بوصة فأكثر، يُفضَّل 19 مم. أما الوصلات الصناعية مقاس 2 بوصة فأكثر، فيُستخدم 25 مم أو 50 مم.",
    "Length determines the total amount of tape on the roll and is the primary driver of price-per-roll. Common retail lengths are 10m and 15m, which are the de-facto standards in most markets. Promotional lengths are 1m, 4m and 6m, often used for giveaways, repair kits and bundled accessories. Professional lengths are 20m and 30m, used for plumbing and gas technicians who use a lot of tape per day.": "يحدد الطول الكمية الإجمالية للشريط في اللفة، وهو العامل الرئيسي لسعر اللفة. الأطوال الشائعة في التجزئة هي 10 م و15 م، وهي المعيار الفعلي في معظم الأسواق. أما الأطوال الترويجية فهي 1 م و4 م و6 م، وتُستخدم عادةً كهدايا أو في مجموعات الإصلاح والإكسسوارات المجمعة. أما الأطوال المهنية فهي 20 م و30 م، وتُستخدم من قِبل فنيي السباكة والغاز الذين يستهلكون كميات كبيرة يومياً.",
    "When comparing prices, always normalise to USD per metre. A 10m roll at USD 0.20 is USD 0.020 per metre; a 15m roll at USD 0.28 is USD 0.019 per metre, which is actually cheaper. A 20m roll at USD 0.36 is USD 0.018 per metre, even cheaper. So the longest roll is usually the best value per metre, but requires more upfront cash and warehouse space.": "عند مقارنة الأسعار، احرص دائماً على التحويل إلى الدولار الأمريكي لكل متر. لفة 10 م بسعر 0.20 دولار تعادل 0.020 دولار/متر؛ لفة 15 م بسعر 0.28 دولار تعادل 0.019 دولار/متر، وهي أرخص فعلياً. لفة 20 م بسعر 0.36 دولار تعادل 0.018 دولار/متر، وهي أرخص أيضاً. لذلك فإن اللفة الأطول غالباً ما تقدم أفضل قيمة لكل متر، لكنها تتطلب سيولة نقدية أولية أكبر ومساحة تخزين أكبر.",
    "Thickness: 0.04mm / 0.075mm / 0.1mm / 0.15mm / 0.2mm": "السماكة: 0.04 مم / 0.075 مم / 0.1 مم / 0.15 مم / 0.2 مم",
    "Thickness is the most overlooked specification. Most retail plumber tape is 0.075mm (75 microns), which is the standard. Ultra-thin 0.04mm tape is used for low-cost promotional rolls and is generally not recommended for professional use because it tears easily and provides less material to fill thread gaps. Thick 0.1mm tape is the heavy-duty professional grade, and 0.15-0.2mm is the industrial grade for high-pressure and high-temperature service.": "تُعد السماكة المواصفة الأكثر إهمالاً. معظم أشرطة السباكة في الأسواق بسماكة 0.075 مم (75 ميكرون)، وهو المعيار. الشريط فائق الرقة 0.04 مم يُستخدم في اللفات الترويجية منخفضة التكلفة، ولا يُنصح به عادةً للاستخدام المهني لأنه يتمزق بسهولة ويوفر مادة أقل لملء فراغات الوصلات. الشريط السميك 0.1 مم هو الدرجة المهنية الثقيلة، و0.15–0.2 مم هو الدرجة الصناعية للخدمة عالية الضغط ودرجة الحرارة.",
    "Thicker tape fills larger thread gaps. For worn or slightly damaged threads, a 0.1mm or 0.15mm tape will seal better than a 0.075mm tape. For new precision-machined threads, a 0.075mm tape is sufficient and is easier to wrap in the correct number of turns.": "الشريط الأكثر سماكة يملأ فراغات الوصلات螺纹 الأكبر. أما الوصلات螺纹 البالية أو المتضررة قليلاً، فإن شريطاً بسماكة 0.1 مم أو 0.15 مم سيحقق إحكاماً أفضل من شريط 0.075 مم. أما الوصلات螺纹 الجديدة المشغولة بدقة، فيكفي استخدام شريط 0.075 مم، ويسهل لفه بعدد اللفات الصحيح.",
    "Density, measured in grams per cubic centimetre, is the parameter that most affects sealing performance. Low-density tape (0.3-0.4 g/cm³) is soft, conformable and easy to wrap. It is the standard for general plumbing. Medium-density tape (0.5-0.7 g/cm³) is firmer and holds its shape better under load. High-density tape (0.8-1.2 g/cm³) is firm, less compressible and is the standard for gas lines, high-pressure service and industrial applications.": "تُعد الكثافة، المقاسة بالجرام لكل سنتيمتر مكعب، المعيار الأكثر تأثيراً في أداء الإحكام. الشريط منخفض الكثافة (0.3–0.4 غ/سم³) ناعم ومرن وسهل اللف، وهو المعيار للسباكة العامة. الشريط متوسط الكثافة (0.5–0.7 غ/سم³) أكثر تماسكا ويحافظ على شكله تحت الحمل. الشريط عالي الكثافة (0.8–1.2 غ/سم³) صلب وأقل انضغاطاً، وهو المعيار لخطوط الغاز والخدمة عالية الضغط والتطبيقات الصناعية.",
    "Density is sometimes confused with thickness: a 0.075mm thick tape at 0.3 g/cm³ and a 0.1mm thick tape at 0.6 g/cm³ have the same mass per unit area, but feel different when wrapping. Higher density means more PTFE and less air space in the same thickness. A higher density tape is more expensive per metre because it uses more raw material.": "تُخلط الكثافة أحياناً بالسماكة: شريط بسماكة 0.075 مم وكثافة 0.3 غ/سم³، وشريط بسماكة 0.1 مم وكثافة 0.6 غ/سم³، لهما نفس الكتلة لكل وحدة مساحة، لكنهما يختلفان في الإحساس عند اللف. الكثافة الأعلى تعني مادة PTFE أكثر وفراغات هوائية أقل في السماكة نفسها. الشريط الأعلى كثافة أغلى لكل متر لأنه يستهلك مادة خام أكثر.",
    "Color and spool are the cosmetic and branding parameters. Color is a market convention: white for general plumbing, yellow for gas, pink for potable water, green for oxygen, red and black for industrial. Spool is the plastic core on which the tape is wound: most spools are 30mm OD (outer diameter) and 25mm ID (inner diameter), but some industrial spools are 50mm OD. Spool color can be matched to tape color, or used for OEM private label branding (e.g. a brand's house color).": "يُعد اللون والقلب البلاستيكي معايير جمالية وللعلامة التجارية. يتبع اللون عرف السوق: أبيض للسباكة العامة، أصفر للغاز، وردي لمياه الشرب، أخضر للأكسجين، أحمر وأسود للاستخدام الصناعي. أما القلب فهو اللب البلاستيكي الذي يلف عليه الشريط: معظم القلوب بقطر خارجي 30 مم وقطر داخلي 25 مم، لكن بعض القلوب الصناعية قطرها الخارجي 50 مم. يمكن مطابقة لون القلب مع لون الشريط، أو استخدامه كعلامة تجارية خاصة بـ OEM (مثل اللون الرئيسي للعلامة التجارية).",
    "For OEM private label, the spool color and spool print are part of the brand identity. A buyer building a premium plumbing brand may specify a black spool with a silver logo, while a buyer targeting the economy segment may use a standard white spool with a printed back card.": "في برامج العلامة الخاصة بـ OEM، يُعد لون القلب وطباعة القلب جزءاً من هوية العلامة التجارية. قد يحدد المشتري الذي يبني علامة سباكة راقية قلباً أسود بشعار فضي، بينما قد يستخدم المشتري المستهدف للقطاع الاقتصادي قلباً أبيض قياسياً مع بطاقة خلفية مطبوعة.",
    "Here is a reference specification table covering the most common PTFE tape SKUs in the B2B market. SKU-A: 12mm × 10m × 0.075mm × 0.35 g/cm³ × white — the standard retail plumber tape, the baseline SKU in every market. SKU-B: 12mm × 15m × 0.075mm × 0.35 g/cm³ × white — the extended retail version. SKU-C: 19mm × 15m × 0.1mm × 0.8 g/cm³ × yellow — the professional gas tape. SKU-D: 12mm × 4m × 0.075mm × 0.35 g/cm³ × white, individually wrapped — the small retail pack. SKU-E: 19mm × 20m × 0.1mm × 1.0 g/cm³ × yellow — the high-density gas tape for industrial. SKU-F: 12mm × 10m × 0.075mm × 0.4 g/cm³ × pink — the NSF potable water tape. SKU-G: 12mm × 30m × 0.075mm × 0.4 g/cm³ × white — the contractor pack. SKU-H: 19mm × 30m × 0.1mm × 0.9 g/cm³ × red — the industrial high-temperature tape. SKU-I: 12mm × 1m × 0.05mm × 0.3 g/cm³ × white — the promotional giveaway tape. SKU-J: 25mm × 20m × 0.15mm × 1.0 g/cm³ × black — the industrial heavy-duty tape.": "فيما يلي جدول مرجعي لأكواد SKU الأكثر شيوعاً لشريط PTFE في سوق B2B. SKU-A: 12 مم × 10 م × 0.075 مم × 0.35 غ/سم³ × أبيض – شريط السباكة القياسي للتجزئة، الكود الأساسي في كل سوق. SKU-B: 12 مم × 15 م × 0.075 مم × 0.35 غ/سم³ × أبيض – النسخة التجارية المطوّلة. SKU-C: 19 مم × 15 م × 0.1 مم × 0.8 غ/سم³ × أصفر – شريط الغاز الاحترافي. SKU-D: 12 مم × 4 م × 0.075 مم × 0.35 غ/سم³ × أبيض، مغلف فردياً – العبوة الصغيرة للتجزئة. SKU-E: 19 مم × 20 م × 0.1 مم × 1.0 غ/سم³ × أصفر – شريط الغاز عالي الكثافة للاستخدام الصناعي. SKU-F: 12 مم × 10 م × 0.075 مم × 0.4 غ/سم³ × وردي – شريط NSF لمياه الشرب. SKU-G: 12 مم × 30 م × 0.075 مم × 0.4 غ/سم³ × أبيض – عبوة المقاولين. SKU-H: 19 مم × 30 م × 0.1 مم × 0.9 غ/سم³ × أحمر – الشريط الصناعي المقاوم للحرارة العالية. SKU-I: 12 مم × 1 م × 0.05 مم × 0.3 غ/سم³ × أبيض – الشريط الترويجي للهدايا. SKU-J: 25 مم × 20 م × 0.15 مم × 1.0 غ/سم³ × أسود – الشريط الصناعي للخدمة الشاقة.",
    "12mm × 10m × 0.075mm thickness × 0.3-0.4 g/cm³ density, in white. This is the standard retail plumber tape sold in hardware stores worldwide and the SKU most distributors order first.": "12 مم × 10 م × سماكة 0.075 مم × كثافة 0.3–0.4 غ/سم³، أبيض. هذا هو شريط السباكة القياسي المعروض في جميع متاجر الحديد حول العالم، وهو أول كود SKU يطلبه معظم الموزعين.",
    "What is the difference between thickness and density?": "ما الفرق بين السماكة والكثافة؟",
      "Specifications": "المواصفات",
    "Thickness is the physical thickness of the film in millimetres. Density is the mass per unit volume in g/cm³. A 0.1mm thick tape at 0.6 g/cm³ has the same mass per square metre as a 0.075mm tape at 0.8 g/cm³. Higher density tape uses more raw material and is more expensive per metre.": "السماكة هي السماكة الفيزيائية للغشاء بالملليمتر. الكثافة هي الكتلة لكل وحدة حجم بوحدة جم/سم³. شريط بسماكة 0.1 مم وكثافة 0.6 جم/سم³ له نفس الكتلة لكل متر مربع مثل شريط بسماكة 0.075 مم وكثافة 0.8 جم/سم³. الشريط الأعلى كثافة يستخدم المزيد من المواد الخام وهو أغلى لكل متر.",
    "Divide the price per roll by the length in metres. A 10m roll at USD 0.20 is USD 0.020 per metre. A 15m roll at USD 0.28 is USD 0.019 per metre, which is cheaper per metre than the 10m roll despite the higher per-roll price.": "اقسم سعر اللفة على الطول بالأمتار. لفة 10 م بسعر 0.20 دولار هي 0.020 دولار للمتر. لفة 15 م بسعر 0.28 دولار هي 0.019 دولار للمتر، وهو أرخص لكل متر من لفة 10 م على الرغم من ارتفاع سعر اللفة.",
    "For natural gas and LPG, a yellow tape at 19mm width, 0.1mm thickness and 0.8-1.2 g/cm³ density is the standard. The tape should also meet a recognised standard such as EN 751-3, AS 4623-2008, UPC or local equivalent. Always check the local gas code before specifying a gas tape SKU.": "بالنسبة للغاز الطبيعي وغاز البترول المسال، المعيار هو شريط أصفر بعرض 19 مم وسماكة 0.1 مم وكثافة 0.8-1.2 جم/سم³. يجب أن يفي الشريط أيضاً بمعيار معترف به مثل EN 751-3 أو AS 4623-2008 أو UPC أو ما يعادله محلياً. تحقق دائماً من كود الغاز المحلي قبل تحديد SKU لشريط الغاز.",
    "For a quotation, please send the specification, quantity, packing method and destination country or port. We reply within 24 hours with price, MOQ, lead time and sample options.": "للحصول على عرض سعر، يرجى إرسال المواصفات والكمية وطريقة التعبئة وبلد أو ميناء الوجهة. نرد خلال 24 ساعة بالسعر والحد الأدنى للطلب ووقت التسليم وخيارات العينات.",
    "Width: 12mm / 19mm / 25mm / 50mm": "العرض: 12 مم / 19 مم / 25 مم / 50 مم",
    "Length: 1m / 4m / 6m / 10m / 15m / 20m / 30m": "الطول: 1 م / 4 م / 6 م / 10 م / 15 م / 20 م / 30 م",
    "Density: 0.3 g/cm³ to 1.2 g/cm³": "الكثافة: 0.3 جم/سم³ إلى 1.2 جم/سم³",
    "Color and Spool": "اللون والبكرة",
    "Reference Specification Table": "جدول المواصفات المرجعي",
    "What is the most common PTFE tape specification?": "ما هي مواصفات شريط PTFE الأكثر شيوعاً؟",
    "How do I convert a quote to price per metre?": "كيف أحول عرض السعر إلى سعر لكل متر؟",
    "What specification is required for gas lines?": "ما المواصفات المطلوبة لخطوط الغاز؟",
    "Required size and density": "الحجم والكثافة المطلوبة",
    "PTFE thread seal tape is one of the few sealing materials that works across an extremely wide temperature range. This article explains the rated service temperature, the difference between standard and high-temperature grades, and which applications should specify a high-temperature tape rather than a general-purpose white plumber tape.": "شريط إحكام القلاوظ PTFE هو أحد مواد الإحكام القليلة التي تعمل عبر نطاق درجة حرارة واسع للغاية. تشرح هذه المقالة درجة حرارة الخدمة المقدرة، والفرق بين الدرجات القياسية والعالية الحرارة، والتطبيقات التي يجب أن تحدد شريطاً عالي الحرارة بدلاً من شريط السباكة الأبيض العام.",
    "Standard PTFE thread seal tape is rated for continuous service from -200°C to +260°C. The -200°C lower limit is set by PTFE's glass transition temperature, below which the polymer becomes brittle; in practice, most plumbing applications stay above freezing. The +260°C upper limit is the melting point of PTFE: above this temperature the polymer softens and loses its sealing force.": "شريط إحكام القلاوظ PTFE القياسي مصنف للاستخدام المستمر من -200 درجة مئوية إلى +260 درجة مئوية. الحد الأدنى -200 درجة مئوية يحدده درجة حرارة التحول الزجاجي لـ PTFE، التي يصبح البوليمر تحتها هشاً؛ من الناحية العملية، معظم تطبيقات السباكة تبقى فوق درجة التجمد. الحد الأعلى +260 درجة مئوية هو نقطة انصهار PTFE: فوق درجة الحرارة هذه، يصبح البوليمر طرياً ويفقد قوة الإحكام.",
    "For domestic plumbing, radiator connections and water heater fittings, the operating temperature is well within the standard rating (typically 0-95°C for hot water, up to 110°C for pressurised heating systems). Standard white plumber tape is therefore suitable for almost all residential and light commercial plumbing applications.": "بالنسبة لسباكة المنازل ووصلات المدافئ وتجهيزات سخانات المياه، فإن درجة حرارة التشغيل تقع ضمن التصنيف القياسي بكثير (عادةً 0-95 درجة مئوية للماء الساخن، حتى 110 درجة مئوية لأنظمة التدفئة المضغوطة). لذلك فإن شريط السباكة الأبيض القياسي مناسب لجميع التطبيقات السكنية والتجارية الخفيفة تقريباً.",
    "High-temperature service above 150°C is common in industrial settings: steam lines, hot oil systems, heat exchangers, chemical reactors, and engine room piping. In these applications, a standard white plumber tape will degrade over time and may eventually fail. The recommended replacement is a high-density yellow gas tape (which is rated to 260°C) or a dedicated red high-temperature tape (which is rated to 260°C with higher density and thicker construction).": "الخدمة في درجات الحرارة العالية فوق 150 درجة مئوية شائعة في البيئات الصناعية: خطوط البخار وأنظمة الزيت الساخن والمبادلات الحرارية والمفاعلات الكيميائية وخطوط غرف المحركات. في هذه التطبيقات، سوف يتدهور شريط السباكة الأبيض القياسي بمرور الوقت وقد يفشل في النهاية. البديل الموصى به هو شريط غاز أصفر عالي الكثافة (مصنف حتى 260 درجة مئوية) أو شريط أحمر مخصص لدرجات الحرارة العالية (مصنف حتى 260 درجة مئوية بكثافة أعلى وبنية أسمك).",
    "PTFE thread seal tape is one of the few sealing materials that works across an extremely wide temperature range. This article explains the rated service temperature, the difference between standard and high-temperature grades, and which applications should specify a high-temperature tape rather than a general-purpose white plumber tape.": "شريط إحكام القلاوظ PTFE هو أحد مواد الإحكام القليلة التي تعمل عبر نطاق درجة حرارة واسع للغاية. تشرح هذه المقالة درجة حرارة الخدمة المقدرة، والفرق بين الدرجات القياسية والعالية الحرارة، والتطبيقات التي يجب أن تحدد شريطاً عالي الحرارة بدلاً من شريط السباكة الأبيض العام.",
    "Storage & Shelf Life": "التخزين ومدة الصلاحية",
    "PTFE is one of the most chemically stable polymers, but even PTFE tape has a practical shelf life. This article explains how long PTFE tape actually lasts in storage, the right storage conditions, what to check before shipping, and how to identify tape that has degraded.": "PTFE هو واحد من أكثر البوليمرات استقراراً كيميائياً، لكن حتى شريط PTFE له مدة صلاحية عملية. تشرح هذه المقالة كم يدوم شريط PTFE فعلياً في التخزين، وظروف التخزين الصحيحة، وما يجب فحصه قبل الشحن، وكيف تتعرف على الشريط المتدهور.",
    "Most PTFE tape manufacturers rate shelf life at 5 years from the production date when stored below 40°C, away from direct sunlight, in original sealed packaging. PTFE itself is chemically inert and does not degrade under normal conditions, but the spool (usually plastic or recycled plastic) and the packaging can degrade over time, leading to spool cracking, label discolouration or carton weakening.": "يصنف معظم مصنعي شريط PTFE مدة الصلاحية بـ 5 سنوات من تاريخ الإنتاج عند تخزينه تحت 40 درجة مئوية، بعيداً عن أشعة الشمس المباشرة، في التعبئة الأصلية المختومة. PTFE نفسه خامل كيميائياً ولا يتدهور في الظروف العادية، لكن البكرة (عادة بلاستيك أو بلاستيك معاد تدويره) والتعبئة يمكن أن تتدهور بمرور الوقت، مما يؤدي إلى تشقق البكرة أو تغير لون الملصق أو ضعف الكرتون.",
    "For importers, the 5-year shelf life is a useful planning number: a 20ft container of 12mm × 10m white tape bought in 2026 will remain sellable through 2031, which covers the typical 3-5 year inventory cycle of a hardware distributor. There is no degradation in sealing performance during this period as long as the tape is stored correctly.": "بالنسبة للمستوردين، مدة الصلاحية البالغة 5 سنوات هي رقم تخطيط مفيد: حاوية 20 قدماً من شريط أبيض 12 مم × 10 م تم شراؤها في 2026 ستبقى قابلة للبيع حتى 2031، وهو ما يغطي دورة المخزون المعتادة من 3-5 سنوات لموزع الأجهزة. لا يوجد تدهور في أداء الإحكام خلال هذه الفترة طالما تم تخزين الشريط بشكل صحيح.",
    "The four enemies of PTFE tape in storage are heat, sunlight, moisture and pressure. Heat above 40°C accelerates the ageing of the plastic spool and may cause the tape to relax and unwind unevenly. Direct sunlight, especially UV, degrades the outer layer of the PTFE film and can cause yellowing of white tape. Moisture does not affect the PTFE itself but can damage the cardboard carton and the label. Excessive pressure on the rolls (such as stacking too many cartons high) can deform the spools and cause the tape to bind.": "الأعداء الأربعة لشريط PTFE في التخزين هم الحرارة وأشعة الشمس والرطوبة والضغط. الحرارة فوق 40 درجة مئوية تسرع شيخوخة البكرة البلاستيكية وقد تتسبب في ارتخاء الشريط وتكشفه بشكل غير متساوٍ. أشعة الشمس المباشرة، خاصة الأشعة فوق البنفسجية، تتدهور الطبقة الخارجية من غشاء PTFE وقد تسبب اصفرار الشريط الأبيض. الرطوبة لا تؤثر على PTFE نفسه، لكنها قد تتلف الكرتون والملصق. الضغط الزائد على اللفات (مثل تكديس صناديق كثيرة فوق بعضها) قد يشوه البكرات ويتسبب في التصاق الشريط.",
    "Sealant Comparison": "مقارنة مانعات التسرب",
    "PTFE tape and thread sealant paste are the two main options for sealing threaded pipe connections. They are sometimes interchangeable and sometimes not. This article compares the two on sealing performance, application method, cost, gas line suitability, and the situations where you should use one, the other, or both together.": "شريط PTFE ومعجون إحكام القلاوظ هما الخياران الرئيسيان لإحكام توصيلات الأنابيب الملولبة. أحياناً يكونان قابلين للتبادل وأحياناً لا. تقارن هذه المقالة بين الاثنين من حيث أداء الإحكام وطريقة التطبيق والتكلفة وملاءمة خط الغاز والحالات التي يجب فيها استخدام أحدهما أو الآخر أو كليهما معاً.",
    "PTFE tape is a thin film of expanded PTFE that is wrapped around the male threads of a pipe fitting. When the joint is tightened, the tape compresses into the helical voids between the male and female threads, creating a pressure-tight seal. PTFE tape also acts as a thread lubricant, reducing the friction between the threads and allowing the joint to be tightened to the right torque without galling. Standard white plumber tape is rated for pressures up to about 10 bar on tapered NPT or BSP threads, well above any residential or commercial plumbing pressure.": "شريط PTFE هو غشاء رقيق من PTFE الموسع يُلف حول القلاوظ الذكري لتركيب الأنبوب. عند شد الوصلة، ينضغط الشريط في الفراغات الحلزونية بين القلاوظ الذكري والأنثوي، مكوناً إحكاماً محكماً للضغط. يعمل شريط PTFE أيضاً كمواد تشحيم للقلاوظ، مما يقلل الاحتكاك بين القلاوظ ويسمح بشد الوصلة إلى عزم الدوران الصحيح دون التحام. شريط السباكة الأبيض القياسي مصنف لضغوط تصل إلى حوالي 10 بار على قلاووط NPT أو BSP المخروطي، وهو أعلى بكثير من أي ضغط سباكة سكني أو تجاري.",
    "Thread sealant paste is a thick liquid or paste applied to the male threads before joint make-up. The paste is typically a PTFE-impregnated resin (such as anaerobic sealant) or a soft-setting pipe dope (such as Rex, Megaloc or Loctite 577). As the joint is tightened, the paste fills the thread voids and cures into a flexible solid. The cure time is typically 24 hours for full pressure resistance, although most pastes will hold light pressure immediately.": "معجون إحكام القلاوظ هو سائل أو معجون كثيف يوضع على القلاوظ الذكري قبل تركيب الوصلة. المعجون عادة ما يكون راتينج مشبع بـ PTFE (مثل مانع التسرب اللاهوائي) أو معجون أنابيب يتجمد ببطء (مثل Rex أو Megaloc أو Loctite 577). عند شد الوصلة، يملأ المعجون فراغات القلاوظ ويتجمد إلى صلب مرن. وقت التجمد عادة 24 ساعة لمقاومة الضغط الكاملة، على الرغم من أن معظم المعاجين ستحمل ضغطاً خفيفاً على الفور.",
    "Thread sealant paste is preferred in applications where vibration or thermal cycling could cause PTFE tape to loosen, where the gap between threads is large (e.g., worn or oversized threads), or where the joint will be disassembled for maintenance. Common applications include pump housings, compressor fittings, hydraulic manifolds, large-diameter industrial piping, and any threaded connection that may need to be broken and remade during the equipment's service life.": "يُفضل معجون إحكام القلاوظ في التطبيقات التي قد تتسبب فيها الاهتزازات أو الدورات الحرارية في ارتخاء شريط PTFE، أو عندما تكون الفجوة بين القلاوظ كبيرة (مثل القلاوظ البالية أو كبيرة الحجم)، أو عندما يتم تفكيك الوصلة للصيانة. تشمل التطبيقات الشائعة أغلفة المضخات وتجهيزات الضواغط والمجمعات الهيدروليكية وخطوط الأنابيب الصناعية ذات القطر الكبير وأي توصيل ملولب قد يحتاج إلى التفكيك وإعادة التجميع خلال عمر المعدات.",
      "Recommended storage is a covered warehouse with ambient temperature 5-35°C, relative humidity below 70%, away from direct sunlight, in original sealed cartons. Do not stack more than 5 cartons high to avoid crushing the bottom rolls. Keep cartons away from heat sources (boilers, ovens, direct sunlit windows). If the warehouse is in a tropical climate, consider air conditioning or a dehumidifier to keep humidity below 70%.": "التخزين الموصى به هو مستودع مغطى بدرجة حرارة محيطة 5-35 درجة مئوية، ورطوبة نسبية أقل من 70%، بعيداً عن أشعة الشمس المباشرة، في صناديق مختومة أصلية. لا تكدس أكثر من 5 صناديق في الارتفاع لتجنب سحق اللفات السفلية. أبق الصناديق بعيداً عن مصادر الحرارة (الغلايات والأفران والنوافذ المعرضة لأشعة الشمس المباشرة). إذا كان المستودع في مناخ استوائي، فكر في تكييف الهواء أو مزيل الرطوبة للحفاظ على الرطوبة أقل من 70%.",
    "Before shipping a PTFE tape order, the exporter should verify four things: (1) the production date printed on the carton is recent (within 24 months is preferred for export to a hot climate; within 36 months is acceptable for temperate climates); (2) the cartons are intact, dry and show no signs of moisture damage; (3) the spool inside is intact, with no cracks, warping or discolouration; (4) the unroll test on a sample roll shows the tape unwinds smoothly without tearing or binding.": "قبل شحن طلب شريط PTFE، يجب على المصدر التحقق من أربعة أشياء: (1) تاريخ الإنتاج المطبوع على الصندوق حديث (خلال 24 شهراً مفضل للتصدير إلى مناخ حار؛ خلال 36 شهراً مقبول للمناخات المعتدلة)؛ (2) الصناديق سليمة وجافة ولا تظهر عليها علامات تلف الرطوبة؛ (3) البكرة الداخلية سليمة، بدون تشققات أو انحناء أو تغير لون؛ (4) اختبار الكشف على لفة عينة يُظهر أن الشريط ينكشف بسلاسة دون تمزق أو التصاق.",
    "For buyers, the receiving inspection should include a quick unroll test on 1-2 rolls per carton. Pull 1-2 metres of tape from the roll and check that it unwinds smoothly, has consistent thickness, is free of cuts or nicks, and the colour matches the specification. If a roll fails the unroll test, photograph the lot number and report the issue to the supplier within 7 days of receipt. Most reputable manufacturers will replace the affected rolls at no charge.": "بالنسبة للمشترين، يجب أن يشمل فحص الاستلام اختبار كشف سريع على 1-2 لفة لكل صندوق. اسحب 1-2 متر من الشريط من اللفة وتحقق من أنه ينكشف بسلاسة، وأن السماكة متسقة، وخالٍ من القطع أو الشقوق، واللون مطابق للمواصفات. إذا فشلت لفة في اختبار الكشف، صور رقم الدفعة وأبلغ المورد بالمشكلة في غضون 7 أيام من الاستلام. معظم المصنعين ذوي السمعة الطيبة سيستبدلون اللفات المتأثرة مجاناً.",
    "PTFE tape that is past its nominal 5-year shelf life is usually still functional if it has been stored correctly. The PTFE film itself does not chemically age, but the spool, label and packaging may have deteriorated. To test old tape, unroll 2-3 metres and check for: (1) flexibility — old tape may be stiffer; (2) colour — yellowing of white tape is a sign of UV exposure; (3) unwind quality — old tape may shred or break. If the tape passes these checks, it can usually be used for non-critical applications (cold water, non-gas, residential).": "شريط PTFE الذي تجاوز مدة صلاحيته الاسمية البالغة 5 سنوات لا يزال يعمل عادةً إذا تم تخزينه بشكل صحيح. غشاء PTFE نفسه لا يتقدم في السن كيميائياً، لكن البكرة والملصق والتعبئة قد تكون تدهورت. لاختبار الشريط القديم، انكشف 2-3 أمتار وتحقق من: (1) المرونة - قد يكون الشريط القديم أكثر صلابة؛ (2) اللون - اصفرار الشريط الأبيض علامة على التعرض للأشعة فوق البنفسجية؛ (3) جودة الكشف - قد يتمزق الشريط القديم أو ينكسر. إذا نجح الشريط في هذه الفحوصات، فيمكن استخدامه عادةً للتطبيقات غير الحرجة (الماء البارد، بدون غاز، سكني).",
    "Most importers do not actively destroy expired tape; instead, they discount it or repackage it as a value-tier SKU (e.g., 10m roll at a lower price, with a label note that the production date is older). The risk of using old tape is low for residential and non-critical applications. For critical applications (gas, high-pressure, industrial), expired tape should be replaced. Always check the spool and unroll quality before using tape that is past its nominal shelf life.": "لا يقوم معظم المستوردين بتدمير الشريط منتهي الصلاحية بشكل فعال؛ بدلاً من ذلك، يخفضون سعره أو يعيدون تعبئته كـ SKU من فئة القيمة (على سبيل المثال، لفة 10 م بسعر أقل، مع ملاحظة على الملصق بأن تاريخ الإنتاج أقدم). خطر استخدام الشريط القديم منخفض للتطبيقات السكنية وغير الحرجة. بالنسبة للتطبيقات الحرجة (الغاز، الضغط العالي، الصناعي)، يجب استبدال الشريط منتهي الصلاحية. تحقق دائماً من جودة البكرة والكشف قبل استخدام شريط تجاوز مدة صلاحيته الاسمية.",
    "Most reputable PTFE tape manufacturers print the production date (or batch number) on the carton label, and may also print the date on the individual spool. Common date coding systems include: (1) YYYYMMDD format (e.g., 20250615 = 15 June 2025); (2) YYMM format (e.g., 2506 = June 2025); (3) Julian date (e.g., 25166 = day 166 of 2025); (4) batch number (e.g., B250615-A1) where the first 6 digits are the date and the suffix is the production line/shift. Always confirm the date format with the supplier before ordering.": "يطبع معظم مصنعي شريط PTFE ذوي السمعة الطيبة تاريخ الإنتاج (أو رقم الدفعة) على ملصق الصندوق، وقد يطبعون التاريخ أيضاً على البكرة الفردية. تشمل أنظمة ترميز التاريخ الشائعة: (1) تنسيق YYYYMMDD (على سبيل المثال، 20250615 = 15 يونيو 2025)؛ (2) تنسيق YYMM (على سبيل المثال، 2506 = يونيو 2025)؛ (3) التاريخ اليولياني (على سبيل المثال، 25166 = اليوم 166 من 2025)؛ (4) رقم الدفعة (على سبيل المثال، B250615-A1) حيث الأرقام الستة الأولى هي التاريخ واللاحقة هي خط الإنتاج/الوردية. تأكد دائماً من تنسيق التاريخ مع المورد قبل الطلب.",
    "For importers, the carton label should always show the production date. If a supplier's label shows only a batch number without a date, ask for the batch-to-date conversion. Some manufacturers use a barcode that encodes the production date; in this case, request a copy of the barcode-decoding table so you can verify dates at the receiving inspection.": "بالنسبة للمستوردين، يجب أن يُظهر ملصق الصندوق دائماً تاريخ الإنتاج. إذا كان ملصق المورد يُظهر فقط رقم الدفعة بدون تاريخ، فاطلب تحويل الدفعة إلى تاريخ. يستخدم بعض المصنّعين رمز شريطي يُرمز تاريخ الإنتاج؛ في هذه الحالة، اطلب نسخة من جدول فك تشفير الرمز الشريطي حتى تتمكن من التحقق من التواريخ في فحص الاستلام.",
    "Most manufacturers rate shelf life at 5 years from production date when stored below 40°C, away from direct sunlight, in original sealed packaging. PTFE itself is chemically inert and does not degrade under normal conditions, but the spool (usually plastic or recycled plastic) and the packaging can degrade over time, leading to spool cracking, label discolouration or carton weakening.": "يصنف معظم المصنعين مدة الصلاحية بـ 5 سنوات من تاريخ الإنتاج عند تخزينه تحت 40 درجة مئوية، بعيداً عن أشعة الشمس المباشرة، في التعبئة الأصلية المختومة. PTFE نفسه خامل كيميائياً ولا يتدهور في الظروف العادية، لكن البكرة (عادة بلاستيك أو بلاستيك معاد تدويره) والتعبئة يمكن أن تتدهور بمرور الوقت، مما يؤدي إلى تشقق البكرة أو تغير لون الملصق أو ضعف الكرتون.",
    "PTFE does not chemically degrade under normal storage, but the plastic spool can become brittle over time, especially if exposed to UV or high temperature. If a spool cracks during unrolling, the tape is still usable but the spool should be replaced. A practical workaround is to use a separate plastic or cardboard sleeve to support the tape if the original spool fails.": "لا يتدهور PTFE كيميائياً في التخزين العادي، لكن البكرة البلاستيكية قد تصبح هشة بمرور الوقت، خاصة إذا تعرضت للأشعة فوق البنفسجية أو درجة حرارة عالية. إذا تشققت البكرة أثناء الكشف، يظل الشريط صالحاً للاستخدام ولكن يجب استبدال البكرة. الحل العملي هو استخدام غلاف بلاستيكي أو من الورق المقوى منفصل لدعم الشريط إذا فشلت البكرة الأصلية.",
    "Store in a covered warehouse at 5-35°C, relative humidity below 70%, away from direct sunlight, in original sealed cartons. Do not stack more than 5 cartons high. Avoid heat sources.": "خزن في مستودع مغطى بدرجة حرارة 5-35 درجة مئوية، ورطوبة نسبية أقل من 70%، بعيداً عن أشعة الشمس المباشرة، في صناديق مختومة أصلية. لا تكدس أكثر من 5 صناديق في الارتفاع. تجنب مصادر الحرارة.",
    "Nothing. PTFE remains flexible down to about -200°C, so a roll that has been stored in a cold warehouse or transported in winter is fully usable. The only concern with cold storage is that the plastic spool can become brittle, so handle with care to avoid cracking the spool during unrolling.": "لا شيء. يظل PTFE مرناً حتى حوالي -200 درجة مئوية، لذا فإن اللفة المخزنة في مستودع بارد أو المنقولة في الشتاء صالحة للاستخدام تماماً. القلق الوحيد من التخزين البارد هو أن البكرة البلاستيكية قد تصبح هشة، لذا تعامل بحذر لتجنب تشقق البكرة أثناء الكشف.",
    "Typical Shelf Life: 5 Years": "مدة الصلاحية النموذجية: 5 سنوات",
    "Storage Conditions": "ظروف التخزين",
    "What to Check Before Shipping": "ما يجب فحصه قبل الشحن",
    "Can Expired PTFE Tape Still Be Used?": "هل لا يزال من الممكن استخدام شريط PTFE منتهي الصلاحية؟",
    "How to Mark the Production Date": "كيفية تحديد تاريخ الإنتاج",
    "How long does PTFE tape last in storage?": "كم تدوم شريط PTFE في التخزين؟",
    "Can PTFE tape go bad?": "هل يمكن أن يفسد شريط PTFE؟",
    "How should PTFE tape be stored?": "كيف يجب تخزين شريط PTFE؟",
    "What happens if PTFE tape freezes?": "ماذا يحدث إذا تجمد شريط PTFE؟",
    "Both PTFE tape and thread sealant paste provide excellent sealing performance on properly machined tapered threads. The difference is in the failure mode: PTFE tape tends to leak slowly when it fails (allowing early detection and repair), while cured paste can fail catastrophically if the joint is overstressed (because the cured paste is rigid and does not yield). For most plumbing and industrial applications, the choice comes down to application preference, local code, and whether the joint will be disassembled.": "يوفر كل من شريط PTFE ومعجون إحكام القلاوظ أداء إحكام ممتاز على القلاوظ المخروطية المشكّلة بشكل صحيح. الفرق في وضع الفشل: يميل شريط PTFE إلى التسرب ببطء عند فشله (مما يسمح بالكشف المبكر والإصلاح)، في حين يمكن أن يفشل المعجون المتجمد بشكل كارثي إذا تعرضت الوصلة لإجهاد زائد (لأن المعجون المتجمد صلب ولا يستسلم). بالنسبة لمعظم تطبيقات السباكة والصناعية، يعود الاختيار إلى تفضيل التطبيق والكود المحلي وما إذا كانت الوصلة ستُفكك.",
    "For gas line connections, both methods are accepted by most gas codes, but many codes require both together (tape + paste) for gas installations above 2 inches, or for industrial gas lines. Always check the local gas code (e.g., ANSI LC 7-2009, BS 6891, EN 1775) before specifying a sealing method. The certification mark on the tape (e.g., UL, CSA, GASTEC) and the certification on the paste (e.g., CSA certified thread sealant) should be confirmed before installation.": "بالنسبة لتوصيلات خطوط الغاز، يتم قبول كلتا الطريقتين من قبل معظم أكواد الغاز، لكن العديد من الأكواد تتطلب كليهما معاً (شريط + معجون) لتركيبات الغاز فوق 2 بوصة، أو لخطوط الغاز الصناعية. تحقق دائماً من كود الغاز المحلي (على سبيل المثال، ANSI LC 7-2009، BS 6891، EN 1775) قبل تحديد طريقة الإحكام. يجب تأكيد علامة الاعتماد على الشريط (على سبيل المثال، UL، CSA، GASTEC) والاعتماد على المعجون (على سبيل المثال، مانع تسرب القلاوظ المعتمد من CSA) قبل التركيب.",
    "Use PTFE tape alone: residential cold and hot water plumbing, residential gas lines (where local code allows), low-pressure air lines, most OEM applications. Use thread sealant paste alone: large-diameter industrial piping, pump and compressor housings, hydraulic systems, where vibration is a concern, where the gap between threads is large, or where the joint must be removable. Use PTFE tape + paste together: critical gas line installations, high-pressure hydraulic, large-diameter gas, industrial steam, where the local code requires both.": "استخدم شريط PTFE وحده: سباكة المياه الباردة والساخنة السكنية، خطوط الغاز السكنية (حيث يسمح الكود المحلي)، خطوط الهواء منخفضة الضغط، معظم تطبيقات OEM. استخدم معجون إحكام القلاوظ وحده: خطوط الأنابيب الصناعية ذات القطر الكبير، أغلفة المضخات والضواغط، الأنظمة الهيدروليكية، عندما يكون الاهتزاز مصدر قلق، عندما تكون الفجوة بين القلاوظ كبيرة، أو عندما يجب أن تكون الوصلة قابلة للإزالة. استخدم شريط PTFE + المعجون معاً: تركيبات خطوط الغاز الحرجة، الهيدروليك عالي الضغط، الغاز ذو القطر الكبير، البخار الصناعي، عندما يتطلب الكود المحلي كليهما.",
    "When using both, apply the tape first (3-4 turns in the direction of joint tightening), then brush a thin layer of paste over the tape. The paste will fill any micro-gaps left by the tape and provide additional sealing force. Do not over-apply the paste: a thin, even layer is enough. Excess paste can be pushed into the pipe during joint make-up, where it can contaminate the system.": "عند استخدام كليهما، ضع الشريط أولاً (3-4 لفات في اتجاه شد الوصلة)، ثم ضع طبقة رقيقة من المعجون فوق الشريط. سيملأ المعجون أي فجوات صغيرة تركها الشريط ويوفر قوة إحكام إضافية. لا تضع كمية كبيرة من المعجون: طبقة رقيقة ومتساوية كافية. قد يتم دفع المعجون الزائد إلى داخل الأنبوب أثناء تركيب الوصلة، حيث يمكن أن يلوث النظام.",
    "PTFE tape is significantly cheaper per joint than thread sealant paste. A 19mm × 15m yellow gas tape roll at USD 0.28 covers approximately 50 joints (3 wraps each), or USD 0.0056 per joint. A 50ml tube of thread sealant paste at USD 5 covers approximately 30-50 joints, or USD 0.10-0.17 per joint. Tape is 15-30 times cheaper per joint than paste.": "شريط PTFE أرخص بكثير لكل وصلة من معجون إحكام القلاوظ. لفة شريط غاز أصفر 19 مم × 15 م بسعر 0.28 دولار تغطي حوالي 50 وصلة (3 لفات لكل واحدة)، أو 0.0056 دولار لكل وصلة. أنبوب معجون إحكام 50 مل بسعر 5 دولارات يغطي حوالي 30-50 وصلة، أو 0.10-0.17 دولار لكل وصلة. الشريط أرخص بـ 15-30 مرة لكل وصلة من المعجون.",
    "For large projects (industrial plants, apartment buildings, ships), the cost difference adds up. A 500-joint industrial installation using paste costs USD 50-85 in sealant. The same installation using tape costs USD 2.80 in tape. For B2B buyers choosing between the two, the cost difference is rarely the deciding factor; performance and code compliance are more important. But for residential and small commercial projects, the cost difference makes tape the default choice.": "بالنسبة للمشاريع الكبيرة (المصانع والمباني السكنية والسفن)، يضاف فرق التكلفة. تركيب صناعي بـ 500 وصلة باستخدام المعجون يكلف 50-85 دولار من مانع التسرب. نفس التركيب باستخدام الشريط يكلف 2.80 دولار من الشريط. بالنسبة لمشتري B2B الذين يختارون بين الاثنين، نادراً ما يكون فرق التكلفة هو العامل الحاسم؛ الأداء والامتثال للكود أكثر أهمية. ولكن بالنسبة للمشاريع السكنية والتجارية الصغيرة، فإن فرق التكلفة يجعل الشريط هو الخيار الافتراضي.",
    "Yes. Apply the PTFE tape first (3-4 turns in the direction of joint tightening), then brush a thin layer of thread sealant paste over the tape. This combination is standard practice in industrial and high-pressure installations. The tape provides the primary seal; the paste fills micro-gaps and locks the tape in place. The combined cost per joint is approximately USD 0.02-0.05 (tape + small amount of paste), still much cheaper than paste alone.": "نعم. ضع شريط PTFE أولاً (3-4 لفات في اتجاه شد الوصلة)، ثم ضع طبقة رقيقة من معجون إحكام القلاوظ فوق الشريط. هذه التركيبة هي ممارسة قياسية في التركيبات الصناعية وذات الضغط العالي. يوفر الشريط الإحكام الأساسي؛ يملأ المعجون الفجوات الصغيرة ويثبت الشريط في مكانه. التكلفة المجمعة لكل وصلة حوالي 0.02-0.05 دولار (شريط + كمية صغيرة من المعجون)، لا تزال أرخص بكثير من المعجون وحده.",
    "Both are accepted by most gas codes, but many codes require a yellow gas tape that meets a recognised standard (e.g., UL, CSA, GASTEC, EN 751-3) for residential gas lines. For commercial and industrial gas lines above 2 inches, codes often require a yellow gas tape plus a thread sealant paste certified for gas service. Always verify with the local authority having jurisdiction (AHJ) before installation.": "يتم قبول كل منهما من قبل معظم أكواد الغاز، لكن العديد من الأكواد تتطلب شريط غاز أصفر يفي بمعيار معترف به (على سبيل المثال، UL، CSA، GASTEC، EN 751-3) لخطوط الغاز السكنية. بالنسبة لخطوط الغاز التجارية والصناعية فوق 2 بوصة، غالباً ما تتطلب الأكواد شريط غاز أصفر بالإضافة إلى معجون إحكام معتمد لخدمة الغاز. تحقق دائماً مع السلطة المحلية المختصة (AHJ) قبل التركيب.",
    "Yes. PTFE tape is the standard sealant for PEX, CPVC and PVC threaded fittings. The tape acts as both a seal and a lubricant, allowing the plastic threads to be tightened without galling. Avoid using thread sealant paste on plastic threads unless the paste is specifically labelled as plastic-safe: some anaerobic sealants will stress-crack ABS and other plastics.": "نعم. شريط PTFE هو مانع التسرب القياسي لتجهيزات PEX و CPVC و PVC الملولبة. يعمل الشريط كمانع تسرب ومواد تشحيم في نفس الوقت، مما يسمح بشد القلاوظ البلاستيكية دون التحام. تجنب استخدام معجون إحكام القلاوظ على القلاوظ البلاستيكية ما لم يتم تصنيف المعجون على أنه آمن للبلاستيك: بعض مانعات التسرب اللاهوائية ستسبب تشقق الإجهاد في ABS والبلاستيكيات الأخرى.",
    "For residential hot water, tape is sufficient and is the standard. For commercial hot water (above 80°C / 176°F), the higher temperature can cause some paste formulations to dry out and crack over time. A high-density yellow gas tape (rated 0.8-1.0 g/cm³, 0.2mm thick) is more reliable for continuous hot water service above 80°C.": "بالنسبة للماء الساخن السكني، الشريط كافٍ وهو المعيار. بالنسبة للماء الساخن التجاري (فوق 80 درجة مئوية / 176 فهرنهايت)، يمكن أن تتسبب درجة الحرارة الأعلى في جفاف بعض تركيبات المعجون وتشققها بمرور الوقت. شريط غاز أصفر عالي الكثافة (مصنف 0.8-1.0 جم/سم³، 0.2 مم سماكة) أكثر موثوقية لخدمة الماء الساخن المستمرة فوق 80 درجة مئوية.",
    "PTFE Tape: How It Works": "شريط PTFE: كيف يعمل",
    "Thread Sealant Paste: How It Works": "معجون إحكام القلاوظ: كيف يعمل",
    "PTFE Tape vs Paste: Sealing Performance": "شريط PTFE مقابل المعجون: أداء الإحكام",
    "When to Use Tape, Paste, or Both": "متى تستخدم الشريط أو المعجون أو كليهما",
    "Cost Comparison": "مقارنة التكلفة",
    "Which is better for gas lines, tape or paste?": "ما الأفضل لخطوط الغاز، الشريط أم المعجون؟",
    "Can PTFE tape be used on plastic threads?": "هل يمكن استخدام شريط PTFE على القلاوظ البلاستيكية؟",
    "Is paste better than tape for hot water lines?": "هل المعجون أفضل من الشريط لخطوط الماء الساخن؟",
      "PTFE tape and Teflon tape are the same product. Both refer to a thin film of expanded polytetrafluoroethylene (PTFE) used to seal threaded pipe connections. \"Teflon\" is the brand name registered by Chemours (formerly DuPont) for its PTFE resin. Generic PTFE tape has the same chemical composition as branded Teflon tape. The terms are used interchangeably in plumbing, hardware and industrial supply. The only practical difference is the price: branded Teflon tape commands a 20-50% price premium because of the brand recognition, while generic PTFE tape offers identical sealing performance at a lower cost.": "شريط PTFE وشريط تفلون هما نفس المنتج. يشير كلاهما إلى غشاء رقيق من البولي تترا فلورو إيثيلين الموسع (PTFE) يستخدم لإحكام توصيلات الأنابيب الملولبة. \"تفلون\" هو الاسم التجاري المسجل لشركة Chemours (سابقاً DuPont) لراتينج PTFE الخاص بها. شريط PTFE العام له نفس التركيب الكيميائي مثل شريط تفلون التجاري. تُستخدم المصطلحات بالتبادل في السباكة والأجهزة والتوريد الصناعي. الاختلاف العملي الوحيد هو السعر: شريط تفلون التجاري يحصل على علاوة سعر 20-50% بسبب التعرف على العلامة التجارية، بينما يقدم شريط PTFE العام أداء إحكام مماثل بتكلفة أقل.",
    "Chemours' Teflon brand commands a 20-50% price premium over generic PTFE tape because of the brand recognition, the longer track record in industrial applications (since 1945), and the certified specifications attached to Teflon-branded products. From a chemistry perspective, generic PTFE tape and Teflon tape are identical: both are made from expanded PTFE resin, both have the same density range (0.3-1.0 g/cm³), and both are certified to the same ASTM and ISO standards. The premium you pay for Teflon branding is for the brand, not for any additional sealing performance.": "تحصل علامة تفلون التجارية من Chemours على علاوة سعر 20-50% مقارنة بشريط PTFE العام بسبب التعرف على العلامة التجارية، والسجل الطويل في التطبيقات الصناعية (منذ 1945)، والمواصفات المعتمدة المرفقة بمنتجات تفلون التجارية. من منظور كيميائي، شريط PTFE العام وشريط تفلون متطابقان: كلاهما مصنوع من راتينج PTFE الموسع، وكلاهما له نفس نطاق الكثافة (0.3-1.0 جم/سم³)، وكلاهما معتمد وفقاً لنفس معايير ASTM و ISO. العلاوة التي تدفعها مقابل علامة تفلون التجارية هي للعلامة، وليس لأي أداء إحكام إضافي.",
    "No. The Teflon brand name is protected by trademark law. You cannot legally label generic PTFE tape as \"Teflon tape\" or use the Teflon logo on your packaging without authorisation from Chemours. If you want to sell tape under a premium brand name, you must either license the Teflon name from Chemours (which is expensive and has strict quality requirements) or build your own brand (which is the standard approach for most PTFE tape buyers). For OEM private label programs, you use your own brand name on the spool, label and packaging.": "لا. اسم علامة تفلون التجارية محمي بموجب قانون العلامات التجارية. لا يمكنك قانونياً تسمية شريط PTFE العام بـ \"شريط تفلون\" أو استخدام شعار تفلون على عبوته دون إذن من Chemours. إذا كنت ترغب في بيع الشريط تحت اسم علامة تجارية مميزة، فيجب عليك إما ترخيص اسم تفلون من Chemours (وهو مكلف ولديه متطلبات جودة صارمة) أو بناء علامتك التجارية الخاصة (وهو النهج القياسي لمعظم مشتري شريط PTFE). بالنسبة لبرامج العلامات الخاصة OEM، استخدم اسم علامتك التجارية على البكرة والملصق والعبوة.",
    "No. Generic PTFE tape is manufactured to the same chemical and physical specifications as branded Teflon tape. Both use expanded PTFE resin (CAS 9002-84-0), both are tested to the same ASTM D3308 and ISO 9001 standards, and both provide equivalent sealing performance. Independent lab tests have repeatedly shown that generic PTFE tape and branded Teflon tape have the same density, thickness, tensile strength and elongation. The only differences are the label, the colour of the spool, and the price. For most B2B applications, generic PTFE tape is the better value.": "لا. يتم تصنيع شريط PTFE العام وفقاً لنفس المواصفات الكيميائية والفيزيائية مثل شريط تفلون التجاري. كلاهما يستخدم راتينج PTFE الموسع (CAS 9002-84-0)، وكلاهما يتم اختباره وفقاً لنفس معايير ASTM D3308 و ISO 9001، وكلاهما يوفر أداء إحكام مماثل. أظهرت اختبارات المختبرات المستقلة مراراً وتكراراً أن شريط PTFE العام وشريط تفلون التجاري لهما نفس الكثافة والسماكة وقوة الشد والاستطالة. الاختلافات الوحيدة هي الملصق ولون البكرة والسعر. بالنسبة لمعظم تطبيقات B2B، شريط PTFE العام هو القيمة الأفضل.",
    "For cold water plumbing, standard white PTFE tape (0.3-0.4 g/cm³ density, 0.075mm thickness) is the standard. Cold water lines operate at 0-25°C and at pressures up to 10 bar (residential) or 16 bar (commercial). Standard white plumber tape is rated for -200°C to +260°C, so cold water is well within the rating. No special high-density or gas-rated tape is required for cold water lines.": "بالنسبة لسباكة الماء البارد، شريط PTFE الأبيض القياسي (كثافة 0.3-0.4 جم/سم³، سماكة 0.075 مم) هو المعيار. تعمل خطوط الماء البارد عند 0-25 درجة مئوية وعند ضغوط تصل إلى 10 بار (سكني) أو 16 بار (تجاري). شريط السباكة الأبيض القياسي مصنف من -200 درجة مئوية إلى +260 درجة مئوية، لذلك فإن الماء البارد يقع ضمن التصنيف بكثير. لا يلزم شريط خاص عالي الكثافة أو مخصص للغاز لخطوط الماء البارد.",
    "The most common cold water installation mistakes are: (1) over-wrapping — using 8-10 wraps instead of 3-5, which prevents proper thread engagement; (2) wrapping counter-clockwise — the tape unravels when the fitting is tightened; (3) applying tape to female threads instead of male threads; (4) failing to clean old tape from the threads before re-taping (old tape residue can prevent the new tape from seating); (5) tightening the fitting too much — for tapered threads (NPT/BSPT), hand-tight plus 1-2 turns with a wrench is usually enough; over-tightening cracks female fittings.": "أخطاء تركيب الماء البارد الأكثر شيوعاً هي: (1) اللف الزائد - استخدام 8-10 لفات بدلاً من 3-5، مما يمنع اشتباك القلاوظ الصحيح؛ (2) اللف عكس اتجاه عقارب الساعة - الشريط ينكشف عند شد التركيب؛ (3) وضع الشريط على القلاوظ الأنثوي بدلاً من الذكري؛ (4) عدم تنظيف الشريط القديم من القلاوظ قبل إعادة اللف (بقايا الشريط القديم قد تمنع الشريط الجديد من الاستقرار)؛ (5) شد التركيب أكثر من اللازم - بالنسبة للقلاوظ المخروطية (NPT/BSPT)، الشد اليدوي زائد 1-2 لفات بمفتاح ربط عادة ما يكون كافياً؛ الشد الزائد يشقق التركيبات الأنثوية.",
    "PTFE tape is chemically inert and compatible with all common plumbing materials: copper, brass, stainless steel, PEX, CPVC, PVC, and galvanised steel. The tape does not react with the pipe material and does not introduce contaminants into the water supply. For copper pipes, PTFE tape is the standard. For PEX and PVC threaded fittings, PTFE tape is preferred over paste because the paste can stress-crack some plastics. For galvanised steel, both tape and paste work; tape is cheaper.": "شريط PTFE خامل كيميائياً ومتوافق مع جميع مواد السباكة الشائعة: النحاس والنحاس الأصفر والفولاذ المقاوم للصدأ و PEX و CPVC و PVC والفولاذ المجلفن. الشريط لا يتفاعل مع مادة الأنبوب ولا يدخل ملوثات في إمداد المياه. بالنسبة لأنابيب النحاس، شريط PTFE هو المعيار. بالنسبة لتجهيزات PEX و PVC الملولبة، يفضل شريط PTFE على المعجون لأن المعجون يمكن أن يتسبب في تشقق الإجهاد لبعض البلاستيكيات. بالنسبة للفولاذ المجلفن، يعمل كل من الشريط والمعجون؛ الشريط أرخص.",
    "For cold water storage, the same rules apply as for general PTFE tape storage: keep below 40°C, below 70% humidity, away from direct sunlight, in original sealed packaging. In a cold warehouse (0-10°C), the tape is fully usable; the only concern is that the plastic spool can become brittle in extreme cold, so handle with care during unrolling. PTFE itself remains flexible down to -200°C, so cold storage does not affect sealing performance.": "بالنسبة لتخزين الماء البارد، تنطبق نفس القواعد مثل التخزين العام لشريط PTFE: حافظ على درجة حرارة أقل من 40 درجة مئوية، ورطوبة أقل من 70%، بعيداً عن أشعة الشمس المباشرة، في التعبئة الأصلية المختومة. في المستودع البارد (0-10 درجة مئوية)، الشريط صالح للاستخدام تماماً؛ القلق الوحيد هو أن البكرة البلاستيكية قد تصبح هشة في البرد الشديد، لذا تعامل بحذر أثناء الكشف. يظل PTFE نفسه مرناً حتى -200 درجة مئوية، لذلك لا يؤثر التخزين البارد على أداء الإحكام.",
    "Choose a different tape if: (1) the water line will be exposed to high temperatures (above 95°C continuously) — use a high-density yellow or red high-temperature tape; (2) the line is for natural gas or propane — use a yellow gas-rated tape that meets the local code (UL, CSA, EN 751-3); (3) the joint is a compression fitting — PTFE tape is not needed (and should not be used); (4) the joint is in a system with severe vibration (large pumps, compressors) — use a thread sealant paste plus PTFE tape. For standard cold water plumbing, white PTFE tape is the correct choice.": "اختر شريطاً مختلفاً إذا: (1) سيتعرض خط الماء لدرجات حرارة عالية (فوق 95 درجة مئوية باستمرار) - استخدم شريطاً أصفر عالي الكثافة أو شريطاً أحمر لدرجات الحرارة العالية؛ (2) الخط للغاز الطبيعي أو البروبان - استخدم شريطاً أصفر مخصصاً للغاز يفي بالكود المحلي (UL، CSA، EN 751-3)؛ (3) الوصلة تركيب ضغط - لا حاجة لشريط PTFE (ولا ينبغي استخدامه)؛ (4) الوصلة في نظام به اهتزاز شديد (مضخات كبيرة، ضواغط) - استخدم معجون إحكام القلاوظ بالإضافة إلى شريط PTFE. بالنسبة لسباكة الماء البارد القياسية، شريط PTFE الأبيض هو الخيار الصحيح.",
    "For hot water plumbing, standard white PTFE tape (0.3-0.4 g/cm³ density, 0.075mm thickness) is suitable for most residential applications. Hot water lines in residential plumbing operate at 50-65°C (typical hot water tank) to 70-80°C (high-temperature tankless), well within the rating of standard tape. For commercial hot water (above 80°C continuously, such as in hotels, hospitals, or industrial washing), a high-density yellow gas tape (0.8-1.0 g/cm³, 0.2mm thick) is recommended because the higher density and thickness provide more sealing material to withstand prolonged high-temperature exposure.": "بالنسبة لسباكة الماء الساخن، شريط PTFE الأبيض القياسي (كثافة 0.3-0.4 جم/سم³، سماكة 0.075 مم) مناسب لمعظم التطبيقات السكنية. تعمل خطوط الماء الساخن في السباكة السكنية عند 50-65 درجة مئوية (خزان الماء الساخن النموذجي) إلى 70-80 درجة مئوية (بدون خزان عالي الحرارة)، ضمن تصنيف الشريط القياسي بكثير. بالنسبة للماء الساخن التجاري (فوق 80 درجة مئوية باستمرار، كما في الفنادق أو المستشفيات أو الغسيل الصناعي)، يوصى بشريط غاز أصفر عالي الكثافة (0.8-1.0 جم/سم³، 0.2 مم سماكة) لأن الكثافة والسماكة الأعلى توفر المزيد من مواد الإحكام لتحمل التعرض المطول لدرجات الحرارة العالية.",
    "The most common hot water failure modes are: (1) fitting loosening due to thermal cycling — every time the water heater cycles on, the metal fitting expands and contracts slightly; over hundreds of cycles, a marginal seal can fail. (2) paste drying out — some thread sealant pastes dry and crack above 80°C; PTFE tape is more reliable because it is solid and does not age. (3) tape relaxation — at sustained high temperatures, PTFE tape can slowly relax; a higher-density tape (0.4-0.5 g/cm³) resists relaxation better. For hot water lines, use a high-density tape (yellow gas tape or high-density white) for long-term reliability.": "أوضاع فشل الماء الساخن الأكثر شيوعاً هي: (1) ارتخاء التركيب بسبب الدورة الحرارية - في كل مرة يتم فيها تشغيل سخان الماء، يتمدد التركيب المعدني وينكمش قليلاً؛ على مدى مئات الدورات، قد يفشل إحكام حرج. (2) جفاف المعجون - بعض معاجين إحكام القلاوظ تجف وتتشقق فوق 80 درجة مئوية؛ شريط PTFE أكثر موثوقية لأنه صلب ولا يتقدم في السن. (3) ارتخاء الشريط - في درجات الحرارة العالية المستمرة، قد يرتخي شريط PTFE ببطء؛ شريط الكثافة الأعلى (0.4-0.5 جم/سم³) يقاوم الارتخاء بشكل أفضل. لخطوط الماء الساخن، استخدم شريطاً عالي الكثافة (شريط غاز أصفر أو أبيض عالي الكثافة) للموثوقية على المدى الطويل.",
    "PTFE tape is compatible with all common hot water plumbing materials: copper, brass, stainless steel, PEX, CPVC, and galvanised steel. At sustained temperatures above 80°C, two material-specific considerations apply: (1) for PEX, the pipe itself is rated to 95°C (PE-Xa) or 110°C (PE-Xb/cross-linked); standard PTFE tape is compatible at all PEX-rated temperatures. (2) For CPVC, the pipe is rated to 90-100°C; standard PTFE tape is compatible. (3) For PPR (polypropylene random copolymer), used in some hot water installations in Europe and Asia, PTFE tape is compatible up to 95°C; check the local PPR manufacturer's specifications for higher temperatures.": "شريط PTFE متوافق مع جميع مواد سباكة الماء الساخن الشائعة: النحاس والنحاس الأصفر والفولاذ المقاوم للصدأ و PEX و CPVC والفولاذ المجلفن. عند درجات الحرارة المستمرة فوق 80 درجة مئوية، ينطبق اعتباران خاصان بالمادة: (1) بالنسبة لـ PEX، الأنبوب نفسه مصنف لـ 95 درجة مئوية (PE-Xa) أو 110 درجة مئوية (PE-Xb/مترابط)؛ شريط PTFE القياسي متوافق في جميع درجات حرارة PEX المصنفة. (2) بالنسبة لـ CPVC، الأنبوب مصنف لـ 90-100 درجة مئوية؛ شريط PTFE القياسي متوافق. (3) بالنسبة لـ PPR (بوليمر بولي بروبيلين عشوائي)، المستخدم في بعض تركيبات الماء الساخن في أوروبا وآسيا، شريط PTFE متوافق حتى 95 درجة مئوية؛ تحقق من مواصفات الشركة المصنعة المحلية لـ PPR لدرجات الحرارة الأعلى.",
    "For best results on hot water lines, follow these best practices: (1) Use 3-4 wraps of high-density yellow gas tape (0.8-1.0 g/cm³) instead of standard white tape. (2) Hand-tighten the joint plus 1-2 turns with a wrench; do not over-tighten. (3) After the first 24 hours of operation, re-check the joint for any sign of weeping and re-tighten if necessary. (4) For water heaters, install a drip pan and pressure relief valve per local code. (5) For long horizontal runs of hot water pipe, allow for thermal expansion by leaving 1-2cm of clearance at each penetration. (6) Consider a brass or stainless steel fitting rather than a plastic fitting for hot water connections above 80°C; plastic fittings have lower temperature ratings and may fail over time.": "للحصول على أفضل النتائج على خطوط الماء الساخن، اتبع أفضل الممارسات هذه: (1) استخدم 3-4 لفات من شريط الغاز الأصفر عالي الكثافة (0.8-1.0 جم/سم³) بدلاً من الشريط الأبيض القياسي. (2) شد الوصلة يدوياً زائد 1-2 لفات بمفتاح ربط؛ لا تشد أكثر من اللازم. (3) بعد أول 24 ساعة من التشغيل، أعد فحص الوصلة لأي علامة تعرق وأحكم الربط إذا لزم الأمر. (4) بالنسبة لسخانات المياه، ركب صينية تقطير وصمام تخفيف الضغط وفقاً للكود المحلي. (5) للجولات الأفقية الطويلة لأنابيب الماء الساخن، اترك مجالاً للتمدد الحراري بترك 1-2 سم من الخلوص عند كل اختراق. (6) فكر في تركيب من النحاس الأصفر أو الفولاذ المقاوم للصدأ بدلاً من التركيب البلاستيكي لتوصيلات الماء الساخن فوق 80 درجة مئوية؛ التركيبات البلاستيكية لها تصنيفات درجة حرارة أقل وقد تفشل بمرور الوقت.",
      "Gas pipe applications require careful product selection and local compliance awareness. Many markets prefer yellow PTFE thread seal tape that meets the local gas code, but the density, certification and certification mark printed on the spool vary by jurisdiction. This article gives overseas buyers a practical framework for selecting the right gas tape SKU, requesting quotations, and confirming compliance with the importing country.": "تتطلب تطبيقات أنابيب الغاز اختياراً دقيقاً للمنتج والوعي بالامتثال المحلي. تفضل many أسواق شريط إحكام القلاوظ PTFE الأصفر الذي يفي بكود الغاز المحلي، لكن الكثافة والاعتماد وعلامة الاعتماد المطبوعة على البكرة تختلف حسب الولاية القضائية. تقدم هذه المقالة للمشترين في الخارج إطاراً عملياً لاختيار SKU شريط الغاز الصحيح وطلب عروض الأسعار وتأكيد الامتثال للبلد المستورد.",
    "For overseas procurement, the most important step is to define the target SKU before requesting prices. A supplier can quote more accurately when given a clear specification: width (12mm / 19mm / 25mm), length (5m / 10m / 15m / 20m), thickness (0.075mm / 0.1mm / 0.2mm), density (0.3-0.4 g/cm³ for general use, 0.4-0.5 g/cm³ for high pressure, 0.8-1.0 g/cm³ for gas), color (white, yellow, or custom), and spool (white, blue, yellow, or custom). With these details, the supplier can provide a price per roll, MOQ, lead time, and a sample.": "بالنسبة للمشتريات الخارجية، أهم خطوة هي تحديد SKU المستهدف قبل طلب الأسعار. يمكن للمورد الاقتباس بدقة أكبر عند تقديم مواصفات واضحة: العرض (12 مم / 19 مم / 25 مم)، الطول (5 م / 10 م / 15 م / 20 م)، السماكة (0.075 مم / 0.1 مم / 0.2 مم)، الكثافة (0.3-0.4 جم/سم³ للاستخدام العام، 0.4-0.5 جم/سم³ للضغط العالي، 0.8-1.0 جم/سم³ للغاز)، اللون (أبيض، أصفر، أو مخصص)، والبكرة (أبيض، أزرق، أصفر، أو مخصص). بهذه التفاصيل، يمكن للمورد تقديم سعر لكل لفة، الحد الأدنى للطلب، وقت التسليم، وعينة.",
    "PTFE tape is widely used in plumbing, water pipe fittings, faucets, valves, hardware kits, construction maintenance and general industrial sealing. Gas-rated yellow tape is a specialty grade used in natural gas, propane, butane, LPG and other hydrocarbon installations. For an overseas buyer, the most reliable sourcing approach is to identify the target market's gas code first, then select a tape SKU that meets the code, then confirm the supplier can print the certification mark on the spool or label.": "يستخدم شريط PTFE على نطاق واسع في السباكة وتجهيزات أنابيب المياه والحنفيات والصمامات ومجموعات الأجهزة وصيانة البناء والإحكام الصناعي العام. الشريط الأصفر المصنف للغاز هو درجة متخصصة تستخدم في الغاز الطبيعي والبروبان والبيوتان وغاز البترول المسال وتركيبات الهيدروكربون الأخرى. بالنسبة للمشتري في الخارج، النهج الأكثر موثوقية للمصادر هو تحديد كود الغاز للسوق المستهدف أولاً، ثم تحديد SKU شريط يفي بالكود، ثم تأكيد أن المورد يمكنه طباعة علامة الاعتماد على البكرة أو الملصق.",
    "When comparing suppliers, ask for clear specification details instead of relying only on product names. A product called \"yellow gas tape\" in one factory's catalog may be 0.6 g/cm³ density, while another factory's \"yellow gas tape\" is 0.8 g/cm³. The lower-density product will not meet the requirements of major gas codes. Request a specification sheet, a sample, and a factory test report for the density and thickness of the gas tape you are considering.": "عند مقارنة الموردين، اطلب تفاصيل مواصفات واضحة بدلاً من الاعتماد فقط على أسماء المنتجات. قد يكون المنتج المسمى \"شريط غاز أصفر\" في كتالوج أحد المصانع بكثافة 0.6 جم/سم³، في حين أن \"شريط غاز أصفر\" من مصنع آخر بكثافة 0.8 جم/سم³. لن يفي منتج الكثافة الأقل بمتطلبات أكواد الغاز الرئيسية. اطلب ورقة مواصفات وعينة وتقرير اختبار المصنع للكثافة والسماكة لشريط الغاز الذي تفكر فيه.",
    "Quality control for PTFE tape should focus on repeatability. A good factory checks width, length, winding appearance, tape density, and tape thickness on a sample basis (typically AQL 1.5-2.5) and provides a Certificate of Analysis (COA) with each shipment. For gas tape, additional tests such as gas compatibility (no degradation in methane, propane, or butane environments) and high-temperature ageing (the tape should not crack or lose tensile strength after 24 hours at 200°C) are recommended for buyers with strict quality requirements.": "يجب أن تركز مراقبة الجودة لشريط PTFE على التكرار. يفحص المصنع الجيد العرض والطول ومظهر اللف وكثافة الشريط وسماكته على أساس العينة (عادة AQL 1.5-2.5) ويقدم شهادة تحليل (COA) مع كل شحنة. بالنسبة لشريط الغاز، يوصى بإجراء اختبارات إضافية مثل التوافق مع الغاز (لا تدهور في بيئات الميثان أو البروبان أو البيوتان) والشيخوخة في درجات الحرارة العالية (يجب ألا يتشقق الشريط أو يفقد قوة الشد بعد 24 ساعة عند 200 درجة مئوية) للمشترين الذين لديهم متطلبات جودة صارمة.",
    "Delivery time is influenced by order quantity and packaging complexity. Standard tape with common packaging can usually be produced in 15-20 days; OEM packaging (custom spool, custom label, custom box) usually requires 30-45 days. For first-time orders, the supplier may need an additional 5-10 days to source custom packaging materials. Sea freight from China to most ports takes 18-30 days; air freight takes 3-7 days but is more expensive. For buyers with tight timelines, air freight of a small initial order followed by sea freight of subsequent orders is a common approach.": "يتأثر وقت التسليم بكمية الطلب وتعقيد التغليف. يمكن عادة إنتاج الشريط القياسي بالتغليف الشائع في 15-20 يوماً؛ عادة ما يتطلب التغليف OEM (بكرة مخصصة، ملصق مخصص، صندوق مخصص) 30-45 يوماً. بالنسبة للطلبات الأولى، قد يحتاج المورد إلى 5-10 أيام إضافية للحصول على مواد التغليف المخصصة. يستغرق الشحن البحري من الصين إلى معظم الموانئ 18-30 يوماً؛ يستغرق الشحن الجوي 3-7 أيام لكنه أغلى. بالنسبة للمشترين الذين لديهم مواعيد ضيقة، فإن الشحن الجوي لطلب أولي صغير يليه الشحن البحري للطلبات اللاحقة هو نهج شائع.",
    "For quotations, provide the exact product specification and target packing. A useful inquiry includes: product type, width × length × thickness × density, color, spool color, individual roll packaging (shrink wrap, label, bag), display box, export carton, MOQ per SKU, target FOB or CIF port, target delivery time, and any specific certification requirements. With this information, the supplier can provide a complete quotation including unit price, MOQ, lead time, payment terms, and sample availability.": "للحصول على عروض أسعار، قدم مواصفات المنتج الدقيقة والتغليف المستهدف. يتضمن الاستفسار المفيد: نوع المنتج، العرض × الطول × السماكة × الكثافة، اللون، لون البكرة، تغليف اللفة الفردية (غلاف انكماش، ملصق، كيس)، صندوق العرض، كرتون التصدير، الحد الأدنى للطلب لكل SKU، ميناء FOB أو CIF المستهدف، وقت التسليم المستهدف، وأي متطلبات اعتماد محددة. بهذه المعلومات، يمكن للمورد تقديم عرض سعر كامل يشمل سعر الوحدة، الحد الأدنى للطلب، وقت التسليم، شروط الدفع، وتوافر العينات.",
    "For B2B purchasing teams, PTFE tape should be treated as a specification product rather than a generic accessory. The same density, width, length and certification standard should be ordered consistently across orders to ensure quality and traceability. A specification sheet (one page listing all key parameters) shared with the supplier, signed and dated by both sides, prevents miscommunication and disputes.": "بالنسبة لفرق المشتريات B2B، يجب التعامل مع شريط PTFE كمنتج بمواصفات محددة بدلاً من ملحق عام. يجب طلب نفس الكثافة والعرض والطول ومعيار الاعتماد باستمرار عبر جميع الطلبات لضمان الجودة والتتبع. ورقة المواصفات (صفحة واحدة تسرد جميع المعلمات الرئيسية) تتم مشاركتها مع المورد، موقعة ومؤرخة من كلا الطرفين، تمنع سوء التواصل والنزاعات.",
    "Another useful step is to separate product decisions from packaging decisions. First confirm the tape specification that meets the target market's gas code (e.g., yellow gas tape 0.8-1.0 g/cm³, 0.2mm, 19mm width). Then decide on packaging: spool material (plastic, recycled plastic, paper), spool colour, individual roll packaging (shrink wrap, label, bag), display box, and export carton printing. This two-step approach keeps the tape spec consistent across markets and lets packaging be customised per market without re-engineering the tape.": "خطوة مفيدة أخرى هي فصل قرارات المنتج عن قرارات التغليف. أولاً، أكد مواصفات الشريط التي تفي بكود الغاز للسوق المستهدف (على سبيل المثال، شريط غاز أصفر 0.8-1.0 جم/سم³، 0.2 مم، 19 مم عرض). ثم قرر التغليف: مادة البكرة (بلاستيك، بلاستيك معاد تدويره، ورق)، لون البكرة، تغليف اللفة الفردية (غلاف انكماش، ملصق، كيس)، صندوق العرض، وطباعة كرتون التصدير. يحافظ نهج الخطوتين هذا على اتساق مواصفات الشريط عبر الأسواق ويسمح بتخصيص التغليف لكل سوق دون إعادة هندسة الشريط.",
    "If you are building a new product line, it is usually better to start with a small number of well-defined SKUs instead of offering every possible variant. A typical new product launch can start with 5-8 SKUs covering the most common sizes (12mm × 10m white, 12mm × 20m white, 19mm × 15m white, 19mm × 15m yellow gas, 12mm × 10m pink potable, 12mm × 10m red high-temperature, 19mm × 20m white, 19mm × 5m display box). After 6-12 months, sales data will show which SKUs are selling and which can be dropped. Adding more SKUs is easier than deleting underperforming ones.": "إذا كنت تبني خط منتجات جديد، فمن الأفضل عادة البدء بعدد صغير من SKU محددة جيداً بدلاً من تقديم كل variante ممكنة. يمكن أن يبدأ إطلاق منتج نموذجي جديد بـ 5-8 SKU تغطي الأحجام الأكثر شيوعاً (12 مم × 10 م أبيض، 12 مم × 20 م أبيض، 19 مم × 15 م أبيض، 19 مم × 15 م أصفر غاز، 12 مم × 10 م وردي صالح للشرب، 12 مم × 10 م أحمر حرارة عالية، 19 مم × 20 م أبيض، 19 مم × 5 م صندوق عرض). بعد 6-12 شهراً، ستظهر بيانات المبيعات SKU التي تباع وأيها يمكن إسقاطه. إضافة المزيد من SKU أسهل من حذف تلك ذات الأداء الضعيف.",
    "The accepted PTFE tape specification for gas lines varies by jurisdiction. In the United States, the Uniform Plumbing Code (UPC) and the International Plumbing Code (IPC) reference ANSI LC 7-2009 for gas-rated thread sealant tape, which specifies a minimum density of 0.8 g/cm³ and minimum thickness of 0.1mm. In the European Union, EN 751-3 governs sealing materials for gas threaded connections and specifies similar density and thickness requirements.": "تختلف مواصفات شريط PTFE المقبولة لخطوط الغاز حسب الولاية القضائية. في الولايات المتحدة، يشير قانون السباكة الموحد (UPC) وقانون السباكة الدولي (IPC) إلى ANSI LC 7-2009 لشريط إحكام القلاوظ المصنف للغاز، الذي يحدد كثافة أدنى 0.8 جم/سم³ وسماكة أدنى 0.1 مم. في الاتحاد الأوروبي، يحكم EN 751-3 مواد الإحكام لتوصيلات الغاز الملولبة ويحدد متطلبات مماثلة للكثافة والسماكة.",
    "In Canada, the Canadian Standards Association (CSA) requires yellow gas tape certified to CAN/CSA-B137.4 for gas lines. In the United States, the UL listing (Underwriters Laboratories) is also widely accepted as a third-party certification. For buyers selling to the US, Canada, or EU, sourcing a yellow gas tape with both UL and EN 751-3 certification covers the major regulated markets in a single SKU.": "في كندا، تتطلب الجمعية الكندية للمعايير (CSA) شريط غاز أصفر معتمد وفقاً لـ CAN/CSA-B137.4 لخطوط الغاز. في الولايات المتحدة، تُقبل أيضاً قائمة UL (مختبرات التأمين) على نطاق واسع كاعتماد من طرف ثالث. بالنسبة للمشترين الذين يبيعون في الولايات المتحدة أو كندا أو الاتحاد الأوروبي، فإن الحصول على شريط غاز أصفر معتمدي UL و EN 751-3 يغطي الأسواق المنظمة الرئيسية في SKU واحد.",
    "In Australia and New Zealand, AS 4623-2008 specifies the requirements for yellow gas tape. In the Middle East, most gas codes accept EN 751-3, UL, or GASTEC certification. In South America, the major gas markets (Brazil, Argentina, Chile) typically accept EN 751-3 or ANSI LC 7-2009. For buyers selling across multiple jurisdictions, the simplest approach is to source a yellow gas tape that meets EN 751-3 (the most widely accepted international standard) and is manufactured by an ISO 9001 certified factory.": "في أستراليا ونيوزيلندا، يحدد AS 4623-2008 متطلبات شريط الغاز الأصفر. في الشرق الأوسط، تقبل معظم أكواد الغاز اعتماد EN 751-3 أو UL أو GASTEC. في أمريكا الجنوبية، تقبل أسواق الغاز الرئيسية (البرازيل، الأرجنتين، تشيلي) عادة EN 751-3 أو ANSI LC 7-2009. بالنسبة للمشترين الذين يبيعون في ولايات قضائية متعددة، فإن أبسط نهج هو الحصول على شريط غاز أصفر يفي بـ EN 751-3 (المعيار الدولي الأكثر قبولاً على نطاق واسع) ويتم تصنيعه بواسطة مصنع معتمد ISO 9001.",
    "For buyers selling to multiple markets, the simplest approach is to source a yellow gas tape that meets EN 751-3 (the most widely accepted international standard) and is manufactured by an ISO 9001 certified factory. This single SKU can be sold in the EU, Middle East, South America, and parts of Africa and Asia. For the US, Canada, and Japan, additional UL/CSA certification is recommended. For the UK post-Brexit, UKCA marking is also accepted as equivalent to CE.": "بالنسبة للمشترين الذين يبيعون في أسواق متعددة، فإن أبسط نهج هو الحصول على شريط غاز أصفر يفي بـ EN 751-3 (المعيار الدولي الأكثر قبولاً على نطاق واسع) ويتم تصنيعه بواسطة مصنع معتمد ISO 9001. يمكن بيع SKU الواحد هذا في الاتحاد الأوروبي والشرق الأوسط وأمريكا الجنوبية وأجزاء من أفريقيا وآسيا. بالنسبة للولايات المتحدة وكندا واليابان، يوصى باعتماد UL/CSA إضافي. بالنسبة للمملكة المتحدة بعد خروج بريطانيا من الاتحاد الأوروبي، تُقبل علامة UKCA أيضاً على أنها مكافئة لـ CE.",
    "Beyond the regulatory requirement, there are practical safety considerations when selecting gas tape. First, the density must match the code. A 0.6 g/cm³ tape is too thin for gas, even if it is yellow and sold as \"gas tape\". Second, the spool and label should clearly show the certification mark and density. Third, the joint should be tested after installation with a soap bubble test or gas leak detector. Fourth, the joint should be re-inspected periodically. These practical checks add a margin of safety beyond the minimum code requirements.": "بعيداً عن المتطلب التنظيمي، هناك اعتبارات سلامة عملية عند اختيار شريط الغاز. أولاً، يجب أن تتطابق الكثافة مع الكود. شريط 0.6 جم/سم³ رفيع جداً للغاز، حتى لو كان أصفر اللون ويباع كـ \"شريط غاز\". ثانياً، يجب أن تُظهر البكرة والملصق بوضوح علامة الاعتماد والكثافة. ثالثاً، يجب اختبار الوصلة بعد التركيب باختبار فقاعة الصابون أو كاشف تسرب الغاز. رابعاً، يجب إعادة فحص الوصلة بشكل دوري. تضيف هذه الفحوصات العملية هامش سلامة يتجاوز الحد الأدنى من متطلبات الكود.",
    "Second, the tape should be wrapped correctly: 3-4 turns in the direction of joint tightening, with the last wrap one thread back from the pipe end to prevent the tape end from being sheared off when the joint is made up. Over-wrapping (8+ turns) can prevent proper thread engagement and may cause the female fitting to crack, especially on brass fittings. Under-wrapping (1-2 turns) may not provide enough sealing material for the thread voids.": "ثانياً، يجب لف الشريط بشكل صحيح: 3-4 لفات في اتجاه شد الوصلة، مع لف اللفة الأخيرة على بعد لولب واحد من نهاية الأنبوب لمنع طرف الشريط من القطع عند عمل الوصلة. قد يمنع اللف الزائد (8+ لفات) اشتباك القلاوظ الصحيح وقد يتسبب في تشقق التركيب الأنثوي، خاصة على التركيبات النحاسية. قد لا يوفر اللف غير الكافي (1-2 لفات) مواد إحكام كافية لفراغات القلاوظ.",
    "Third, the joint should be tested after assembly. For residential gas lines, a soap bubble test (brushing soapy water on the joint and watching for bubbles) is the standard DIY check. For commercial or industrial gas lines, a calibrated gas leak detector (TIF, Bacharach, or similar) is used. The test should be done at full operating pressure; do not test at low pressure because small leaks may not show. Any joint that fails the test should be disassembled, cleaned, and re-sealed with fresh tape.": "ثالثاً، يجب اختبار الوصلة بعد التجميع. بالنسبة لخطوط الغاز السكنية، اختبار فقاعة الصابون (تنظيف الوصلة بالماء والصابون ومراقبة الفقاعات) هو فحص DIY قياسي. بالنسبة لخطوط الغاز التجارية أو الصناعية، يتم استخدام كاشف تسرب الغاز المعاير (TIF أو Bacharach أو ما شابه). يجب إجراء الاختبار عند ضغط التشغيل الكامل؛ لا تختبر عند ضغط منخفض لأن التسربات الصغيرة قد لا تظهر. يجب تفكيك أي وصلة تفشل في الاختبار وتنظيفها وإعادة إحكامها بشريط جديد.",
    "Fourth, the joint should be re-inspected annually in commercial gas installations, and any joint that shows signs of tape degradation (yellowing, cracking, weeping) should be re-sealed. For residential installations, an annual inspection is recommended but not always required. Periodic inspection is good practice for any gas installation, regardless of the tape quality or code compliance.": "رابعاً، يجب إعادة فحص الوصلة سنوياً في تركيبات الغاز التجارية، ويجب إعادة إحكام أي وصلة تُظهر علامات تدهور الشريط (الاصفرار، التشقق، التعرق). بالنسبة للتركيبات السكنية، يوصى بالفحص السنوي لكنه ليس مطلوباً دائماً. الفحص الدوري ممارسة جيدة لأي تركيب غاز، بغض النظر عن جودة الشريط أو الامتثال للكود.",
    "For natural gas and propane applications, the recommended density is 0.8-1.0 g/cm³ (gas-grade). Standard plumber tape at 0.3-0.4 g/cm³ is too thin and porous for gas. High-density gas tape is often yellow-coloured to indicate its gas-rating and is certified to UL / CSA / EN standards.": "بالنسبة لتطبيقات الغاز الطبيعي والبروبان، الكثافة الموصى بها هي 0.8-1.0 جم/سم³ (درجة الغاز). شريط السباكة القياسي عند 0.3-0.4 جم/سم³ رفيع جداً ومسام للغاز. شريط الغاز عالي الكثافة غالباً ما يكون أصفر اللون للإشارة إلى تصنيفه كغاز ومعتمد وفقاً لمعايير UL / CSA / EN.",
    "In most jurisdictions, gas-rated yellow PTFE tape is required by code for natural gas and propane installations. Standards include ANSI LC 7-2009 (US), CAN/CGA B-149 (Canada), BS EN 751-3 (EU), and AS 4623-2008 (Australia). Always confirm with local gas code before installation.": "في معظم الولايات القضائية، شريط PTFE الأصفر المصنف للغاز مطلوب بموجب الكود لتركيبات الغاز الطبيعي والبروبان. تشمل المعايير ANSI LC 7-2009 (الولايات المتحدة)، CAN/CGA B-149 (كندا)، BS EN 751-3 (الاتحاد الأوروبي)، و AS 4623-2008 (أستراليا). تحقق دائماً من كود الغاز المحلي قبل التركيب.",
    "No. White plumber tape (0.3-0.4 g/cm³) is not certified for gas. Use only yellow gas-rated PTFE tape (0.8-1.0 g/cm³) marked with the gas certification logo. The lower density of white tape can allow micro-leaks that are dangerous with combustible gas.": "لا. شريط السباكة الأبيض (0.3-0.4 جم/سم³) غير معتمد للغاز. استخدم فقط شريط PTFE الأصفر المصنف للغاز (0.8-1.0 جم/سم³) المحدد بشعار اعتماد الغاز. قد تسمح الكثافة الأقل للشريط الأبيض بالتسربات الصغيرة التي تكون خطرة مع الغاز القابل للاشتعال.",
    "Gas tape is denser (0.8-1.0 g/cm³ vs 0.3-0.4 g/cm³), thicker (typically 0.2mm vs 0.075mm), wider (usually 19mm vs 12mm), and certified to gas-specific standards. Standard plumber tape is for water lines; gas tape is engineered for hydrocarbon service.": "شريط الغاز أكثر كثافة (0.8-1.0 جم/سم³ مقابل 0.3-0.4 جم/سم³)، أسمك (عادة 0.2 مم مقابل 0.075 مم)، أعرض (عادة 19 مم مقابل 12 مم)، ومعتمد وفقاً لمعايير الغاز المحددة. شريط السباكة القياسي لخطوط المياه؛ شريط الغاز مصمم لخدمة الهيدروكربون.",
    "For tapered pipe threads (NPT, BSPT), 3-5 wraps in the direction of the thread is standard. Over-wrapping can prevent proper thread engagement. For parallel threads (BSPP), use a sealant paste plus 2-3 wraps of tape. Always follow the fitting manufacturer's installation instructions.": "بالنسبة لقلاووط الأنابيب المخروطية (NPT، BSPT)، 3-5 لفات في اتجاه القلاوظ هو المعيار. قد يمنع اللف الزائد اشتباك القلاوظ الصحيح. بالنسبة للقلاوظ المتوازية (BSPP)، استخدم معجون إحكام زائد 2-3 لفات من الشريط. اتبع دائماً تعليمات التركيب من الشركة المصنعة للتركيب.",
      "Using PTFE tape correctly is simple, but correct use depends on thread direction, wrap count and tape quality. The tape is normally supplied on a plastic spool with a standard 12mm or 19mm width. For residential plumbing and most B2B applications, the right amount of tape is 3-5 wraps, applied in the clockwise direction (when viewed from the pipe end), with the last wrap one thread back from the pipe end.": "استخدام شريط PTFE بشكل صحيح أمر بسيط، لكن الاستخدام الصحيح يعتمد على اتجاه القلاوظ وعدد اللفات وجودة الشريط. يُورد الشريط عادة على بكرة بلاستيكية بعرض قياسي 12 مم أو 19 مم. بالنسبة لسباكة المنازل ومعظم تطبيقات B2B، الكمية الصحيحة من الشريط هي 3-5 لفات، تُطبق في اتجاه عقارب الساعة (عند النظر من طرف الأنبوب)، مع اللفة الأخيرة على بعد لولب واحد من طرف الأنبوب.",
    "Maintain light, even tension on the tape as you wrap. The tape should conform to the thread profile without being stretched thin or bunched up. A common mistake is to pull the tape too hard, which stretches it and reduces its effective density at the joint. Another common mistake is to wrap the tape too loosely, which allows the tape to slip and bunch. The correct tension is light, just enough to keep the tape in contact with the thread.": "حافظ على شد خفيف ومتساوٍ على الشريط أثناء اللف. يجب أن يتوافق الشريط مع ملف القلاوظ دون أن يتمدد رفيعاً أو يتكدس. من الأخطاء الشائعة شد الشريط بقوة شديدة، مما يمدده ويقلل كثافته الفعالة عند الوصلة. خطأ شائع آخر هو لف الشريط بشكل فضفاض جداً، مما يسمح للشريط بالانزلاق والتكدس. الشد الصحيح خفيف، فقط ما يكفي لإبقاء الشريط على اتصال مع القلاوظ.",
    "After wrapping, press the tape end firmly into the threads with your thumb to prevent it from unwinding as you start the joint. Hand-tighten the fitting, then add 1-2 turns with a wrench. Do not over-tighten: for tapered threads (NPT, BSPT), the joint is sealed by the thread taper, not by compression. Over-tightening can crack brass fittings, distort the threads, and actually reduce sealing performance.": "بعد اللف، اضغط بقوة على طرف الشريط في القلاوظ بإبهامك لمنعه من الانكشاف عند بدء الوصلة. اربط التركيب يدوياً، ثم أضف 1-2 لفات بمفتاح ربط. لا تربط أكثر من اللازم: بالنسبة للقلاوظ المخروطية (NPT، BSPT)، تُحكم الوصلة بواسطة مخروطية القلاوظ، وليس بالضغط. قد يتسبب الشد الزائد في تشقق التركيبات النحاسية وتشويه القلاوظ وتقليل أداء الإحكام فعلياً.",
    "The most common mistake is wrapping in the wrong direction. If the tape is wrapped counter-clockwise on a right-hand thread, the joint tightening will unwind the tape and shred it into the water line. This can cause clogging, water hammer, and reduced flow. Always check thread direction before wrapping: most threads are right-hand (clockwise to tighten), but some specialty fittings (gas meter nuts, some pump unions) are left-hand (counter-clockwise to tighten). The tape should always be wrapped in the direction of joint tightening.": "الخطأ الأكثر شيوعاً هو اللف في الاتجاه الخاطئ. إذا لُف الشريط عكس اتجاه عقارب الساعة على قلاوظ أيمن، فإن شد الوصلة سيكشف الشريط ويمزقه في خط الماء. قد يتسبب ذلك في الانسداد والمطرقة المائية وانخفاض التدفق. تحقق دائماً من اتجاه القلاوظ قبل اللف: معظم القلاوظ هي أيمن (في اتجاه عقارب الساعة للشد)، لكن بعض التركيبات المتخصصة (صواميل عدادات الغاز، بعض وصلات المضخات) هي أيسر (عكس اتجاه عقارب الساعة للشد). يجب دائماً لف الشريط في اتجاه شد الوصلة.",
    "The second mistake is using the wrong tape for the application. White plumber tape at 0.3-0.4 g/cm³ is for general plumbing. It is not approved for gas, high-temperature steam, or high-pressure industrial. Using the wrong tape leads to slow leaks, premature failure, and safety risks. Always check the local code and the application requirements before selecting a tape SKU.": "الخطأ الثاني هو استخدام الشريط الخاطئ للتطبيق. شريط السباكة الأبيض عند 0.3-0.4 جم/سم³ مخصص للسباكة العامة. غير معتمد للغاز أو البخار عالي الحرارة أو الضغط العالي الصناعي. استخدام الشريط الخاطئ يؤدي إلى تسربات بطيئة وفشل مبكر ومخاطر السلامة. تحقق دائماً من الكود المحلي ومتطلبات التطبيق قبل تحديد SKU للشريط.",
    "The third mistake is reusing old tape. After disassembly, the old tape should be stripped off completely and a fresh wrap applied. Old tape may have been stretched, contaminated, or partially unwound, all of which reduce sealing performance. Reusing tape is a false economy.": "الخطأ الثالث هو إعادة استخدام الشريط القديم. بعد التفكيك، يجب إزالة الشريط القديم بالكامل وتطبيق لف جديد. قد يكون الشريط القديم قد تمدد أو تلوث أو انكشف جزئياً، وكل ذلك يقلل من أداء الإحكام. إعادة استخدام الشريط اقتصاد زائف.",
    "The fourth mistake is over-wrapping. Six, eight or ten turns of tape on a fitting is not better than three or four turns. The extra tape does not seal better; it prevents the male and female threads from engaging properly, which actually weakens the seal and can crack the female fitting. Three to four turns is the right amount for most tapered thread applications.": "الخطأ الرابع هو اللف الزائد. ست أو ثماني أو عشر لفات من الشريط على التركيب ليست أفضل من ثلاث أو أربع لفات. الشريط الإضافي لا يحكم بشكل أفضل؛ يمنع القلاوظ الذكرية والأنثوية من الاشتباك الصحيح، مما يضعف الإحكام فعلياً وقد يتسبب في تشقق التركيب الأنثوي. ثلاث إلى أربع لفات هي الكمية الصحيحة لمعظم تطبيقات القلاوظ المخروطية.",
    "For tapered pipe threads (NPT, BSPT): 3-5 wraps is standard for water lines, 3-4 wraps for gas lines. For parallel threads (BSPP, G): 2-3 wraps combined with sealant paste. Over-wrapping with 8+ layers can crack female fittings or prevent proper thread engagement.": "بالنسبة لقلاووط الأنابيب المخروطية (NPT، BSPT): 3-5 لفات هو المعيار لخطوط المياه، 3-4 لفات لخطوط الغاز. بالنسبة للقلاوظ المتوازية (BSPP، G): 2-3 لفات مع معجون الإحكام. قد يتسبب اللف الزائد بأكثر من 8 طبقات في تشقق التركيبات الأنثوية أو منع اشتباك القلاوظ الصحيح.",
    "Wrap PTFE tape clockwise when viewed from the end of the male thread, matching the direction the fitting tightens. This prevents the tape from unwrapping or bunching as the fitting is screwed on. Wrapping counter-clockwise causes the tape to unravel and may result in loose shreds inside the line.": "لف شريط PTFE في اتجاه عقارب الساعة عند النظر من طرف القلاوظ الذكري، مطابقاً لاتجاه شد التركيب. هذا يمنع الشريط من الانكشاف أو التكدس عند ربط التركيب. اللف عكس اتجاه عقارب الساعة يتسبب في كشف الشريط وقد يؤدي إلى فتات فضفاضة داخل الخط.",
    "PTFE tape is applied to the male thread only. The female thread should remain clean. If the male thread is already wrapped from the factory, do not add another layer. For some parallel-thread fittings, the manufacturer's pre-applied sealant is sufficient and no tape is needed.": "يوضع شريط PTFE على القلاوظ الذكري فقط. يجب أن يظل القلاوظ الأنثوي نظيفاً. إذا كان القلاوظ الذكري ملفوفاً بالفعل من المصنع، فلا تضف طبقة أخرى. بالنسبة لبعض تركيبات القلاوظ المتوازية، فإن مانع التسرب المطبق مسبقاً من الشركة المصنعة كافٍ ولا حاجة إلى شريط.",
    "No. Compression fittings create their seal by compressing an olive (ferrule) against the pipe. PTFE tape on the ferrule or thread can prevent proper compression and cause leaks. For compression fittings, no sealant is needed; the olive is the sealing element.": "لا. تخلق تجهيزات الضغط إحكامها عن طريق ضغط الحلقة (ferrule) على الأنبوب. قد يمنع شريط PTFE على الحلقة أو القلاوظ الضغط المناسب ويسبب تسربات. بالنسبة لتجهيزات الضغط، لا حاجة إلى مانع تسرب؛ الحلقة هي عنصر الإحكام.",
    "Disassemble, remove all old tape, inspect threads for damage, and re-apply fresh tape. If threads are damaged, replace the fitting. For persistent leaks on tapered threads, try a different tape density (gas tape 0.8 g/cm³ for high-pressure, standard 0.3-0.4 g/cm³ for low-pressure). For critical applications, use liquid thread sealant in addition to tape.": "قم بتفكيك الوصلة وإزالة كل الشريط القديم وفحص القلاوظ للتلف وإعادة تطبيق شريط جديد. إذا كان القلاوظ تالفاً، استبدل التركيب. بالنسبة للتسربات المستمرة على القلاوظ المخروطية، جرب كثافة شريط مختلفة (شريط غاز 0.8 جم/سم³ للضغط العالي، قياسي 0.3-0.4 جم/سم³ للضغط المنخفض). بالنسبة للتطبيقات الحرجة، استخدم مانع تسرب سائل للقلاوظ بالإضافة إلى الشريط.",
    "Frequently Asked Questions: How to Apply PTFE Tape": "الأسئلة الشائعة: كيفية وضع شريط PTFE",
    "PTFE tape thickness is one of the most common specification questions for importers. Buyers may see products described as 0.075mm, 0.1mm, 0.15mm, 0.2mm, or even 0.04mm. These numbers refer to the physical thickness of the PTFE film, not the density. Density (g/cm³) is a separate parameter that affects sealing performance. This article explains the standard thickness grades, the tolerance, and how to choose the right thickness for your application.": "سماكة شريط PTFE هي واحدة من أكثر أسئلة المواصفات شيوعاً للمستوردين. قد يرى المشترون منتجات موصوفة بـ 0.075 مم أو 0.1 مم أو 0.15 مم أو 0.2 مم أو حتى 0.04 مم. تشير هذه الأرقام إلى السماكة الفيزيائية لغشاء PTFE، وليس الكثافة. الكثافة (جم/سم³) هي معامل منفصل يؤثر على أداء الإحكام. تشرح هذه المقالة درجات السماكة القياسية والتسامح وكيفية اختيار السماكة المناسبة لتطبيقك.",
    "PTFE tape thickness is usually specified in millimetres or microns, with the most common retail values being 0.04mm, 0.075mm, 0.1mm, and 0.2mm. The 0.075mm value is the de-facto industry baseline for standard white plumber tape; 0.1mm is common for high-density and high-pressure tape; 0.2mm is reserved for gas-rated and heavy-duty industrial tape. Below 0.075mm, the tape is too thin for reliable sealing on tapered threads.": "عادة ما تُحدد سماكة شريط PTFE بالملليمتر أو الميكرومتر، مع كون قيم التجزئة الأكثر شيوعاً هي 0.04 مم و 0.075 مم و 0.1 مم و 0.2 مم. قيمة 0.075 مم هي خط الأساس الفعلي للصناعة لشريط السباكة الأبيض القياسي؛ 0.1 مم شائع للشريط عالي الكثافة وعالي الضغط؛ 0.2 مم محجوز لشريط الغاز والخدمة الشاقة الصناعية. أقل من 0.075 مم، يكون الشريط رفيعاً جداً للإحكام الموثوق على القلاوظ المخروطية.",
    "For new precision-machined threads with tight tolerances, 0.075mm is the standard. This is the de-facto industry baseline: 90% of residential and commercial water line installations use 0.075mm tape. For older pipes with worn or damaged threads, a thicker tape (0.1mm or 0.15mm) helps fill the larger thread voids. For new industrial installations with new threads, the standard 0.075mm is also appropriate.": "بالنسبة للقلاوظ الجديدة المشكّلة بدقة مع تفاوتات صارمة، 0.075 مم هو المعيار. هذا هو خط الأساس الفعلي للصناعة: 90% من تركيبات خطوط المياه السكنية والتجارية تستخدم شريط 0.075 مم. بالنسبة للأنابيب القديمة ذات القلاوظ المتآكلة أو التالفة، يساعد شريط أسمك (0.1 مم أو 0.15 مم) في ملء فراغات القلاوظ الأكبر. بالنسبة للتركيبات الصناعية الجديدة ذات القلاوظ الجديدة، فإن معيار 0.075 مم مناسب أيضاً.",
    "For high-pressure applications, thicker tape is generally better. A 0.1mm or 0.15mm tape at 0.8-1.0 g/cm³ density is the standard for high-pressure hydraulic and pneumatic systems. The thicker, denser tape provides more sealing material to withstand the higher pressure and thermal cycling. For steam lines (above 120°C), 0.2mm tape with high-density 0.7-0.9 g/cm³ is recommended; the extra thickness and density compensate for the long-term relaxation of PTFE at sustained high temperatures.": "بالنسبة لتطبيقات الضغط العالي، الشريط الأسمك أفضل بشكل عام. شريط 0.1 مم أو 0.15 مم بكثافة 0.8-1.0 جم/سم³ هو المعيار للأنظمة الهيدروليكية والهوائية عالية الضغط. يوفر الشريط الأسمك والأكثر كثافة المزيد من مواد الإحكام لتحمل الضغط الأعلى والدورة الحرارية. بالنسبة لخطوط البخار (فوق 120 درجة مئوية)، يوصى بشريط 0.2 مم بكثافة عالية 0.7-0.9 جم/سم³؛ السماكة والكثافة الإضافية تعوض الاسترخاء طويل الأمد لـ PTFE في درجات الحرارة العالية المستمرة.",
    "Operator preference matters too. Some plumbers prefer the hand feel of 0.075mm tape because it wraps smoothly and does not bunch up. Other plumbers prefer 0.1mm tape because it feels sturdier and provides a visual confirmation of the wrap count. For OEM private label programs, choose a thickness that matches the target market's preference and the application standard.": "تفضيل المشغل مهم أيضاً. يفضل بعض السباكين الإحساس اليدوي لشريط 0.075 مم لأنه يلف بسلاسة ولا يتكدس. يفضل سباكون آخرون شريط 0.1 مم لأنه يبدو أكثر متانة ويوفر تأكيداً بصرياً لعدد اللفات. بالنسبة لبرامج العلامات الخاصة OEM، اختر سماكة تطابق تفضيل السوق المستهدف ومعيار التطبيق.",
    "There is no single global standard for PTFE tape thickness, but the major reference is the UK Water Industry Specification (WIS) 4-32-04, which specifies 0.075-0.1mm for general water service. The German DIN 30660 standard specifies 0.1mm. The Australian AS 4623-2008 specifies 0.1-0.2mm for gas tape. The US ANSI LC 7-2009 specifies 0.1mm minimum for gas tape. Most other markets reference one of these standards.": "لا يوجد معيار عالمي واحد لسماكة شريط PTFE، لكن المرجع الرئيسي هو مواصفات صناعة المياه في المملكة المتحدة (WIS) 4-32-04، التي تحدد 0.075-0.1 مم لخدمة المياه العامة. المعيار الألماني DIN 30660 يحدد 0.1 مم. الأسترالي AS 4623-2008 يحدد 0.1-0.2 مم لشريط الغاز. الأمريكي ANSI LC 7-2009 يحدد 0.1 مم كحد أدنى لشريط الغاز. تشير معظم الأسواق الأخرى إلى أحد هذه المعايير.",
    "The most common commercial tolerance on thickness is plus or minus 10% of the nominal value. A 0.075mm tape is usually 0.068-0.083mm in practice. For OEM private label programs that need to meet a specific standard (EN 751-3 for gas, NSF/ANSI 61 for potable water, WRAS for UK water), the factory should provide a Certificate of Analysis (COA) with each batch showing the measured thickness and tolerance compliance. A reputable factory will have on-site thickness gauges and will check 1-2 rolls per shift.": "التسامح التجاري الأكثر شيوعاً في السماكة هو زائد أو ناقص 10% من القيمة الاسمية. شريط 0.075 مم عادة ما يكون 0.068-0.083 مم في الممارسة. بالنسبة لبرامج العلامات الخاصة OEM التي تحتاج إلى تلبية معيار محدد (EN 751-3 للغاز، NSF/ANSI 61 لمياه الشرب، WRAS لمياه المملكة المتحدة)، يجب أن يقدم المصنع شهادة تحليل (COA) مع كل دفعة تُظهر السماكة المقاسة والامتثال للتسامح. سيكون لدى المصنع ذو السمعة الطيبة مقاييس سماكة في الموقع وسيتحقق من 1-2 لفة لكل وردية.",
    "Standard plumber tape is 0.075mm (3 mil) thick. Heavy-duty tape is 0.1mm (4 mil). Gas-rated tape is typically 0.2mm (8 mil) or thicker. The actual thickness is measured in mils or mm and specified in the product datasheet. For general water line use, 0.075mm is the industry standard.": "سمك شريط السباكة القياسي 0.075 مم (3 مل). شريط الخدمة الشاقة 0.1 مم (4 مل). الشريط المصنف للغاز عادة 0.2 مم (8 مل) أو أسمك. تُقاس السماكة الفعلية بالمل أو مم وتُحدد في ورقة بيانات المنتج. للاستخدام العام لخطوط المياه، 0.075 مم هو معيار الصناعة.",
    "Not always. Thicker tape (0.2mm+) is for high-pressure or gas applications. For standard water lines, thicker tape can prevent proper thread engagement on shallow female threads, causing cracks. Match thickness to the application: 0.075mm for water, 0.1mm for industrial, 0.2mm for gas.": "ليس دائماً. الشريط الأسمك (0.2 مم+) مخصص لتطبيقات الضغط العالي أو الغاز. بالنسبة لخطوط المياه القياسية، قد يمنع الشريط الأسمك اشتراك القلاوظ الصحيح على القلاوظ الأنثوية الضحلة، مما يسبب تشققات. طابق السماكة مع التطبيق: 0.075 مم للمياه، 0.1 مم للصناعة، 0.2 مم للغاز.",
    "Thicker tape fills thread gaps more reliably, especially on worn or deep threads. However, thickness above 0.2mm can split or tear during installation, reducing effectiveness. The optimal thickness is 0.075-0.1mm for water, 0.1-0.2mm for gas and high-pressure. Density matters more than thickness for sealing.": "يملأ الشريط الأسمك فراغات القلاوظ بشكل أكثر موثوقية، خاصة على القلاوظ المتآكلة أو العميقة. ومع ذلك، قد تنقسم السماكة فوق 0.2 مم أو تتمزق أثناء التركيب، مما يقلل من الفعالية. السماكة المثلى هي 0.075-0.1 مم للمياه، 0.1-0.2 مم للغاز والضغط العالي. الكثافة أهم من السماكة للإحكام.",
    "For high-pressure hydraulic or pneumatic systems (above 150 PSI / 10 bar), use 0.1-0.2mm thick tape with 0.5-0.8 g/cm³ density. For steam lines (above 120°C), use 0.2mm tape with high-density 0.7-0.9 g/cm³. Industrial high-pressure tape is usually yellow or grey to indicate the heavier grade.": "للأنظمة الهيدروليكية أو الهوائية عالية الضغط (فوق 150 رطل/بوصة مربعة / 10 بار)، استخدم شريط بسماكة 0.1-0.2 مم بكثافة 0.5-0.8 جم/سم³. لخطوط البخار (فوق 120 درجة مئوية)، استخدم شريط 0.2 مم بكثافة عالية 0.7-0.9 جم/سم³. شريط الضغط العالي الصناعي عادة ما يكون أصفر أو رمادي للإشارة إلى الدرجة الأثقل.",
    "No. Standard thin tape (0.075mm) is not certified for gas. Gas-rated tape must be 0.15-0.25mm thick AND 0.8-1.0 g/cm³ dense. The combination of thickness and density creates the gas-tight seal required by code. Using thin tape on gas lines is a safety violation in most jurisdictions.": "لا. الشريط الرفيع القياسي (0.075 مم) غير معتمد للغاز. يجب أن يكون الشريط المصنف للغاز بسماكة 0.15-0.25 مم وكثافة 0.8-1.0 جم/سم³. تجمع السماكة والكثافة لإنشاء إحكام محكم للغاز مطلوب بموجب الكود. استخدام شريط رفيع على خطوط الغاز انتهاك للسلامة في معظم الولايات القضائية.",
    "What's the standard thickness for PTFE thread seal tape?": "ما هي السماكة القياسية لشريط إحكام القلاوظ PTFE؟",
    "Is thicker PTFE tape always better?": "هل شريط PTFE الأسمك دائماً أفضل؟",
    "How does thickness affect leak prevention?": "كيف تؤثر السماكة على منع التسرب؟",
    "What's the best thickness for high-pressure applications?": "ما أفضل سماكة لتطبيقات الضغط العالي؟",
    "Can I use thin PTFE tape for gas lines?": "هل يمكنني استخدام شريط PTFE رفيع لخطوط الغاز؟",
      "PTFE tape and pipe dope are both used for threaded pipe sealing, but they are not the same product. PTFE tape is clean, dry, and easy to inspect; pipe dope is a wet paste that requires curing time. They are sometimes interchangeable and sometimes not. This article explains when to use each, when to combine them, and the situations where one clearly outperforms the other.": "يُستخدم شريط PTFE ومعجون الأنابيب لإحكام قلاوظ الأنابيب، لكنهما ليسا نفس المنتج. شريط PTFE نظيف وجاف وسهل الفحص؛ معجون الأنابيب هو عجينة رطبة تتطلب وقت تجمد. أحياناً يكونان قابلين للتبادل وأحياناً لا. تشرح هذه المقالة متى تستخدم كل واحد، ومتى تجمع بينهما، والحالات التي يتفوق فيها أحدهما بوضوح على الآخر.",
    "In static pressure tests on properly machined tapered threads, both PTFE tape and pipe dope achieve zero leakage in 99%+ of joints at pressures up to 10 bar (145 PSI). The difference is in the failure mode when the joint is overstressed or thermally cycled. PTFE tape tends to weep slowly when it fails, giving early warning. Pipe dope, once cured into a solid, can fail catastrophically if the joint is overstressed. For most applications, both are reliable. The choice depends on the application conditions and local code.": "في اختبارات الضغط الساكن على القلاوظ المخروطية المشكّلة بشكل صحيح، يحقق كل من شريط PTFE ومعجون الأنابيب صفر تسرب في أكثر من 99% من الوصلات عند ضغوط تصل إلى 10 بار (145 رطل/بوصة مربعة). الفرق في وضع الفشل عندما تتعرض الوصلة للإجهاد الزائد أو الدورة الحرارية. يميل شريط PTFE إلى التعرق ببطء عند فشله، مما يعطي إنذاراً مبكراً. قد يفشل معجون الأنابيب، بمجرد أن يتجمد إلى صلب، بشكل كارثي إذا تعرضت الوصلة للإجهاد الزائد. بالنسبة لمعظم التطبيقات، يكون كلاهما موثوقاً. يعتمد الاختيار على ظروف التطبيق والكود المحلي.",
    "For new precision-machined threads in residential plumbing, PTFE tape is the standard. For threaded connections in industrial settings (pumps, compressors, hydraulic systems), pipe dope is often preferred because it lubricates the joint and prevents galling. For critical applications (gas, high-pressure, food contact), a combination of PTFE tape + pipe dope gives the most reliable seal.": "بالنسبة للقلاوظ الجديدة المشكّلة بدقة في السباكة السكنية، شريط PTFE هو المعيار. بالنسبة للتوصيلات الملولبة في البيئات الصناعية (المضخات، الضواغط، الأنظمة الهيدروليكية)، يُفضل معجون الأنابيب غالباً لأنه يشحم الوصلة ويمنع الالتصاق. بالنسبة للتطبيقات الحرجة (الغاز، الضغط العالي، ملامسة الطعام)، فإن الجمع بين شريط PTFE + معجون الأنابيب يوفر الإحكام الأكثر موثوقية.",
    "For stainless steel fittings, pipe dope is often preferred because the dope acts as a lubricant and prevents galling (cold welding of the threads). Stainless steel threads are softer than carbon steel and are more prone to galling when tightened. Using pipe dope with PTFE tape is a common practice in stainless steel installations: the tape provides the seal, the dope provides the lubrication.": "بالنسبة لتجهيزات الفولاذ المقاوم للصدأ، يُفضل معجون الأنابيب غالباً لأن المعجون يعمل كمواد تشحيم ويمنع الالتصاق (اللحام البارد للقلاوظ). قلاوظ الفولاذ المقاوم للصدأ أنعم من الفولاذ الكربوني وأكثر عرضة للالتصاق عند الشد. استخدام معجون الأنابيب مع شريط PTFE ممارسة شائعة في تركيبات الفولاذ المقاوم للصدأ: يوفر الشريط الإحكام، ويوفر المعجون التشحيم.",
    "Use PTFE tape alone for: residential cold and hot water plumbing, residential gas lines (where local code permits tape alone), low-pressure air lines, OEM private label programs. Use pipe dope alone for: industrial chemical lines, high-pressure hydraulic systems, stainless steel threaded connections, large-diameter pipes where paste is faster to apply. Use both together for: gas line installations in jurisdictions that require both, large-diameter industrial gas, high-pressure steam, critical chemical service.": "استخدم شريط PTFE وحده لـ: سباكة المياه الباردة والساخنة السكنية، خطوط الغاز السكنية (حيث يسمح الكود المحلي بالشريط وحده)، خطوط الهواء منخفضة الضغط، برامج العلامات الخاصة OEM. استخدم معجون الأنابيب وحده لـ: الخطوط الكيميائية الصناعية، الأنظمة الهيدروليكية عالية الضغط، التوصيلات الملولبة من الفولاذ المقاوم للصدأ، الأنابيب ذات القطر الكبير حيث يكون المعجون أسرع في التطبيق. استخدم كليهما معاً لـ: تركيبات خطوط الغاز في الولايات القضائية التي تتطلب كليهما، الغاز الصناعي ذو القطر الكبير، البخار عالي الضغط، الخدمة الكيميائية الحرجة.",
    "Use pipe dope alone for: industrial chemical lines, high-pressure hydraulic systems, stainless steel threaded connections, large-diameter pipes where paste is faster to apply, or where the joint will be disassembled for maintenance.": "استخدم معجون الأنابيب وحده لـ: الخطوط الكيميائية الصناعية، الأنظمة الهيدروليكية عالية الضغط، التوصيلات الملولبة من الفولاذ المقاوم للصدأ، الأنابيب ذات القطر الكبير حيث يكون المعجون أسرع في التطبيق، أو عندما يتم تفكيك الوصلة للصيانة.",
    "Use both PTFE tape and pipe dope together for: gas line connections in jurisdictions that require both, large-diameter industrial gas, high-pressure steam lines, critical chemical service where the joint must not fail. When using both, the tape provides the primary seal and the dope fills any micro-gaps.": "استخدم شريط PTFE ومعجون الأنابيب معاً لـ: توصيلات خطوط الغاز في الولايات القضائية التي تتطلب كليهما، الغاز الصناعي ذو القطر الكبير، خطوط البخار عالية الضغط، الخدمة الكيميائية الحرجة حيث يجب ألا تفشل الوصلة. عند استخدام كليهما، يوفر الشريط الإحكام الأساسي ويملأ المعجون أي فجوات صغيرة.",
    "When using both, apply the PTFE tape first (3-4 turns in the direction of joint tightening), then brush a thin layer of pipe dope over the tape. Do not over-apply the dope: a thin, even layer is enough. Excess dope can be pushed into the pipe during joint make-up, where it can contaminate the system. For gas applications, both the tape and the dope must be certified for gas service.": "عند استخدام كليهما، ضع شريط PTFE أولاً (3-4 لفات في اتجاه شد الوصلة)، ثم ضع طبقة رقيقة من معجون الأنابيب فوق الشريط. لا تضع كمية كبيرة من المعجون: طبقة رقيقة ومتساوية كافية. قد يتم دفع المعجون الزائد إلى داخل الأنبوب أثناء تركيب الوصلة، حيث يمكن أن يلوث النظام. بالنسبة لتطبيقات الغاز، يجب أن يكون كل من الشريط والمعجون معتمدين لخدمة الغاز.",
    "It depends on the application. PTFE tape is clean, easy to apply, and preferred for tapered threads (NPT, BSPT) and most residential water lines. Pipe dope is preferred for parallel threads (BSPP, G), large-diameter pipes, and high-vibration applications. Both work; many professionals use a combination for critical seals.": "يعتمد على التطبيق. شريط PTFE نظيف وسهل التطبيق ومفضل للقلاوظ المخروطية (NPT، BSPT) ومعظم خطوط المياه السكنية. يُفضل معجون الأنابيب للقلاوظ المتوازية (BSPP، G)، والأنابيب ذات القطر الكبير، وتطبيقات الاهتزاز العالي. كلاهما يعمل؛ يستخدم العديد من المحترفين تركيبة للإحكام الحرج.",
    "Yes. For critical applications, apply 1-2 wraps of PTFE tape to the male thread, then brush pipe dope over the tape. The tape provides the primary seal; the dope fills any micro-gaps. This combination is standard practice in industrial and high-pressure installations. Do not use dope alone on tapered threads without tape, as it can be pushed out during tightening.": "نعم. بالنسبة للتطبيقات الحرجة، ضع 1-2 لفات من شريط PTFE على القلاوظ الذكري، ثم ضع معجون الأنابيب فوق الشريط. يوفر الشريط الإحكام الأساسي؛ يملأ المعجون أي فجوات صغيرة. هذه التركيبة ممارسة قياسية في التركيبات الصناعية وذات الضغط العالي. لا تستخدم المعجون وحده على القلاوظ المخروطية بدون شريط، حيث يمكن دفعه للخارج أثناء الشد.",
    "PTFE tape is more common for residential water lines because it is clean, fast to apply, and easy to inspect. Pipe dope is more reliable for hot water lines (above 80°C) and large-diameter pipes (above 1 inch) because the paste maintains viscosity under heat and fills larger thread gaps. Both meet code for domestic water when applied correctly.": "شريط PTFE أكثر شيوعاً لخطوط المياه السكنية لأنه نظيف وسريع التطبيق وسهل الفحص. معجون الأنابيب أكثر موثوقية لخطوط الماء الساخن (فوق 80 درجة مئوية) والأنابيب ذات القطر الكبير (فوق 1 بوصة) لأن المعجون يحافظ على اللزوجة تحت الحرارة ويملأ فراغات القلاوظ الأكبر. كلاهما يفي بالكود للمياه المنزلية عند التطبيق الصحيح.",
    "Gas-rated PTFE tape (yellow, 0.8-1.0 g/cm³) is the industry standard for residential and small commercial gas lines. For larger gas lines (above 2 inch) or industrial gas, a gas-rated pipe dope (e.g., Rectorseal T Plus 2) is preferred. Always use a sealant specifically certified for gas service.": "شريط PTFE المصنف للغاز (أصفر، 0.8-1.0 جم/سم³) هو معيار الصناعة لخطوط الغاز السكنية والتجارية الصغيرة. بالنسبة لخطوط الغاز الأكبر (فوق 2 بوصة) أو الغاز الصناعي، يُفضل معجون أنابيب مصنف للغاز (مثل Rectorseal T Plus 2). استخدم دائماً مانع تسرب معتمد خصيصاً لخدمة الغاز.",
    "Pipe dope is faster on large-diameter pipes (less wrapping) and easier on parallel threads. PTFE tape is faster on small tapered threads and leaves less mess. For DIY and small repairs, tape is generally easier. For professional plumbers working on a full system, paste is often preferred for speed on larger fittings.": "معجون الأنابيب أسرع على الأنابيب ذات القطر الكبير (لف أقل) وأسهل على القلاوظ المتوازية. شريط PTFE أسرع على القلاوظ المخروطية الصغيرة ويترك فوضى أقل. بالنسبة لأعمال DIY والإصلاحات الصغيرة، يكون الشريط أسهل بشكل عام. بالنسبة للسباكين المحترفين الذين يعملون على نظام كامل، يُفضل المعجون غالباً للسرعة على التركيبات الأكبر.",
    "Frequently Asked Questions: PTFE Tape vs Pipe Dope": "الأسئلة الشائعة: شريط PTFE مقابل معجون الأنابيب",
    "Which is more reliable for water lines, tape or paste?": "ما الأكثر موثوقية لخطوط المياه، الشريط أم المعجون؟",
    "Is pipe dope easier to apply than PTFE tape?": "هل معجون الأنابيب أسهل في التطبيق من شريط PTFE؟",
    "PTFE thread seal tape is a thin sealing tape used on threaded pipe connections. It is often called Teflon tape, plumber's tape, or simply thread tape. It is sold on small plastic spools, typically 12mm or 19mm wide, in lengths of 5-20 metres. The tape is wrapped around the male threads of a pipe fitting before the joint is made up. When the joint is tightened, the tape compresses into the helical thread voids and creates a pressure-tight seal.": "شريط إحكام القلاوظ PTFE هو شريط إحكام رقيق يستخدم في توصيلات الأنابيب الملولبة. غالباً ما يطلق عليه شريط تفلون أو شريط السباكة أو ببساطة شريط القلاوظ. يُباع على بكرات بلاستيكية صغيرة، عادة بعرض 12 مم أو 19 مم، بأطوال 5-20 متراً. يُلف الشريط حول القلاوظ الذكرية لتركيب الأنبوب قبل عمل الوصلة. عندما تُشد الوصلة، ينضغط الشريط في فراغات القلاوظ الحلزونية ويخلق إحكاماً محكماً للضغط.",
    "A few myths still circulate in plumbing forums and trade press. The first is that 'PTFE tape and Teflon tape are different products.' They are the same: both are made from expanded PTFE. Teflon is the brand name; PTFE is the generic name. A second misconception is that 'more turns of tape is always better.' Wrapping too much tape actually works against you: the extra tape prevents the male and female threads from engaging properly, which weakens the seal. A third misconception is that PTFE tape can be used on every threaded connection. It is suitable for tapered metal-to-metal threads (NPT, BSPT) and parallel metal threads with paste (BSPP). It is not suitable for compression fittings (the olive does the sealing) and is not approved for some plastic threaded fittings without testing.": "لا تزال بعض الأساطير تنتشر في منتديات السباكة والصحافة التجارية. الأولى هي أن \"شريط PTFE وشريط تفلون منتجان مختلفان\". هما نفس الشيء: كلاهما مصنوع من PTFE الموسع. تفلون هو اسم العلامة التجارية؛ PTFE هو الاسم العام. سوء الفهم الثاني هو أن \"المزيد من لفات الشريط دائماً أفضل\". لف الكثير من الشريط في الواقع يعمل ضدك: الشريط الإضافي يمنع القلاوظ الذكرية والأنثوية من الاشتباك الصحيح، مما يضعف الإحكام. سوء الفهم الثالث هو أنه يمكن استخدام شريط PTFE على كل توصيل ملولب. إنه مناسب للقلاوظ المخروطية المعدنية إلى المعدنية (NPT، BSPT) والقلاوظ المعدنية المتوازية مع المعجون (BSPP). إنه غير مناسب لتجهيزات الضغط (الحلقة تقوم بالإحكام) وغير معتمد لبعض التركيبات الملولبة البلاستيكية بدون اختبار.",
    "A second misconception is that 'more turns of tape is always better.' Wrapping too much tape actually works against you: the extra tape prevents the male and female threads from engaging properly, which weakens the seal. The right amount for a tapered thread (NPT, BSPT) is 3-5 turns; for a parallel thread (BSPP) with paste, 2-3 turns. More than 6-8 turns is over-wrapping and can crack brass fittings.": "سوء الفهم الثاني هو أن \"المزيد من لفات الشريط دائماً أفضل\". لف الكثير من الشريط في الواقع يعمل ضدك: الشريط الإضافي يمنع القلاوظ الذكرية والأنثوية من الاشتباك الصحيح، مما يضعف الإحكام. الكمية الصحيحة لقلاوظ مخروطي (NPT، BSPT) هي 3-5 لفات؛ لقلاوظ متوازي (BSPP) مع المعجون، 2-3 لفات. أكثر من 6-8 لفات هو لف زائد وقد يتسبب في تشقق التركيبات النحاسية.",
    "A third misconception is that PTFE tape can be used on every threaded connection. It is suitable for tapered metal-to-metal threads (NPT, BSPT) and parallel metal threads with paste (BSPP). It is not suitable for compression fittings (the olive does the sealing) and is not approved for some plastic threaded fittings without testing.": "سوء الفهم الثالث هو أنه يمكن استخدام شريط PTFE على كل توصيل ملولب. إنه مناسب للقلاوظ المخروطية المعدنية إلى المعدنية (NPT، BSPT) والقلاوظ المعدنية المتوازية مع المعجون (BSPP). إنه غير مناسب لتجهيزات الضغط (الحلقة تقوم بالإحكام) وغير معتمد لبعض التركيبات الملولبة البلاستيكية بدون اختبار.",
    "Buyers comparing PTFE tape quotes often focus on price and overlook the raw material grade. Higher-grade virgin PTFE resin produces a more uniform, denser film with better sealing performance. Lower-grade or recycled resin produces a less uniform film with inconsistent density. The price difference between virgin and recycled is 10-20%; the performance difference is larger. For B2B buyers with quality requirements, ask the factory for the resin grade (virgin vs recycled) and the country of origin (USA, Europe, China, India).": "غالباً ما يركز المشترون الذين يقارنون عروض أسعار شريط PTFE على السعر ويتجاهلون درجة المواد الخام. ينتج راتينج PTFE بكر عالي الدرجة غشاء أكثر اتساقاً وكثافة مع أداء إحكام أفضل. ينتج الراتينج الأقل درجة أو المعاد تدويره غشاء أقل اتساقاً بكثافة غير متسقة. فرق السعر بين بكر والمعاد تدويره هو 10-20%؛ فرق الأداء أكبر. بالنسبة لمشتري B2B الذين لديهم متطلبات جودة، اسأل المصنع عن درجة الراتينج (بكر مقابل معاد تدويره) وبلد المنشأ (الولايات المتحدة، أوروبا، الصين، الهند).",
    "Three quick quality checks at the sample stage: (1) unwind a full roll and look for consistent colour, smooth wind, no shedding, no cuts or nicks; (2) measure the thickness with a micrometer (target 0.075mm ± 0.008mm for standard tape, 0.2mm ± 0.02mm for gas tape); (3) measure the density by weighing a known length (target 0.3-0.4 g/cm³ for standard white, 0.8-1.0 g/cm³ for gas yellow). A roll that passes all three checks is a reliable sample; a roll that fails any check should be rejected.": "ثلاث فحوصات جودة سريعة في مرحلة العينة: (1) انكشف لفة كاملة وانظر إلى اتساق اللون واللف الناعم وعدم وجود تساقط وعدم وجود جروح أو شقوق؛ (2) قياس السماكة بالميكرومتر (الهدف 0.075 مم ± 0.008 مم للشريط القياسي، 0.2 مم ± 0.02 مم لشريط الغاز)؛ (3) قياس الكثافة عن طريق وزن طول معروف (الهدف 0.3-0.4 جم/سم³ للأبيض القياسي، 0.8-1.0 جم/سم³ لغاز أصفر). اللفة التي تجتاز الفحوصات الثلاثة هي عينة موثوقة؛ اللفة التي تفشل في أي فحص يجب رفضها.",
    "For buyers who need a documented quality system, ask the factory for its test report covering density, thickness, tensile strength, elongation, and any certifications (ISO 9001, FDA, CE, RoHS). A reputable factory will have a quality control lab with calibrated equipment (micrometer, density gauge, tensile tester) and will issue a Certificate of Analysis (COA) with each shipment. The COA should reference the production batch number and the actual measured values, not just generic compliance statements.": "بالنسبة للمشترين الذين يحتاجون إلى نظام جودة موثق، اطلب من المصنع تقرير الاختبار الذي يغطي الكثافة والسماكة وقوة الشد والاستطالة وأي شهادات (ISO 9001، FDA، CE، RoHS). سيكون لدى المصنع ذو السمعة الطيبة مختبر مراقبة جودة بمعدات معايرة (ميكرومتر، مقياس كثافة، جهاز اختبار شد) وسيصدر شهادة تحليل (COA) مع كل شحنة. يجب أن تشير COA إلى رقم دفعة الإنتاج والقيم المقاسة الفعلية، وليس فقط بيانات الامتثال العامة.",
    "PTFE (polytetrafluoroethylene) thread seal tape is made from expanded PTFE resin, which is stretched to create a thin, flexible film with a microporous structure. The film is slit into 12mm, 19mm, or 25mm widths and wound onto plastic spools. The tape is typically 0.075-0.2mm thick with a density of 0.3-1.0 g/cm³ depending on grade.": "شريط إحكام القلاوظ PTFE (بولي تترا فلورو إيثيلين) مصنوع من راتينج PTFE الموسع، الذي يتمدد لإنشاء غشاء رقيق ومرن ذو بنية مسامية دقيقة. يُقطع الغشاء إلى عرض 12 مم أو 19 مم أو 25 مم ويُلف على بكرات بلاستيكية. عادة ما يكون سماكة الشريط 0.075-0.2 مم بكثافة 0.3-1.0 جم/سم³ حسب الدرجة.",
    "Yes, PTFE tape and Teflon tape refer to the same product. Teflon is the brand name owned by Chemours (formerly DuPont) for its PTFE resin. Generic PTFE tape has the same chemical composition. The terms are used interchangeably in plumbing, hardware, and industrial supply. ASTM D3308 and ISO 9001 standards cover both branded and generic PTFE tape.": "نعم، يشير شريط PTFE وشريط تفلون إلى نفس المنتج. تفلون هو اسم العلامة التجارية المملوك لشركة Chemours (سابقاً DuPont) لراتينج PTFE الخاص بها. شريط PTFE العام له نفس التركيب الكيميائي. تُستخدم المصطلحات بالتبادل في السباكة والأجهزة والتوريد الصناعي. تغطي معايير ASTM D3308 و ISO 9001 كل من شريط PTFE التجاري والعام.",
    "PTFE tape is used to seal threaded pipe connections in plumbing, water, gas, and industrial systems. It fills the helical gap between tapered male and female threads, preventing leakage of water, gas, oil, and air. PTFE is also used as a thread lubricant, allowing fittings to be tightened to the proper torque without galling or seizing.": "يُستخدم شريط PTFE لإحكام توصيلات الأنابيب الملولبة في السباكة والمياه والغاز والأنظمة الصناعية. يملأ الفراغ الحلزوني بين القلاوظ الذكرية والأنثوية المخروطية، مما يمنع تسرب الماء والغاز والزيت والهواء. يُستخدم PTFE أيضاً كمواد تشحيم للقلاوظ، مما يسمح بشد التركيبات إلى عزم الدوران المناسب دون التحام أو تعلق.",
    "PTFE was discovered by Roy Plunkett at DuPont in 1938. Thread seal tape was first commercialised in the 1960s after the invention of expanded PTFE by W.L. Gore. The product was initially marketed to the aerospace and chemical industries before becoming standard in residential plumbing. Major manufacturers today include 3M, Henkel, IPS, Oatey, and hundreds of OEM factories in China and India.": "اكتشف PTFE روي بلانكيت في DuPont عام 1938. تم تسويق شريط إحكام القلاوظ تجارياً لأول مرة في الستينيات بعد اختراع PTFE الموسع بواسطة W.L. Gore. تم تسويق المنتج في البداية لصناعات الفضاء والكيماويات قبل أن يصبح معياراً في السباكة السكنية. يشمل المصنعون الرئيسيون اليوم 3M و Henkel و IPS و Oatey ومئات المصانع OEM في الصين والهند.",
    "Yes. Virgin PTFE (no fillers, no recycled content) is FDA Title 21 CFR compliant for food contact and is widely used in potable water systems. NSF/ANSI 61 certification confirms safety for drinking water lines. Avoid tape with oil-based fillers (some low-cost industrial grades) for potable water. Look for NSF 61 or WRAS certification on the spool for verification.": "نعم. PTFE بكر (بدون مواد مالئة، بدون محتوى معاد تدويره) يمتثل لـ FDA العنوان 21 CFR لملامسة الطعام ويستخدم على نطاق واسع في أنظمة مياه الشرب. اعتماد NSF/ANSI 61 يؤكد السلامة لخطوط مياه الشرب. تجنب الشريط الذي يحتوي على مواد مالئة أساسها الزيت (بعض الدرجات الصناعية منخفضة التكلفة) لمياه الشرب. ابحث عن اعتماد NSF 61 أو WRAS على البكرة للتحقق.",
    "Frequently Asked Questions: What is PTFE Tape?": "الأسئلة الشائعة: ما هو شريط PTFE؟",
    "What is PTFE thread seal tape made of?": "من ماذا يُصنع شريط إحكام القلاوظ PTFE؟",
    "What is PTFE tape used for?": "لأي شيء يُستخدم شريط PTFE؟",
    "Who invented PTFE thread seal tape?": "من اخترع شريط إحكام القلاوظ PTFE؟",
  },
  };

  const productName = (name) => productNames[name]?.[lang] || name;

  const productHero = text.match(/^FuJianTeflonTape supplies (.+) for overseas importers, plumbing distributors, hardware wholesalers and OEM brand customers\. Send size, quantity, packaging method and destination country for a factory quotation\.$/);
  if (productHero) {
    const name = productName(productHero[1]);
    if (lang === "zh") return `泉州机浴 为海外进口商、水暖经销商、五金批发商和 OEM 品牌客户供应${name}。请发送尺寸、数量、包装方式和目的国家获取工厂报价。`;
    if (lang === "es") return `FuJianTeflonTape suministra ${name} para importadores, distribuidores de plomería, mayoristas de ferretería y clientes OEM. Envíe tamaño, cantidad, método de empaque y país de destino para cotización de fábrica.`;
    if (lang === "ar") return `توفر FuJianTeflonTape ${name} للمستوردين وموزعي السباكة وتجار الجملة وعملاء OEM. أرسل المقاس والكمية وطريقة التغليف وبلد الوصول للحصول على عرض سعر من المصنع.`;
  }

  const suppliedAs = text.match(/^(.+) can be supplied as a standard factory SKU or adjusted according to your existing sample\. If your market already sells a certain spool color, tape color, label style or display box, you can send photos and target dimensions\. We can review whether the structure is suitable for production and provide a quotation based on quantity and packaging complexity\.$/);
  if (suppliedAs) {
    const name = productName(suppliedAs[1]);
    if (lang === "zh") return `${name}可以按工厂标准 SKU 供应，也可以根据你现有样品调整。如果你的市场已有特定轮芯颜色、带子颜色、标签样式或展示盒，可发送照片和目标尺寸。我们可以评估结构是否适合生产，并根据数量和包装复杂度报价。`;
    if (lang === "es") return `${name} puede suministrarse como SKU estándar de fábrica o ajustarse según su muestra existente. Si su mercado ya vende cierto color de carrete, color de cinta, estilo de etiqueta o caja display, puede enviar fotos y dimensiones objetivo. Podemos revisar si la estructura es adecuada para producción y cotizar según cantidad y complejidad de empaque.`;
    if (lang === "ar") return `يمكن توريد ${name} كـ SKU قياسي من المصنع أو تعديله حسب عينتك الحالية. إذا كان سوقك يستخدم لون بكرة أو لون شريط أو نمط ملصق أو صندوق عرض محدد، يمكنك إرسال الصور والأبعاد المطلوبة. يمكننا تقييم ملاءمة الهيكل للإنتاج وتقديم السعر حسب الكمية وتعقيد التغليف.`;
  }

  const factoryProduct = text.match(/^FuJianTeflonTape is a China PTFE thread seal tape factory supplying (.+) for B2B wholesale and export orders\. This product category is prepared for buyers who need (.+)\. Instead of retail-style selling, our work is organized around repeat order specifications, carton packing, OEM requirements and clear communication before production\.$/);
  if (factoryProduct) {
    const name = productName(factoryProduct[1]);
    if (lang === "zh") return `泉州机浴 是中国 PTFE 螺纹密封带工厂，为 B2B 批发和出口订单供应${name}。该产品分类面向有明确规格需求的采购商。我们不是零售式销售，而是围绕复购规格、纸箱包装、OEM 要求和生产前清晰沟通来组织工作。`;
    if (lang === "es") return `FuJianTeflonTape es una fábrica china de cinta selladora PTFE que suministra ${name} para pedidos B2B mayoristas y de exportación. Esta categoría está preparada para compradores con requisitos claros de especificación. No vendemos con enfoque minorista; organizamos el trabajo alrededor de especificaciones repetibles, empaque en cartón, requisitos OEM y comunicación clara antes de producción.`;
    if (lang === "ar") return `FuJianTeflonTape مصنع صيني لشريط إحكام PTFE يورد ${name} لطلبات الجملة والتصدير B2B. هذه الفئة مخصصة للمشترين ذوي متطلبات مواصفات واضحة. لا نعمل بأسلوب البيع بالتجزئة، بل ننظم العمل حول مواصفات الطلبات المتكررة وتغليف الكرتون ومتطلبات OEM والتواصل الواضح قبل الإنتاج.`;
  }

  const quickProductInquiry = text.match(/^Send your target specification and packing request for (.+)\.$/);
  if (quickProductInquiry) {
    const name = productName(quickProductInquiry[1]);
    if (lang === "zh") return `请发送${name}的目标规格和包装需求。`;
    if (lang === "es") return `Envíe la especificación objetivo y el empaque requerido para ${name}.`;
    if (lang === "ar") return `أرسل المواصفات المستهدفة وطلب التغليف لـ ${name}.`;
  }

  const quoteProduct = text.match(/^Get Quote for (.+)$/);
  if (quoteProduct) {
    const name = productName(quoteProduct[1]);
    if (lang === "zh") return `获取${name}报价`;
    if (lang === "es") return `Solicitar cotización de ${name}`;
    if (lang === "ar") return `اطلب عرض سعر لـ ${name}`;
  }

  if (text === "Ask for MOQ, carton details and lead time") {
    if (lang === "zh") return "询问 MOQ、纸箱信息和交期";
    if (lang === "es") return "Consultar MOQ, detalles de cartón y plazo";
    if (lang === "ar") return "اسأل عن MOQ وتفاصيل الكرتون ومدة التسليم";
  }

  const netWeight = text.match(/^Net tape weight: (.+)$/);
  if (netWeight) {
    if (lang === "zh") return `带子净重：${netWeight[1]}`;
    if (lang === "es") return `Peso neto de la cinta: ${netWeight[1]}`;
    if (lang === "ar") return `الوزن الصافي للشريط: ${netWeight[1]}`;
  }

  const packing = text.match(/^Packing: (.+)$/);
  if (packing) {
    const value = packing[1]
      .replace(/rolls\/carton/g, lang === "zh" ? "卷/箱" : lang === "es" ? "rollos/caja" : "لفة/كرتون")
      .replace(/rolls\/bag/g, lang === "zh" ? "卷/袋" : lang === "es" ? "rollos/bolsa" : "لفة/كيس");
    if (lang === "zh") return `包装：${value}`;
    if (lang === "es") return `Empaque: ${value}`;
    if (lang === "ar") return `التغليف: ${value}`;
  }

  const thickness = text.match(/^(.+?) thickness$/);
  if (thickness) {
    if (lang === "zh") return `${thickness[1]} 厚度`;
    if (lang === "es") return `${thickness[1]} de espesor`;
    if (lang === "ar") return `${thickness[1]} سماكة`;
  }

  const countries = {
    "Saudi Arabia": { zh: "沙特阿拉伯", es: "Arabia Saudita", ar: "السعودية" },
    UAE: { zh: "阿联酋", es: "EAU", ar: "الإمارات" },
    Iraq: { zh: "伊拉克", es: "Irak", ar: "العراق" },
    Pakistan: { zh: "巴基斯坦", es: "Pakistán", ar: "باكستان" },
    Egypt: { zh: "埃及", es: "Egipto", ar: "مصر" },
  };

  const country = (name) => countries[name]?.[lang] || name;

  const marketTitle = text.match(/^PTFE Thread Seal Tape Supplier in (.+)$/);
  if (marketTitle && countries[marketTitle[1]]) {
    const localizedCountry = country(marketTitle[1]);
    if (lang === "zh") return `${localizedCountry} PTFE 螺纹密封带供应商`;
    if (lang === "es") return `Proveedor de cinta selladora PTFE en ${localizedCountry}`;
    if (lang === "ar") return `مورد شريط إحكام PTFE في ${localizedCountry}`;
  }

  const marketLead = text.match(/^China factory supply of PTFE thread seal tape for (.+) plumbing, hardware, construction and wholesale channels\.$/);
  if (marketLead && countries[marketLead[1]]) {
    const localizedCountry = country(marketLead[1]);
    if (lang === "zh") return `中国工厂供应 PTFE 螺纹密封带，适用于${localizedCountry}水暖、五金、工程和批发渠道。`;
    if (lang === "es") return `Suministro de fábrica china de cinta selladora PTFE para canales de plomería, ferretería, construcción y mayoristas en ${localizedCountry}.`;
    if (lang === "ar") return `توريد شريط إحكام PTFE من مصنع الصين لقنوات السباكة والعدد والبناء والجملة في ${localizedCountry}.`;
  }

  const marketBuyer = text.match(/^FuJianTeflonTape supplies PTFE thread seal tape from China for overseas B2B buyers\. We do not claim local customer cases; instead, this page explains how importers, wholesalers and brand owners in (.+) can prepare a clear inquiry for factory quotation\. A useful inquiry should include required width, length, thickness, density, order quantity, packaging method and destination port or country\.$/);
  if (marketBuyer && countries[marketBuyer[1]]) {
    const localizedCountry = country(marketBuyer[1]);
    if (lang === "zh") return `泉州机浴 从中国为海外 B2B 买家供应 PTFE 螺纹密封带。我们不虚构当地客户案例；本页说明${localizedCountry}进口商、批发商和品牌客户如何准备清晰的工厂报价询盘。一份有效询盘应包含所需宽度、长度、厚度、密度、订单数量、包装方式以及目的港或目的国家。`;
    if (lang === "es") return `FuJianTeflonTape suministra cinta selladora PTFE desde China para compradores B2B en el extranjero. No inventamos casos locales; esta página explica cómo importadores, mayoristas y dueños de marca en ${localizedCountry} pueden preparar una consulta clara para cotización de fábrica. Una consulta útil debe incluir ancho, largo, espesor, densidad, cantidad, empaque y puerto o país de destino.`;
    if (lang === "ar") return `توفر FuJianTeflonTape شريط إحكام PTFE من الصين لمشتري B2B في الخارج. لا ندعي حالات عملاء محلية؛ تشرح هذه الصفحة كيف يمكن للمستوردين وتجار الجملة وأصحاب العلامات في ${localizedCountry} إعداد استفسار واضح لسعر المصنع. يجب أن يتضمن الاستفسار العرض والطول والسماكة والكثافة والكمية وطريقة التغليف وميناء أو بلد الوصول.`;
  }

  const marketCta = text.match(/^Get PTFE Tape Quote for (.+)$/);
  if (marketCta && countries[marketCta[1]]) {
    const localizedCountry = country(marketCta[1]);
    if (lang === "zh") return `获取 ${localizedCountry} 市场 PTFE 生料带报价`;
    if (lang === "es") return `Solicitar cotización de cinta PTFE para ${localizedCountry}`;
    if (lang === "ar") return `اطلب عرض سعر شريط PTFE لسوق ${localizedCountry}`;
  }

  const suitableChannels = text.match(/^Suitable Channels in (.+)$/);
  if (suitableChannels && countries[suitableChannels[1]]) {
    const localizedCountry = country(suitableChannels[1]);
    if (lang === "zh") return `${localizedCountry} 适用渠道`;
    if (lang === "es") return `Canales adecuados en ${localizedCountry}`;
    if (lang === "ar") return `القنوات المناسبة في ${localizedCountry}`;
  }

  const sendMarketInquiry = text.match(/^Send Inquiry for (.+)$/);
  if (sendMarketInquiry && countries[sendMarketInquiry[1]]) {
    const localizedCountry = country(sendMarketInquiry[1]);
    if (lang === "zh") return `发送 ${localizedCountry} 市场询盘`;
    if (lang === "es") return `Enviar consulta para ${localizedCountry}`;
    if (lang === "ar") return `إرسال استفسار لسوق ${localizedCountry}`;
  }

  return text;
}

function addLanguageSelector() {
  const navWrap = document.querySelector(".nav-wrap");
  const navQuote = document.querySelector(".nav-quote");
  if (!navWrap || document.querySelector(".language-select")) return;

  const label = document.createElement("label");
  label.className = "language-switch";
  label.setAttribute("data-no-translate", "");
  label.setAttribute("aria-label", "Language");

  const select = document.createElement("select");
  select.className = "language-select";
  Object.entries(LANGUAGES).forEach(([code, name]) => {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = name;
    select.appendChild(option);
  });

  select.value = localStorage.getItem("siteLanguage") || "en";
  select.addEventListener("change", () => {
    setSiteLanguage(select.value);
  });

  label.appendChild(select);
  navWrap.insertBefore(label, navQuote || null);
}

function setupLanguageSelectors() {
  const current = localStorage.getItem("siteLanguage") || "en";
  document.querySelectorAll(".language-select").forEach((select) => {
    select.value = LANGUAGES[current] ? current : "en";
    if (select.dataset.languageReady) return;
    select.dataset.languageReady = "1";
    select.addEventListener("change", () => {
      setSiteLanguage(select.value);
    });
  });
}

function applyLanguage(lang) {
  const activeLang = LANGUAGES[lang] ? lang : "en";
  if (activeLang !== 'en' && !window.SiteTranslations) {
    loadTranslationBundle().then(() => applyLanguage(activeLang));
    return;
  }
  document.documentElement.lang = activeLang === "zh" ? "zh-CN" : activeLang;
  document.documentElement.dir = activeLang === "ar" ? "rtl" : "ltr";

  if (!document.documentElement.dataset.originalTitle) {
    document.documentElement.dataset.originalTitle = document.title;
  }
  document.title = getTranslation(activeLang, document.documentElement.dataset.originalTitle);

  document.querySelectorAll("input[placeholder], textarea[placeholder]").forEach((field) => {
    if (!field.dataset.originalPlaceholder) field.dataset.originalPlaceholder = field.placeholder;
    const { ATTRIBUTE_TRANSLATIONS } = getTranslationData();
    field.placeholder = ATTRIBUTE_TRANSLATIONS[activeLang]?.[field.dataset.originalPlaceholder] || field.dataset.originalPlaceholder;
  });

  // Pass 1: try translating each block-level element's full inner text as a single
  // unit. For elements that contain anchor links / images / inputs (those have
  // href or src attributes we need to preserve), skip — let the child <a>
  // translate itself (a.outerHTML keeps its href). For inline-only
  // <strong>/<em>/<span> we translate via innerHTML (the translation is plain
  // text, which replaces the inline markup cleanly).
  const blockSelectors = "p, h1, h2, h3, h4, h5, h6, li, th, td, a, button, label, small, summary, figcaption, blockquote, dt, dd, strong, em";
  // Walk in document order: child <a> is processed before its parent <li>,
  // so the <a> text gets translated first, then the parent <li> skip rule
  // keeps the <a> (and its href) intact.
  document.querySelectorAll(blockSelectors).forEach((el) => {
    if (el.closest("[data-no-translate], script, style")) return;
    if (!el.firstChild) return;
    // Skip if element has img, input, button, select, textarea child (preserve)
    if (el.querySelector("img, input, button, select, textarea")) return;
    // Skip if element has anchor <a> child (let the <a> translate itself, so
    // the href is preserved; parent containers would overwrite the <a> with
    // innerHTML and lose the link).
    if (el.querySelector("a")) return;
    // Has inline children (strong, em, span, br): translate via innerHTML
    if (el.children.length > 0) {
      const full = el.innerText.trim().replace(/\s+/g, " ");
      if (!full) return;
      if (!el.dataset.originalText) el.dataset.originalText = full;
      const original = el.dataset.originalText;
      const t = getTranslation(activeLang, original);
      if (t === el.innerText.trim().replace(/\s+/g, " ")) return;
      el.innerHTML = t;
      return;
    }
    // leaf text node element (including <a>link</a>)
    const full = el.textContent.trim();
    if (!full) return;
    if (!el.dataset.originalText) el.dataset.originalText = full;
    const original = el.dataset.originalText;
    const t = getTranslation(activeLang, original);
    if (t === full) return;
    el.textContent = t;
  });

  // Pass 2: per-text-node fallback for any remaining untranslated text (covers
  // <a>, <span> with single text nodes, and any other element not handled in Pass 1).
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || parent.closest("[data-no-translate], script, style")) return NodeFilter.FILTER_REJECT;
      if (!node.textContent.trim()) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach((node) => {
    if (!node.originalText) node.originalText = node.textContent;
    const original = node.originalText;
    const trimmed = original.trim();
    const translated = getTranslation(activeLang, trimmed);
    node.textContent = original.replace(trimmed, translated);
  });
}

addLanguageSelector();
setupLanguageSelectors();
setSiteLanguage(localStorage.getItem("siteLanguage") || "en");

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
}

document.querySelectorAll(".nav-more").forEach((button) => {
  const dropdown = button.closest(".nav-dropdown");
  if (!dropdown) return;

  dropdown.addEventListener("mouseenter", () => {
    if (dropdown.classList.contains("closing")) return;
    dropdown.classList.add("hover-open");
    button.setAttribute("aria-expanded", "true");
  });

  dropdown.addEventListener("mouseleave", () => {
    dropdown.classList.remove("hover-open", "closing");
    if (!dropdown.classList.contains("open")) {
      button.setAttribute("aria-expanded", "false");
    }
  });

  button.addEventListener("click", () => {
    const isOpen = dropdown.classList.contains("open");
    document.querySelectorAll(".nav-dropdown.open, .nav-dropdown.hover-open").forEach((item) => {
      if (item !== dropdown) {
        item.classList.remove("open", "hover-open", "closing");
        item.querySelector(".nav-more")?.setAttribute("aria-expanded", "false");
      }
    });

    if (isOpen) {
      dropdown.classList.remove("open", "hover-open");
      dropdown.classList.add("closing");
      button.setAttribute("aria-expanded", "false");
      return;
    }

    dropdown.classList.remove("closing");
    dropdown.classList.add("open");
    button.setAttribute("aria-expanded", "true");
  });
});

document.addEventListener("click", (event) => {
  if (event.target.closest(".nav-dropdown")) return;
  document.querySelectorAll(".nav-dropdown.open, .nav-dropdown.hover-open, .nav-dropdown.closing").forEach((dropdown) => {
    dropdown.classList.remove("open", "hover-open", "closing");
    dropdown.querySelector(".nav-more")?.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("mousemove", (event) => {
  if (window.matchMedia("(max-width: 980px)").matches) return;

  document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
    const button = dropdown.querySelector(".nav-more");
    const menu = dropdown.querySelector(".nav-dropdown-menu");
    if (!button || !menu) return;

    const buttonRect = button.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();
    const inButton =
      event.clientX >= buttonRect.left - 2 &&
      event.clientX <= buttonRect.right + 2 &&
      event.clientY >= buttonRect.top - 2 &&
      event.clientY <= buttonRect.bottom + 8;
    const inMenu =
      menuRect.width > 0 &&
      event.clientX >= menuRect.left - 2 &&
      event.clientX <= menuRect.right + 2 &&
      event.clientY >= menuRect.top - 8 &&
      event.clientY <= menuRect.bottom + 2;

    if (inButton || inMenu) {
      if (!dropdown.classList.contains("closing")) {
        dropdown.classList.add("hover-open");
        button.setAttribute("aria-expanded", "true");
      }
      return;
    }

    dropdown.classList.remove("hover-open", "closing");
    if (!dropdown.classList.contains("open")) {
      button.setAttribute("aria-expanded", "false");
    }
  });
});

function trackEvent(eventName, params = {}) {
  const eventParams = {
    page_path: window.location.pathname,
    ...params,
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, {
      transport_type: "beacon",
      ...eventParams,
    });
  }

  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, eventParams);

    if ([
      "whatsapp_inquiry_click",
      "email_inquiry_click",
      "request_quote_click",
      "inquiry_cta_click",
      "inquiry_form_submit",
    ].includes(eventName)) {
      window.fbq("track", "Lead", {
        content_name: eventName,
        ...eventParams,
      });
    }
  }
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a, button");
  if (!link) return;

  const label = (link.textContent || "").trim();
  const href = link.getAttribute("href") || "";

  if (link.matches("[data-whatsapp]") || href.includes("wa.me") || href.includes("whatsapp.com/send")) {
    trackEvent("whatsapp_inquiry_click", { link_text: label });
    return;
  }

  if (href.startsWith("mailto:")) {
    trackEvent("email_inquiry_click", { link_text: label });
    return;
  }

  if (link.matches("[data-inquiry]")) {
    trackEvent("request_quote_click", {
      link_text: label,
      product: link.getAttribute("data-inquiry") || "",
    });
    return;
  }

    const isInquiryLink = href.includes("contact.html") || href.includes("/contact/") || href.endsWith("contact/") || href.endsWith("contact/index.html") || href === "#inquiry";

  if (/get a quote|get quote|send inquiry|request quote|contact us|whatsapp/i.test(label) || (link.classList.contains("btn") && isInquiryLink)) {
    trackEvent("inquiry_cta_click", { link_text: label, link_url: href });
  }
});

document.querySelectorAll("[data-inquiry]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const product = link.getAttribute("data-inquiry") || "PTFE tape";
    const baseHref = (link.getAttribute("href") || "contact/index.html").split("#")[0];
    const separator = baseHref.includes("?") ? "&" : "?";
    window.location.href = `${baseHref}${separator}product=${encodeURIComponent(product)}`;
  });
});

// Pre-fill Interested Product from URL parameter (?product=...) on contact page
if (typeof window !== "undefined" && window.location.search) {
  const urlParams = new URLSearchParams(window.location.search);
  const productParam = urlParams.get("product");
  if (productParam) {
    const productSelect = document.querySelector('#quoteForm select[name="product"]');
    const messageField = document.querySelector('#quoteForm textarea[name="message"]');
    const productMapping = {
                };
    const targetText = productMapping[productParam] || "Other custom requirement";
    if (productSelect) {
      for (const opt of productSelect.options) {
        if (opt.text === targetText || opt.text.toLowerCase() === targetText.toLowerCase()) {
          opt.selected = true;
          break;
        }
      }
    }
    if (messageField && !messageField.value) {
      const intro = productMapping[productParam] ? "Product: " : "Product (SKU): ";
      messageField.value = intro + productParam + "\n\n";
    }
    const formEl = document.querySelector("#quoteForm");
    if (formEl) {
      setTimeout(() => formEl.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }
}

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  const message = "Hello, I would like to request a PTFE thread seal tape quotation. I will provide size, quantity, packaging method and destination country.";
  const cleanNumber = WHATSAPP_NUMBER.replace(/\D/g, "");

  if (cleanNumber.length >= 8) {
    const encodedMessage = encodeURIComponent(message);
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;

    // WhatsApp Web avoids the wa.me -> api.whatsapp.com redirect on desktop.
    link.href = isDesktop
      ? `https://web.whatsapp.com/send?phone=${cleanNumber}&text=${encodedMessage}`
      : `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    return;
  }

  link.href = "#inquiry";
  link.textContent = "Send Inquiry";
  link.title = "Add your WhatsApp number in assets/js/main.js to enable WhatsApp inquiry.";
});

const quoteForm = document.querySelector("#quoteForm");

if (quoteForm) {
  const validationMessages = {
    name: "Please enter your name or company name.",
    email: "Please enter a valid email address.",
    contact: "Please enter an email address or WhatsApp number.",
  };

  quoteForm.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("input", () => field.setCustomValidity(""));

    field.addEventListener("invalid", () => {
      if (!field.validity.valueMissing && !field.validity.typeMismatch) return;

      const message = validationMessages[field.name] || "Please complete this field.";
      field.setCustomValidity(message);
    });
  });

  const successBox = document.querySelector(".form-success");
  const errorBox = document.querySelector(".form-error");
  const submitBtn = quoteForm.querySelector('button[type="submit"]');
  const defaultBtnText = submitBtn ? submitBtn.textContent : "Send Inquiry";
  const hideStatus = (box) => {
    if (!box) return;
    box.hidden = true;
    box.classList.remove("is-visible");
  };
  const showStatus = (box) => {
    if (!box) return;
    box.hidden = false;
    box.classList.add("is-visible");
  };

  hideStatus(successBox);
  hideStatus(errorBox);

  quoteForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (submitBtn) {
      submitBtn.disabled = true;
      const sendingLabel = getTranslation(localStorage.getItem("siteLanguage") || "en", "Sending...");
      submitBtn.textContent = sendingLabel || "Sending...";
    }
    hideStatus(successBox);
    hideStatus(errorBox);

    const data = new FormData(quoteForm);

    trackEvent("inquiry_form_submit", {
      product: data.get("product") || "",
      country: data.get("country") || "",
    });

    try {
      const response = await fetch(quoteForm.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        quoteForm.hidden = true;
        showStatus(successBox);
        hideStatus(errorBox);
        if (typeof successBox !== "undefined" && successBox && successBox.scrollIntoView) {
          successBox.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } else {
        throw new Error("Formspree response not ok");
      }
    } catch (err) {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = defaultBtnText;
      }
      hideStatus(successBox);
      showStatus(errorBox);
    }
  });
}
