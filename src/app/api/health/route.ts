export async function GET() {
  return Response.json({
    status: "ok",
    service: "gaming-marketplace",
    timestamp: new Date().toISOString(),
  });
}
