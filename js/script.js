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
        { src: "image/バスケポートフォリオ用/2.JPG", alt: "basketball 2" },
        { src: "image/バスケポートフォリオ用/3.JPG", alt: "basketball 3" },
        { src: "image/バスケポートフォリオ用/4.JPG", alt: "basketball 4" },
        { src: "image/バスケポートフォリオ用/6.JPG", alt: "basketball 6" },
        { src: "image/バスケポートフォリオ用/7.JPG", alt: "basketball 7" },
        { src: "image/バスケポートフォリオ用/8.JPG", alt: "basketball 8" },
        { src: "image/バスケポートフォリオ用/9.JPG", alt: "basketball 9" },
        { src: "image/バスケポートフォリオ用/10.JPG", alt: "basketball 10" },
        { src: "image/バスケポートフォリオ用/11.JPG", alt: "basketball 11" },
        { src: "image/バスケポートフォリオ用/12.JPG", alt: "basketball 12" },
        { src: "image/バスケポートフォリオ用/13.JPG", alt: "basketball 13" },
        { src: "image/バスケポートフォリオ用/14.JPG", alt: "basketball 14" },
        { src: "image/バスケポートフォリオ用/15.JPG", alt: "basketball 15" },
        { src: "image/バスケポートフォリオ用/16.JPG", alt: "basketball 16" }
    ];

    const imageGallery = document.getElementById('imageGallery');

    let loadedImages = 0;

    function displayImages() {
        images.forEach(image => {
            const div = document.createElement('div');
            div.classList.add('overflow-hidden');

            const a = document.createElement('a');
            a.href = image.src;
            a.setAttribute('data-lightbox', 'image-set');

            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt;

            a.appendChild(img);
            div.appendChild(a);
            imageGallery.appendChild(div);
        });
        document.getElementById('loader').style.display = 'none';
        document.querySelector('.image-gallery').style.display = 'grid';

    }

    images.forEach((image) => {
        const img = new Image();
        img.src = image.src;
        img.alt = image.alt;

        img.onload = () => {
            loadedImages++;
            if (loadedImages === images.length) {
                displayImages();
            }
        };

        img.onerror = () => {
            console.error(`Failed to load image: ${image.src}`);
            loadedImages++;
            if (loadedImages === images.length) {
                displayImages();
            }
        };
    });
});