"use-client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import Blog from "@/components/Blog";
import Loading from "@/components/Loading";

export default function Addblogs() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  /*****************************This use effect is used for rendring the loader for 2 seconds********************************/
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    //remove the comment later
    if (status === "unauthenticated") {
      // router.push("/login");
    }
  }, []);
 if (loading) {
   return (
     <Loading/>
   );
 }
  return (
    <>
    <Head>
        <title>Admin Panel - Add Blogs</title>
        
      </Head>
      <div className="addblogspage">
        <div className="titledashboard flex flex-sb">
          <div data-aos="fade-right">
            <h2>
              ADD <span>BLOGS</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb" data-aos="fade-left">
            <MdOutlineAddPhotoAlternate /> <span>/</span>
            <span>Dashboard</span>
          </div>
        </div>
        <div className="blogsadd">
          <Blog />
        </div>
      </div>
    </>
  );
}
