import { useState } from "react";
import { ChangeEvent } from "react";

interface FormattingOptions {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  bullet: boolean;
  orderedList: boolean;
}

function TextEditor() {
  const [text, setText] = useState("");
  const [formatting, setFormatting] = useState<FormattingOptions>({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    bullet: false,
    orderedList: false,
  });

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleFormatClick = (format: keyof FormattingOptions) => {
    setFormatting((prevFormatting) => ({
      ...prevFormatting,
      [format]: !prevFormatting[format],
    }));
  };

  const handleApiInput = () => {
    // Call API and set text state
  };

  const formatClasses = {
    bold: formatting.bold ? "font-bold" : "",
    italic: formatting.italic ? "italic" : "",
    underline: formatting.underline ? "underline" : "",
    strikethrough: formatting.strikethrough ? "line-through" : "",
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between mb-2">
        <div className="flex space-x-2">
          <button
            className={`px-2 rounded hover:bg-gray-200 ${formatClasses.bold}`}
            onClick={() => handleFormatClick("bold")}
          >
            B
          </button>
          <button
            className={`px-2 rounded hover:bg-gray-200 ${formatClasses.italic}`}
            onClick={() => handleFormatClick("italic")}
          >
            I
          </button>
          <button
            className={`px-2 rounded hover:bg-gray-200 ${formatClasses.underline}`}
            onClick={() => handleFormatClick("underline")}
          >
            U
          </button>
          <button
            className={`px-2 rounded hover:bg-gray-200 ${formatClasses.strikethrough}`}
            onClick={() => handleFormatClick("strikethrough")}
          >
            S
          </button>
          <button
            className="px-2 rounded hover:bg-gray-200"
            onClick={() => handleFormatClick("bullet")}
          >
            &bull;
          </button>
          <button
            className="px-2 rounded hover:bg-gray-200"
            onClick={() => handleFormatClick("orderedList")}
          >
            1.
          </button>
        </div>
        <button
          className="px-2 rounded hover:bg-gray-200"
          onClick={handleApiInput}
        >
          Input API
        </button>
      </div>
      <div className="flex-grow">
        <textarea
          className="w-full h-full p-2 border rounded"
          value={text}
          onChange={handleChange}
        />
      </div>
      <div className="flex-grow">
        <div className="p-2">
          {text.split("\n").map((line, i) => {
            const styles = [];
            if (formatting.bold) styles.push("font-bold");
            if (formatting.italic) styles.push("italic");
            if (formatting.underline) styles.push("underline");
            if (formatting.strikethrough) styles.push("line-through");
            return (
              <div key={i}>
                {formatting.orderedList ? (
                  <span className="mr-2">{i + 1}. </span>
                ) : null}
                {formatting.bullet ? (
                  <span className="mr-2">&bull; </span>
                ) : null}
                <span className={styles.join(" ")}>{line}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TextEditor;
