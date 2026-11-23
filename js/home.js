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
