import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomerHero from "@/components/sections/CustomerHero";
import WhoWeServe from "@/components/sections/WhoWeServe";
import InquiryForm from "@/components/sections/InquiryForm";
import WhyAirPower from "@/components/sections/WhyAirPower";

export default function CustomerPortalLocale() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <CustomerHero />
      <WhoWeServe />
      <InquiryForm />
      <WhyAirPower />
      <Footer />
    </main>
  );
}





