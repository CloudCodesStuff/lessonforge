import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Nav></Nav>
      
      <Component {...pageProps} >
   
 
      </Component>
      <Footer></Footer>
      <ToastContainer />

       </div>
  );
}
