# satoj Photography

https://satojwork.com （GitHub Pages）

## 構成

| パス | 内容 |
| --- | --- |
| `index.html` | トップ（スライドショー・紹介・プロフィール・お問い合わせ） |
| `portfolio.html` | 作品一覧（競技別の絞り込み・拡大表示） |
| `css/style.css` | 共通スタイル |
| `js/i18n.js` | 日本語 / 英語の文言と切り替え |
| `js/photos.js` | 作品の一覧データ |
| `js/home.js` / `js/gallery.js` | スライドショー / ギャラリー・拡大表示 |
| `photos/thumb/` `photos/large/` | Web 表示用に縮小した画像（WebP） |
| `image/` | 元画像（サイトからは直接読み込まない） |

## 作品の追加方法

1. 元画像を `image/` に置く
2. Web 用画像を作る（ImageMagick。位置情報などのメタデータも削除されます）

   ```sh
   magick "image/元画像.JPG" -auto-orient -strip -colorspace sRGB -resize '900x900>'   -quality 78 photos/thumb/rugby-8.webp
   magick "image/元画像.JPG" -auto-orient -strip -colorspace sRGB -resize '2400x2400>' -quality 85 photos/large/rugby-8.webp
   magick identify -format "%w %h\n" photos/large/rugby-8.webp   # 幅と高さを確認
   ```

3. `js/photos.js` に 1 行追加する: `["rugby-8", "rugby", 幅, 高さ],`

新しい競技カテゴリを作る場合は、`js/i18n.js` の `ja` / `en` 両方に `cat_カテゴリ名` を追加してください。
