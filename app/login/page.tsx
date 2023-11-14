import Link from "next/link";

export default function Login() {
  return (
    <main className="">
      <form method="POST" action="/login/api">
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <input type="submit" value="Login" />
      </form>
      <p><Link href="/patient/register">Register Here</Link></p>
    </main>
  );
}
