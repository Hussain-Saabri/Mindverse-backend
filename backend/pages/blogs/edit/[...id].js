import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState ,useEffect} from "react";
import { RotatingLines } from "react-loader-spinner";
import AOS from "aos";
import "aos/dist/aos.css";
import Blog from "@/components/Blog";
import axios from "axios";
export default function EditBlog(){

    const router=useRouter();
    const [loading, setLoading] = useState(true);
    const[blogInfo,setBlogInfo]=useState();
    const{data:session,status}=useSession();
useEffect(() => {
        const timer = setTimeout(() => {
          setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
      }, []);
      
const { id } = router.query;
console.log("Printing the id" ,router.query);
useEffect(() => {
  const fetchBlog = async () => {
    try {
      const response = await axios.get('/api/blog?id=' + id);
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

    if(status==="unauthenticated")
    {
        router.push('./login');
        return null;
    }

//rendering the loader
if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="#1E3A8A"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    );
  }



return <div className="blogpage" >
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
            
        <Blog {...blogInfo}/>

</div>

</div>



}