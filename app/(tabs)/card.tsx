import React, {useState, useEffect} from "react";
import {StyleSheet, Text, View} from "react-native";
import {hyphenated} from "hyphenated";
import de from "hyphenated-de";
import en from "hyphenated-en-us";
import es from "hyphenated-es";
import fr from "hyphenated-fr";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useSnapshot} from "valtio";

import {selected} from "../globalState";
import Colors from "../constants/Colors";
import data from "../data.json";
import GenerateButton from "../components/cardPage/GenerateButton";
import FavoriteButton from "../components/favoritePage/FavoriteButton";
import {SafeAreaView} from "react-native-safe-area-context";

export default function Card() {
  const snap: any = useSnapshot(selected);
  const dateIdeasData = data[snap.lang].dateIdeasTexts;
  const [textNum, setTextNum] = useState(
    Math.floor(Math.random() * dateIdeasData.length),
  );
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
  const [disabled, setDisabled] = useState(false);
  const hypenatedLanguages = [de, en, fr, es];
  const hyphenatedText = hyphenated(dateIdeasData[textNum].text, {
    language: hypenatedLanguages[snap.lang],
  });
  const heading = dateIdeasData[textNum].heading;

  useEffect(() => {
    if (snap.currentIdea) {
      setTextNum(snap.currentIdea);
      selected.currentIdea = undefined;
    }
  }, [snap.currentIdea]);

  useEffect(() => {
    retrieveRandomNumbers();
  }, []);

  const generateRandomNumber = () => {
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 1000);

    let randomNumber: number;
    do {
      randomNumber = Math.floor(Math.random() * dateIdeasData.length);
    } while (randomNumbers.includes(randomNumber));

    updateRandomNumbers(randomNumber);
    setTextNum(randomNumber);
  };

  const updateRandomNumbers = (newNumber: number) => {
    const updatedNumbers = [...randomNumbers, newNumber];
    if (updatedNumbers.length > Math.floor(dateIdeasData.length / 2)) {
      updatedNumbers.shift();
    }
    setRandomNumbers(updatedNumbers);
    storeRandomNumbers(updatedNumbers);
  };

  const storeRandomNumbers = async (numbers: number[]) => {
    try {
      await AsyncStorage.setItem("randomNumbers", JSON.stringify(numbers));
    } catch (error) {
      alert(error);
    }
  };

  const retrieveRandomNumbers = async () => {
    try {
      const storedNumbers = await AsyncStorage.getItem("randomNumbers");
      if (storedNumbers !== null) {
        setRandomNumbers(JSON.parse(storedNumbers));
      } else {
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.heading]}>{heading}</Text>
      <View style={styles.textContainer}>
        <Text
          adjustsFontSizeToFit={true}
          numberOfLines={11}
          android_hyphenationFrequency="full"
          style={styles.dateIdea}
        >
          {hyphenatedText}
        </Text>
        <View style={styles.actionsContainer}>
          <Text style={styles.budget}>{dateIdeasData[textNum].budget}</Text>

          <FavoriteButton tapType="single" currentIdea={textNum} />
        </View>
      </View>

      <GenerateButton
        disabled={disabled}
        onPress={() => generateRandomNumber()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: Colors.mint,
    alignItems: "center",
    position: "relative",
  },
  heading: {
    fontFamily: "Quick-Sand-Regular",
    fontSize: 24,
    textTransform: "capitalize",
    textAlign: "center",
    marginTop: 5,
  },
  textContainer: {
    marginTop: 20,
    width: "90%",
    minHeight: "70%",
    backgroundColor: Colors.white,
    borderRadius: 20,
    fontFamily: "Quick-Sand",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  dateIdea: {
    fontSize: 22,
    fontFamily: "Quick-Sand",
    textAlign: "center",
  },
  budget: {
    fontSize: 27,
    fontFamily: "Quick-Sand",
  },
  actionsContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
  },
});
