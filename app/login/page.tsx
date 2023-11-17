import Link from "next/link";

export default function Login() {
  return (
    <main className="w-96 mx-auto my-auto auth-bg">
      <form
        method="POST"
        action="/login/api"
        className="flex flex-col space-y-3 px-8 py-16 bg-white rounded-md"
      >
        <h1 className="font-semibold text-2xl text-center mb-3">Login</h1>
        <input
          className="w-full text-box"
          type="email"
          name="email"
          required
          placeholder="Email"
        />
        <input
          className="w-full text-box"
          type="password"
          name="password"
          required
          placeholder="Password"
        />
        <input
          className="h-10 cursor-pointer bg-blue-500 text-sm text-white rounded-sm px-3"
          type="submit"
          value="Login"
        />
        <p className="text-center text-zinc-500 text-sm">
          <Link href="/patient/register">or register here</Link>
        </p>
      </form>
    </main>
  );
}
