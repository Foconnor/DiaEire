import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import PreFooter from "@/components/pre-footer";
import React from "react";

function page() {
  return (
    <div>
      <Navbar />
      <div className="md:h-[220px] h-[100px] flex items-center justify-start bg-[var(--grey)]">
        <div className="wrapper">
          <h1 className="text-[calc(1.475rem_+_1.9vw)] text-[var(--primary)] max-w-[600px]">
            Vision
          </h1>
        </div>
      </div>
      <div>
        <img
          className="w-full"
          src="https://labour.org.uk/wp-content/uploads/2024/06/DSC01059-2-scaled-1920x0-c-default.jpg"
          alt="background image"
        />
      </div>
      <div className="p-14 flex flex-col gap-6">
        <p>
          This Labour government was elected on the promise of change – to
          deliver a decade of national renewal. Our manifesto promised, through
          mission-led government, to put the country back in the service of
          working people.
        </p>
        <p>
          Our five missions are ambitious but long-term goals, a decade
          long-project to completely transform government and move away from
          sticking-plaster politics.
        </p>
        <p>Labour’s five missions for Government are</p>
      </div>
      <div className="p-14 bg-[var(--primary)] text-white ">
        <p className="text-[calc(1.305rem_+_.55vw)]">
          Kickstart economic growth – to drive growth, rebuild Britain, support
          good jobs, unlock investment, and improve living standards across the
          country.  
        </p>
      </div>
      <div className="p-14">
        <p className="text-[calc(1.305rem_+_.55vw)]">
          Make Britain a clean energy superpower through delivering clean power
          by 2030 and accelerating to net zero.  
        </p>
      </div>
      <div className="p-14 bg-[var(--primary)] text-white ">
        <p className="text-[calc(1.305rem_+_.55vw)]">
          Take back our streets by halving serious violent crime and raising
          confidence in the police and criminal justice system to its highest
          levels.
        </p>
      </div>
      <div className="p-14">
        <p className="text-[calc(1.305rem_+_.55vw)]">
          Break down barriers to opportunity by reforming our childcare and
          education systems, to make sure there is no class ceiling on the
          ambitions of our young people.
        </p>
      </div>
      <div className="p-14 bg-[var(--primary)] text-white ">
        <p className="text-[calc(1.305rem_+_.55vw)]">
          Build an NHS fit for the future that is there when people need it,
          where everyone lives well for longer. 
        </p>
      </div>
      <div className="p-14 flex flex-col gap-6">
        <p>
          We inherited unprecedented challenges, with crumbling public services
          and a complete economic mess after 14 years of the Conservatives.
        </p>
        <p>
          This Labour government will always put service before politics. Facing
          up to reality and taking tough decisions in the national interest.
        </p>
      </div>
      <PreFooter />
      <Footer />
    </div>
  );
}

export default page;
