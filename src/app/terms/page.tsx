export const metadata = {
  title: "利用規約 | ささきや書店"
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-6 py-16 text-sm leading-relaxed text-slate-700">
      <h1 className="text-3xl font-semibold text-slate-900">利用規約</h1>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-800">Amazon アソシエイト規約遵守</h2>
        <p>
          本サービスでは Amazon Product Advertising API (PA-API) を利用して Kindle 書籍の情報を取得します。
          ユーザーは Amazon.co.jp が定める各種ガイドラインおよび利用規約を遵守する必要があります。
        </p>
        <p>
          取得した説明文は要約された内容のみを保存し、書影は Amazon が提供する画像 URL を直接参照します。
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-800">プランとアフィリエイトタグ</h2>
        <p>
          無料プランでは、紹介リンクにささきや書店が管理するアフィリエイトタグが自動的に付与されます。
          Pro プラン (¥500/月) にアップグレードすることで、各ユーザーは自身の Amazon アソシエイトタグを設定できます。
        </p>
        <p>
          Pro プランの解約または支払い失効時には、即時に無料プラン相当の挙動に戻り、リンクにはささきや書店のタグが適用されます。
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-800">禁止事項</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>PA-API で取得したデータの再配布やスクレイピングによる無断取得</li>
          <li>Amazon.co.jp 以外のドメインへの誘導や Kindle 以外の商品の掲載</li>
          <li>法令や公序良俗に反するコンテンツの掲載</li>
        </ul>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-800">お問い合わせ</h2>
        <p>規約に関するお問い合わせは公式サポート (support@sasakiya.shoten) までご連絡ください。</p>
      </section>
    </div>
  );
}
