"use client";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import toast from "react-hot-toast";

interface Slider {
  id: string;
  key: string;
  title: string;
  des: string;
  link: string;
  buttonText: string;
  image: string;
}

function Labour() {
  const [isActive, setActive] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [sectionTitle, setSectionTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const [Items, setItems] = useState([] as Slider[]);

    useEffect(() => {
    const getSliders = async () => {
      setLoading(true);
      try {
        const sliderColRef = collection(
          db,
          "landingPage",
          "landingPageLabour",
          "slider"
        );
        const querySnapshot = await getDocs(sliderColRef);
        const slidersArr = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Slider[];
        setItems(slidersArr);
      } catch (error) {
        toast.error("Error fetching sliders");
        console.error("Error fetching sliders:", error);
      } finally {
        setLoading(false);
      }
    };
    getSliders();
  }, []);

    useEffect(() => {
    const getSectionData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "landingPage", "landingPageLabour");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setSectionTitle(data.sectionTitle || "");
        } else {
          toast.error("No such document!");
        }
      } catch (error) {
        toast.error("Error fetching section data");
        console.error("Error fetching section data:", error);
      } finally {
        setLoading(false);
      }
    };
    getSectionData();
  }, []);

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
        {sectionTitle}
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
            {item.key}
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
              <p className="mt-3 wrap-break-word">{item.des}</p>
              <Link
                href={item?.link}
                className="text-[var(--primary)] hover:text-[var(--btn-hover-bg)] text-[1.35rem] flex items-center gap-3 absolute bottom-0"
              >
                {item.buttonText}{" "}
                <FontAwesomeIcon icon={faArrowRight} width={18} />
              </Link>
            </div>
            <div>
              <img
                src={item.image}
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
