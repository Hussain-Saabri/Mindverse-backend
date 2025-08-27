"use client";
import React, { useState } from "react";
import Header from "./Header";
import Aside from "./Aside";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: isSidebarOpen ? "240px" : "0px",
          transition: "width 0.3s ease",
          overflow: "hidden",
          background: "#fff",
          borderRight: "1px solid #ddd",
        }}
      >
        <Aside />
      </div>

      {/* Main Section */}
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Header onToggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <main style={{ marginTop: "70px", padding: "20px", flexGrow: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
