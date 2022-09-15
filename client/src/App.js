import React, { useState, useEffect, useRef } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import "./App.css";
import axios from "axios";
import Nav from "./Components/Nav/Nav";
import FormCompo from "./Components/FormCompo/FormCompo";
import EleCompo from "./Components/EleCompo/EleCompo";
import FileShow from "./Components/FileShow/FileShow";
// import Timer from "./Components/Timer/Timer";

const App = () => {
  const [url, setUrl] = useState("");
  const [sent, setSent] = useState("");
  const [loading, setLoading] = useState(false);
  const [elements, setElements] = useState([]);
  const [fileData, setFileData] = useState("");
  const [textTitle, setTextTitle] = useState("");
  const [finalFileData, setFinalFileData] = useState([]);
  // const [showTimer, setShowTimer] = useState(false);

  let domData = [];
  let eleText = [];

  var alanBtnInstance = useRef(null);

  const sendUrl = async (e) => {
    e.preventDefault();
    setSent("url");
    setLoading(true);
    await axios
      .post("http://localhost:4000/text", { url: url })
      .then(function (response) {
        let data1 = [];
        response.data.forEach((ele) => {
          if (
            ele.text.length &&
            ele.tag !== "NOSCRIPT" &&
            ele.tag !== "TITLE"
          ) {
            data1.push(ele);
          } else if (ele.tag === "IMG" && ele.imgAlt !== "logo") {
            console.log(ele.imgAlt, "hello");
            data1.push(ele);
          } else if (ele.tag === "TITLE") {
            setTextTitle(ele.text);
          }
        });
        setElements(data1);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    setSent("file");
    setLoading(true);
    const file = document.getElementById("file-input").files[0];

    const formData = new FormData();

    formData.append("file", file);

    await axios
      .post("http://localhost:4000/extract", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setFileData(response);
        setLoading(false);
        let finalData = [];
        let d2 = response.data?.replace(/(?:\r\n|\r|\n)/g, "<br/>");
        let mainData = d2?.split("<br/>");
        mainData?.map((el) => {
          if (el.length > 0) {
            finalData.push(el);
          }
        });
        finalData.unshift("PDF content");
        setFinalFileData(finalData);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };

  // const visibilityChanged = () => {
  //   console.log(document.hidden);
  // };

  useEffect(() => {
    if (sent && !loading) {
      var allElems = document
        .getElementById("text-container")
        .querySelectorAll("*");

      allElems?.forEach((ele) => {
        if (ele.childElementCount === 0) {
          domData.push(ele);
          if (ele.tagName === "IMG") {
            eleText.push({
              text: ele.alt,
              tag: ele.tagName,
            });
          } else {
            eleText.push({
              text: ele.innerText,
              tag: ele.tagName,
            });
          }
        }
      });
      // width: ele.clientWidth,
      // height: ele.clientHeight,
      // document.addEventListener("visibilitychange", visibilityChanged);
    }

    // if (sent && !loading) {
    //   alanBtnInstance.activate();
    //   alanBtnInstance.callProjectApi(
    //     "greetUser",
    //     {
    //       user: "John Smith",
    //     },
    //     function (error, result) {}
    //   );
    // }
    // (() => {

    // })();
  }, [loading]);

  //tag === a
  // first a? say follow the link to follow the link+ 5 second wait : 5 second wait
  // within 5 second -- follow the link? navigate to the link: after five second
  // continue voice over
  // let anchorFirst = true;

  // const handleAnchor = (ele, firstanchor1) => {
  //   alanBtnInstance.playText(`link-${ele.innerText}. ${firstanchor1}`);
  //   anchorFirst = false;
  // };

  // const handleAlanSpeak = (ele, anchor) => {
  //   const firstanchor1 = anchorFirst
  //     ? "If you want to follow the link. Say, click the link"
  //     : "";
  //   if (anchor) {
  //     // handleAnchor(ele, firstanchor1);
  //     alanBtnInstance.playText(`link-${ele.innerText}. ${firstanchor1}`);
  //     anchorFirst = false;
  //   } else {
  //     alanBtnInstance.playText(ele.innerText);
  //   }
  //   // console.log(ele, ind, "hilo");
  // };

  let curInd = 0;
  let btnClicked = false;
  const alanKey =
    "d3521d651bcc558e3d36490151d1de9b2e956eca572e1d8b807a3e2338fdd0dc/stage";
  useEffect(() => {
    alanBtnInstance = alanBtn({
      key: `${sent && !loading ? alanKey : ""}`,
      onButtonState: function (e) {
        if (sent && !loading && e === "ONLINE") {
          alanBtnInstance?.setVisualState({ data: eleText });
          if (domData[curInd].tagName === "A") {
            domData[curInd].style.background = " rgb(13, 25, 64) ";
          } else {
            domData[curInd].style.background = "transparent";
          }
          domData[curInd].style.borderColor = "transparent";
        }
      },
      onCommand: ({ command, i }) => {
        if (command === "hightlight") {
          domData[i].style.borderColor = " rgb(13, 25, 64)";
          domData[i].style.background = "rgba(13, 25, 64,0.1)";
          if (i >= 1) {
            if (domData[i - 1].tagName === "A") {
              domData[i - 1].style.background = " rgb(13, 25, 64) ";
            } else {
              domData[i - 1].style.background = "transparent";
            }
            domData[i - 1].style.borderColor = "transparent";
          }
          domData[i].scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
          });
          curInd = i;
        }
        if (command === "doNotContinue") {
          btnClicked = false;
        }
        if (command === "clicked") {
          domData[i].click();
          curInd = i;
          btnClicked = true;
          alanBtnInstance.deactivate();
        }
      },
    });
    document.addEventListener("visibilitychange", (event) => {
      if (document.visibilityState === "visible" && btnClicked) {
        alanBtnInstance.activate();
        alanBtnInstance.callProjectApi(
          "greetUser",
          { value: "visible", ind: curInd },
          function (error, result) {}
        );
      }
    });
  }, [loading]);

  if (loading) {
    return (
      <div className="loading-container">
        <img
          src="https://media.giphy.com/media/grNkIEN4dkiMXFLIE9/giphy.gif"
          alt="loading"
        />
      </div>
    );
  }

  return (
    <div className="app-container">
      <Nav />
      <div id="text-container">
        {!sent ? (
          <FormCompo
            sendUrl={sendUrl}
            url={url}
            setUrl={setUrl}
            setSent={setSent}
            handleFileSubmit={handleFileSubmit}
          />
        ) : sent === "url" ? (
          <EleCompo elements={elements} textTitle={textTitle} />
        ) : (
          <FileShow fileData={fileData} />
        )}
      </div>
    </div>
  );
};

export default App;
