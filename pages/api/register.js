import { API_URL } from "@/config/index";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "POST") {
    const { username, email, password } = req.body;

    const strapiRes = await fetch(`${API_URL}/api/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await strapiRes.json();

    if (strapiRes.ok) {
      // @todo - Set cookie
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "production",
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 7, // 1 week,
          path: "/",
        })
      );
      res.status(200).json({ user: data.user });
    } else {
      res.status(data.error.status).json({
        message: data.error.details.errors
          ? data.error.details.errors
          : [data.error.message],
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
