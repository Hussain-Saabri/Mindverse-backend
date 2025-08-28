"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
export default function ProfilePage() {
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
        <Link href="/api/auth/signin" className="btn signin-btn">
          Sign In with Google
        </Link>
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="avatar-wrapper">
          <img src={user.image} alt={user.name} className="avatar" />
          <span className="online"></span>
        </div>
        <h1>{user.name}</h1>
        <p>{user.email}</p>

        <div className="button-group">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="btn logout-btn"
          >
            Sign Out
          </button>
          <Link href="/" className="btn home-btn">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
