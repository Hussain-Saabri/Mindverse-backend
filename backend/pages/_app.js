import "@/styles/globals.css";

import Header from "@/components/Header";
import Aside from "@/components/Aside";
import NextAuthProvider from "./Provider";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Aos from "@/components/Aos";

export default function App({ Component, pageProps }) {
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [closedSidebar, setClosedSidebar] = useState(false);

  const toggleSidebar = () => {
    setClosedSidebar(prev => !prev);
  };

  useEffect(() => {
    setHasMounted(true);

    // Detect mobile devices by User Agent
    const ua = navigator.userAgent;
    if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
      setIsMobile(true);
    }
  }, []);

  if (!hasMounted) return null;

  // 🚫 Block Mobile Users
  if (isMobile) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 text-center p-6">
        <h1 className="text-2xl font-bold text-red-600">
          🚫 This website is only available on desktop
        </h1>
        <p className="mt-4 text-gray-700">
          Please open this site on a desktop browser.
        </p>
      </div>
    );
  }

  // ✅ Normal Desktop Render
  return (
    <NextAuthProvider>
      {/* Toast notifications */}
      <Toaster
        position="top-right"
        duration="3000"
        toastOptions={{
          style: {
            backgroundColor: "#ADD8E6",
            color: "#fff",
          },
        }}
      />

      <Header onToggleSidebar={toggleSidebar} />
      {!closedSidebar && <Aside />}

      <main
        style={{
          marginLeft: closedSidebar ? "55px" : "120px",
          transition: "margin-left 0.9s ease, margin-right 0.9s ease",
        }}
      >
        <Aos>
          <Component {...pageProps} />
        </Aos>
      </main>
    </NextAuthProvider>
  );
}
