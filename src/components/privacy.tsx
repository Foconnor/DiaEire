import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

function Privacy() {
  return (
    <div>
      <div className="md:h-[240px] h-[100px] flex items-center justify-start bg-[var(--grey)]">
        <div className="wrapper">
          <h1 className="text-[calc(1.475rem_+_1.7vw)] text-[var(--primary)]">
            Privacy Policy
          </h1>
        </div>
      </div>
      <div className="md:pt-12 pt-6 md:max-w-[1000px] px-4 md:px-0 mx-auto">
        <p className="mb-4">Last Updated: August 9, 2025</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem eum
          laboriosam, nisi molestiae quos animi harum facere ullam. Ab natus eum
          corporis pariatur maxime eaque sed quo quisquam, provident alias? a
          maxime ratione recusandae dolores iure alias? Accusamus animi unde
          tempora perspiciatis voluptas. Dicta, iure id rem corporis
          perspiciatis sequi nesciunt nisi eos error sed. Voluptas, quis? Ex
          repellat ut dolore. Amet doloribus similique nam dignissimos quos ad,
          fuga aliquid dolorum. Sequi, maiores labore dolores adipisci iure
          vitae eaque numquam facere rerum. Vero sit beatae aliquam! Debitis?
          Vero odit eveniet molestiae voluptatem. Provident earum molestias,
          doloribus inventore iste delectus quidem? Quam consequatur magnam,
          laboriosam rerum dolores sunt incidunt amet eius obcaecati deserunt
          tenetur dolor. Dolorem, enim assumenda?
        </p>
        <p className="font-bold mt-5 mb-2">1. Who We Are</p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus
          impedit reiciendis, non fugit reprehenderit adipisci similique nisi
          cupiditate molestias. Tempore suscipit veniam doloribus quidem
          similique quas perspiciatis beatae debitis maiores. Laborum
          reprehenderit quasi magnam dolores ab cupiditate porro voluptatibus,
          sunt nemo corporis libero repudiandae at, fugiat veniam quibusdam.
          Amet qui quasi velit ex possimus optio voluptate nobis esse nulla a
        </p>
        <ul className="ps-7 list-disc mt-5">
          <li className="mb-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            natus quos harum vero culpa suscipit ipsa ab necessitatibus
            quibusdam unde obcaecati autem dicta optio dolores, tempora possimus
            modi error placeat!
          </li>
          <li className="mb-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            natus quos harum vero culpa suscipit ipsa ab necessitatibus
            quibusdam unde obcaecati autem dicta optio dolores, tempora possimus
            modi error placeat!
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Privacy;
