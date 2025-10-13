import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded disabled:opacity-50 cursor-pointer hover:opacity-80 transition-all duration-200 ease-in-out flex items-center gap-2"
      >
        <FontAwesomeIcon icon={faArrowLeft} size="sm" />
        <span>Prev</span>
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded cursor-pointer transition-all ease-in-out duration-200 hover:bg-[var(--primary)] hover:text-white hover:opacity-60 ${
            currentPage === page ? "bg-[var(--primary)] text-white" : ""
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded disabled:opacity-50 cursor-pointer hover:opacity-80 transition-all duration-200 ease-in-out flex items-center gap-2"
      >
        <span>Next</span><FontAwesomeIcon icon={faArrowRight} size="sm" />
      </button>
    </div>
  );
}
