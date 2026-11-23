// Japanese / English switching.
// Text: <el data-i18n="key">  /  attributes: <el data-i18n-attr="aria-label:key">
const translations = {
    ja: {
        doc_title_home: "satoj Photography | スポーツ写真家",
        doc_title_portfolio: "作品 | satoj Photography",
        nav_home: "ホーム",
        nav_portfolio: "作品",
        nav_profile: "プロフィール",
        nav_contact: "撮影のご依頼",
        switch_lang: "EN",
        switch_lang_label: "Switch to English",
        hero_label: "作品スライドショー",
        hero_prev: "前の写真",
        hero_next: "次の写真",
        hero_goto: "写真 {n} を表示",
        main_title: "競技の決定的瞬間を、一枚に。",
        main_description:
            "水泳、ラグビー、ボート、トライアスロンをはじめ、さまざまな競技の現場で撮影を続けて10年以上。水しぶき、ぶつかり合う瞬間、ゴール直後の表情——一瞬で過ぎていく競技の決定的な場面を、一枚の写真として残すことを大切にしています。",
        main_credits: "JPS展 優秀賞ほか受賞。日本スポーツ写真協会 会員、日本ローイング協会 広報スタッフ。",
        sports_count_label: "撮影している競技",
        view_works: "作品をすべて見る",
        sports_title: "撮影競技",
        sports_count: "{n}点",
        profile_title: "プロフィール",
        career_1: "JCII主催 水谷塾 入塾",
        career_2: "同塾 卒業",
        career_3: "JPS展 入選",
        career_4: "JPS展 優秀賞",
        career_5: "二科会 写真部 会友",
        career_6: "一般社団法人 日本スポーツ写真協会 会員",
        career_7: "日本ローイング協会 広報委員スタッフ",
        career_now: "現在",
        contact_title: "撮影のご依頼",
        contact_text: "大会・試合の撮影、チームや選手の広報写真、作品の使用に関するご相談は、メールにてお気軽にご連絡ください。",
        portfolio_heading: "作品",
        filter_label: "競技で絞り込む",
        cat_all: "すべて",
        cat_swimming: "水泳",
        cat_rugby: "ラグビー",
        cat_rowing: "ボート",
        cat_triathlon: "トライアスロン",
        cat_hockey: "ホッケー",
        cat_skate: "スピードスケート",
        cat_basketball: "バスケットボール",
        cat_other: "その他",
        photo_alt: "{cat}の写真 {n}",
        lb_label: "写真の拡大表示",
        lb_close: "閉じる",
        lb_prev: "前の写真",
        lb_next: "次の写真",
    },
    en: {
        doc_title_home: "satoj Photography | Sports Photographer",
        doc_title_portfolio: "Work | satoj Photography",
        nav_home: "Home",
        nav_portfolio: "Work",
        nav_profile: "Profile",
        nav_contact: "Commissions",
        switch_lang: "JP",
        switch_lang_label: "日本語に切り替え",
        hero_label: "Featured photographs",
        hero_prev: "Previous photo",
        hero_next: "Next photo",
        hero_goto: "Show photo {n}",
        main_title: "The decisive moment of every race and match.",
        main_description:
            "For more than 10 years I have photographed swimming, rugby, rowing, triathlon and many other sports from the field of play. Spray off the water, the moment of impact, the face just after the finish line: I work to hold on to the split-second scenes that make each sport what it is.",
        main_credits: "Winner of the JPS Exhibition Excellence Award, among others. Member of the Japan Sports Photography Association and public relations staff for the Japan Rowing Association.",
        sports_count_label: "Sports covered",
        view_works: "View all work",
        sports_title: "Sports I Cover",
        sports_count: "{n} photos",
        profile_title: "Profile",
        career_1: "Enrolled in Mizutani School, hosted by JCII",
        career_2: "Graduated from Mizutani School",
        career_3: "Selected for the JPS Exhibition",
        career_4: "JPS Exhibition Excellence Award",
        career_5: "Associate Member, Nikakai Photography Department",
        career_6: "Member, Japan Sports Photography Association",
        career_7: "Public Relations Staff, Japan Rowing Association",
        career_now: "Present",
        contact_title: "Commissions",
        contact_text: "For event and match coverage, team or athlete publicity photos, or inquiries about using my photographs, please get in touch by email.",
        portfolio_heading: "Work",
        filter_label: "Filter by sport",
        cat_all: "All",
        cat_swimming: "Swimming",
        cat_rugby: "Rugby",
        cat_rowing: "Rowing",
        cat_triathlon: "Triathlon",
        cat_hockey: "Hockey",
        cat_skate: "Speed Skating",
        cat_basketball: "Basketball",
        cat_other: "Other",
        photo_alt: "{cat} photograph {n}",
        lb_label: "Photo viewer",
        lb_close: "Close",
        lb_prev: "Previous photo",
        lb_next: "Next photo",
    },
};

const I18N_KEY = "satoj-lang";

function detectLang() {
    try {
        const saved = localStorage.getItem(I18N_KEY);
        if (saved && translations[saved]) return saved;
    } catch (e) {
        /* storage unavailable */
    }
    const nav = (navigator.language || "ja").toLowerCase();
    return nav.startsWith("ja") ? "ja" : "en";
}

let currentLang = detectLang();

// t("photo_alt", { cat: "...", n: 1 })
function t(key, vars) {
    let s = (translations[currentLang] && translations[currentLang][key]) || translations.ja[key] || key;
    if (vars) for (const k in vars) s = s.replace("{" + k + "}", vars[k]);
    return s;
}

function applyTranslations() {
    document.documentElement.lang = currentLang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
        el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
        el.dataset.i18nAttr.split(";").forEach((pair) => {
            const [attr, key] = pair.split(":").map((s) => s.trim());
            if (attr && key) el.setAttribute(attr, t(key));
        });
    });
    const titleKey = document.body.dataset.titleKey;
    if (titleKey) document.title = t(titleKey);
    document.dispatchEvent(new CustomEvent("langchange", { detail: currentLang }));
}

function setLang(lang) {
    currentLang = lang;
    try {
        localStorage.setItem(I18N_KEY, lang);
    } catch (e) {
        /* storage unavailable */
    }
    applyTranslations();
}

document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("languageToggle");
    if (toggle) {
        toggle.addEventListener("click", () => setLang(currentLang === "ja" ? "en" : "ja"));
    }
    applyTranslations();
});
