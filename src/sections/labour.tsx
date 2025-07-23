"use client";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import JoinLabour from "@/../public/images/ireland.jpg";
import Link from "next/link";

function Labour() {
  const [isActive, setActive] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const Items = [
    {
      keys: "Join Dia le hÉireann",
      title: "Join Dia le hÉireann",
      des: "Dia le hÉireann is made up of hundreds of thousands of members, coming together to get Ireland's future back. By joining, you can get involved with your local party, campaign with us on the issues you care about and make sure your voice is heard.",
      link: "/join",
      linkName: "I want to join",
      img: JoinLabour,
    },
    {
      keys: "Head from Dia le hÉireann",
      title: "Hear from us",
      des: "Dia le hÉireann is made up of hundreds of thousands of members, coming together to get Ireland's future back. By joining, you can get involved with your local party, campaign with us on the issues you care about and make sure your voice is heard.",
      link: "/",
      linkName: "Sign me up",
      img: JoinLabour,
    },
    {
      keys: "Read our missions",
      title: "Read our missions",
      des: "Dia le hÉireann is made up of hundreds of thousands of members, coming together to get Ireland's future back. By joining, you can get involved with your local party, campaign with us on the issues you care about and make sure your voice is heard.",
      link: "/",
      linkName: "I'll read more",
      img: JoinLabour,
    },
    {
      keys: "Read our Plan for Change",
      title: "Read our Plan for Change",
      des: "Dia le hÉireann is made up of hundreds of thousands of members, coming together to get Ireland's future back. By joining, you can get involved with your local party, campaign with us on the issues you care about and make sure your voice is heard.",
      link: "/",
      linkName: "I'll read the plan",
      img: JoinLabour,
    },
  ];

  useEffect(() => {
    if (scrollContainerRef.current && itemRefs.current[isActive]) {
      const container = scrollContainerRef.current;
      const activeItem = itemRefs.current[isActive];

      if (activeItem) {
        const containerWidth = container.offsetWidth;
        const itemWidth = activeItem.offsetWidth;
        const maxScroll = container.scrollWidth - containerWidth;

        let scrollLeft;

        if (isActive === 0) {
          scrollLeft = 0;
        } else if (isActive === Items.length - 1) {
          scrollLeft = maxScroll;
        } else {
          scrollLeft = itemWidth * isActive;
        }

        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
  }, [isActive, Items.length]);

  return (
    <div className="wrapper !mt-[80px] !mb-[60px]">
      <h2 className="text-[calc(1.305rem_+_.55vw)]">
        Want to get involved? Here&apos;s what you can do
      </h2>
      <div className="flex gap-4 items-center mt-[calc(1.35rem_+_1vw)] flex-wrap">
        {Items.map((item, index) => (
          <button
            onClick={() => setActive(index)}
            key={index}
            className={`px-[25px] py-[9px] bg-[var(--grey)] text-lg rounded-[.5rem] cursor-pointer hover:bg-[var(--grey-200)] transition-all duration-300 ease-in-out ${
              isActive === index
                ? "bg-[var(--primary)] text-white hover:bg-[var(--primary)]"
                : "bg-[var(--grey)] text-black"
            }`}
          >
            {item.keys}
          </button>
        ))}
      </div>
      <div
        ref={scrollContainerRef}
        className="flex overflow-hidden"
        style={{ scrollBehavior: "smooth" }}
      >
        {Items.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className="border-[1px] border-[var(--line)] w-full mt-[43px] rounded-[10px] p-[30px] md:grid md:grid-cols-2 flex-shrink-0 flex flex-col-reverse"
          >
            <div className="relative md:pe-20 min-h-[350px]">
              <h3 className="text-[calc(1.305rem_+_.55vw)] md:mt-0 mt-5">
                {item.title}
              </h3>
              <p className="mt-3">{item.des}</p>
              <Link
                href={item.link}
                className="text-[var(--primary)] hover:text-[var(--btn-hover-bg)] text-[1.35rem] flex items-center gap-3 absolute bottom-0"
              >
                {item.linkName}{" "}
                <FontAwesomeIcon icon={faArrowRight} width={18} />
              </Link>
            </div>
            <div>
              <Image
                src={item.img}
                alt={`${item.title} image`}
                width={1000}
                height={1000}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Labour;
