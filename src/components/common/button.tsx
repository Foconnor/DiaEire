"use client"
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

type ButtonProps = {
  content: string;
  className?: string;
  IconSize?: number;
  link?: string;
};

function Button({
  content,
  className = "",
  IconSize = 11,
  link = "",
}: ButtonProps) {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push(link);
      }}
      className={`rounded-full bg-[var(--primary)] hover:bg-[var(--btn-hover-bg)] text-white px-3 py-1 cursor-pointer transition-all duration-300 ease-in-out flex items-center gap-2 text-[14.4px] ${className}`}
    >
      {content} <FontAwesomeIcon icon={faArrowRight} width={IconSize} />
    </button>
  );
}

export default Button;
