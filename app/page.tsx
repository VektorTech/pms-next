import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  router.replace("/login");

  return (
    <main className="">
      <p>Loading...</p>
    </main>
  );
}
