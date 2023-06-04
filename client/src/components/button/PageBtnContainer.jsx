import { nanoid } from "nanoid";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../../assets/wrappers/PageBtnContainer";
import { useAppContext } from "../../context/appContext";

const PageBtnContainer = () => {
  const { numOfPages, page, changePage } = useAppContext();
  // Index will reflect the number of pages
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    changePage(newPage);
  };
  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    changePage(newPage);
  };

  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((pageNum) => {
          return (
            <button
              key={nanoid()}
              type="button"
              className={pageNum === page ? "page-btn active" : "page-btn"}
              onClick={() => changePage(pageNum)}>
              {pageNum}
            </button>
          );
        })}
      </div>
      <button className="next-btn" onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};
export default PageBtnContainer;
