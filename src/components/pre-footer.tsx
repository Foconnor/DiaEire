"use client";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

function PreFooter() {
  const [categories, setCategories] = useState<any[]>([]);
  const [openIndex, setOpenIndex] = useState<{
    cat: number;
    sub?: number;
  } | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "preFooter"));
        const data: any[] = [];
        querySnapshot.forEach((docSnap) => {
          data.push({ id: docSnap.id, ...docSnap.data() });
        });
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const toggleCategory = (catIndex: number) => {
    setOpenIndex(
      openIndex?.cat === catIndex && openIndex?.sub === undefined
        ? null
        : { cat: catIndex }
    );
  };

  const toggleSubCategory = (catIndex: number, subIndex: number) => {
    setOpenIndex(
      openIndex?.cat === catIndex && openIndex?.sub === subIndex
        ? null
        : { cat: catIndex, sub: subIndex }
    );
  };

  return (
    <div className="md:border-y-[1px] border-[var(--line)] py-[30px] mt-[70px]">
      <div className="grid md:grid-cols-6 grid-cols-1 max-w-[1200px] w-[95%] m-auto">
        {/* Logo */}
        <div className="md:px-3 relative">
          <Image
            style={{ filter: "grayscale(100%)" }}
            className="absolute 2xl:-left-[27px] xl:-left-[20px] xl:-top-[10px] md:-top-[2px] -top-[70px] -left-[0px] md:w-fit md:h-fit w-[300px] h-[65px]"
            src="/images/logo.png"
            alt="logo"
            width={400}
            height={400}
          />
        </div>

        {/* Dynamic Categories */}
        {categories.map((cat, catIndex) => (
          <div className="md:px-3" key={cat.id}>
            {/* Main category */}
            <div
              className="flex flex-col border-y-[1px] border-[var(--line)] py-2 md:py-0 md:border-none mt-5 md:mt-0 cursor-pointer md:cursor-default"
              onClick={() => toggleCategory(catIndex)}
            >
              <div className="flex items-center justify-between">
                <p className="link-heading">{cat.categoryName}</p>
                <FontAwesomeIcon
                  className={`text-[var(--grey-300)] md:!hidden ${
                    openIndex?.cat === catIndex && openIndex?.sub === undefined
                      ? "rotate-180"
                      : ""
                  }`}
                  icon={faChevronDown}
                  size="sm"
                />
              </div>

              {/* Main links */}
              {cat.links?.map((link: any, i: number) => (
                <a
                  key={i}
                  href={link.url}
                  className={`links md:block ${
                    openIndex?.cat === catIndex && openIndex?.sub === undefined
                      ? "block"
                      : "hidden"
                  } ${link.url === "" ? "coming-soon" : ""}`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Subcategories */}
            {cat.subCategories?.map((sub: any, subIndex: number) => (
              <div
                key={subIndex}
                className="flex flex-col border-b-[1px] border-[var(--line)] py-2 md:py-0 md:border-none cursor-pointer md:cursor-default md:mt-6 mt-0"
                onClick={() => toggleSubCategory(catIndex, subIndex)}
              >
                <div className="flex items-center justify-between">
                  <p className="link-heading">{sub.subCategoryName}</p>
                  <FontAwesomeIcon
                    className={`text-[var(--grey-300)] md:!hidden ${
                      openIndex?.cat === catIndex && openIndex?.sub === subIndex
                        ? "rotate-180"
                        : ""
                    }`}
                    icon={faChevronDown}
                    size="sm"
                  />
                </div>

                {sub.links?.map((link: any, i: number) => (
                  <a
                    key={i}
                    href={link.url}
                    className={`links md:block ${
                      link.url === "" ? "coming-soon" : ""
                    } ${
                      openIndex?.cat === catIndex && openIndex?.sub === subIndex
                        ? "block"
                        : "hidden"
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PreFooter;
