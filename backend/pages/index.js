import Head from "next/head";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IoHome } from "react-icons/io5";
import Loading from "@/components/Loading";
import axios from "axios";
export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [allblogs,setAllBlogs]=useState([]);
  useEffect(() => {
    if (status === "unauthenticated") {
      console.log("This one runs and it push to the login")
      //remove the  comment later
      // router.push("/login");
    }
  }, [status, router]);

  //fetching all the data to be displayed into the category
  useEffect(() => {
      const fetchAllBlogs = async () => {
        try {
          const response = await axios.get("/api/blog");
          setAllBlogs(response.data);
          console.log("Get all blogs",response.data);
        } catch (error) {
          console.error("Failed to fetch blogs", error);
        }
      };
      if (status === "authenticated") {
        fetchAllBlogs();
      }
    }, [status]);

  if (status === "loading") {
    console.log("This is loading");
    return <div><Loading/></div>; // 
  }

  if (session || status === "unauthenticated") {
    return (
      <div>
        <Head>
          <title>Admin Dashboard</title>
          <meta name="description" content="Blog website backend" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="dashboard ">
          <div className="titledashboard flex flex-sb" data-aos="fade-right">
            <div >
              <h2>Blogs <span>Dashboard</span></h2>
              <h3>ADMIN PANEL</h3>
            </div>
            <div className="breadcrumb" >
              <IoHome /> <span>/</span><span>Dashboard</span>
            </div> 
          </div>

        {/*Cards */}
        <div className="topfourcards ">
           <div className="topfourcards flex flex-sb" data-aos="fade-up">
            <div className="four_card" >
              <h2>Total Blogs</h2>
              <span>{allblogs.filter(dat => dat.status === "publish").length}</span>
            </div>
            <div className="four_card" >
              <h2>Total Topics</h2>
              <span>4</span>
            </div>
            <div className="four_card" >
              <h2>Total Tags</h2>
              <span>6</span>
            </div>
            <div className="four_card">
              <h2>Draft Blogs</h2>
              <span>{allblogs.filter(dat => dat.status === "pending").length}</span>
            </div>
          </div>
            
        </div>
         <div className="right_salescont">
              <div>
                <h3>Blogs By Category</h3>
               
              </div>
              <div className="blogscategory flex flex-center">
                <table >
                  <thead>
                    <tr>
                      <td>Topics</td>
                      <td>Data</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Html, Css & JavaScript</td>
                      <td>25</td>
                    </tr>
                    <tr>
                      <td>Next Js, React Js</td>
                  <td>25</td>
                    </tr>
                    <tr>
                      <td>Database</td>
                      <td>25</td>
                    </tr>
                    <tr>
                      <td>Deployment</td>
                      <td>25</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

        </div>
      </div>
    );
  }

  return null;
}
