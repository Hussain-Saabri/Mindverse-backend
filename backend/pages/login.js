"use client";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import Loading from "@/components/Loading";
import { useEffect,useState } from "react";
import { useRouter } from "next/router";
import Logo from "@/components/Logo";

export default function Login() {
  console.log("Inside the login function");
  const { data: session, status } = useSession();
  const [forceLoading, setForceLoading] = useState(true);
  const router = useRouter();
  const[guestMode,setGuestMode]=useState(true)

  useEffect(() => {
    if (status === "authenticated" ) {
      console.log("Inside the useeffect function and it is authenticated");
      router.push("/");
    }
  }, [status, router]);



  useEffect(() => {
    // always show loading for at least 2 seconds
    const timer = setTimeout(() => {
      setForceLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
//whenever we refresh for some time status will be loading 
  if (status === "loading" || forceLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  if(status === "unauthenticated")
  {
return (
    <div className="loginfront flex flex-center flex-col full-w">
      <Image src="/img/coder.png" width={250} height={250} alt="Coder Image" />
   <h1>
  Welcome Admin
 
</h1>





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
  
}
