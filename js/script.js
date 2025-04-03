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
    const initialLoadCount = 6;
    const loadMoreCount = 6;
    let currentIndex = 0;

    // Create a low-resolution placeholder
    function createPlaceholder() {
        const placeholder = document.createElement('div');
        placeholder.className = 'w-full aspect-[4/3] bg-gray-200 animate-pulse';
        return placeholder;
    }

    // Load images
    function loadImages(count) {
        const end = Math.min(currentIndex + count, images.length);
        
        for (let i = currentIndex; i < end; i++) {
            const image = images[i];
            const div = document.createElement('div');
            div.className = 'overflow-hidden relative image-container';
            
            // Add placeholder
            const placeholder = createPlaceholder();
            div.appendChild(placeholder);
            
            const a = document.createElement('a');
            a.href = image.src;
            a.setAttribute('data-lightbox', 'image-set');
            a.setAttribute('data-title', image.alt);
            
            const img = new Image();
            img.src = image.src;
            img.alt = image.alt;
            img.className = 'w-full h-full object-cover transition-opacity duration-300 cursor-pointer';
            img.style.opacity = '0';
            
            img.onload = () => {
                placeholder.remove();
                img.style.opacity = '1';
            };

            img.onerror = () => {
                placeholder.remove();
                div.innerHTML = '<div class="w-full aspect-[4/3] bg-gray-200 flex items-center justify-center text-gray-500">画像の読み込みに失敗しました</div>';
            };
            
            a.appendChild(img);
            div.appendChild(a);
            imageGallery.appendChild(div);
        }
        
        currentIndex = end;
        
        // Hide the load more button after first click
        const loadMoreButton = document.getElementById('loadMoreButton');
        if (loadMoreButton) {
            loadMoreButton.style.display = 'none';
        }
    }

    // Create and add load more button
    function createLoadMoreButton() {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'text-center mt-8';
        
        const button = document.createElement('button');
        button.id = 'loadMoreButton';
        button.className = 'px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors';
        button.textContent = 'もっと見る';
        button.addEventListener('click', () => loadImages(images.length - currentIndex));
        
        buttonContainer.appendChild(button);
        imageGallery.parentNode.insertBefore(buttonContainer, imageGallery.nextSibling);
    }

    // Configure lightbox
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'albumLabel': '画像 %1 / %2',
        'fadeDuration': 300,
        'imageFadeDuration': 300,
        'disableScrolling': true,
        'fitImagesInViewport': true,
        'maxWidth': '100%',
        'maxHeight': '100%'
    });

    // Initial load
    loadImages(initialLoadCount);
    createLoadMoreButton();
});