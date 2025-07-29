import { geistMono } from "@/fonts";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "unauthenticated") {
    router.push("/login");
  }

  console.log("Session status:", status);
  console.log("Session data:", session);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className={`${geistMono.className} text-black`}>
        Hello {session?.user?.name || session?.user?.email},{" "}
        {JSON.stringify(session)}
      </h1>
    </div>
  );
}
