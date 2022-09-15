import React from "react";
import "./FileShow.css";

const FileShow = ({ fileData }) => {
  let data = fileData?.data;
  // let arr = [];
  // console.log(data);
  // var yourString = "The quick brown fox jumps over the lazy dog"; //replace with your string.
  // var maxLength = 130; // maximum number of characters to extract
  // var startingPoint = 0;
  // let loopCount = Math.ceil(data.length / maxLength);
  // while (maxLength < data?.length) {
  //   var trimmedString = data.substr(startingPoint, maxLength);

  //   //re-trim if we are in the middle of a word
  //   trimmedString = trimmedString.substr(
  //     0,
  //     Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
  //   );
  //   arr.push(trimmedString);
  //   startingPoint = maxLength;
  //   maxLength = maxLength + 130;
  // }
  // console.log(loopCount, arr, "hilo");
  //trim the string to the maximum length

  let d2 = data?.replace(/(?:\r\n|\r|\n)/g, "<br/>");
  let mainData = d2?.split("<br/>");
  // let contain = /\r|\n/.exec(fileData.data);
  // var eachLine = data.split("\n");
  // (contain);
  // for (var i = 0, l = eachLine.length; i < l; i++) {
  //   console.log("Line " + (i + 1) + ": " + eachLine[i]);
  // }
  // console.log(data);
  return (
    <>
      <h1 className="file-heading">PDF Content</h1>
      <div className="file-content--container">
        {mainData?.map((ele) => {
          if (!ele) return null;
          return <span className="file-content--para">{ele}</span>;
        })}
      </div>
    </>
  );
};

export default FileShow;
