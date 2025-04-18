import React from "react";
import {Pagination, PaginationItem, PaginationLink} from "reactstrap";

const PaginationComponent = ({
                                 dataLength,
                                 itemsPerPage,
                                 maxPageButtons,
                                 currentPage,
                                 onPageChange,
                             }) => {

    const totalPages = Math.ceil(dataLength / itemsPerPage);
    const startPage = Math.max(
        1,
        Math.min(
            currentPage - Math.floor(maxPageButtons / 2),
            totalPages - maxPageButtons + 1
        )
    );
    const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
    const visiblePages = Array.from(
        {length: endPage - startPage + 1},
        (_, i) => startPage + i
    );

    return (
        <Pagination size="lg" className="d-flex justify-content-center">
            {/* Previous page */}
            <PaginationItem disabled={currentPage === 1}>
                <PaginationLink previous onClick={() => onPageChange(currentPage - 1)}/>
            </PaginationItem>
            {visiblePages.map((page) => (
                <PaginationItem key={page} active={currentPage === page}>
                    <PaginationLink onClick={() => onPageChange(page)}>{page}</PaginationLink>
                </PaginationItem>
            ))}
            {/* Next page */}
            <PaginationItem disabled={currentPage === totalPages}>
                <PaginationLink next onClick={() => onPageChange(currentPage + 1)}/>
            </PaginationItem>
        </Pagination>
    );
};

export default PaginationComponent;