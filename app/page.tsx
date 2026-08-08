import Slideshow from "@/components/Slideshow";

// Four sample slides — placeholder images + arbitrary text.
// Each direct child of a flex container carries `reveal` for the staggered entrance.
const slides: React.ReactNode[] = [
  // 1) Title
  <div className="pad center" key="s1">
    <p className="kicker reveal">Sample Deck</p>
    <h1 className="display h1 reveal">
      サンプル
      <br />
      スライド
    </h1>
    <hr className="rule reveal" />
    <p className="lead reveal">
      Next.js で作る 16:9 ウェブスライドのひな形。
      <br />
      ← → ・クリック・スワイプでめくれます。
    </p>
    <span className="foot">01 / 04</span>
  </div>,

  // 2) Split (image left, text right)
  <div className="split" key="s2">
    <div className="figure reveal">
      <img src="/placeholder-1.svg" alt="プレースホルダ画像 1" />
    </div>
    <div className="panel">
      <p className="kicker reveal">Section</p>
      <h2 className="display h2 reveal">画像とテキスト</h2>
      <hr className="rule reveal" />
      <p className="body reveal">
        左に画像、右に本文を置いた基本レイアウトです。画像は
        16:9 のステージ内で切り抜き表示され、画面サイズが変わっても
        スライド全体が比率を保ったまま拡大・縮小します。
      </p>
    </div>
  </div>,

  // 3) Hero (image top, caption below)
  <div className="hero" key="s3">
    <div className="figure reveal">
      <img src="/placeholder-2.svg" alt="プレースホルダ画像 2" />
    </div>
    <div className="panel">
      <h2 className="display h2 reveal">ヒーロー型レイアウト</h2>
      <p className="body reveal">
        上部に大きな画像、下部に見出しと説明。ここに任意の文章が入ります。
        これはダミーテキストです。差し替えてご利用ください。
      </p>
    </div>
  </div>,

  // 4) Closing
  <div className="pad center" key="s4">
    <p className="kicker reveal">End</p>
    <h2 className="display h2 reveal">
      ここに結びの
      <br />
      一文を置く
    </h2>
    <hr className="rule reveal" />
    <p className="lead reveal">
      画面より横長なら左右、縦長なら上下に黒帯が出ます。
    </p>
    <span className="foot">04 / 04</span>
  </div>,
];

export default function Page() {
  return <Slideshow slides={slides} />;
}
