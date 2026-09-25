import ServiceDetailPage, { generateMetadata as baseGenerateMetadata } from "../services/[slug]/page";

export async function generateMetadata() {
  return baseGenerateMetadata({ params: Promise.resolve({ slug: "quickbooks-to-zoho-books-migration" }) });
}

export default async function QuickbooksToZohoMigrationPage() {
  return <ServiceDetailPage params={Promise.resolve({ slug: "quickbooks-to-zoho-books-migration" })} />;
}
