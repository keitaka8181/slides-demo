# slides-demo — Next.js ウェブスライド（サンプル4枚）

16:9 のスライドを黒背景レターボックスで中央表示する、最小構成のサンプルです。
矢印キー（← →）・クリック（左半分=前 / 右半分=次）・スワイプでめくれます。

## 仕様（確定済み）

- 16:9 を比率維持で「画面に収まる最大サイズ」で中央表示（見切れなし）
- 余白（レターボックス）は黒
- 操作: ← → キー / クリック / スワイプ（＋ Space, PageUp/Down, Home/End）
- 拡大抑制なし・ページ番号/進捗バー/一覧/印刷最適化/パスワード保護なし
- スライド本体は白基調のシンプルなデザイン

## 構成

```
slides-demo/
├─ app/
│  ├─ layout.tsx      フォント（次項）とグローバルCSSの読み込み
│  ├─ page.tsx        ★ スライド4枚の中身（ここを編集）
│  └─ globals.css     ステージのフィット計算・スライドのレイアウト/装飾
├─ components/
│  └─ Slideshow.tsx   フィット拡大＋めくり操作（キー/クリック/スワイプ）
├─ public/
│  ├─ placeholder-1.svg
│  └─ placeholder-2.svg
└─ package.json
```

仕組みは「1280×720 の固定ステージを `transform: scale()` で画面に合わせて拡大」。
だから文字も画像もスライド全体が一体で拡大縮小し、レイアウトが崩れません。

## pnpm workspace への組み込み

このフォルダ `slides-demo/` を、お使いのワークスペースのパッケージ置き場
（例 `apps/` や `packages/`）に置いてください。`pnpm-workspace.yaml` の
globs（例 `apps/*` や `packages/*`）に含まれていれば追加設定は不要です。
含まれない場所に置く場合は globs に一行足してください。

```bash
# ルートで
pnpm install
pnpm --filter slides-demo dev      # http://localhost:3000
pnpm --filter slides-demo build
```

単体で試すだけなら、このフォルダ内で `npm install && npm run dev` でも動きます。

## フォントについて（初回ビルドのみネットワークが要る）

`app/layout.tsx` で next/font/google を使い、日本語対応の
Shippori Mincho（見出し）/ Zen Kaku Gothic New（本文）を読み込みます。
next/font はビルド時にフォントを取得して自己ホストします（実行時は外部通信なし）。
社内などビルド時もオフラインにしたい場合は、layout.tsx のフォント指定を外し、
globals.css のフォールバック（Hiragino / Noto）だけで運用できます。

## 中身の差し替え

スライドの中身は `app/page.tsx` の `slides` 配列だけ見れば変えられます。
1要素 = 1スライド。用意したレイアウト用クラス:

- `pad center` … 中央寄せ（表紙・結び向け）
- `split` … 左に画像（`figure`）/右に本文（`panel`）
- `hero` … 上に画像/下に見出し＋本文
- 文字: `kicker`（小見出し）, `display h1`/`h2`（見出し）, `lead`/`body`（本文）, `rule`（アクセント線）
- 各要素に `reveal` を付けると、表示時に下から順にふわっと出ます

画像は `public/` に置いて `<img src="/ファイル名" />` で参照します。
アクセント色は globals.css の `--accent`（既定は朱 #c0492f）。

## Vercel での公開

このフォルダを Git に入れて Vercel にインポートするだけです。
モノレポの場合は Vercel の Project 設定で **Root Directory** を
`slides-demo`（実際の配置パス）に指定してください。ビルドは自動検出されます。
公開URLは「知っていれば誰でも閲覧可」になります。限定公開したい場合は
Vercel 側のアクセス保護機能を使ってください。

## 動作確認済みのこと

- `tsc --noEmit` 型チェック通過
- `next build` 成功（ルートは静的化、スライド操作はクライアントで動作）
- 画面が横長→左右黒帯 / 縦長→上下黒帯、を実描画で確認
