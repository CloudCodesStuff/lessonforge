import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import 'flowbite';
import { ClerkProvider, SignedIn, SignedOut, SignIn } from '@clerk/nextjs';
import { useState } from 'react'

interface CustomPageProps { // <--- your custom page props
   // your props
}

export default function App({ Component, pageProps }: AppProps<CustomPageProps>) {
                                             //   ^^^ use your custom props here
  return(
    <ClerkProvider {...pageProps}>


      <ToastContainer />
      
        <Component {...pageProps} ></Component>
    </ClerkProvider>
  ) 
                    // ^^^^^ pageProps is now typeof CustomPageProps
}
