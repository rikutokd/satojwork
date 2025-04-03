// Language translations
const translations = {
    en: {
        site_title: "satoj Photography",
        portfolio_title: "My Portfolio",
        nav_home: "Home",
        nav_portfolio: "Portfolio",
        switch_lang: "日本語",
        portfolio_heading: "Portfolio",
        portfolio_subtitle: "Capturing the Beauty of Sports",
        portfolio_description: "Welcome to my photography portfolio! As a member of the Japan Sports Photography Association, I specialize in capturing the beauty, intensity, and emotion of sports.",
        main_title: "Award-Winning Photography",
        main_description: "Capturing the perfect moment is my passion. With over 10 years of experience, I specialize in sports photography, capturing moments that tell a story. As a member of the Japan Sports Photography Association, my work has been awarded and recognized globally.",
        profile_title: "Profile",
        profile_content: "2014: Enrolled in Mizutani School, hosted by JCII<br>2017: Graduated from Mizutani School<br>2018-2021: Selected for JPS Exhibition<br>2020: JPS Exhibition Excellence Award<br>2023: Associate Member of Nikakai Photography Department<br>Member of Japan Sports Photography Association<br>Public Relations Staff of Japan Rowing Association",
        contact_title: "Contact"
    },
    ja: {
        site_title: "satoj フォトグラフィー",
        portfolio_title: "ポートフォリオ",
        nav_home: "ホーム",
        nav_portfolio: "ポートフォリオ",
        switch_lang: "English",
        portfolio_heading: "ポートフォリオ",
        portfolio_subtitle: "スポーツの美しさを捉える",
        portfolio_description: "私の写真ポートフォリオへようこそ！日本スポーツ写真協会の会員として、スポーツの美しさ、強さ、そして感情を捉えることを専門としています。",
        main_title: "受賞歴のあるフォトグラフィー",
        main_description: "完璧な瞬間を捉えることが私の情熱です。10年以上の経験を持つスポーツ写真家として、ストーリーを語る瞬間を捉えることを専門としています。日本スポーツ写真協会の会員として、私の作品は国内外で受賞し、高く評価されています。",
        profile_title: "プロフィール",
        profile_content: "2014年 JCII主催 水谷塾入塾<br>2017年 同塾卒業<br>2018年〜2021年 JPS展入選<br>2020年 JPS展優秀賞<br>2023年 二科会 写真部 会友<br>一般社団法人 日本スポーツ写真協会 会員<br>日本ローイング協会 広報委員スタッフ",
        contact_title: "お問い合わせ"
    }
};

// Set initial language
let currentLang = 'ja';

// Function to update text content
function updateTextContent() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.value = translations[currentLang][key];
            } else {
                // プロフィールコンテンツの場合は特別な処理
                if (key === 'profile_content') {
                    element.style.whiteSpace = 'pre-line';
                }
                element.innerHTML = translations[currentLang][key];
            }
        }
    });
}

// Add event listener for language toggle
document.addEventListener('DOMContentLoaded', () => {
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', () => {
            currentLang = currentLang === 'ja' ? 'en' : 'ja';
            updateTextContent();
        });
    }
    updateTextContent();
}); 