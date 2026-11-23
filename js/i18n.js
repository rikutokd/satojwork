// Japanese / English switching.
// Text: <el data-i18n="key">  /  attributes: <el data-i18n-attr="aria-label:key">
const translations = {
    ja: {
        doc_title_home: "satoj Photography | スポーツ写真家",
        doc_title_portfolio: "ポートフォリオ | satoj Photography",
        nav_home: "ホーム",
        nav_portfolio: "ポートフォリオ",
        nav_contact: "お問い合わせ",
        switch_lang: "EN",
        switch_lang_label: "Switch to English",
        hero_label: "作品スライドショー",
        hero_prev: "前の写真",
        hero_next: "次の写真",
        hero_goto: "写真 {n} を表示",
        about_eyebrow: "About",
        main_title: "受賞歴のあるフォトグラフィー",
        main_description:
            "完璧な瞬間を捉えることが私の情熱です。10年以上の経験を持つスポーツ写真家として、ストーリーを語る瞬間を捉えることを専門としています。日本スポーツ写真協会の会員として、私の作品は国内外で受賞し、高く評価されています。",
        view_works: "作品を見る",
        profile_eyebrow: "Profile",
        profile_title: "プロフィール",
        career_1: "JCII主催 水谷塾 入塾",
        career_2: "同塾 卒業",
        career_3: "JPS展 入選",
        career_4: "JPS展 優秀賞",
        career_5: "二科会 写真部 会友",
        career_6: "一般社団法人 日本スポーツ写真協会 会員",
        career_7: "日本ローイング協会 広報委員スタッフ",
        career_now: "現在",
        contact_eyebrow: "Contact",
        contact_title: "お問い合わせ",
        contact_text: "撮影のご依頼・作品の使用に関するご相談は、メールにてお気軽にご連絡ください。",
        portfolio_heading: "ポートフォリオ",
        portfolio_subtitle: "スポーツの美しさ、強さ、そして感情を捉える",
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
        doc_title_portfolio: "Portfolio | satoj Photography",
        nav_home: "Home",
        nav_portfolio: "Portfolio",
        nav_contact: "Contact",
        switch_lang: "JP",
        switch_lang_label: "日本語に切り替え",
        hero_label: "Featured photographs",
        hero_prev: "Previous photo",
        hero_next: "Next photo",
        hero_goto: "Show photo {n}",
        about_eyebrow: "About",
        main_title: "Award-Winning Photography",
        main_description:
            "Capturing the perfect moment is my passion. With over 10 years of experience, I specialize in sports photography, capturing moments that tell a story. As a member of the Japan Sports Photography Association, my work has been awarded and recognized in Japan and abroad.",
        view_works: "View Works",
        profile_eyebrow: "Profile",
        profile_title: "Profile",
        career_1: "Enrolled in Mizutani School, hosted by JCII",
        career_2: "Graduated from Mizutani School",
        career_3: "Selected for the JPS Exhibition",
        career_4: "JPS Exhibition Excellence Award",
        career_5: "Associate Member, Nikakai Photography Department",
        career_6: "Member, Japan Sports Photography Association",
        career_7: "Public Relations Staff, Japan Rowing Association",
        career_now: "Present",
        contact_eyebrow: "Contact",
        contact_title: "Contact",
        contact_text: "For commissions or inquiries about using my photographs, please feel free to get in touch by email.",
        portfolio_heading: "Portfolio",
        portfolio_subtitle: "Capturing the beauty, intensity, and emotion of sports",
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
