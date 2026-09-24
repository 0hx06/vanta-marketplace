export async function GET() {
  return Response.json({
    orders: [
      { id: "ORD-2048", status: "Paid", total: "$29.00" },
      { id: "ORD-2049", status: "Processing", total: "$38.00" },
    ],
  });
}
