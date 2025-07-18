import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import PreFooter from "@/components/pre-footer";
import Fund from "@/sections/fund";
import Hero from "@/sections/hero";
import Labour from "@/sections/labour";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Labour />
      <Fund />
      <PreFooter />
      <Footer />
    </div>
  );
}
