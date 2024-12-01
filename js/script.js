// script.js

document.addEventListener('DOMContentLoaded', function() {
    const images = [
        { src: "image/スケート１.JPG", alt: "skate 1" },
        { src: "image/スケート２.JPG", alt: "skate 2" },
        { src: "image/スケート４.JPG", alt: "skate 4" },
        { src: "image/トライアスロン１.JPG", alt: "triathlon 1" },
        { src: "image/トライアスロン２.JPG", alt: "triathlon 2" },
        { src: "image/トライアスロン３.jpg", alt: "triathlon 3" },
        { src: "image/トライアスロン４.JPG", alt: "triathlon 4" },
        { src: "image/ホッケー１.JPG", alt: "hockey 1" },
        { src: "image/ホッケー２.JPG", alt: "hockey 2" },
        { src: "image/ホッケー３.JPG", alt: "hockey 3" },
        { src: "image/ボート１.JPG", alt: "boat 1" },
        { src: "image/ボート２.JPG", alt: "boat 2" },
        { src: "image/ボート３.JPG", alt: "boat 3" },
        { src: "image/ボート４.JPG", alt: "boat 4" },
        { src: "image/ラグビー１.JPG", alt: "rugby 1" },
        { src: "image/ラグビー２.JPG", alt: "rugby 2" },
        { src: "image/ラグビー３.JPG", alt: "rugby 3" },
        { src: "image/ラグビー４.JPG", alt: "rugby 4" },
        { src: "image/ラグビー５.JPG", alt: "rugby 5" },
        { src: "image/ラグビー６.JPG", alt: "rugby 6" },
        { src: "image/ラグビー７.JPG", alt: "rugby 7" },
        { src: "image/未分類１.JPG", alt: "Uncategorized 1" },
        { src: "image/未分類２.JPG", alt: "Uncategorized 2" },
        { src: "image/未分類３.JPG", alt: "Uncategorized 3" },
        { src: "image/未分類４.JPG", alt: "Uncategorized 4" },
        { src: "image/未分類５.JPG", alt: "Uncategorized 5" },
        { src: "image/水泳１.JPG", alt: "swimming 1" },
        { src: "image/水泳２.JPG", alt: "swimming 2" },
        { src: "image/水泳３.JPG", alt: "swimming 3" },
        { src: "image/水泳４.JPG", alt: "swimming 4" },
        { src: "image/水泳５.JPG", alt: "swimming 5" },
        { src: "image/水泳６.JPG", alt: "swimming 6" },
        { src: "image/バスケポートフォリオ用/1.JPG", alt: "basketball 1" },
        { src: "image/バスケポートフォリオ用/9.JPG", alt: "basketball 9" },
        { src: "image/バスケポートフォリオ用/10.JPG", alt: "basketball 10" },
        { src: "image/バスケポートフォリオ用/11.JPG", alt: "basketball 11" }
    ];

    const imageGallery = document.getElementById('imageGallery');

    // スケルトン付きで画像を描画する関数
    function displayImageWithSkeleton(image) {
        const div = document.createElement('div');
        div.classList.add('overflow-hidden');
        div.style.background = '#e0e0e0'; // スケルトンの背景色

        const a = document.createElement('a');
        a.href = image.src;
        a.setAttribute('data-lightbox', 'image-set');

        const img = document.createElement('img');
        img.dataset.src = image.src; // 遅延読み込み用
        img.alt = image.alt;
        img.style.opacity = 0; // 初期状態で画像は非表示

        // 画像ロード後の処理
        img.onload = () => {
            div.style.background = 'none'; // スケルトン背景を削除
            img.style.opacity = 1; // 画像を表示
        };

        // エラーハンドリング
        img.onerror = () => {
            console.error(`Failed to load image: ${image.src}`);
            div.style.background = '#ffcccc'; // エラー時の背景色（オプション）
        };

        // 遅延読み込みを設定
        img.loading = 'lazy';

        a.appendChild(img);
        div.appendChild(a);
        imageGallery.appendChild(div);

        // IntersectionObserverで遅延読み込みを監視
        observer.observe(img);
    }

    // IntersectionObserverを使用した遅延読み込み
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src; // 実際の画像を読み込み
                observer.unobserve(img); // 観測を終了
            }
        });
    });

    // 画像を順次描画
    images.forEach(image => displayImageWithSkeleton(image));
});