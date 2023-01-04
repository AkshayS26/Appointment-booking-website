import React, { useState } from "react";

export default function TextForm(props) {
  const handleUPClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
  };
  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
  };
  const clearText = () => {
    let newText = "";
    setText(newText);
  };
  const handleonChange = (event) => {
    setText(event.target.value);
  };
  const handleonCopy = () => {
    var text = document.getElementById("MyBox");
    text.select();
    navigator.clipboard.writeText(text.value);
  };

  const [text, setText] = useState("Enter Text here");
  return (
    <>
      <div className="container">
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            id="MyBox"
            rows={6}
            onChange={handleonChange}
          ></textarea>
        </div>
        <button className="btn btn-primary mx-1" onClick={handleUPClick}>
          Convert to Uppercase
        </button>
        <button className="btn btn-primary mx-1" onClick={handleLoClick}>
          Convert to Lowercase
        </button>
        <button className="btn btn-primary mx-1" onClick={clearText}>
          Clear Text
        </button>
        <button className="btn btn-primary mx-1" onClick={handleonCopy}>
          Copy Text
        </button>
      </div>
      <div className="container my-3">
        <h3>Your Text Summary</h3>
        <p>
          {text.split(" ").length - 1} words and {text.length}characters{" "}
        </p>
      </div>
    </>
  );
}
