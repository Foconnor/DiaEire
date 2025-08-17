import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import PreFooter from "@/components/pre-footer";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

function page() {
  const Items = [
    {
      title: "Labour Party in Government privacy notice",
      link: "#",
    },
    {
      title: "General electorate privacy notice",
      link: "#",
    },
  ];
  return (
    <div>
      <Navbar />
      <div>
        <div className="flex items-center justify-start bg-[var(--grey)] py-3">
          <div className="wrapper">
            <p className="text-[var(--grey-300)] text-sm">
              <Link href="/privacy" className="underline">
                Privacy
              </Link>{" "}
              / Privacy notices
            </p>
          </div>
        </div>
        <div className="md:h-[273px] h-[100px] flex items-center justify-start bg-[var(--grey)]">
          <div className="wrapper">
            <h1 className="text-[calc(1.475rem_+_1.7vw)] text-[var(--primary)] max-w-[600px]">
              Privacy notices
            </h1>
          </div>
        </div>
        <div className="wrapper pt-10">
          <div className="md:pt-12 pt-6 md:container px-4 md:px-0 flex justify-center items-center mx-auto flex-wrap md:flex-row flex-col">
            {Items.map((item, index) => (
              <div
                key={index}
                className="p-8 md:mx-3 my-4 border border-[var(--line)] rounded-[10px] md:w-[600px] w-full md:h-[270px] h-[150px] flex flex-col justify-between"
              >
                <h2 className="text-[calc(1.305rem_+_.55vw)]">{item.title}</h2>
                <Link
                  href={item.link}
                  className="text-[var(--primary)] hover:text-[var(--btn-hover-bg)] text-[1.35rem] flex items-center gap-3"
                >
                  Read{" "}
                  <FontAwesomeIcon icon={faArrowRight} width={18} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PreFooter />
      <Footer />
    </div>
  );
}

export default page;
