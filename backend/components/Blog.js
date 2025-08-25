import { useState } from "react";
import ReactMarkdown from "react-markdown";
import MarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import axios from "axios";
import toast from "react-hot-toast";

import { useRouter } from "next/router";
export default function Blog({
  title: existingTitle,
  slug: existingSlug,
  description: existingDescription,
  status: existingStatus,
  tags: existingTags,
  blogCateogry: existingBlogCategory,
  _id,
}) {
  const router = useRouter();
  const [title, setTitle] = useState("" || existingTitle);
  const [slug, setSlug] = useState(existingSlug || "");
  const [blogcategory, setBlogcategory] = useState(existingBlogCategory || []);
  const [tags, setTags] = useState(existingTags || []);
  const [status, setStatus] = useState("" || existingStatus);
  const [description, setDescription] = useState("" || existingDescription);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  console.log("existingSlug", existingSlug);
  console.log("existingblog", existingBlogCategory);
  {
    /*-------------------------------This function us used to validate the form ------------------------------------------------------------*/
  }
  const validateForm = () => {
    console.log("Inside the validateform function");
    const newErrors = {};
    //if block for toast error
    if (
      !title.trim() ||
      !slug.trim() ||
      blogcategory.length === 0 ||
      tags.length === 0 ||
      !status ||
      !description
    )
      toast.error("Please fill all required fields!", {
        style: {
          background: "#fa1111ff",
          color: "#fff",
          fontWeight: "bold",
          borderLeft: "5px solid red",
        },
        icon: "⚠️",
      });

    if (!title?.trim()) newErrors.title = "!Title is required.";
if (!slug?.trim()) newErrors.slug = "!Slug is required.";
if (blogcategory.length === 0) newErrors.blogcategory = "!Category is required.";
if (tags.length === 0) newErrors.tags = "!At least one tag is required.";
if (!status?.trim()) newErrors.status = "!Status is required.";
if (!description?.trim()) newErrors.description = "!Blog Content is required.";

    return newErrors;
  };

  {
    /*-------------------------------This function us used to replace the space with dash ------------------------------------------------------------*/
  }
  const handleSlugChange = (ev) => {
    const inputValue = ev.target.value;
    const newSlug = inputValue.replace(/\s+/g, "-");
    setSlug(newSlug);
  };
  {
    /*-------------------------------This function us used to submit form and call the api ------------------------------------------------------------*/
  }
  async function handleSubmitBlog(ev) {
    ev.preventDefault();

    const data = { title, slug, blogcategory, tags, status, description };
    console.log("Clicked on save blog button");
    const errorsFound = validateForm();
    if (Object.keys(errorsFound).length > 0) {
      setErrors(errorsFound);
      return;
    } else {
      setErrors({});
    }
    setLoading(true);
    console.log("Form Data:", data);

    //call the api now
    try {
      if (_id) {
        //log the put request
        console.log("Updating the blog with an id", _id);
        const response = await axios.put("/api/blog", { ...data, _id });
        console.log(response.data);
        toast.success("🎉 Blog edited successfully!", {
          style: {
            border: "none",
            padding: "16px 20px",
            background: "linear-gradient(to right, #86efac, #4ade80)",
            color: "#064e3b",
            fontWeight: "bold",
            fontWeight: "bold",
            fontSize: "15px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          },
          icon: "📝",
          duration: 4000,
        });
      } else {
        const response = await axios.post("/api/blog", data);
        console.log("Respose from the server", response);
        setLoading(false);
        if (status == "pending") {
          toast.success(`🎉 Blog Saved As Draft`, {
            icon: "✅",
            style: {
              border: "none",
              padding: "16px 22px",
              background: "linear-gradient(to right, #bbf7d0, #4ade80)",
              color: "#064e3b",
              fontWeight: "600",
              fontSize: "15px",
              borderRadius: "12px",
              boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
              letterSpacing: "0.3px",
            },
            duration: 4000,
          });

          router.push("/draft");
        }
        if (status == "publish") {
          toast.success(`🎉 Blog Published Successfully`, {
            icon: "✅",
            style: {
              border: "none",
              padding: "16px 22px",
              background: "#4e4ecb",

              color: "white",
              fontWeight: "600",
              fontSize: "15px",
              borderRadius: "12px",
              boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
              letterSpacing: "0.3px",
            },
            duration: 4000,
          });

          router.push("/blogs");
        }
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
      alert("Something went wrong. Please try again.");
    }
  }
  return (
    <>
      <form onSubmit={handleSubmitBlog} className="addWebsiteform" data-aos="fade-up">
        {/*-------------------------------Title for the blog------------------------------------------------------------*/}
        <div className="w-100 flex flex-col flex-left mb-2" >
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter small title"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
          {errors.title && <p className="error mt-1">{errors.title}</p>}
        </div>
        {/*-------------------------------Slug for the blog------------------------------------------------------------*/}
        <div className="w-100 flex flex-col flex-left mb-2" >
          <label htmlFor="slug">Slug</label>
          <input
            type="text"
            id="slug"
            value={slug}
            placeholder="Enter Slug Here"
            onChange={handleSlugChange}
            className="border px-3 py-2 w-full"
          />
          {errors.slug && <p className="error mt-1">{errors.slug}</p>}
        </div>
        {/*-------------------------------Category dropdown------------------------------------------------------------*/}
        <div className="w-100 flex flex-col flex-left mb-2" >
          <label htmlFor="category">Select Category </label>
          <select
            id="category"
            name="category"
            value={blogcategory}
            onChange={(e) =>
              setBlogcategory(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            multiple
            size="5"
          >
            <option value="htmlcssjs">Html, Css & JavaScript</option>
            <option value="nextjs">Next Js, React Js</option>
            <option value="database">Database</option>
            <option value="deployment">Deployment</option>
            <option value="test">Test</option>
          </select>
          <p className="mt-1 flex">
            Selected: <span></span>
          </p>
          {errors.blogcategory && (
            <p className="error mt-1">{errors.blogcategory}</p>
          )}
        </div>
        {/*-------------------------------React markdown---------------------------------------------------------*/}

        <div className="description w-100 flex flex-col flex-left mb-2">
          <label htmlFor="description">Blog Content</label>
          <MarkdownEditor
            value={description}
            onChange={(ev) => setDescription(ev.text)}
            style={{ width: "100%", height: "400px" }}
            renderHTML={(text) => (
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
              >
                {text}
              </ReactMarkdown>
            )}
          />
          {errors.description && (
            <p className="error mt-1">{errors.description}</p>
          )}
        </div>

        {/*-------------------------------Tags dropdown------------------------------------------------------------*/}
        <div className="w-100 flex flex-col flex-left mb-2" >
          <label htmlFor="tags">Tags</label>
          <select
            id="tags"
            value={tags}
            onChange={(e) =>
              setTags(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            multiple
            size="5"
          >
            <option value="html">Html</option>
            <option value="next">Next</option>
            <option value="database">Database</option>
            <option value="deployment">Deployment</option>
            <option value="test">Test</option>
          </select>
          <p className="mt-1 flex">
            Selected: <span></span>
          </p>
          {errors.tags && <p className="error mt-1">{errors.tags}</p>}
        </div>
        {/*-------------------------------Updating the status------------------------------------------------------------*/}
        <div className="w-100 flex flex-col flex-left mb-2" >
          <label htmlFor="status">Status</label>
          <select
            name="status"
            id="status"
            value={status}
            onChange={(ev) => setStatus(ev.target.value)}
          >
            <option value="">Not slected</option>
            <option value="pending">Draft</option>
            <option value="publish">Publish</option>
          </select>
          <p className="mt-1 flex">
            Selected: <span></span>
          </p>
          {errors.status && <p className="error mt-1">{errors.status}</p>}
        </div>
        {/*-------------------------------Saving the form button-----------------------------------------------------------*/}
        <div className="w-100 mb-2">
          <button type="submit" className="w-100  flex-center">
            {/*{loading ? <ClipLoader color="#fff" size={20} /> : "Save Blog"}*/}
            Save Blog
          </button>
        </div>
      </form>
      <></>
    </>
  );
}
