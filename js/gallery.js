// Portfolio page: category filter, justified gallery, lightbox.
document.addEventListener("DOMContentLoaded", () => {
    const photos = window.PHOTOS || [];
    const gallery = document.getElementById("gallery");
    const filters = document.getElementById("filters");
    if (!gallery || !filters) return;

    const thumbSrc = (p) => `photos/thumb/${p.id}.webp`;
    const largeSrc = (p) => `photos/large/${p.id}.webp`;

    // Number each photo within its category for alt text ("Rugby photograph 3").
    const perCat = {};
    photos.forEach((p) => {
        perCat[p.category] = (perCat[p.category] || 0) + 1;
        p.n = perCat[p.category];
    });
    const altText = (p) => t("photo_alt", { cat: t("cat_" + p.category), n: p.n });

    const categories = ["all", ...new Set(photos.map((p) => p.category))];
    let current = "all";
    let visible = photos;

    /* ---------- Filters ---------- */

    const filterButtons = categories.map((cat) => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "filter-btn";
        btn.dataset.cat = cat;
        const label = document.createElement("span");
        label.dataset.i18n = "cat_" + cat;
        label.textContent = t("cat_" + cat);
        const count = document.createElement("span");
        count.className = "count";
        count.textContent = cat === "all" ? photos.length : perCat[cat];
        btn.append(label, count);
        btn.addEventListener("click", () => {
            setCategory(cat);
            history.replaceState(null, "", cat === "all" ? location.pathname : "#" + cat);
        });
        li.appendChild(btn);
        filters.appendChild(li);
        return btn;
    });

    function setCategory(cat) {
        current = categories.includes(cat) ? cat : "all";
        filterButtons.forEach((b) => b.setAttribute("aria-pressed", b.dataset.cat === current ? "true" : "false"));
        render();
    }

    /* ---------- Gallery ---------- */

    function render() {
        visible = current === "all" ? photos : photos.filter((p) => p.category === current);
        gallery.replaceChildren(
            ...visible.map((p, i) => {
                const li = document.createElement("li");
                li.className = "gallery-item";
                li.style.setProperty("--r", (p.width / p.height).toFixed(4));

                const btn = document.createElement("button");
                btn.type = "button";
                btn.addEventListener("click", () => openLightbox(i, btn));

                const img = document.createElement("img");
                img.src = thumbSrc(p);
                img.alt = altText(p);
                img.width = p.width;
                img.height = p.height;
                img.loading = i < 6 ? "eager" : "lazy";
                img.decoding = "async";
                if (img.complete) img.classList.add("is-loaded");
                else img.addEventListener("load", () => img.classList.add("is-loaded"), { once: true });
                img.addEventListener("error", () => img.classList.add("is-loaded"), { once: true });

                btn.appendChild(img);
                li.appendChild(btn);
                return li;
            })
        );
    }

    /* ---------- Lightbox ---------- */

    const lb = document.getElementById("lightbox");
    const lbImg = lb.querySelector(".lb-stage img");
    const lbCounter = lb.querySelector(".lb-counter");
    const lbCaption = lb.querySelector(".lb-caption");
    const lbClose = lb.querySelector(".lb-close");
    let lbIndex = 0;
    let returnFocus = null;

    function preload(i) {
        const p = visible[(i + visible.length) % visible.length];
        if (p) new Image().src = largeSrc(p);
    }

    function showLightbox(i) {
        lbIndex = (i + visible.length) % visible.length;
        const p = visible[lbIndex];
        lbImg.classList.add("is-loading");
        lbImg.onload = () => lbImg.classList.remove("is-loading");
        lbImg.src = largeSrc(p);
        lbImg.alt = altText(p);
        lbImg.width = p.width;
        lbImg.height = p.height;
        lbCounter.textContent = `${lbIndex + 1} / ${visible.length}`;
        lbCaption.textContent = t("cat_" + p.category);
        preload(lbIndex + 1);
        preload(lbIndex - 1);
    }

    function openLightbox(i, trigger) {
        returnFocus = trigger;
        lb.classList.add("is-open");
        lb.setAttribute("aria-hidden", "false");
        document.body.classList.add("no-scroll");
        showLightbox(i);
        lbClose.focus();
    }

    function closeLightbox() {
        lb.classList.remove("is-open");
        lb.setAttribute("aria-hidden", "true");
        document.body.classList.remove("no-scroll");
        lbImg.removeAttribute("src");
        if (returnFocus) returnFocus.focus();
    }

    lbClose.addEventListener("click", closeLightbox);
    lb.querySelector(".lb-prev").addEventListener("click", () => showLightbox(lbIndex - 1));
    lb.querySelector(".lb-next").addEventListener("click", () => showLightbox(lbIndex + 1));
    lb.querySelector(".lb-stage").addEventListener("click", (e) => {
        if (e.target === e.currentTarget) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
        if (!lb.classList.contains("is-open")) return;
        if (e.key === "Escape") closeLightbox();
        else if (e.key === "ArrowLeft") showLightbox(lbIndex - 1);
        else if (e.key === "ArrowRight") showLightbox(lbIndex + 1);
        else if (e.key === "Tab") {
            // Keep focus inside the dialog.
            const focusable = Array.from(lb.querySelectorAll("button")).filter((b) => b.offsetParent !== null);
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });

    let touchX = null;
    lb.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
    lb.addEventListener("touchend", (e) => {
        if (touchX === null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 40) showLightbox(lbIndex + (dx < 0 ? 1 : -1));
        touchX = null;
    });

    /* ---------- Language change ---------- */

    document.addEventListener("langchange", () => {
        gallery.querySelectorAll("img").forEach((img, i) => (img.alt = altText(visible[i])));
        if (lb.classList.contains("is-open")) {
            const p = visible[lbIndex];
            lbImg.alt = altText(p);
            lbCaption.textContent = t("cat_" + p.category);
        }
    });

    window.addEventListener("hashchange", () => setCategory(location.hash.slice(1)));
    setCategory(location.hash.slice(1) || "all");
});
