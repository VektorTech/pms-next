export function GET() {
  return Response.json(
    { message: "Logged Out" },
    {
      status: 302,
      headers: {
        Location: "/",
        "Set-Cookie":
          "session_id=; Path=/; HTTPOnly; SameSite=Strict; Secure; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
      },
    }
  );
}
