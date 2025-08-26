import "@/styles/globals.css";

import Header from "@/components/Header";

import Aside from "@/components/Aside";
import NextAuthProvider from "./Provider";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Aos from "@/components/Aos";
export default function App({ Component, pageProps }) {
  const [hasMounted, setHasMounted] = useState(false);

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
      <Header />
      <Aside />
      <main>
        <Aos>

          <Component {...pageProps} />
      
        </Aos>
        </main>
        
    </NextAuthProvider>
  );
}
