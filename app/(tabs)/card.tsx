import React, {useState, useEffect} from "react";
import {AntDesign} from "@expo/vector-icons";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {hyphenated} from "hyphenated";
import de from "hyphenated-de";
import en from "hyphenated-en-us";
import es from "hyphenated-es";
import fr from "hyphenated-fr";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useSnapshot} from "valtio";
import {
  RouteProp,
  useRoute,
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";

import {selected} from "../globalState";
import Colors from "../constants/Colors";
import data from "../data.json";
import GenerateButton from "../components/GenerateButton";
import FavoriteButton from "../components/FavoriteButton";

type RootStackParamList = {
  card: {number: number}; // Hier wird der Parametertyp für DetailScreen definiert
};
export default function Card() {
  const snap: any = useSnapshot(selected);
  const route = useRoute<RouteProp<RootStackParamList, "card">>();

  const screenFocused = useIsFocused();
  const dateIdeasData = data[snap.lang].dateIdeasTexts;
  const [textNum, setTextNum] = useState(
    Math.floor(Math.random() * dateIdeasData.length),
  );

  const [showStar, setShowStar] = useState(false);

  useEffect(() => {
    if (route.params !== undefined) {
      const {number} = route.params;

      if (!snap.textNumHasBeenSet) {
        setTextNum(number);
        selected.textNumHasBeenSet = true;
        setShowStar(true);
      } else if (!screenFocused) {
        const randomIndex = Math.floor(Math.random() * dateIdeasData.length);
        setTextNum(randomIndex);
      } else if (!snap.textNumHasBeenSet) {
        setShowStar(false);
      }
    }
  }, [screenFocused, snap.textNumHasBeenSet]);

  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);

  const [disabled, setDisabled] = useState(false);
  const hypenatedLanguages = [de, en, fr, es];
  const hyphenatedText = hyphenated(dateIdeasData[textNum].text, {
    language: hypenatedLanguages[snap.lang],
  });
  const heading = dateIdeasData[textNum].heading;
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
          <View
            style={[styles.favoriteContainer, showStar ? {opacity: 0.3} : {}]}
          >
            {showStar ? (
              <AntDesign name={"star"} size={33} color={Colors.iconStar} />
            ) : (
              <FavoriteButton tapType="single" currentIdea={textNum} />
            )}
            <Text
              style={{fontSize: 20, fontFamily: "Quick sand", color: "black"}}
            >
              {data[snap.lang].cardPage.favoriteIconText}
            </Text>
          </View>
        </View>
      </View>

      <GenerateButton
        onPress={() => {
          generateRandomNumber();
          setShowStar(false);
        }}
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
    fontFamily: "Quick sand",
    fontSize: 24,
    textTransform: "capitalize",
    textAlign: "center",
  },
  textContainer: {
    marginTop: 20,
    width: "90%",
    minHeight: "70%",
    backgroundColor: Colors.white,
    borderRadius: 20,
    fontFamily: "Quick sand",
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
    fontFamily: "Quick sand",
    textAlign: "center",
  },
  budget: {
    fontSize: 27,
    fontFamily: "Quick sand",
  },
  actionsContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
  },
  favoriteContainer: {
    alignItems: "center",
  },
  buttonContainer: {
    width: "90%",
    marginTop: 20,
    backgroundColor: Colors.lightBlue,
    padding: 10,
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
});
