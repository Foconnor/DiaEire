import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const EditButton = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="bg-[var(--primary)] text-white px-4 py-2 rounded hover:bg-[var(--btn-hover-bg)] transition-all ease-in-out duration-300 cursor-pointer flex items-center gap-3"
  >
    <FontAwesomeIcon icon={faPenToSquare} />
    Edit
  </button>
);

export default EditButton;
