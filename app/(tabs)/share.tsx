import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

import React, {useState} from "react";
import {useSnapshot} from "valtio";
import {selected} from "../globalState";
import data from "../data.json";
import Colors from "../constants/Colors";

import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

import {Asset} from "expo-asset";
import {manipulateAsync} from "expo-image-manipulator";
import SelectListComponent from "../components/sharePage/SelectListComponent";
import TextInputComonent from "../components/sharePage/TextInputComonent";
import GeneratePdfButton from "../components/sharePage/GeneratePdfButton";

const SharePage = () => {
  const [selectedOption, setSelectedOption] = useState<number>();
  const [text, setText] = useState("");
  const [imageUri, setImage] = useState<null | string>(null);
  const [showLoadingIcon, setShowLoadingIcon] = useState(false);

  const checkArr: boolean[] = [!selectedOption, !text, !imageUri];
  const disabled = checkArr.every((item) => item === false);
  const snap: any = useSnapshot(selected);
  const sharePageTexts = data[snap.lang].sharePage;

  async function generateHtml() {
    if (!imageUri || !selectedOption) return;

    const asset = Asset.fromModule(imageUri);
    const image = await manipulateAsync(asset.localUri ?? asset.uri, [], {
      base64: true,
    });

    const imageFileTyp = imageUri.split(".").pop();

    const dataIdea = data[snap.lang].dateIdeasTexts[selectedOption - 1];

    const heading = dataIdea.heading;
    const dateIdea = dataIdea.text;
    const experienceText = data[snap.lang].sharePage.pdfExperienceText;

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
        
     background-color: ${Colors.mint};
      }

      h1 {
        text-align: center;
        margin-top: 1rem;
        font-size: 2.3rem;
        color: white;
        text-decoration: underline;
        text-underline-offset: 1rem;
        text-decoration-thickness: 2px;
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
        
        line-height: 1.5;
        color: white;
        border-radius: 1rem;
        background-color: color-mix(in oklab, ${Colors.mint}, black 10%);
      }

      .texts p {
        padding: 1rem;
      }

      h2 {
        font-size: 1.5rem;
        letter-spacing: 3px;
      }

      .image-container {
        border: 1px solid black;
        padding: 1rem;
        border-radius: 1.5rem;
        background-color: color-mix(in oklab,  ${Colors.mint}, black 10%);
      }
      .image-container > img {
        border-radius: 0.5rem;
       
      }
      /* svgs */
      .svgs svg {
        height: 4.5rem;
        position: absolute;
        z-index: -1;
      }

      svg:nth-child(1) {
        top: 50px;
        left: 600px;
        transform: rotate(-45deg);
      }
      svg:nth-child(2) {
        top: 200px;
        left: 175px;
        transform: rotate(30deg);
      }
      svg:nth-child(3) {
        top: 350px;
        left: 50px;
        transform: rotate(60deg);
      }
      svg:nth-child(4) {
        top: 700px;
        left: 50px;
        transform: rotate(15deg);
      }
      svg:nth-child(5) {
        top: 500px;
        left: 150px;
        transform: rotate(-30deg);
      }
      svg:nth-child(6) {
        top: 400px;
        left: 550px;
        transform: rotate(-60deg);
      }
      svg:nth-child(7) {
        top: 100px;
        left: 50px;
        transform: rotate(45deg);
      }
      svg:nth-child(8) {
        top: 550px;
        left: 350px;
        transform: rotate(-15deg);
      }
      svg:nth-child(9) {
        top: 650px;
        left: 600px;
        transform: rotate(0deg);
      }
      svg:nth-child(10) {
        top: 350px;
        left: 300px;
        transform: rotate(15deg);
      }
      svg:nth-child(11) {
        top: 200px;
        left: 450px;
        transform: rotate(30deg);
      }
      svg:nth-child(12) {
        top: 50px;
        left: 300px;
        transform: rotate(-45deg);
      }
      svg:nth-child(13) {
        top: 700px;
        left: 300px;
        transform: rotate(-20deg);
      }
      svg:nth-child(14) {
        top: 225px;
        left: 700px;
        transform: rotate(-20deg);
      }
      svg:nth-child(15) {
        top: 950px;
        left: 150px;
        transform: rotate(-15deg);
      }
      svg:nth-child(16) {
        top: 850px;
        left: 400px;
        transform: rotate(30deg);
      }
      svg:nth-child(17) {
        top: 875px;
        left: 600px;
        transform: rotate(-30deg);
      }
    </style>

    <div class="wrapper">
      <h1>Dinspo: Date Ideas</h1>
      <div class="texts">
        <div class="date-idea-text">
        <h2>${heading}</h2>
          <p>
           ${dateIdea}
          </p>
        </div>
<div class="image-container">
         <img src="data:image/${imageFileTyp};base64,${image.base64}" alt="an image" style="height: 300px; width: 400px" />
      </div>
        <div class="experience-text">
          <h2>${experienceText}</h2>
          <p>
           ${text}
          </p>
        </div>
      </div>

      

      <div class="svgs">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 47.5 47.5"
          id="heart"
        >
          <defs>
            <clipPath id="a"><path d="M0 38h38V0H0v38Z"></path></clipPath>
          </defs>
          <g clip-path="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
            <path
              fill="pink"
              d="M36.885 25.166c0 5.45-4.418 9.868-9.867 9.868-3.308 0-6.227-1.633-8.018-4.129-1.79 2.496-4.71 4.129-8.017 4.129-5.45 0-9.868-4.418-9.868-9.868 0-.772.098-1.52.266-2.241C2.752 14.413 12.216 5.431 19 2.965c6.783 2.466 16.249 11.448 17.617 19.96.17.721.268 1.469.268 2.241"
            ></path>
          </g>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 47.5 47.5"
          id="heart"
        >
          <defs>
            <clipPath id="a"><path d="M0 38h38V0H0v38Z"></path></clipPath>
          </defs>
          <g clip-path="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
            <path
              fill="pink"
              d="M36.885 25.166c0 5.45-4.418 9.868-9.867 9.868-3.308 0-6.227-1.633-8.018-4.129-1.79 2.496-4.71 4.129-8.017 4.129-5.45 0-9.868-4.418-9.868-9.868 0-.772.098-1.52.266-2.241C2.752 14.413 12.216 5.431 19 2.965c6.783 2.466 16.249 11.448 17.617 19.96.17.721.268 1.469.268 2.241"
            ></path>
          </g>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 47.5 47.5"
          id="heart"
        >
          <defs>
            <clipPath id="a"><path d="M0 38h38V0H0v38Z"></path></clipPath>
          </defs>
          <g clip-path="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
            <path
              fill="pink"
              d="M36.885 25.166c0 5.45-4.418 9.868-9.867 9.868-3.308 0-6.227-1.633-8.018-4.129-1.79 2.496-4.71 4.129-8.017 4.129-5.45 0-9.868-4.418-9.868-9.868 0-.772.098-1.52.266-2.241C2.752 14.413 12.216 5.431 19 2.965c6.783 2.466 16.249 11.448 17.617 19.96.17.721.268 1.469.268 2.241"
            ></path>
          </g></svg
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 47.5 47.5"
          id="heart"
        >
          <defs>
            <clipPath id="a"><path d="M0 38h38V0H0v38Z"></path></clipPath>
          </defs>
          <g clip-path="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
            <path
              fill="pink"
              d="M36.885 25.166c0 5.45-4.418 9.868-9.867 9.868-3.308 0-6.227-1.633-8.018-4.129-1.79 2.496-4.71 4.129-8.017 4.129-5.45 0-9.868-4.418-9.868-9.868 0-.772.098-1.52.266-2.241C2.752 14.413 12.216 5.431 19 2.965c6.783 2.466 16.249 11.448 17.617 19.96.17.721.268 1.469.268 2.241"
            ></path>
          </g></svg
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 47.5 47.5"
          id="heart"
        >
          <defs>
            <clipPath id="a"><path d="M0 38h38V0H0v38Z"></path></clipPath>
          </defs>
          <g clip-path="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
            <path
              fill="pink"
              d="M36.885 25.166c0 5.45-4.418 9.868-9.867 9.868-3.308 0-6.227-1.633-8.018-4.129-1.79 2.496-4.71 4.129-8.017 4.129-5.45 0-9.868-4.418-9.868-9.868 0-.772.098-1.52.266-2.241C2.752 14.413 12.216 5.431 19 2.965c6.783 2.466 16.249 11.448 17.617 19.96.17.721.268 1.469.268 2.241"
            ></path>
          </g></svg
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 47.5 47.5"
          id="heart"
        >
          <defs>
            <clipPath id="a"><path d="M0 38h38V0H0v38Z"></path></clipPath>
          </defs>
          <g clip-path="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
            <path
              fill="pink"
              d="M36.885 25.166c0 5.45-4.418 9.868-9.867 9.868-3.308 0-6.227-1.633-8.018-4.129-1.79 2.496-4.71 4.129-8.017 4.129-5.45 0-9.868-4.418-9.868-9.868 0-.772.098-1.52.266-2.241C2.752 14.413 12.216 5.431 19 2.965c6.783 2.466 16.249 11.448 17.617 19.96.17.721.268 1.469.268 2.241"
            ></path>
          </g></svg
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 47.5 47.5"
          id="heart"
        >
          <defs>
            <clipPath id="a"><path d="M0 38h38V0H0v38Z"></path></clipPath>
          </defs>
          <g clip-path="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
            <path
              fill="pink"
              d="M36.885 25.166c0 5.45-4.418 9.868-9.867 9.868-3.308 0-6.227-1.633-8.018-4.129-1.79 2.496-4.71 4.129-8.017 4.129-5.45 0-9.868-4.418-9.868-9.868 0-.772.098-1.52.266-2.241C2.752 14.413 12.216 5.431 19 2.965c6.783 2.466 16.249 11.448 17.617 19.96.17.721.268 1.469.268 2.241"
            ></path>
          </g></svg
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 47.5 47.5"
          id="heart"
        >
          <defs>
            <clipPath id="a"><path d="M0 38h38V0H0v38Z"></path></clipPath>
          </defs>
          <g clip-path="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
            <path
              fill="pink"
              d="M36.885 25.166c0 5.45-4.418 9.868-9.867 9.868-3.308 0-6.227-1.633-8.018-4.129-1.79 2.496-4.71 4.129-8.017 4.129-5.45 0-9.868-4.418-9.868-9.868 0-.772.098-1.52.266-2.241C2.752 14.413 12.216 5.431 19 2.965c6.783 2.466 16.249 11.448 17.617 19.96.17.721.268 1.469.268 2.241"
            ></path>
          </g></svg
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 47.5 47.5"
          id="heart"
        >
          <defs>
            <clipPath id="a"><path d="M0 38h38V0H0v38Z"></path></clipPath>
          </defs>
          <g clip-path="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
            <path
              fill="pink"
              d="M36.885 25.166c0 5.45-4.418 9.868-9.867 9.868-3.308 0-6.227-1.633-8.018-4.129-1.79 2.496-4.71 4.129-8.017 4.129-5.45 0-9.868-4.418-9.868-9.868 0-.772.098-1.52.266-2.241C2.752 14.413 12.216 5.431 19 2.965c6.783 2.466 16.249 11.448 17.617 19.96.17.721.268 1.469.268 2.241"
            ></path>
          </g></svg
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 47.5 47.5"
          id="heart"
        >
          <defs>
            <clipPath id="a"><path d="M0 38h38V0H0v38Z"></path></clipPath>
          </defs>
          <g clip-path="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
            <path
              fill="pink"
              d="M36.885 25.166c0 5.45-4.418 9.868-9.867 9.868-3.308 0-6.227-1.633-8.018-4.129-1.79 2.496-4.71 4.129-8.017 4.129-5.45 0-9.868-4.418-9.868-9.868 0-.772.098-1.52.266-2.241C2.752 14.413 12.216 5.431 19 2.965c6.783 2.466 16.249 11.448 17.617 19.96.17.721.268 1.469.268 2.241"
            ></path>
          </g>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 47.5 47.5"
          id="heart"
        >
          <defs>
            <clipPath id="a"><path d="M0 38h38V0H0v38Z"></path></clipPath>
          </defs>
          <g clip-path="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
            <path
              fill="pink"
              d="M36.885 25.166c0 5.45-4.418 9.868-9.867 9.868-3.308 0-6.227-1.633-8.018-4.129-1.79 2.496-4.71 4.129-8.017 4.129-5.45 0-9.868-4.418-9.868-9.868 0-.772.098-1.52.266-2.241C2.752 14.413 12.216 5.431 19 2.965c6.783 2.466 16.249 11.448 17.617 19.96.17.721.268 1.469.268 2.241"
            ></path>
          </g>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 47.5 47.5"
          id="heart"
        >
          <defs>
            <clipPath id="a"><path d="M0 38h38V0H0v38Z"></path></clipPath>
          </defs>
          <g clip-path="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
            <path
              fill="pink"
              d="M36.885 25.166c0 5.45-4.418 9.868-9.867 9.868-3.308 0-6.227-1.633-8.018-4.129-1.79 2.496-4.71 4.129-8.017 4.129-5.45 0-9.868-4.418-9.868-9.868 0-.772.098-1.52.266-2.241C2.752 14.413 12.216 5.431 19 2.965c6.783 2.466 16.249 11.448 17.617 19.96.17.721.268 1.469.268 2.241"
            ></path>
          </g>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 47.5 47.5"
          id="heart"
        >
          <defs>
            <clipPath id="a"><path d="M0 38h38V0H0v38Z"></path></clipPath>
          </defs>
          <g clip-path="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
            <path
              fill="pink"
              d="M36.885 25.166c0 5.45-4.418 9.868-9.867 9.868-3.308 0-6.227-1.633-8.018-4.129-1.79 2.496-4.71 4.129-8.017 4.129-5.45 0-9.868-4.418-9.868-9.868 0-.772.098-1.52.266-2.241C2.752 14.413 12.216 5.431 19 2.965c6.783 2.466 16.249 11.448 17.617 19.96.17.721.268 1.469.268 2.241"
            ></path>
          </g></svg
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 47.5 47.5"
          id="heart"
        >
          <defs>
            <clipPath id="a"><path d="M0 38h38V0H0v38Z"></path></clipPath>
          </defs>
          <g clip-path="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
            <path
              fill="pink"
              d="M36.885 25.166c0 5.45-4.418 9.868-9.867 9.868-3.308 0-6.227-1.633-8.018-4.129-1.79 2.496-4.71 4.129-8.017 4.129-5.45 0-9.868-4.418-9.868-9.868 0-.772.098-1.52.266-2.241C2.752 14.413 12.216 5.431 19 2.965c6.783 2.466 16.249 11.448 17.617 19.96.17.721.268 1.469.268 2.241"
            ></path>
          </g>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 47.5 47.5"
          id="heart"
        >
          <defs>
            <clipPath id="a"><path d="M0 38h38V0H0v38Z"></path></clipPath>
          </defs>
          <g clip-path="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
            <path
              fill="pink"
              d="M36.885 25.166c0 5.45-4.418 9.868-9.867 9.868-3.308 0-6.227-1.633-8.018-4.129-1.79 2.496-4.71 4.129-8.017 4.129-5.45 0-9.868-4.418-9.868-9.868 0-.772.098-1.52.266-2.241C2.752 14.413 12.216 5.431 19 2.965c6.783 2.466 16.249 11.448 17.617 19.96.17.721.268 1.469.268 2.241"
            ></path>
          </g></svg
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 47.5 47.5"
          id="heart"
        >
          <defs>
            <clipPath id="a"><path d="M0 38h38V0H0v38Z"></path></clipPath>
          </defs>
          <g clip-path="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
            <path
              fill="pink"
              d="M36.885 25.166c0 5.45-4.418 9.868-9.867 9.868-3.308 0-6.227-1.633-8.018-4.129-1.79 2.496-4.71 4.129-8.017 4.129-5.45 0-9.868-4.418-9.868-9.868 0-.772.098-1.52.266-2.241C2.752 14.413 12.216 5.431 19 2.965c6.783 2.466 16.249 11.448 17.617 19.96.17.721.268 1.469.268 2.241"
            ></path>
          </g>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 47.5 47.5"
          id="heart"
        >
          <defs>
            <clipPath id="a"><path d="M0 38h38V0H0v38Z"></path></clipPath>
          </defs>
          <g clip-path="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
            <path
              fill="pink"
              d="M36.885 25.166c0 5.45-4.418 9.868-9.867 9.868-3.308 0-6.227-1.633-8.018-4.129-1.79 2.496-4.71 4.129-8.017 4.129-5.45 0-9.868-4.418-9.868-9.868 0-.772.098-1.52.266-2.241C2.752 14.413 12.216 5.431 19 2.965c6.783 2.466 16.249 11.448 17.617 19.96.17.721.268 1.469.268 2.241"
            ></path>
          </g>
        </svg>
      </div>
    </div>
  </body>
</html>
`;
  }

  const generatePdf = async () => {
    if (!selectedOption) return;
    const response = await Print.printToFileAsync({
      html: await generateHtml(),
    });

    const name = data[snap.lang].dateIdeasTexts[
      selectedOption - 1
    ].heading.replace(" ", "");

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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{paddingBottom: 20, alignItems: "center"}}>
        <View style={{marginTop: 20}}>
          <Text style={styles.headingText}>
            {sharePageTexts.dropdownHeaderText}
          </Text>

          <SelectListComponent setSelectedVal={setSelectedOption} />
        </View>

        <TextInputComonent text={text} setText={setText} />

        <TouchableOpacity onPress={pickImage} style={styles.button}>
          <Text style={styles.buttonText}>{sharePageTexts.imageButton}</Text>
        </TouchableOpacity>

        {imageUri && <Image source={{uri: imageUri}} style={styles.image} />}

        <GeneratePdfButton
          onPress={async () => {
            setShowLoadingIcon(true);
            await generatePdf();
            setShowLoadingIcon(false);
            setText("");
            setTimeout(() => {
              setImage(null);
            }, 1000);
          }}
          disabled={!disabled}
        />

        {showLoadingIcon && (
          <ActivityIndicator
            style={styles.loading}
            size={70}
            color={"blue"}
            animating={true}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default SharePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headingText: {
    textAlign: "center",
    fontFamily: "Quick-Sand",
    fontSize: 23,
    paddingVertical: 5,
  },

  button: {
    padding: 10,
    backgroundColor: "#586BC1",
    marginTop: 20,
    borderRadius: 7,
    borderWidth: 1,
  },
  buttonText: {
    fontFamily: "Quick-Sand-Medium",
    fontSize: 17,
    color: "white",
  },
  image: {
    marginTop: 10,
    width: 250,
    aspectRatio: "4/3",
    borderRadius: 10,
  },
  loading: {
    position: "absolute",
    left: "50%",
    top: "40%",
    transform: [{translateX: -35}],
  },
});
