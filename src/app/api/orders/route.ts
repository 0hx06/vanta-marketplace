export async function GET() {
  return Response.json({
    orders: [],
    message: "Les commandes seront disponibles ici après connexion à la base de données.",
  });
}
