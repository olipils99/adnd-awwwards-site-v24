import ServicesList from "../../components/ServicesList";
import ServicesHero from "../../components/ServicesHero";
import BeforeAfter from "../../components/BeforeAfter";
import FAQ from "../../components/FAQ";
import SocialsBar from "../../components/SocialsBar";

export const metadata = { title: "Services — ADND Paysage" };

export default function ServicesPage() {
  return (<>
    <ServicesHero />
    <div className="bg-gradient-to-b from-white via-brand-50/60 to-white">
      <ServicesList />
    </div>
    <BeforeAfter />
    <FAQ />
    <SocialsBar />
  </>);
}
