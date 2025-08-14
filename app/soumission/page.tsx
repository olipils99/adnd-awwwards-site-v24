import SoumissionWizard from "../../components/SoumissionWizard";

export const metadata = { title: "Soumission — ADND Paysage" };

export default function SoumissionPage(){
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <SoumissionWizard />
    </main>
  );
}
