import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdDrafts } from "react-icons/md";
import axios from "axios";
import Loading from "@/components/Loading";
import ReactPaginate from "react-paginate";

export default function Blogs() {
  const [sizeOfBlogs, setSizeOfBlogs] = useState(0);
  const { data: session, status } = useSession();
  const [publishBlogs, setpublishBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const blogsPerPage = 4;
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      //remove the comment later
      // router.push("/login");
    }
  }, [status]);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  useEffect(() => {
    const fetchPublishBlogs = async () => {
      try {
        console.log("Inside the fetchPublishBlogs function");
        console.log("calling the api");
        const res = await axios.get("/api/blog");
        console.log("Response from the api(server)", res.data);
        const filteredPublish = res.data.filter(
          (blog) => blog.status === "publish"
        );
        setSizeOfBlogs(filteredPublish.length);
        setpublishBlogs(filteredPublish);
      } catch (error) {
        console.error("Failed to fetch blogs");
        console.log("Consoling the error", error);
      }
    };
    //remove the or part later 
    if (status === "authenticated" || status==="unauthenticated") {
      fetchPublishBlogs();
    }
  }, [status]);
  const searchedBlogs =
    searchQuery.trim() === ""
      ? publishBlogs
      : publishBlogs.filter((blog) =>
          blog?.title?.toLowerCase().includes(searchQuery.toLowerCase())
        );

  /*This will run if there is no pagination*/

  const pageCount = Math.ceil(publishBlogs.length / blogsPerPage);
  const offset = currentPage * blogsPerPage;
  const currentBlogs =
    searchQuery.trim() === ""
      ? searchedBlogs.slice(offset, offset + blogsPerPage) // pagination
      : searchedBlogs; // show all results
  console.log("offset currentPage", currentBlogs);
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  if (loading) {
    return <Loading />;
  }
  //remove the OR part later

  if (status === "authenticated" || status === "unauthenticated") {
    return (
      <div className="blogpage">
        <div className="titledashboard flex flex-sb" data-aos="fade-right">
          <div>
            <h2>
              Published <span>Blogs({sizeOfBlogs})</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <MdDrafts /> <span>/</span>
            <span>Publish</span>
          </div>
        </div>
        {/*Search Blogs */}
        <div className="flex gap-2 mb-1" data-aos="fade-right">
          <h2>Search Blogs: </h2>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title..."
            className="searchQuery"
          />
        </div>
        <div className="blogstable">
          {currentBlogs.length > 0 ? (
            <>
              <table data-aos="fade-right">
                <thead>
                  <tr>
                    <th>Sr.No</th>
                    <th>Date</th>
                    <th>Title</th>
                    <th>Slug</th>
                    <th>Edit / Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBlogs.map((blog, index) => (
                    <tr key={blog._id}>
                      <td>{offset + index + 1}</td>
                      <td>
                        {new Date(blog.updatedAt).toLocaleString("en-IN", {
                          timeZone: "Asia/Kolkata",
                          day: "2-digit",
                          month: "long",
                          year: "2-digit",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </td>
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

              {searchQuery.trim() === "" && (
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  pageCount={pageCount}
                  onPageChange={handlePageClick}
                  containerClassName={"blogpagination"}
                  activeClassName={"active"}
                  disabledClassName={"disabled"}
                />
              )}
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
              }}
              data-aos="fade-right"
            >
              No Blogs Found
            </div>
          )}
        </div>
      </div>
    );
  }
}
