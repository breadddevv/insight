export async function GET() {
  return Response.json({ success: false }, {
    status: 401
  });
}