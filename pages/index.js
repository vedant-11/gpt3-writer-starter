import Head from "next/head";
import Image from "next/image";

import { useState } from "react";
import Navbar from "../component/Navbar";
import TextArea from "../component/textArea";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const finalOutput = () => {
    if (apiOutput.includes("jesus:")) {
      return apiOutput.split("jesus:")[1];
    }
  };

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });
    console.log(JSON.stringify({ userInput }));

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text);

    setApiOutput(`${output.text}`);
    // setIsGenerating(false);
  };

  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>Divine01</title>
      </Head>
      <nav>
        <Navbar />
      </nav>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Ask Jesus anything</h1>
          </div>
          <div className="header-subtitle">
            <h2>Ask any question to jesus you want to He will answer you</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea
            placeholder="Ask Jesus anything for example: How life is maintained on this earth?"
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          />
          <div className="prompt-buttons">
            <a
              className={
                isGenerating ? "generate-button loading" : "generate-button"
              }
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? (
                  <span className="loader"></span>
                ) : (
                  <p>Generate</p>
                )}
              </div>
            </a>
          </div>
          {/* New code I added here */}
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                  <hr className="h-2" />
                </div>
              </div>
              <div className="output-content">
                <p className="text-gray-900">{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
