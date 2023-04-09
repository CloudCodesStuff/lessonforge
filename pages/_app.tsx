import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import 'flowbite';
import { ClerkProvider, SignedIn, SignedOut, SignIn } from '@clerk/nextjs';
import { useState } from 'react'

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session
}>) {

  return (
    <ClerkProvider {...pageProps}>


      <ToastContainer />
      
        <Component {...pageProps} ></Component>
    </ClerkProvider>
  )
}