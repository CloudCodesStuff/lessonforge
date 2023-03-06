import type { NextPage } from "next";
import Head from "next/head";
import { Component, useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.bubble.css";
import styles from "../styles/Home.module.css";
import { MoonLoader } from "react-spinners";
import TextEditor from "@/components/txtedit";
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
  const [value, setValue] = useState("");

  useEffect(() => {
    if (lessonPlan.description.length < maxlength) setError(false);
  }, [lessonPlan]);

  useEffect(() => {
    if (typeof window !== "undefined") {
    }
  }, []);

  const submit = async () => {
    // Check if character limit is exceeded
    if (lessonPlan.description.length > maxlength) return setError(true);
    if (lessonPlan.description.length == 0) return setDefError(true);
    if (lessonPlan.topic.length == 0) return setDefError(true);
    if (lessonPlan.length == 0) return setDefError(true);

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
    }
  };

  return (
    <div className="m-0 p-0 box-border">
      <Head>
        <title>Lessonplan Generator</title>
        <meta name="description" content="Lessonplant generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen font-plus">
        <div className="w-full md:w-1/2 ">
          <div className=" p-5">
            <div className="mx-auto w-4/5">
              <h2 className="text-4xl md:text-5xl my-3 font-bold pb-2">
                Let's get Started!✌️
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
                  className="mt-1 p-2 resize-none rounded-md border-indigo-500 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border-2"
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
                    className="mt-1 p-2 rounded-md border-indigo-500 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border-2"
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
                    className="mt-1 p-2 resize-none h-32 rounded-md border-indigo-500 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border-2"
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
                    className="mt-1 p-2 rounded-md border-indigo-500 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border-2"
                    placeholder="Enter the length in minutes"
                    required
                  />
                </div>

                {/* Submit button */}
                <button
                  className="bg-indigo-500 text-white rounded-md px-4 py-2 mt-4 hover:bg-indigo-600 transition-colors duration-300 ease-in-out"
                  onClick={submit}
                  disabled={loading}
                >
                  {loading ? (
                    <MoonLoader color="#ffffff" size={20} />
                  ) : (
                    "Generate"
                  )}
                </button>

                {/* Display suggestion */}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-10 border-l-2  ">
          <div className="flex">
            {suggestion && (
              <div className="mt-4 w-full">
                <h2 className="text-3xl ml-12 font-bold">Suggested lesson plan:</h2>
                <div className="text-lg">
                  <ReactQuill
                    value={suggestion}
                    onChange={setSuggestion}
                    theme="bubble"
                    style={{fontSize: "1.5rem" }}
                    preserveWhitespace={true}
                  />
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
