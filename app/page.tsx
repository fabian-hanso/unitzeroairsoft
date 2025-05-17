import Bento from "@/components/Bento/Bento";
import CTASection from "@/components/CTASection/CTASection";
import FAQ from "@/components/FAQ/FAQ";
import HeroSwiper from "@/components/HeroSwiper/HeroSwiper";

export default function Home() {
  return (
    <div className="bg-gray-50">
      <HeroSwiper />
      <Bento />
      <CTASection />
      <FAQ />
    </div>
  );
}
