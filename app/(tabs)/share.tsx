import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Image,
  Animated,
  Modal,
  Pressable,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import React, {useState} from "react";
import {useSnapshot} from "valtio";
import {selected, updateGlobalStateData} from "../globalState";
import data from "../data.json";
import Colors from "../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import SelectListComponent from "../components/sharePage/SelectListComponent";
import TextInputComonent from "../components/sharePage/TextInputComonent";
import GeneratePdfButton from "../components/sharePage/GeneratePdfButton";

import {
  generateHtml,
  generatePdf,
  imageUriToBase64,
} from "../constants/functions";
import CustomButton from "../components/CustomButton";
import * as Crypto from "expo-crypto";

import {Fontisto} from "@expo/vector-icons";

const SharePage = () => {
  const [selectedOption, setSelectedOption] = useState<number>();
  const [text, setText] = useState("");
  const [imageUri, setImage] = useState<null | string>(null);
  const [showLoadingIcon, setShowLoadingIcon] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showTextBox, setShowTextBox] = useState(false);
  const [textBoxOpacity] = useState(new Animated.Value(0.8));

  const disabled = !imageUri || !text || !selectedOption;

  const snap: any = useSnapshot(selected);
  const sharePageTexts = data[snap.lang].sharePage;

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
  async function saveToFavoritePdfs() {
    if (selected.pdfs.length >= 10) {
      textBoxOpacity.setValue(1);

      setShowTextBox(true);
      Animated.timing(textBoxOpacity, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: false,
      }).start(() => {
        textBoxOpacity.setValue(1);
        setShowTextBox(false);
      });
      return;
    }

    if (!selectedOption || !imageUri) return;

    const pdfObject = {
      id: Crypto.randomUUID(),
      dateIdea: selectedOption,
      imagePath: imageUri,
      language: snap.lang,
      text: text,
      theme: snap.theme,
    };

    selected.pdfs.push(pdfObject);

    updateGlobalStateData(selected);

    setText("");
    setImage(null);
  }

  async function handlePress() {
    if (!selectedOption || !imageUri) return;
    const imageData = await imageUriToBase64(imageUri);

    const html = await generateHtml(
      imageData[0],
      imageData[1],
      selectedOption,
      text,
      snap.lang,
      snap.theme,
    );
    setShowLoadingIcon(true);
    await generatePdf(html, selectedOption, snap.lang);
    setShowLoadingIcon(false);
    if (selected.pdfs.length >= 10) {
      setText("");
      setTimeout(() => {
        setImage(null);
      }, 1000);
    }
  }

  function selectPdfThemplate(name: number) {
    selected.theme = name;
    setShowModal(!showModal);
  }
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

        <View>
          <Modal
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
              setShowModal(!showModal);
            }}
            animationType="slide"
          >
            <View style={styles.centeredView}>
              <View style={styles.modal}>
                <ScrollView contentContainerStyle={styles.templateContainer}>
                  {/* theme 1 */}
                  <TouchableOpacity onPress={() => selectPdfThemplate(1)}>
                    <ImageBackground
                      style={styles.template}
                      source={require("../assets/images/backgroundPdf.png")}
                    >
                      <Image
                        style={{width: 20, height: 20, marginLeft: "auto"}}
                        source={require("../assets/images/icon-text.png")}
                      />

                      <View style={styles.templateItem}>
                        <Text style={styles.templateItemText}>Idea here</Text>
                      </View>
                      <View
                        style={[
                          styles.templateItem,
                          {height: 40, marginTop: 8},
                        ]}
                      >
                        <Text style={styles.templateItemText}>Image here</Text>
                      </View>
                      <View style={styles.templateItem}>
                        <Text style={styles.templateItemText}>
                          Your text here
                        </Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                  {/* theme 2 */}
                  <TouchableOpacity onPress={() => selectPdfThemplate(2)}>
                    <View style={styles.template}>
                      <Image
                        style={{width: 20, height: 20, marginLeft: "auto"}}
                        source={require("../assets/images/icon-text.png")}
                      />

                      <View style={styles.templateItem}>
                        <Text style={styles.templateItemText}>Idea here</Text>
                      </View>
                      <View
                        style={[
                          styles.templateItem,
                          {height: 40, marginTop: 8},
                        ]}
                      >
                        <Text style={styles.templateItemText}>Image here</Text>
                      </View>
                      <View style={styles.templateItem}>
                        <Text style={styles.templateItemText}>
                          Your text here
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {/* theme 3 */}
                  <TouchableOpacity onPress={() => selectPdfThemplate(3)}>
                    <View
                      style={[
                        styles.template,
                        {backgroundColor: "white", borderWidth: 1},
                      ]}
                    >
                      <View style={{padding: 2, backgroundColor: Colors.mint}}>
                        <Image
                          style={{width: 20, height: 20, marginLeft: "auto"}}
                          source={require("../assets/images/icon-text.png")}
                        />
                      </View>

                      <View
                        style={[
                          styles.templateItem,
                          {backgroundColor: "white"},
                        ]}
                      >
                        <Text style={[styles.templateItemText, ,]}>
                          Idea here
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.templateItem,
                          {height: 40, marginTop: 8},
                        ]}
                      >
                        <Text style={[styles.templateItemText]}>
                          Image here
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.templateItem,
                          {backgroundColor: "white"},
                        ]}
                      >
                        <Text style={styles.templateItemText}>
                          Your text here
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {/* theme 4 */}
                  <TouchableOpacity onPress={() => selectPdfThemplate(4)}>
                    <ImageBackground
                      source={require("../assets/images/backgroundPdfWhite.png")}
                      resizeMode="contain"
                      style={[
                        styles.template,
                        {backgroundColor: "white", borderWidth: 1},
                      ]}
                    >
                      <View style={{padding: 2, backgroundColor: Colors.mint}}>
                        <Image
                          style={{width: 20, height: 20, marginLeft: "auto"}}
                          source={require("../assets/images/icon-text.png")}
                        />
                      </View>

                      <View
                        style={[
                          styles.templateItem,
                          {backgroundColor: "transparent"},
                        ]}
                      >
                        <Text style={[styles.templateItemText, ,]}>
                          Idea here
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.templateItem,
                          {height: 40, marginTop: 8},
                        ]}
                      >
                        <Text style={[styles.templateItemText]}>
                          Image here
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.templateItem,
                          {backgroundColor: "transparent"},
                        ]}
                      >
                        <Text style={styles.templateItemText}>
                          Your text here
                        </Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                </ScrollView>

                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.mint,
                    padding: 15,
                    marginTop: "auto",
                  }}
                  onPress={() => setShowModal(!showModal)}
                >
                  <Text style={{textAlign: "center"}}>
                    {sharePageTexts.modalCloseText}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <CustomButton
            color={Colors.mint}
            textColor="white"
            title={sharePageTexts.templateButton}
            otherStyles={{marginTop: 10}}
            onPressFuction={() => setShowModal(!showModal)}
          />
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Quick-Sand",
              marginTop: 5,
              fontSize: 20,
            }}
          >
            {snap.theme === 1 && sharePageTexts.templateText1}
            {snap.theme === 2 && sharePageTexts.templateText2}
            {snap.theme === 3 && sharePageTexts.templateText3}
            {snap.theme === 4 && sharePageTexts.templateText4}
          </Text>
        </View>

        <CustomButton
          color={Colors.mint}
          onPressFuction={pickImage}
          textColor="white"
          title={sharePageTexts.imageButton}
          otherStyles={{marginTop: 20}}
        />

        {imageUri && <Image source={{uri: imageUri}} style={styles.image} />}
        <View style={{flexDirection: "row", gap: 10, marginTop: 20}}>
          {!disabled && (
            <>
              <TouchableOpacity
                onPress={saveToFavoritePdfs}
                style={{
                  padding: 10,
                  backgroundColor: Colors.pink,
                  borderRadius: 10,
                }}
              >
                <Fontisto name="save" size={40} />
              </TouchableOpacity>
              {showTextBox && (
                <Animated.View
                  style={[styles.textBoxContainer, {opacity: textBoxOpacity}]}
                >
                  <Text
                    style={{
                      fontSize: 22,
                      fontFamily: "Quick-Sand-Medium",
                      letterSpacing: -1,
                    }}
                  >
                    You can't save more than 10 pdfs
                  </Text>
                </Animated.View>
              )}
            </>
          )}

          <GeneratePdfButton
            onPress={() => handlePress()}
            disabled={disabled}
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
  textBoxContainer: {
    position: "absolute",
    bottom: 400,
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
    zIndex: 10,
  },
  modal: {
    width: "90%",
    height: "90%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "white",
  },
  centeredView: {
    flex: 1,
    backgroundColor: "#00000099",
    alignItems: "center",
    justifyContent: "center",
  },
  templateContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    padding: 10,
  },
  template: {
    aspectRatio: "5/7",
    height: 190,
    backgroundColor: Colors.mint,
  },
  templateItem: {
    marginTop: 5,
    height: 30,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#4eb7a4",
  },
  templateItemText: {
    fontSize: 9,
    fontFamily: "Quick-Sand",
  },
});
