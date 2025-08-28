import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState ,useEffect} from "react";
import Loading from "@/components/Loading";
import "aos/dist/aos.css";
import Blog from "@/components/Blog";
import axios from "axios";
export default function EditBlog() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [blogInfo, setBlogInfo] = useState();
  const { data: session, status } = useSession();
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const { id } = router.query;
  console.log("Printing the id", router.query);
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get("/api/blog?id=" + id);
        setBlogInfo(response.data);
        console.log("Printing the output from the api", response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);
//if unautheticated push to the login page
//remove the comment later
  if (status === "unauthenticated") {

    //router.push("./login");
   // return null;
  }

  //rendering the loader component
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="blogpage">
      <div className="titledashboard flex flex-sb">
        <div>
          <h2>
            Edit <span>Blog</span>
          </h2>
          <h3>ADMIN PANEL</h3>
        </div>
        <div className="breadcrumb">
          <span>/</span>
          <span>Edit</span>
        </div>
      </div>
      <div className="mt-3">
        <Blog {...blogInfo} />
      </div>
    </div>
  );
}