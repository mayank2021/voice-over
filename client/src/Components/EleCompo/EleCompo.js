import React, { useEffect } from "react";
import "./EleCompo.css";

const EleCompo = ({ elements, textTitle }) => {
  console.log(elements, "hello");
  const checkImgSrc = (ele, node) => {
    if (ele.imgSrc.includes("static")) {
      node.src = "https://cdn-icons-png.flaticon.com/512/2659/2659360.png";
      node.style.width = "100px";
    } else {
      node.src = ele.imgSrc;
      node.style.width = "700px";
    }
  };
  useEffect(() => {
    elements.forEach((ele) => {
      let tag = ele?.tag?.toLowerCase();
      const node = document.createElement(tag);
      const textnode = document.createTextNode(ele?.text);
      node.appendChild(textnode);
      if (
        ele.tag === "H1" ||
        ele.tag === "H2" ||
        ele.tag === "H3" ||
        ele.tag === "H4" ||
        ele.tag === "H5" ||
        ele.tag === "H6"
      ) {
        node.style.cssText =
          " color:  rgb(13, 25, 64);margin: 10px 0;border: 2px solid transparent;";
      } else {
        node.style.cssText =
          "font-size: 1.2rem;font-weight: 400;color: rgba(0,0,0,0.6);text-align: justify;margin: 5px;border: 2px solid transparent;";
      }
      node.style.background = "transparent";
      if (ele.tag === "IMG") {
        node.style.margin = "10px 0";
        if (ele.imgAlt && ele.imgSrc) {
          checkImgSrc(ele, node);
          node.alt = ele.imgAlt;
        } else if (ele.imgAlt && !ele.imgSrc) {
          node.src = "https://cdn-icons-png.flaticon.com/512/2659/2659360.png";
          node.style.width = "100px";
          node.alt = ele.imgAlt;
        } else if (!ele.imgAlt && ele.imgSrc) {
          checkImgSrc(ele, node);
          node.alt = "no information provided";
        }
      }

      if (ele.tag === "A") {
        node.href = ele.href;
        node.target = "_blank";

        node.style.cssText =
          "margin:10px; color: #fff ;background-color: rgb(13, 25, 64) ;padding: 10px 15px;text-decoration: none;   border-radius: 4px;";
      }

      document.getElementById("show-items").appendChild(node);
    });
  }, []);

  return (
    <div className="ele-container" id="show-items">
      <h1 className="blog-title">{textTitle}</h1>
    </div>
  );
};

export default EleCompo;
