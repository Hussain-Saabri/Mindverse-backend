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
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-50 px-4">
      <div className="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-sm text-center shadow-md">
        <h1 className="text-xl font-semibold text-gray-800 mb-3">
          🚫 Desktop Only
        </h1>
        <p className="text-gray-600 text-sm">
          This website is available only on desktop browsers.
        </p>
      </div>
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
