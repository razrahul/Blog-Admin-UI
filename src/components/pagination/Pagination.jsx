import React from "react";
import "./Pagination.scss";

// Build a compact list with ellipsis when total is known
function getPageList(current, total, maxLength = 7) {
  if (!total || total <= 0) return [current]; // fallback when unknown
  if (maxLength < 5) throw new Error("maxLength must be ≥ 5");

  const range = (s, e) => Array.from({ length: e - s + 1 }, (_, i) => s + i);

  // If total small, show all
  if (total <= maxLength) return range(1, total);

  const side = 1; // pages to show around current
  const left = Math.max(2, current - side);
  const right = Math.min(total - 1, current + side);

  return [
    1,
    ...(left > 2 ? ["…"] : []),
    ...range(left, right),
    ...(right < total - 1 ? ["…"] : []),
    total,
  ];
}

export default function Pagination({
  totalPages,
  currentPage,
  onChange,
}) {
  const page = Math.max(1, Number(currentPage) || 1);
  const total = Number(totalPages) || 0;

  // If we DON'T know total pages (<=1), still render Prev / current / Next
  if (!total || total <= 1) {
    return (
      <div className="pagination">
        <button
          onClick={() => onChange(Math.max(1, page - 1))}
          disabled={page === 1}
          aria-label="Previous page"
        >
          ‹
        </button>
        <span className="dots">{page}</span>
        <button
          onClick={() => onChange(page + 1)}
          aria-label="Next page"
        >
          ›
        </button>
      </div>
    );
  }

  const pages = getPageList(page, total);

  return (
    <div className="pagination">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="Previous page"
      >
        ‹
      </button>

      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`dots-${i}`} className="dots">…</span>
        ) : (
          <button
            key={p}
            className={page === p ? "active" : ""}
            onClick={() => onChange(p)}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onChange(Math.min(total, page + 1))}
        disabled={page === total}
        aria-label="Next page"
      >
        ›
      </button>
    </div>
  );
}
