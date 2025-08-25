import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { BsPostcard } from "react-icons/bs";
import { useSession } from "next-auth/react";
import styles from "@/styles/DeleteBlog.module.css";

export default function DeleteProduct() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const handleDelete = async () => {
    try {
      console.log("Inside the delete function");
      await axios.delete('/api/blog?id=' + id);
      toast.success("Blog deleted successfully!", {
  style: {
    border: '1px solid #4BB543',
    padding: '16px',
    color: '#1b3155',
    background: '#f0fdf4',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  iconTheme: {
    primary: '#4BB543',
    secondary: '#f0fdf4',
  },
});

      router.back();
    } catch (error) {
      toast.error("Failed to delete blog.");
    }
  };

  return (
    <>
      <Head>
        <title>Delete Blog</title>
      </Head>
      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>Delete</h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <BsPostcard /> <span>/</span> <span>Delete Blog</span>
          </div>
        </div>

        <div className={styles.deleteWrapper}>
          <div className={styles.deleteCard}>
            <div className={styles.deleteIcon}>🗑️</div>
            <h2 className={styles.deleteHeading}>Are you sure?</h2>
            <p className={styles.deleteDescription}>
              This action is <strong>permanent</strong> and cannot be undone.
            </p>
            <div className={styles.deleteButtons}>
              <button className={styles.btnDelete} onClick={handleDelete}>Delete</button>
              <button className={styles.btnCancel} onClick={() => router.back()}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
