import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UsersTable() {
  const { status } = useSession();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/getuser");
        setUsers(res.data.users || []);
        console.log('users',users);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    if (status === "authenticated") {
      fetchUsers();
    }
  }, [status]);

  return (
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
          <table data-aos="fade-up">
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
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        style={{ width: "40px", borderRadius: "50%" }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>
 

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
  );
}
