import "@/styles/globals.css";

import Header from "@/components/Header";

import Aside from "@/components/Aside";
import NextAuthProvider from "./Provider";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Aos from "@/components/Aos";
export default function App({ Component, pageProps }) {
  const [hasMounted, setHasMounted] = useState(false);
  const [closedSidebar, setClosedSidebar] = useState(false);
  const toggleSidebar = () => {
    setClosedSidebar(prev => !prev);
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <NextAuthProvider>
      {/*This is used for displaying thee toaster*/}
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
     

    transition: "margin-left 0.9s ease", // smooth shift
    transition: "margin-right 0.9s ease", // smooth shift
  }}
>
  <Aos>
    <Component {...pageProps} />
  </Aos>
</main>
        
    </NextAuthProvider>
  );
}
