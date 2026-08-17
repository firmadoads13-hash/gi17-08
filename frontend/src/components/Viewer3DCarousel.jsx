import { useState, useCallback } from "react";
import Viewer3D from "./Viewer3D";

/**
 * Viewer3DCarousel
 * Setas alinhadas com os dots na barra inferior.
 */
export default function Viewer3DCarousel({ items = [], catalogUrl = "/contato" }) {
  const [idx, setIdx] = useState(0);
  const total = items.length;
  const current = items[idx] || items[0];

  const next = useCallback(() => setIdx((i) => (i + 1) % total), [total]);
  const prev = useCallback(
    () => setIdx((i) => (i - 1 + total) % total),
    [total]
  );

  if (!current) return null;

  return (
    <div className="viewer-carousel-wrap">
      <div className="viewer-carousel" data-testid="viewer-carousel">
      <Viewer3D
        key={current.url}
        label={current.label}
        modelUrl={current.url}
      />

      {/* Barra inferior: seta · dots · seta */}
      <div className="viewer-navbar" aria-hidden="false">
        <button
          type="button"
          className="viewer-nav viewer-nav--prev"
          onClick={prev}
          aria-label="Modelo anterior"
          data-testid="viewer-prev"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="viewer-dots" aria-hidden="true">
          {items.map((it, i) => (
            <button
              key={it.url}
              type="button"
              className={`viewer-dot ${i === idx ? "is-active" : ""}`}
              onClick={() => setIdx(i)}
              aria-label={`Ver ${it.label}`}
              data-testid={`viewer-dot-${i}`}
            />
          ))}
        </div>

        <button
          type="button"
          className="viewer-nav viewer-nav--next"
          onClick={next}
          aria-label="Próximo modelo"
          data-testid="viewer-next"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <span className="viewer-counter">
        {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
      </div>

      {/* Link para catálogo completo */}
      <a
        href={catalogUrl}
        className="viewer-catalog-link"
        data-cursor="Ver catálogo"
        data-testid="viewer-catalog-link"
      >
        Ver nosso catálogo completo
      </a>
    </div>
  );
}
