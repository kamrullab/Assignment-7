import { notFound } from "next/navigation";
import { MapPin, TrendingUp } from "lucide-react";
import { getProduct } from "@/lib/products";
import { bnNumber, unitLabel } from "@/lib/format";
import { ChangeBadge } from "@/components/product-card";
export default async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const min = Math.min(...product.markets.map((m) => m.min));
  const max = Math.max(...product.markets.map((m) => m.max));
  const avg = Math.round(
    product.markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) /
      product.markets.length,
  );
  return (
    <section className="container section detail-page">
      <div className="breadcrumbs">
        হোম　›　{product.categoryNameBn}　›　{product.nameBn}
      </div>
      <div className="detail-hero">
        <div className="detail-emoji">{product.image}</div>
        <div>
          <span className="tag">
            {product.categoryIcon} {product.categoryNameBn}
          </span>
          <h1>{product.nameBn}</h1>
          <p>
            গতকালের তুলনায় আজ দাম{" "}
            {product.change.dir === "up"
              ? "বেড়েছে"
              : product.change.dir === "down"
                ? "কমেছে"
                : "অপরিবর্তিত"}
            । বাজারভিত্তিক বিস্তারিত তথ্য নিচে দেখুন।
          </p>
          <div className="detail-meta">
            <span>{unitLabel(product.unit)}</span>
            <ChangeBadge product={product} />
          </div>
        </div>
      </div>
      <div className="summary">
        <article>
          <small>সর্বনিম্ন দাম</small>
          <strong>{bnNumber(min)} টাকা</strong>
          <span>সবচেয়ে কম দামের বাজার</span>
        </article>
        <article>
          <small>সর্বাধিক দাম</small>
          <strong>{bnNumber(max)} টাকা</strong>
          <span>সবচেয়ে বেশি দামের বাজার</span>
        </article>
        <article className="featured">
          <small>গড় দাম</small>
          <strong>{bnNumber(avg)} টাকা</strong>
          <span>
            <TrendingUp size={15} /> আজকের বাজার গড়
          </span>
        </article>
      </div>
      <div className="market-section">
        <div className="section-heading">
          <div>
            <span className="kicker">⚖️ বাজার তুলনা</span>
            <h2>বাজারভিত্তিক আজকের দাম</h2>
          </div>
        </div>
        <div className="market-table">
          <div className="market-head">
            <span>বাজার</span>
            <span>বিভাগ</span>
            <span>সর্বনিম্ন</span>
            <span>সর্বাধিক</span>
          </div>
          {product.markets.map((m) => (
            <div className="market-row" key={`${m.market}-${m.division}`}>
              <b data-label="বাজার">
                <MapPin size={16} />
                {m.market}
              </b>
              <span data-label="বিভাগ">{m.division}</span>
              <span data-label="সর্বনিম্ন">{bnNumber(m.min)} টাকা</span>
              <strong data-label="সর্বাধিক">{bnNumber(m.max)} টাকা</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
