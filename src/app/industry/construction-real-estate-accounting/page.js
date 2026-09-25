import IndustryDetailPage, { generateMetadata as slugGenerateMetadata } from "../[slug]/page";

export async function generateMetadata(props) {
  return slugGenerateMetadata({ params: Promise.resolve({ slug: "construction-real-estate-accounting" }) });
}

export default async function ConstructionRealEstatePage() {
  return IndustryDetailPage({ params: Promise.resolve({ slug: "construction-real-estate-accounting" }) });
}
