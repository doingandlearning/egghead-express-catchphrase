import React from "react";
import { client } from "../lib/client";
export default function index() {
  const [imgSrc, setImgSrc] = React.useState("");
  const [guess, setGuess] = React.useState("");
  const [result, setResult] = React.useState({ msg: "", success: "" });

  const fetchNewImage = async () => {
    const path = await client("images").then((data) => data.src);
    setImgSrc(path);
    setGuess("");
    setResult("");
  };

  const submitGuess = async () => {
    const response = await client("guess", {
      body: { guess: guess, img: imgSrc },
    }).then((data) => data);
    setResult(response);
    setGuess("");
  };
  React.useEffect(() => {
    fetchNewImage();
  }, []);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Welcome to Catchphrase</h1>
      <button onClick={fetchNewImage}>Get new image</button>
      <div style={{ margin: 12 }}>
        <img src={imgSrc} height="400" width="400" />
      </div>
      <div>
        <h2>Enter your Guess</h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyDown={(e) => {
              if (e.keyCode === 13) submitGuess();
            }}
          />
          <button onClick={submitGuess}>Submit Guess</button>
          <div>
            {result.success && (
              <div style={{ textAlign: "center" }}>{result.msg}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
