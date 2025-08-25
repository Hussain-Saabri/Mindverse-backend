import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import Loading from "@/components/Loading";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdDrafts } from "react-icons/md";
import axios from "axios";
import { ColorRing,Vortex } from "react-loader-spinner";
import ReactPaginate from "react-paginate";


export default function Draft() {
  const { data: session, status } = useSession();
  const [draftBlogs, setDraftBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [sizeOfBlogs, setSizeOfBlogs] = useState(0);
  const blogsPerPage =4 ;

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  

  useEffect(() => {
    const fetchDraftBlogs = async () => {
      try {
        const res = await axios.get("/api/blog");
        const filteredDrafts = res.data.filter(
          (blog) => blog.status === "pending"
        );
        console.log("Getting all blogs",filteredDrafts);
        setSizeOfBlogs(filteredDrafts.length);
        setDraftBlogs(filteredDrafts);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      }
    };
    if (status === "authenticated") {
      fetchDraftBlogs();
    }
  }, [status]);

  const pageCount = Math.ceil(draftBlogs.length / blogsPerPage);
  const offset = currentPage * blogsPerPage;
  const currentBlogs = draftBlogs.slice(offset, offset + blogsPerPage);
  
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

 if (loading) {
  return (
    <Loading/>
  );
}


  if (status === "authenticated") {
    return (
      <div className="blogpage" >
        <div className="titledashboard flex flex-sb" data-aos="fade-right" >
          <div>
            <h2>
              Draft(Pending) <span>Blogs({sizeOfBlogs})</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <MdDrafts /> <span>/</span>
            <span>Draft</span>
          </div>
        </div>

        
        <div className="blogstable ">
          {currentBlogs.length > 0 ? (
            <>
            <table data-aos="fade-up">
              <thead>
                <tr >
                  <th>Sr.No</th>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Slug</th>
                  <th >Edit / Delete</th>
                </tr>
              </thead>
              <tbody >
                {currentBlogs.map((blog, index) => (
                  <tr key={blog._id} >
                    <td>{offset + index + 1}</td>
                    <td>{new Date(blog.updatedAt).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'long',
    year: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })}</td>
                    <td>{blog.title}</td>
                    <td>{blog.slug}</td>
                    <td>
                      <div className="flex gap-2 flex-center">
                        <Link href={"/blogs/edit/" + blog._id}>
                          <button className="edit-btn" title="Edit">
                            <FaEdit /> Edit
                          </button>
                        </Link>

                        <Link href={"/blogs/delete/" + blog._id}>
                          <button className="delete-btn" title="Delete">
                            <MdDelete /> Delete
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>


           <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"blogpagination"}
            activeClassName={"active"}
            disabledClassName={"disabled"}
          />
            
            
            </>
          ) : (
            <div
              style={{
                backgroundColor: "#ffcccc",
                color: "#990000",
                padding: "1rem",
                borderRadius: "8px",
                textAlign: "center",
                marginTop: "1rem",
                fontWeight: "bold",
                fontSize: "1.2rem",
              }} data-aos="fade-right"
            >
              No Pending Blogs Found
            </div>
          )}
        </div>

        
      </div>
    );
  }
}
