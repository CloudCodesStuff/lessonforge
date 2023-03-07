import type { NextPage } from "next";
import Image from "next/image";

import Head from "next/head";
import { Component, useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.bubble.css";
import styles from "../styles/text.module.css";
import { MoonLoader } from "react-spinners";
import TextEditor from "@/components/txtedit";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import DOMPurify from "dompurify";
import { FaRegCopy, FaRegFilePdf, FaCheckCircle } from "react-icons/fa";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";

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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      toast('Lessonplan loaded!', { hideProgressBar: true, autoClose: 2000, type: 'success',position:'bottom-left' })

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
      <Head>
        <title>Lessonplan Generator</title>
        <meta name="description" content="Lessonplant generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col lg:flex-row overflow-scroll lg:overflow-hidden h-fit lg:h-screen font-plus">
        <div className="flex-col lg:flex-row w-full lg:w-1/2 p-5 lg:p-10 ">
          <div className=" p-5">
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
                  className="mt-1 p-2 resize-none rounded-lg bg-gray-100 text-black border-indigo-500 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border-2"
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
                    className="mt-1 p-2 bg-gray-100 text-black rounded-lg border-indigo-500 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border-2"
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
                    className="mt-1 p-2 bg-gray-100 text-black resize-none h-32 rounded-lg border-indigo-500 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border-2"
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
                    className="mt-1 p-2 bg-gray-100 text-black rounded-lg border-indigo-500 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border-2"
                    placeholder="Enter the length in minutes"
                    required
                  />
                </div>

                {/* Submit button */}
                <button
                  type="button"
                  onClick={submit}
                  className="bg-indigo-500 h-12 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
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
                  <div className="fixed drop-shadow-2xl p-5 border-2 bg-white rounded-xl border-gray-400 min-w-fit bottom-3 justify-center ">
                    <div className="flex text-lg bg-white  whitespace-nowrap ">
                      <div className="w-1/2 flex min-w-5 h-15 p-3">
                        <button
                          className="text-gray-500 w-full "
                          onClick={handleExport}
                        >
                          <FaRegFilePdf className="inline m-2"></FaRegFilePdf>
                          <span className="inline ">Export to PDF</span>
                        </button>
                      </div>
                      <div className="flex  min-w-12 h-15 p-3 ">
                        <button
                          className="text-gray-500 w-full "
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
