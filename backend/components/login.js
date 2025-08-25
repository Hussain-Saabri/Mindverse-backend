
import { useSession } from "next-auth/react";
import Image from "next/image"
export default function Login()
{
const { data: session, status } = useSession();
if (status === "authenticated") {
  console.log("User Email:", session.user.email);
  console.log("User Name:", session.user.name);
  console.log("User Image:", session.user.image);
}

    return <>
        <div className="loginfront flex flex-center flex-col full-w">
            <Image src='/img/coder.png' width={250} height={250} alt="Coder Image" />
            <h1>Welcome Admin of the sacchibaatein 👋</h1>
            <p>Visit our main website <a href="" target="_blank" rel="noopener noreferrer">sacchibaatein</a></p>
            <button onClick={""} className='mt-2'>Login with Google</button>
        </div>
    
    </>



}