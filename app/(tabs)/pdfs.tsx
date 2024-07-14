import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  Image,
  FlatList,
} from "react-native";
import React, {useState} from "react";

import {useSnapshot} from "valtio";
import {selected, updateGlobalStateData} from "../globalState";
import Colors from "../constants/Colors";
import data from "../data.json";
import {
  generateHtml,
  generatePdf,
  imageUriToBase64,
} from "../constants/functions";

const PdfsPage = () => {
  const snap: any = useSnapshot(selected);
  const [showLoadingIcon, setShowLoadingIcon] = useState(false);
  const pdfsPageTexts = data[snap.lang].pdfsPage;

  async function handlePress(id: number) {
    setShowLoadingIcon(true);
    const currentPdf = snap.pdfs.filter((pdf: any) => pdf.id === id)[0];

    const imageData = await imageUriToBase64(currentPdf.imagePath);

    const html = await generateHtml(
      imageData[0],
      imageData[1],
      currentPdf.dateIdea,
      currentPdf.text,
      currentPdf.language,
      currentPdf.theme,
    );

    await generatePdf(html, currentPdf.dateIdea, currentPdf.language);
    setShowLoadingIcon(false);
  }
  function deletItem(id: string) {
    selected.pdfs = selected.pdfs.filter((pdf) => pdf.id !== id);
    updateGlobalStateData(selected);
  }

  const item = (item: any) => {
    const pdf = item.item;
    return (
      <ImageBackground
        source={require("../assets/images/backgroundPdf.png")}
        style={styles.item}
      >
        <TouchableOpacity
          onPress={() => handlePress(pdf.id)}
          style={styles.itemContent}
        >
          <Text style={styles.pdfTitle}>
            {data[pdf.language].dateIdeasTexts[pdf.dateIdea - 1].heading}
          </Text>
          <Image source={{uri: pdf.imagePath}} style={styles.image} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => deletItem(pdf.id)}
          style={styles.deletButton}
        >
          <Text style={styles.deleteText}>{pdfsPageTexts?.deleteText}</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{pdfsPageTexts.titleText}</Text>

      <View style={styles.itemContainer}>
        <FlatList
          data={snap.pdfs}
          renderItem={item}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
      </View>

      {showLoadingIcon && (
        <ActivityIndicator
          style={styles.loading}
          size={70}
          color={"blue"}
          animating={true}
        />
      )}
    </View>
  );
};

export default PdfsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  title: {
    fontFamily: "Quick-Sand-Regular",
    fontSize: 22,
    marginTop: 10,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  itemContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },
  item: {
    margin: 10,
    height: 220,
    aspectRatio: "5/7",
  },
  itemContent: {
    alignItems: "center",
    flex: 1,
  },
  image: {
    height: 60,
    aspectRatio: "4/3",
    borderRadius: 10,
    marginTop: "auto",
    marginBottom: 40,
  },
  pdfTitle: {
    fontFamily: "Quick-Sand-Regular",
    fontSize: 20,
    textAlign: "center",
    color: Colors.white,
  },
  deletButton: {
    marginTop: "auto",
    marginBottom: 10,
  },
  deleteText: {
    fontFamily: "Quick-Sand",
    fontSize: 20,
    textAlign: "center",
    color: "red",
  },
  loading: {
    position: "absolute",
    left: "50%",
    top: "40%",
    transform: [{translateX: -35}],
  },
});
