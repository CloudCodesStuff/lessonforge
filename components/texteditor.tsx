import { useState, useRef } from "react";

function TextEditor() {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [link, setLink] = useState("");
  const [listType, setListType] = useState("");
  const [justify, setJustify] = useState("");

  const editorRef = useRef(null);

  const handleBoldClick = () => document.execCommand("bold", false, null);
  const handleItalicClick = () => document.execCommand("italic", false, null);
  const handleUnderlineClick = () => document.execCommand("underline", false, null);

  const handleLinkChange = (e) => setLink(e.target.value);
  const handleLinkClick = () => {
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return;
    const selectedText = selection.toString();
    const linkMarkup = `<a href="${link}">${selectedText}</a>`;
    const range = selection.getRangeAt(0);
    range.deleteContents();
    const linkNode = document.createElement("span");
    linkNode.innerHTML = linkMarkup;
    range.insertNode(linkNode);
  };

  const handleListTypeChange = (e) => setListType(e.target.value);
  const handleListClick = () => {
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return;
    const selectedText = selection.toString();
    const listMarkup = listType === "bulleted" ? `<ul><li>${selectedText}</li></ul>` : `<ol><li>${selectedText}</li></ol>`;
    const range = selection.getRangeAt(0);
    range.deleteContents();
    const listNode = document.createElement("span");
    listNode.innerHTML = listMarkup;
    range.insertNode(listNode);
  };

  const handleJustifyChange = (e) => setJustify(e.target.value);
  const handleJustifyClick = () => {
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return;
    const selectedText = selection.toString();
    const justifyMarkup = `<p style="text-align:${justify}">${selectedText}</p>`;
    const range = selection.getRangeAt(0);
    range.deleteContents();
    const justifyNode = document.createElement("span");
    justifyNode.innerHTML = justifyMarkup;
    range.insertNode(justifyNode);
  };

  const handleHeadingClick = (type) => {
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return;
    const selectedText = selection.toString();
    const headingMarkup = `<h${type}>${selectedText}</h${type}>`;
    const range = selection.getRangeAt(0);
    range.deleteContents();
    const headingNode = document.createElement("span");
    headingNode.innerHTML = headingMarkup;
    range.insertNode(headingNode);
  };

  const handleParagraphClick = () => {
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return;
    const selectedText = selection.toString();
    const paragraphMarkup = `<p>${selectedText}</p>`;
    const range = selection.getRangeAt(0);
    range.deleteContents();
    const paragraphNode = document.createElement("span");
    paragraphNode.innerHTML = paragraphMarkup;
    range.insertNode(paragraphNode);
  };

  return (
   
    <div>
      <div>
        <button onClick={handleBoldClick}>Bold</button>
        <button onClick={handleItalicClick}>Italic</button>
        <button onClick={handleUnderlineClick}>Underline</button>
        <input type="text" value={link} onChange={handleLinkChange} placeholder="Link URL" />
        <button onClick={handleLinkClick}>Link</button>
        <select value={listType} onChange={handleListTypeChange}>
          <option value="">List Type</option>
          <option value="bulleted">Bulleted</option>
          <option value="numbered">Numbered</option>
        </select>
        <button onClick={handleListClick}>List</button>
        <select value={justify} onChange={handleJustifyChange}>
          <option value="">Justify</option>
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
        <button onClick={handleJustifyClick}>Justify</button>
        <button onClick={handleParagraphClick}>Paragraph</button>
        <button onClick={() => handleHeadingClick(1)}>Heading 1</button>
        <button onClick={() => handleHeadingClick(2)}>Heading 2</button>
        <button onClick={() =>handleSubHeadingClick()}>Subheading</button>
      </div>
      <div
        ref={editorRef}
        style={{
          border: "1px solid black",
          minHeight: "150px",
          padding: "10px"
        }}
        contentEditable
        onInput={() => setText(editorRef.current.innerHTML)}
      />
    </div>
  );
}

export default TextEditor;
