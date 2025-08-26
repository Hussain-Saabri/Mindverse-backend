"use client";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import Loading from "@/components/Loading";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Login() {
  console.log("Inside the login function");
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      console.log("Inside the useeffect function and it is authenticated");
      router.push("/");
    }
  }, [status, router]);
//whenever we refresh for some time status will be loading 
  if (status === "loading") {
    return (
      <div className="loginfront flex flex-center flex-col full-w">
        <Loading />
      </div>
    );
  }

  return (
    <div className="loginfront flex flex-center flex-col full-w">
      <Image src="/img/coder.png" width={250} height={250} alt="Coder Image" />
      <h1>Welcome Admin of the sacchibaatein 👋</h1>

      {status === "authenticated" ? (
        <button onClick={() => signOut("google")} className="mt-2">
          Logout
        </button>
      ) : (<>
      <button onClick={() => signIn("google", { redirect: false })} className="mt-2">
  Login With Google
</button>

      </>
        


      )}
    </div>
  );
}
