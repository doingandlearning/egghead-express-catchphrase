import React from "react";

export default function index() {
  const [imgSrc, setImgSrc] = React.useState("");
  const [guess, setGuess] = React.useState("");

  const fetchNewImage = () => {
    setImgSrc("http://www.fillmurray.com/400/400");
  };

  const submitGuess = () => {
    setGuess("");
    console.log(guess);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Welcome to Covid Catchphrase</h1>
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
          />
          <button onClick={submitGuess}>Submit Guess</button>
        </div>
      </div>
    </div>
  );
}
