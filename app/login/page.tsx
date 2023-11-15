import Link from "next/link";

export default function Login() {
  return (
    <main className="">
      <form method="POST" action="/login/api">
        <h1>Login</h1>
        <input type="email" name="email" required placeholder="Email" />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
        />
        <input type="submit" value="Login" />
      </form>
      <p>
        <Link href="/patient/register">Register Here</Link>
      </p>
    </main>
  );
}
