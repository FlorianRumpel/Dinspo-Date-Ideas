import data from "../data.json";
import Colors from "../constants/Colors";

import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

import * as FileSystem from "expo-file-system";
import {Alert} from "react-native";
import {Asset} from "expo-asset";
import {manipulateAsync} from "expo-image-manipulator";
import pdfThemes from "../constants/pdfThemes";
import {useSnapshot} from "valtio";
import {selected} from "../globalState";

const imageUriToBase64 = async (uri: string) => {
  try {
    const asset = Asset.fromModule(uri);
    const image = await manipulateAsync(asset.localUri ?? asset.uri, [], {
      base64: true,
    });
    const imageFileTyp = uri.split(".").pop();

    return [image, imageFileTyp];
  } catch (error: any) {
    Alert.alert(error);
    return ["", ""];
  }
};

const generateHtml = async (
  image: any,
  imageFileTyp: any,
  ideaName: number,
  text: string,
  lang: number,
  themeNumber: number,
): Promise<string> => {
  const dataIdea = data[lang].dateIdeasTexts[ideaName - 1];

  const heading = dataIdea.heading;
  const dateIdea = dataIdea.text;
  const experienceText = data[lang].sharePage.pdfExperienceText;

  let logo;
  try {
    const asset = Asset.fromModule(require("../assets/images/icon.png"));
    logo = await manipulateAsync(asset.localUri ?? asset.uri, [], {
      base64: true,
    });
  } catch (error) {
    console.warn(error);
  }

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dinspo</title>
  </head>
  <body>
    <style>
      @font-face {
        font-family: "Quicksand";
        src: url("../assets/fonts/Quicksand-Regular.ttf");
      }

      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }
      * {
        margin: 0;
        padding: 0;
        font: inherit;
      }
      img,
      video,
      svg,
      picture {
        display: block;
        max-width: 100%;
      }
      body {
        font-family: "Quicksand", sans-serif;
        height:100vh;
        background-color:${
          themeNumber === 1 || themeNumber === 2 ? "#5bd3bd" : "white"
        } ;
      }

        header {
        display: flex;
        justify-content: space-around;
    
        background-color:${
          themeNumber === 3 || themeNumber === 4 ? "#5bd3bd" : "transparent"
        };
      }
      h1 {
        text-align: center;
        margin-left: auto;
        font-size: 2.3rem;
        color: white;
        text-decoration: underline;
        text-underline-offset: 1rem;
        text-decoration-thickness: 2px;
      }
      .icon {
        aspect-ratio: 1;
        width: 5rem;
        margin-left: auto;
      }
      .texts {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 3rem;
        gap:2rem;
       
      }
      .date-idea-text,
      .experience-text {
        width: 45ch;
        text-align: center;
        z-index: "10"
        line-height: 1.5;
        color: ${themeNumber === 3 || themeNumber === 4 ? "black" : "white"};
        border-radius: 1rem;
        background-color:${
          themeNumber === 1 || themeNumber === 2
            ? "color-mix(in oklab, #5bd3bd, black 10%)"
            : "transparent"
        } ;
      }

      .texts p {
        padding: 1rem;
      }

      h2 {
        font-size: 1.5rem;
        letter-spacing: 3px;
      }

      .image-container {
      z-index: 10;
        ${
          themeNumber === 1 || themeNumber === 2
            ? " border: 1px solid black;"
            : ""
        }
       
        padding: 1rem;
        border-radius: 1.5rem;
       background-color:${
         themeNumber === 1 || themeNumber === 2
           ? "color-mix(in oklab, #5bd3bd, black 10%)"
           : "transparent"
       } ;
      }
      .image-container > img {
        border-radius: 0.5rem;
       
      }
      /* svgs */
     ${pdfThemes.svgsStyle}
    </style>

    <div class="wrapper">
       <header>
        <img class="icon" src="data:image/png;base64,${
          logo && logo.base64
        }" alt="a logo" />
      </header>
      <div class="texts">
        <div class="date-idea-text">
        <h2>${heading}</h2>
          <p>
           ${dateIdea}
          </p>
        </div>
<div class="image-container">
         <img src="data:image/${imageFileTyp};base64,${
    image.base64
  }" alt="an image" style="height: 300px; width: 400px" />
      </div>
        <div class="experience-text">
          <h2>${experienceText}</h2>
          <p>
           ${text}
          </p>
        </div>
      </div>

      <div class="svgs">
       ${themeNumber === 1 || themeNumber === 4 ? pdfThemes.svgs : ""}
      </div>
    </div>
  </body>
</html>
`;
};

const generatePdf = async (html: string, ideaName: number, lang: number) => {
  const response = await Print.printToFileAsync({
    html: html,
    height: 842,
    width: 595,
  });

  const name = data[lang].dateIdeasTexts[ideaName - 1].heading.replace(" ", "");

  const pdfName = `${response.uri.slice(
    0,
    response.uri.lastIndexOf("/") + 1,
  )}Dinspo_${name}.pdf`;

  await FileSystem.moveAsync({
    from: response.uri,
    to: pdfName,
  });
  sharePdf(pdfName);
};
const sharePdf = (url: any) => {
  Sharing.shareAsync(url);
};

export {generateHtml, generatePdf, sharePdf, imageUriToBase64};
