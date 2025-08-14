import dynamic from "next/dynamic";
const ServicesList = dynamic(() => import("./ServicesList"), { ssr: false });
export default function ServiceCards(){ return <ServicesList/> }
