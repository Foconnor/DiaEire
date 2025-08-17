import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

function Privacy() {
  const Items = [
    {
      title: "Privacy notices",
      para: "find a collection of the labour Party's privacy notices",
      link: "/privacy/privacy-notes",
    },
    {
      title: "Your rights",
      para: "Find out about your privacy rights and submit any rights requests you may have",
      link: "/privacy/data-subject-rights",
    },
    {
      title: "Your data",
      para: "Frequently asked questions about personal data",
      link: "/privacy/frequently-asked-questions-about-personal-data",
    },
  ];

  return (
    <div>
      <div className="md:h-[240px] h-[100px] flex items-center justify-start bg-[var(--grey)]">
        <div className="wrapper">
          <h1 className="text-[calc(1.475rem_+_1.7vw)] text-[var(--primary)]">
            Data protection
          </h1>
        </div>
      </div>
      <div className="md:pt-12 pt-6 md:container px-4 md:px-0 flex justify-center items-center mx-auto flex-wrap md:flex-row flex-col">
        {Items.map((item, index) => (
          <div
            key={index}
            className="p-8 md:mx-3 my-4 border border-[var(--line)] rounded-[10px] md:min-w-[600px] min-w-full md:h-[270px] h-[230px] flex flex-col justify-between"
          >
            <h2 className="text-[calc(1.305rem_+_.55vw)]">{item.title}</h2>
            <p className="md:max-w-[333px] text-lg mt-4">{item.para}</p>
            <Link
              href={item.link}
              className="text-[var(--primary)] hover:text-[var(--btn-hover-bg)] text-[1.35rem] flex items-center gap-3"
            >
              More information{" "}
              <FontAwesomeIcon icon={faArrowRight} width={18} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Privacy;
