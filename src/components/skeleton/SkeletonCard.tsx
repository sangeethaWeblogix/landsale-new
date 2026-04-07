import "./skeleton-card.css";

export default function SkeletonCard() {
  return (
    <article className="sk-card">
      <div className="sk-image" />
      <div className="sk-content">
        <div className="sk-line sk-title"></div>
        <div className="sk-line sk-location"></div>
        <div className="sk-line sk-price"></div>
      </div>
    </article>
  );
}
