import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import { user } from "@heroui/react";
import Head from "next/head";
export default function UsersTable() {
  const { status } = useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
const router=useRouter();
  useEffect(() => {
    const fetchUsers = async () => {
      const startTime = Date.now(); // track when loading starts
      try {
        const res = await axios.get("/api/getuser");
        setUsers(res.data.users || []);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        // ensure at least 2s loading
        const elapsed = Date.now() - startTime;
        const remaining = 2000 - elapsed; 
        setTimeout(() => setLoading(false), remaining > 0 ? remaining : 0);
      }
    };

    if (status === "authenticated" || status === "unauthenticated") {
      fetchUsers();
    } else if (status === "unauthenticated") {
      setLoading(false); // stop loading if not logged in
    }
  }, [status]);
if (status === "unauthenticated") {
  //remove comme
   //router.push("/login");
  }
  // Show loader strictly for 2 seconds
  if (status === "loading" || loading) {
    return (
      <div >
        <Loading />
      </div>
    );
  }

  return (
    <>
    <Head>
        <title>Admin Panel-All Users</title>
        
      </Head>
    
    <div className="blogpage">
      <div className="titledashboard flex flex-sb" data-aos="fade-right">
        <div>
          <h2>
            Users <span>({users.length})</span>
          </h2>
          <h3>ADMIN PANEL</h3>
        </div>
        <div className="breadcrumb">
          <span>/</span>
          <span>Users</span>
        </div>
      </div>

      <div className="blogstable">
        {users.length > 0 ? (
          <table data-aos="fade-right">
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Image</th>
                <th>Joined On</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td style={{ textAlign: "center"}}>{index + 1}</td>
                  <td style={{ textAlign: "center"}}>{user.name}</td>
                  <td style={{ textAlign: "center"}}>{user.email}</td>
                <td style={{ textAlign: "center"}}>
  {user.image ? (
    <img
      src={user.image}
      alt={user.name}
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
       
      }}
    />
  ) : (
    "No Image"
  )}
</td>

                  <td style={{ textAlign: "center"}}>
                    {new Date(user.createdAt).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      day: "2-digit",
                      month: "long",
                      year: "2-digit",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
            No Users Found
          </div>
        )}
      </div>
    </div>
    </>
  );
}
