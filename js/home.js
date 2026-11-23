// Home page hero slideshow (autoplay, arrows, dots, keyboard, swipe).
document.addEventListener("DOMContentLoaded", () => {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    const slides = Array.from(hero.querySelectorAll(".hero-slide"));
    const dotsWrap = hero.querySelector(".hero-dots");
    const INTERVAL = 6000;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let index = 0;
    let timer = null;

    const dots = slides.map((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "hero-dot";
        dot.addEventListener("click", () => {
            show(i);
            restart();
        });
        dotsWrap.appendChild(dot);
        return dot;
    });

    function labelDots() {
        dots.forEach((dot, i) => dot.setAttribute("aria-label", t("hero_goto", { n: i + 1 })));
    }

    function show(i) {
        index = (i + slides.length) % slides.length;
        slides.forEach((s, j) => {
            s.classList.toggle("is-active", j === index);
            s.setAttribute("aria-hidden", j === index ? "false" : "true");
        });
        dots.forEach((d, j) => d.setAttribute("aria-current", j === index ? "true" : "false"));
        // Make sure the next slide is ready before it fades in.
        const next = slides[(index + 1) % slides.length].querySelector("img");
        if (next && next.loading === "lazy") next.loading = "eager";
    }

    function stop() {
        clearInterval(timer);
        timer = null;
    }

    function start() {
        if (reduceMotion || slides.length < 2) return;
        stop();
        timer = setInterval(() => show(index + 1), INTERVAL);
    }

    function restart() {
        stop();
        start();
    }

    hero.querySelector(".hero-prev").addEventListener("click", () => {
        show(index - 1);
        restart();
    });
    hero.querySelector(".hero-next").addEventListener("click", () => {
        show(index + 1);
        restart();
    });

    hero.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            show(index - 1);
            restart();
        } else if (e.key === "ArrowRight") {
            show(index + 1);
            restart();
        }
    });

    hero.addEventListener("mouseenter", stop);
    hero.addEventListener("mouseleave", start);
    hero.addEventListener("focusin", stop);
    hero.addEventListener("focusout", start);
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

    let touchX = null;
    hero.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
    hero.addEventListener("touchend", (e) => {
        if (touchX === null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 40) {
            show(index + (dx < 0 ? 1 : -1));
            restart();
        }
        touchX = null;
    });

    document.addEventListener("langchange", labelDots);
    labelDots();
    show(0);
    start();
});

// Home page sport lanes: one row per sport, linking to the filtered portfolio.
document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("sportTiles");
    if (!list || !window.PHOTOS) return;

    const covers = new Map();
    const counts = {};
    window.PHOTOS.forEach((p) => {
        if (p.category === "other") return;
        if (!covers.has(p.category)) covers.set(p.category, p);
        counts[p.category] = (counts[p.category] || 0) + 1;
    });

    const total = document.getElementById("sportCount");
    if (total) total.textContent = covers.size;

    const metas = [];
    covers.forEach((p, cat) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.className = "lane";
        a.href = "portfolio.html#" + cat;

        const text = document.createElement("span");
        text.className = "lane-text";
        const name = document.createElement("span");
        name.className = "sport-name";
        name.dataset.i18n = "cat_" + cat;
        name.textContent = t("cat_" + cat);
        const meta = document.createElement("span");
        meta.className = "lane-meta";
        text.append(name, meta);
        metas.push([meta, cat]);

        const photo = document.createElement("span");
        photo.className = "lane-photo";
        const img = document.createElement("img");
        img.src = `photos/thumb/${p.id}.webp`;
        img.alt = "";
        img.loading = "lazy";
        img.decoding = "async";
        photo.appendChild(img);

        a.append(text, photo);
        li.appendChild(a);
        list.appendChild(li);
    });

    // Under the name: the sport in the other language, then the photo count.
    const labelMeta = () =>
        metas.forEach(([el, cat]) => {
            const other = translations[currentLang === "ja" ? "en" : "ja"]["cat_" + cat];
            el.textContent = `${other}\u2003${t("sports_count", { n: counts[cat] })}`;
        });
    document.addEventListener("langchange", labelMeta);
    labelMeta();
});
