import type { NextPage } from "next";
import Image from "next/image";

import Head from "next/head";
import { Component, useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.bubble.css";
import { MoonLoader } from "react-spinners";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import DOMPurify from "dompurify";
import { FaRegCopy, FaRegFilePdf, FaCheckCircle } from "react-icons/fa";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import { UserButton } from "@clerk/nextjs";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface LessonPlan {
  topic: string;
  level: string;
  description: string;
  length: number;
}

const App: NextPage = () => {
  const maxlength = 500;
  const [lessonPlan, setLessonPlan] = useState<LessonPlan>({
    topic: "",
    level: "",
    description: "",
    length: 0,
  });

  const [error, setError] = useState(false);
  const [defaultErr, setDefError] = useState(false);

  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [wait, setWait] = useState(false);

  const [value, setValue] = useState("");

  useEffect(() => {
    if (lessonPlan.description.length < maxlength) setError(false);
  }, [lessonPlan]);

  useEffect(() => {
    if (typeof window !== "undefined") {
    }
  }, []);
  const contentStyle = {
    fontFamily: "Plus Jakarta Sans, sans-serif",
    fontSize: "1.2rem",
  };

  const submit = async () => {
    // Check if character limit is exceeded
    if (lessonPlan.description.length > maxlength) return setError(true);
    if (lessonPlan.description.length == 0) return setDefError(true);
    if (lessonPlan.topic.length == 0) return setDefError(true);
    if (lessonPlan.length == 0) return setDefError(true);
    if (lessonPlan.length < 0) return setDefError(true);

    // Set loading state
    setLoading(true);
    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lessonPlan),
      });

      const suggestion: { result: string } = await res.json();
      const { result } = suggestion;


      setSuggestion(result);
      toast('Lessonplan loaded!', { hideProgressBar: true, autoClose: 2000, type: 'success', position: 'bottom-right' })

    } catch (error) {
      console.log(error);
      setLoading(false);
      toast('There was an error on our end.', { hideProgressBar: true, autoClose: 5000, type: 'error', position: 'bottom-right' })

    } finally {
      setLoading(false);

    }
  };
  const handleExport = () => {
    const quillEditor = document.querySelector(".ql-editor");
    const content = DOMPurify.sanitize(quillEditor.innerText);

    const docDefinition = {
      watermark: {
        text: "Lessonplan created with teachify",
        color: "blue",
        opacity: 0.1,
        bold: true,
        italics: false,
      },

      content: [
        { text: "Lesson Plan", style: "header" },
        { text: content, style: "content" },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        content: {
          fontSize: 12,
        },
      },
    };
    pdfMake.createPdf(docDefinition).download("lessonplan.pdf");
  };
  const handleCopy = () => {
    const quillEditor = document.querySelector(".ql-editor");
    const content = DOMPurify.sanitize(quillEditor.innerText);
    setWait(true);
    setTimeout(function () {
      setWait(false);
    }, 2000);
    copy(content);
  };

  return (
    <div className="m-0 p-0 box-border ">
      <header>
        <nav className="bg-white w-full  drop-shadow-2xl flex flex-row border-gray-200 px-4 lg:px-6 py-2.5 ">
          <div className="w-1/2 flex justify-start">                <a href="/" className="sm:flex hidden items-start">
            <svg className="mr-2 h-7" width="242" height="33" viewBox="0 0 348 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.927979 37V0.664001H7.21598V37H0.927979Z" fill="black" />
              <path d="M52.3484 37.576C49.5644 37.576 47.1324 36.92 45.0524 35.608C43.0044 34.264 41.5964 32.456 40.8284 30.184L45.5324 27.928C46.2044 29.4 47.1324 30.552 48.3164 31.384C49.5324 32.216 50.8764 32.632 52.3484 32.632C53.5004 32.632 54.4124 32.376 55.0844 31.864C55.7564 31.352 56.0924 30.68 56.0924 29.848C56.0924 29.336 55.9484 28.92 55.6604 28.6C55.4044 28.248 55.0364 27.96 54.5564 27.736C54.1084 27.48 53.6124 27.272 53.0684 27.112L48.7964 25.912C46.5884 25.272 44.9084 24.296 43.7564 22.984C42.6364 21.672 42.0764 20.12 42.0764 18.328C42.0764 16.728 42.4764 15.336 43.2764 14.152C44.1084 12.936 45.2444 11.992 46.6844 11.32C48.1564 10.648 49.8364 10.312 51.7244 10.312C54.1884 10.312 56.3644 10.904 58.2524 12.088C60.1404 13.272 61.4844 14.936 62.2844 17.08L57.4844 19.336C57.0364 18.152 56.2844 17.208 55.2284 16.504C54.1724 15.8 52.9884 15.448 51.6764 15.448C50.6204 15.448 49.7884 15.688 49.1804 16.168C48.5724 16.648 48.2684 17.272 48.2684 18.04C48.2684 18.52 48.3964 18.936 48.6524 19.288C48.9084 19.64 49.2604 19.928 49.7084 20.152C50.1884 20.376 50.7324 20.584 51.3404 20.776L55.5164 22.024C57.6604 22.664 59.3084 23.624 60.4604 24.904C61.6444 26.184 62.2364 27.752 62.2364 29.608C62.2364 31.176 61.8204 32.568 60.9884 33.784C60.1564 34.968 59.0044 35.896 57.5324 36.568C56.0604 37.24 54.3324 37.576 52.3484 37.576Z" fill="black" />
              <path d="M77.0046 37.576C74.2206 37.576 71.7886 36.92 69.7086 35.608C67.6606 34.264 66.2526 32.456 65.4846 30.184L70.1886 27.928C70.8606 29.4 71.7886 30.552 72.9726 31.384C74.1886 32.216 75.5326 32.632 77.0046 32.632C78.1566 32.632 79.0686 32.376 79.7406 31.864C80.4126 31.352 80.7486 30.68 80.7486 29.848C80.7486 29.336 80.6046 28.92 80.3166 28.6C80.0606 28.248 79.6926 27.96 79.2126 27.736C78.7646 27.48 78.2686 27.272 77.7246 27.112L73.4526 25.912C71.2446 25.272 69.5646 24.296 68.4126 22.984C67.2926 21.672 66.7326 20.12 66.7326 18.328C66.7326 16.728 67.1326 15.336 67.9326 14.152C68.7646 12.936 69.9006 11.992 71.3406 11.32C72.8126 10.648 74.4926 10.312 76.3806 10.312C78.8446 10.312 81.0206 10.904 82.9086 12.088C84.7966 13.272 86.1406 14.936 86.9406 17.08L82.1406 19.336C81.6926 18.152 80.9406 17.208 79.8846 16.504C78.8286 15.8 77.6446 15.448 76.3326 15.448C75.2766 15.448 74.4446 15.688 73.8366 16.168C73.2286 16.648 72.9246 17.272 72.9246 18.04C72.9246 18.52 73.0526 18.936 73.3086 19.288C73.5646 19.64 73.9166 19.928 74.3646 20.152C74.8446 20.376 75.3886 20.584 75.9966 20.776L80.1726 22.024C82.3166 22.664 83.9646 23.624 85.1166 24.904C86.3006 26.184 86.8926 27.752 86.8926 29.608C86.8926 31.176 86.4766 32.568 85.6446 33.784C84.8126 34.968 83.6606 35.896 82.1886 36.568C80.7166 37.24 78.9886 37.576 77.0046 37.576Z" fill="black" />
              <path d="M104.493 37.576C101.933 37.576 99.5969 36.984 97.4849 35.8C95.4049 34.616 93.7409 33 92.4929 30.952C91.2769 28.904 90.6689 26.568 90.6689 23.944C90.6689 21.32 91.2769 18.984 92.4929 16.936C93.7409 14.888 95.4049 13.272 97.4849 12.088C99.5649 10.904 101.901 10.312 104.493 10.312C107.053 10.312 109.373 10.904 111.453 12.088C113.533 13.272 115.181 14.888 116.397 16.936C117.645 18.952 118.269 21.288 118.269 23.944C118.269 26.568 117.645 28.904 116.397 30.952C115.149 33 113.485 34.616 111.405 35.8C109.325 36.984 107.021 37.576 104.493 37.576ZM104.493 31.816C105.901 31.816 107.133 31.48 108.189 30.808C109.277 30.136 110.125 29.208 110.733 28.024C111.373 26.808 111.693 25.448 111.693 23.944C111.693 22.408 111.373 21.064 110.733 19.912C110.125 18.728 109.277 17.8 108.189 17.128C107.133 16.424 105.901 16.072 104.493 16.072C103.053 16.072 101.789 16.424 100.701 17.128C99.6129 17.8 98.7489 18.728 98.1089 19.912C97.5009 21.064 97.1969 22.408 97.1969 23.944C97.1969 25.448 97.5009 26.808 98.1089 28.024C98.7489 29.208 99.6129 30.136 100.701 30.808C101.789 31.48 103.053 31.816 104.493 31.816Z" fill="black" />
              <path d="M154.514 37V16.504H149.906V10.888H154.514V10.024C154.514 8.04 154.914 6.36 155.714 4.984C156.546 3.576 157.698 2.504 159.17 1.768C160.642 1.032 162.386 0.664001 164.402 0.664001C164.786 0.664001 165.202 0.696001 165.65 0.76C166.13 0.792002 166.53 0.840002 166.85 0.904001V6.328C166.53 6.264 166.226 6.232 165.938 6.232C165.682 6.2 165.442 6.184 165.218 6.184C163.81 6.184 162.722 6.504 161.954 7.144C161.186 7.752 160.802 8.712 160.802 10.024V10.888H166.61V16.504H160.802V37H154.514Z" fill="black" />
              <path d="M183.008 37.576C180.448 37.576 178.112 36.984 176 35.8C173.92 34.616 172.256 33 171.008 30.952C169.792 28.904 169.184 26.568 169.184 23.944C169.184 21.32 169.792 18.984 171.008 16.936C172.256 14.888 173.92 13.272 176 12.088C178.08 10.904 180.416 10.312 183.008 10.312C185.568 10.312 187.888 10.904 189.968 12.088C192.048 13.272 193.696 14.888 194.912 16.936C196.16 18.952 196.784 21.288 196.784 23.944C196.784 26.568 196.16 28.904 194.912 30.952C193.664 33 192 34.616 189.92 35.8C187.84 36.984 185.536 37.576 183.008 37.576ZM183.008 31.816C184.416 31.816 185.648 31.48 186.704 30.808C187.792 30.136 188.64 29.208 189.248 28.024C189.888 26.808 190.208 25.448 190.208 23.944C190.208 22.408 189.888 21.064 189.248 19.912C188.64 18.728 187.792 17.8 186.704 17.128C185.648 16.424 184.416 16.072 183.008 16.072C181.568 16.072 180.304 16.424 179.216 17.128C178.128 17.8 177.264 18.728 176.624 19.912C176.016 21.064 175.712 22.408 175.712 23.944C175.712 25.448 176.016 26.808 176.624 28.024C177.264 29.208 178.128 30.136 179.216 30.808C180.304 31.48 181.568 31.816 183.008 31.816Z" fill="black" />
              <path d="M341.615 37V0.664001H347.903V37H341.615Z" fill="black" />
              <path d="M288.5 36.76V30.808H282.5V36.76H288.5Z" fill="#1D4ED8" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M256.147 35.752C258.163 36.968 260.515 37.576 263.203 37.576C264.995 37.576 266.627 37.304 268.099 36.76C269.603 36.216 270.899 35.464 271.987 34.504C273.075 33.544 273.875 32.44 274.387 31.192L269.299 28.696C268.723 29.72 267.923 30.536 266.899 31.144C265.907 31.752 264.691 32.056 263.251 32.056C261.811 32.056 260.531 31.72 259.411 31.048C258.323 30.376 257.491 29.432 256.915 28.216C256.581 27.4503 256.374 26.6183 256.293 25.72H275.107C275.235 25.368 275.315 24.952 275.347 24.472C275.411 23.992 275.443 23.528 275.443 23.08C275.443 21.32 275.155 19.688 274.579 18.184C274.003 16.648 273.171 15.288 272.083 14.104C270.995 12.92 269.667 11.992 268.099 11.32C266.563 10.648 264.771 10.312 262.723 10.312C260.291 10.312 258.083 10.904 256.099 12.088C254.147 13.272 252.595 14.888 251.443 16.936C250.323 18.952 249.763 21.272 249.763 23.896C249.763 26.424 250.323 28.728 251.443 30.808C252.563 32.888 254.131 34.536 256.147 35.752ZM256.422 20.92H268.722C268.671 20.3266 268.543 19.7666 268.339 19.24C267.923 18.088 267.219 17.176 266.227 16.504C265.267 15.832 264.099 15.496 262.723 15.496C261.411 15.496 260.243 15.832 259.219 16.504C258.195 17.144 257.411 18.104 256.867 19.384C256.673 19.8569 256.525 20.3689 256.422 20.92ZM256.422 20.92H254.947V25.72H256.293C256.291 25.7033 256.29 25.6865 256.288 25.6698C256.242 25.1193 256.243 24.544 256.291 23.944C256.211 22.8311 256.255 21.8231 256.422 20.92Z" fill="black" />
              <path d="M254.947 20.92V25.72H256.293L256.288 25.6698C256.242 25.1193 256.243 24.544 256.291 23.944C256.211 22.8311 256.255 21.8231 256.422 20.92H254.947Z" fill="black" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M226.754 46.6C228.418 47.24 230.226 47.56 232.178 47.56C234.674 47.56 236.866 47.048 238.754 46.024C240.674 45 242.178 43.592 243.266 41.8C244.386 40.008 244.946 37.976 244.946 35.704V10.888H238.994V13.895C238.17 12.9213 237.21 12.1429 236.114 11.56C234.642 10.728 232.93 10.312 230.978 10.312C228.578 10.312 226.434 10.872 224.546 11.992C222.658 13.08 221.17 14.584 220.082 16.504C218.994 18.424 218.45 20.616 218.45 23.08C218.45 25.512 218.994 27.704 220.082 29.656C221.17 31.608 222.674 33.144 224.594 34.264C226.514 35.384 228.69 35.944 231.122 35.944C233.042 35.944 234.754 35.544 236.258 34.744C237.17 34.2591 237.97 33.633 238.658 32.8658V35.704C238.658 36.984 238.386 38.072 237.842 38.968C237.298 39.896 236.53 40.6 235.538 41.08C234.578 41.56 233.458 41.8 232.178 41.8C230.514 41.8 229.106 41.416 227.954 40.648C226.834 39.912 226.082 38.936 225.698 37.72L219.842 39.928C220.386 41.464 221.25 42.792 222.434 43.912C223.65 45.064 225.09 45.96 226.754 46.6ZM238.658 29.752V32.8658C238.679 32.842 238.701 32.8181 238.722 32.794C239.143 32.314 239.522 31.78 239.858 31.192L238.658 29.752ZM235.394 29.272C234.402 29.848 233.234 30.136 231.89 30.136C230.546 30.136 229.346 29.832 228.29 29.224C227.266 28.616 226.45 27.784 225.842 26.728C225.266 25.672 224.978 24.472 224.978 23.128C224.978 21.784 225.266 20.584 225.842 19.528C226.45 18.44 227.282 17.592 228.338 16.984C229.394 16.376 230.578 16.072 231.89 16.072C233.202 16.072 234.354 16.376 235.346 16.984C236.37 17.592 237.17 18.44 237.746 19.528C238.354 20.584 238.658 21.784 238.658 23.128C238.658 24.504 238.37 25.72 237.794 26.776C237.218 27.832 236.418 28.664 235.394 29.272Z" fill="black" />
              <path d="M239.858 31.192L238.658 29.752V32.8658C238.679 32.842 238.701 32.8181 238.722 32.794C239.143 32.314 239.522 31.78 239.858 31.192Z" fill="black" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M201.553 10.888V37H207.841V22.456C207.841 20.472 208.385 18.936 209.473 17.848C210.561 16.728 212.001 16.168 213.793 16.168H216.049V10.6H214.513C212.689 10.6 211.121 10.984 209.809 11.752C208.827 12.341 208.043 13.2781 207.457 14.5633V10.888H201.553ZM207.457 16.696V14.5633C207.453 14.5714 207.45 14.5796 207.446 14.5877C207.439 14.6037 207.431 14.6198 207.424 14.636C207.259 15.0063 207.11 15.405 206.977 15.832L207.457 16.696Z" fill="black" />
              <path d="M206.977 15.832L207.457 16.696V14.5633L207.446 14.5877C207.439 14.6037 207.431 14.6198 207.424 14.636C207.259 15.0063 207.11 15.405 206.977 15.832Z" fill="black" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M123.037 10.888V37H129.325V21.688C129.325 20.536 129.549 19.544 129.997 18.712C130.445 17.88 131.069 17.24 131.869 16.792C132.669 16.312 133.581 16.072 134.605 16.072C135.661 16.072 136.573 16.312 137.341 16.792C138.141 17.24 138.765 17.88 139.213 18.712C139.661 19.544 139.885 20.536 139.885 21.688V37H146.173V20.2C146.173 18.248 145.757 16.536 144.925 15.064C144.093 13.56 142.925 12.392 141.421 11.56C139.949 10.728 138.253 10.312 136.333 10.312C134.477 10.312 132.845 10.728 131.437 11.56C130.378 12.1762 129.546 13.0201 128.941 14.0918V10.888H123.037ZM128.941 16.024V14.0918C128.933 14.1072 128.924 14.1226 128.915 14.1381C128.746 14.4444 128.594 14.769 128.461 15.112L128.941 16.024Z" fill="black" />
              <path d="M128.461 15.112L128.941 16.024V14.0918L128.915 14.1381C128.746 14.4444 128.594 14.769 128.461 15.112Z" fill="black" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M18.3497 35.752C20.3657 36.968 22.7177 37.576 25.4057 37.576C27.1977 37.576 28.8297 37.304 30.3017 36.76C31.8057 36.216 33.1017 35.464 34.1897 34.504C35.2777 33.544 36.0777 32.44 36.5897 31.192L31.5017 28.696C30.9257 29.72 30.1257 30.536 29.1017 31.144C28.1097 31.752 26.8937 32.056 25.4537 32.056C24.0137 32.056 22.7337 31.72 21.6137 31.048C20.5257 30.376 19.6937 29.432 19.1177 28.216C18.7839 27.4503 18.5767 26.6183 18.4959 25.72H37.3097C37.4377 25.368 37.5177 24.952 37.5497 24.472C37.6137 23.992 37.6457 23.528 37.6457 23.08C37.6457 21.32 37.3577 19.688 36.7817 18.184C36.2057 16.648 35.3737 15.288 34.2857 14.104C33.1977 12.92 31.8697 11.992 30.3017 11.32C28.7657 10.648 26.9737 10.312 24.9257 10.312C22.4937 10.312 20.2857 10.904 18.3017 12.088C16.3497 13.272 14.7977 14.888 13.6457 16.936C12.5257 18.952 11.9657 21.272 11.9657 23.896C11.9657 26.424 12.5257 28.728 13.6457 30.808C14.7657 32.888 16.3337 34.536 18.3497 35.752ZM18.6255 20.92C18.7276 20.3689 18.8757 19.8569 19.0697 19.384C19.6137 18.104 20.3977 17.144 21.4217 16.504C22.4457 15.832 23.6137 15.496 24.9257 15.496C26.3017 15.496 27.4697 15.832 28.4297 16.504C29.4217 17.176 30.1257 18.088 30.5417 19.24C30.7465 19.7666 30.8744 20.3266 30.9254 20.92H18.6255ZM33.7577 20.92H30.9254C30.9302 20.9757 30.9343 21.0317 30.9377 21.088C30.9777 21.744 30.9257 22.44 30.7817 23.176L33.7577 20.92Z" fill="black" />
              <path d="M30.7817 23.176L33.7577 20.92H30.9254C30.9302 20.9757 30.9343 21.0317 30.9377 21.088C30.9777 21.744 30.9257 22.44 30.7817 23.176Z" fill="black" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M297.272 10.888V37H303.56V21.688C303.56 20.536 303.768 19.544 304.184 18.712C304.6 17.88 305.192 17.24 305.96 16.792C306.728 16.312 307.608 16.072 308.6 16.072C309.624 16.072 310.504 16.312 311.24 16.792C312.008 17.24 312.6 17.88 313.016 18.712C313.432 19.544 313.64 20.536 313.64 21.688V37H319.928V21.688C319.928 20.536 320.136 19.544 320.552 18.712C320.968 17.88 321.56 17.24 322.328 16.792C323.096 16.312 323.976 16.072 324.968 16.072C326.024 16.072 326.92 16.312 327.656 16.792C328.392 17.24 328.968 17.88 329.384 18.712C329.8 19.544 330.008 20.536 330.008 21.688V37H336.296V20.2C336.296 18.248 335.88 16.536 335.048 15.064C334.216 13.56 333.064 12.392 331.592 11.56C330.152 10.728 328.504 10.312 326.648 10.312C324.568 10.312 322.728 10.84 321.128 11.896C320.098 12.5551 319.234 13.433 318.535 14.5296C317.964 13.5438 317.164 12.698 316.136 11.992C314.504 10.872 312.616 10.312 310.472 10.312C308.52 10.312 306.824 10.776 305.384 11.704C304.443 12.3104 303.707 13.1217 303.176 14.138V10.888H297.272ZM318.535 14.5296C318.522 14.551 318.508 14.5726 318.495 14.5942C318.125 15.1844 317.803 15.837 317.528 16.552L319.304 16.408C319.126 15.7338 318.87 15.1076 318.535 14.5296Z" fill="black" />
              <path d="M317.528 16.552L319.304 16.408C319.126 15.7338 318.87 15.1076 318.535 14.5296C318.522 14.551 318.508 14.5726 318.495 14.5942C318.125 15.1844 317.803 15.837 317.528 16.552Z" fill="black" />
            </svg>
          </a></div>

          <div className="w-1/2 flex justify-end">          <UserButton></UserButton>
          </div>

        </nav>
      </header>
      <Head>
        <title>Lessonplan Generator</title>
        <meta name="description" content="Lessonplant generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col lg:flex-row overflow-scroll lg:overflow-hidden h-fit lg:h-screen font-plus">
        <div className="flex-col lg:flex-row w-full lg:w-1/2 p-5 lg:p-10 bg-primary-700 rounded-r-md ">
          <div className=" p-5 bg-white rounded-md">
            <div className="mx-auto w-4/5">
              <h2 className="text-3xl lg:text-4xl my-3 font-bold pb-2">
                Let's get Started✌️
              </h2>

              {/* Error message */}
              {error && (
                <p className="text-xs relative  py-4 text-red-500">
                  Woah! That's a lot of text. Maybe cut it down a bit?
                </p>
              )}
              {defaultErr && (
                <p className="text-xs relative py-4 text-blue-500">
                  Please fill out all sections!
                </p>
              )}

              <div className="mb-4">
                <label
                  htmlFor="topic"
                  className="block text-sm font-normal text-gray-700"
                >
                  Topic
                </label>
                <textarea
                  name="topic"
                  value={lessonPlan.topic}
                  onChange={(e) =>
                    setLessonPlan({ ...lessonPlan, topic: e.target.value })
                  }
                  className="mt-1 p-2 resize-none rounded-lg bg-gray-100 text-black border-primary-700 focus:border-primary-700 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border-2"
                  placeholder="What's your topic?"
                  required
                />
              </div>

              <div>
                <div className="mb-4">
                  <label
                    htmlFor="level"
                    className=" block text-sm font-normal text-gray-700"
                  >
                    Grade level
                  </label>
                  <select
                    name="level"
                    value={lessonPlan.level}
                    onChange={(e) =>
                      setLessonPlan({ ...lessonPlan, level: e.target.value })
                    }
                    className="mt-1 p-2 bg-gray-100 text-black rounded-lg border-primary-700 focus:border-primary-700 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border-2"
                    required
                  >
                    <option value="">Select a grade level</option>
                    <option value="K">K</option>
                    <option value="1">1st</option>
                    <option value="2">2nd</option>
                    <option value="3">3rd</option>
                    <option value="4">4th</option>
                    <option value="5">5th</option>
                    <option value="6">6th</option>
                    <option value="7">7th</option>
                    <option value="8">8th</option>
                    <option value="9">9th</option>
                    <option value="10">10th</option>
                    <option value="11">11th</option>
                    <option value="12">12th</option>
                    <option value="College">College</option>

                  </select>
                </div>
                <div className="relative mb-4 w-full">
                  <label
                    htmlFor="description"
                    className="block text-sm font-normal text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={lessonPlan.description}
                    onChange={(e) =>
                      setLessonPlan({
                        ...lessonPlan,
                        description: e.target.value,
                      })
                    }
                    className="mt-1 p-2 bg-gray-100 text-black resize-none h-32 rounded-lg border-primary-700 focus:border-primary-700 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border-2"
                    placeholder="Describe the lesson. Any activities in mind?"
                    required
                  />
                  {/* Character count */}
                  <div className=" absolute inset-y-0 right-0 p-3 flex items-end pointer-events-none">
                    <p className="text-sm text-gray-500">
                      {lessonPlan.description.length}/{maxlength}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="length"
                    className="block text-sm font-normal text-gray-700"
                  >
                    Length (in minutes)
                  </label>
                  <input
                    type="number"
                    name="length"
                    value={lessonPlan.length}
                    onChange={(e) =>
                      setLessonPlan({
                        ...lessonPlan,
                        length: parseInt(e.target.value),
                      })
                    }
                    className="mt-1 p-2 bg-gray-100 text-black rounded-lg border-primary-700 focus:border-primary-700 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border-2"
                    placeholder="Enter the length in minutes"
                    required
                  />
                </div>

                {/* Submit button */}
                <button
                  type="button"
                  onClick={submit}
                  className="bg-primary-700 h-12 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                >
                  {loading ? (
                    <div className="flex justify-center items-center gap-4">
                      <p>Loading...</p>
                      <MoonLoader size={20} color="white" />
                    </div>
                  ) : (
                    "Generate"
                  )}
                </button>

                {/* Display suggestion */}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-col lg:flex-row w-full   lg:w-1/2 overflow-y-scroll p-10 mb-10  ">
          <div className="flex">
            {!suggestion && (
              <div>
                <h1 className="text-4xl text-center font-bold">
                  Supercharge your teaching success with AI powered lesson
                  planning
                </h1>
                <p className="text-lg text-center text-gray-500 m-5 ">
                  Save time, improve outcomes, and delight students with
                  AI-generated lesson plans. Create high-quality,
                  standards-aligned lessons in minutes and elevate your teaching
                  game like never before. Go ahead! Click generate!
                </p>
                <Image
                  className="w-full max-w-lg mx-auto m-16"
                  src="/teacher.svg"
                  alt="teacher pointing at board side picture"
                  width={500}
                  height={500}
                ></Image>
              </div>
            )}
            {""}
            {suggestion && (
              <div className="mt-4 w-full">
                <h2 className="text-3xl ml-12  font-bold">
                  Suggested lesson plan:
                </h2>
                <div className="text-lg mb-10 ">
                  <ReactQuill
                    value={suggestion}
                    onChange={setSuggestion}
                    theme="bubble"
                    preserveWhitespace={true}
                  />
                </div>
                <div className="flex justify-center content-center">
                  <div className="fixed drop-shadow-2xl p-1 border-2 bg-white rounded-xl border-primary-500 min-w-fit bottom-3 justify-center ">
                    <div className="flex text-lg bg-white  whitespace-nowrap ">
                      <div className="w-1/2 flex min-w-5 h-15 p-3">
                        <button
                          className="text-primary-500 w-full "
                          onClick={handleExport}
                        >
                          <FaRegFilePdf className="inline m-2"></FaRegFilePdf>
                          <span className="inline ">Export to PDF</span>
                        </button>
                      </div>
                      <div className="flex  min-w-12 h-15 p-3 ">
                        <button
                          className="text-primary-500 w-full "
                          onClick={handleCopy}
                        >
                          {wait ? (
                            <div className="text-green-500 ">
                              <FaCheckCircle className="inline m-2"></FaCheckCircle>
                              <span className="inline ">Copied!</span>
                            </div>
                          ) : (
                            <div>
                              <FaRegCopy className="inline m-2"> </FaRegCopy>
                              <span className="inline ">Copy to Clipboard</span>
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
