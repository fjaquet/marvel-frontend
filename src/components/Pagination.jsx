const Pagination = ({ count, page, setPage }) => {
  const totalPages = Math.ceil(count / 100);

  const middlePages = [];
  let start = Math.max(2, page - 1);
  let end = Math.min(totalPages - 1, start + 3);

  if (totalPages - page <= 3 && totalPages > 4) {
    start = totalPages - 4;
  }

  if (totalPages <= 5) {
    start = 2;
  }

  for (let i = start; i <= end; i++) {
    middlePages.push(i);
  }

  return (
    <nav className="pagination">
      <ul className="pagination__list">
        {page !== 1 && (
          <li className="pagination__item">
            <button
              className="pagination__button"
              onClick={() => setPage(page - 1)}
            >
              {"< PREV"}
            </button>
          </li>
        )}
        <li className="pagination__item">
          <button className="pagination__button" onClick={() => setPage(1)}>
            1
          </button>
        </li>
        {page > 3 && totalPages > 6 && (
          <li className="pagination__item">{"..."}</li>
        )}

        {middlePages.map((elt) => (
          <li key={elt}>
            <button className="pagination__button" onClick={() => setPage(elt)}>
              {elt}
            </button>
          </li>
        ))}

        {page < totalPages - 3 && totalPages > 6 && (
          <li className="pagination__item">{"..."}</li>
        )}

        {totalPages > 1 && (
          <li className="pagination__item">
            <button
              className="pagination__button"
              onClick={() => setPage(totalPages)}
            >
              {totalPages}
            </button>
          </li>
        )}

        {page !== totalPages && (
          <li className="pagination__item">
            <button
              className="pagination__button"
              onClick={() => setPage(page + 1)}
            >
              {"NEXT >"}
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
