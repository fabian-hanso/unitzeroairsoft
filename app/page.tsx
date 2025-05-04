import Bento from "@/components/Bento/Bento";
import CTASection from "@/components/CTASection/CTASection";
import FAQ from "@/components/FAQ/FAQ";
import HeroSwiper from "@/components/HeroSwiper/HeroSwiper";
// import Sponsoren from "@/components/Sponsoren/Sponsoren";

export default function Home() {
  return (
    <div className="bg-white">
      <HeroSwiper />
      {/* <LogoSlider /> */}
      {/* <Sponsoren /> */}
      {/* <FirstWelcome /> */}
      <Bento />
      <CTASection />
      <FAQ />
    </div>
  );
}
