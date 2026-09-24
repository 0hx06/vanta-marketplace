import { productCatalog } from "@/lib/marketplace-data";

export async function GET() {
  return Response.json({
    items: productCatalog,
    total: productCatalog.length,
  });
}
