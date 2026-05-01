import React from "react";
import { Link } from "@ezycore/ui/src/components/atoms/Btn";

const getPaginationRange = ({ page, totalPages, delta = 1 }) => {
  const range = [];
  const rangeWithDots = [];

  const left = Math.max(2, page - delta);
  const right = Math.min(totalPages - 1, page + delta);

  // siempre incluir primera página
  range.push(1);

  // puntos antes
  if (left > 2) {
    range.push("...");
  }

  // rango central
  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  // puntos después
  if (right < totalPages - 1) {
    range.push("...");
  }

  // siempre incluir última página
  if (totalPages > 1) {
    range.push(totalPages);
  }

  return range;
};

const Pagination = ({ pagination = {}, createPageHref }) => {
  const { page, totalPages } = pagination;

  if (totalPages <= 1) return null;

  const pages = getPaginationRange({ page, totalPages });

  return (
    <nav className="pagination">
      <div className="pagination__inner">
        {page > 1 && (
          <Link
            variant="icon"
            className="pagination-prev"
            icon="arrow"
            to={createPageHref(page - 1)}
          />
        )}

        {pages.map((p, i) => {
          if (p === "...") {
            return <span key={i}>...</span>;
          }

          return (
            <Link key={p} to={createPageHref(p)}>
              {p}
            </Link>
          );
        })}

        {
          <Link
            className={`pagination-next${page >= totalPages ? " disabled" : ""}`}
            variant="icon"
            icon="arrow"
            to={createPageHref(+page + 1)}
          >
            Siguiente
          </Link>
        }
      </div>
    </nav>
  );
};

export default Pagination;
