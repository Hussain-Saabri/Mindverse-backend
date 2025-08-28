"use client";
import { useSession, signOut } from "next-auth/react";

export default function AccountPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="not-signedin">
        <h2>You are not signed in 🚫</h2>
        <a href="/api/auth/signin" className="btn signin-btn">
          Sign In with Google
        </a>
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="account-container">
      <div className="account-card">
        <h1 className="account-title">Account Settings ⚙️</h1>

        <div className="account-section">
          <label>Name:</label>
          <p>{user.name}</p>
        </div>

        <div className="account-section">
          <label>Email:</label>
          <p>{user.email}</p>
        </div>

        <div className="account-section">
          <label>Profile Picture:</label>
          <img src={user.image} alt={user.name} className="account-avatar" />
        </div>

        <div className="account-buttons">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="btn logout-btn"
          >
            Logout
          </button>
          <a href="/profile" className="btn home-btn">
            Back to Profile
          </a>
        </div>
      </div>
    </div>
  );
}
