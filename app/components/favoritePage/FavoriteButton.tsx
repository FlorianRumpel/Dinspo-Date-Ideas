import {TouchableOpacity, Text, View, StyleSheet, Animated} from "react-native";
import React, {useState, useEffect} from "react";
import {AntDesign} from "@expo/vector-icons";
import {selected, updateGlobalStateData} from "../../globalState";
import {useSnapshot} from "valtio";
import Colors from "../../constants/Colors";
import data from "../../data.json";
type Props = {
  currentIdea: number;
  tapType: "single" | "double";
  starBool?: boolean;
};

const FavoriteButton = (props: Props) => {
  const snap: any = useSnapshot(selected);
  const {currentIdea} = props;
  const starBool = snap.favorites.includes(currentIdea);
  const [starFilled, setStarFilled] = useState<Boolean>(starBool);

  useEffect(() => {
    setStarFilled(starBool);
  });

  function handlePress() {
    setStarFilled((prev) => !prev);
    if (!starFilled) {
      selected.favorites = [...snap.favorites, props.currentIdea];
    } else {
      selected.favorites = snap.favorites.filter(
        (item: number) => item !== props.currentIdea,
      );
    }

    updateGlobalStateData(selected);
  }

  function SingleTapComponent() {
    return (
      <TouchableOpacity
        accessibilityHint="tap to add to favorites"
        style={styles.favoriteButton}
        onPress={() => {
          handlePress();
        }}
      >
        <AntDesign
          name={starFilled ? "star" : "staro"}
          color={Colors.darkYellow}
          size={33}
        />
        <Text style={{fontSize: 20, fontFamily: "Quick-Sand", color: "black"}}>
          {data[snap.lang].cardPage.favoriteIconText}
        </Text>
      </TouchableOpacity>
    );
  }

  const DoubleTapComponent = () => {
    const [lastPress, setLastPress] = useState(0);
    const [showTextBox, setShowTextBox] = useState(false);
    const [textBoxOpacity] = useState(new Animated.Value(0.8));

    const handleDoublePress = () => {
      const currentTime = new Date().getTime();
      const doublePressDelay = 300; // Zeit in Millisekunden zwischen den Klicks

      if (currentTime - lastPress <= doublePressDelay) {
        selected.favorites = snap.favorites.filter(
          (item: number) => item !== props.currentIdea,
        );

        updateGlobalStateData(selected);
      } else {
        setShowTextBox(true);
        Animated.timing(textBoxOpacity, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: false,
        }).start(() => {
          textBoxOpacity.setValue(1);
          setShowTextBox(false);
        });
      }

      setLastPress(currentTime);
    };

    return (
      <TouchableOpacity
        accessibilityHint="double tap to delete from favorites"
        style={{paddingVertical: 15, paddingRight: 15}}
        onPress={() => handleDoublePress()}
      >
        <AntDesign name={"star"} color={Colors.darkYellow} size={33} />
        {showTextBox && (
          <Animated.View
            style={[styles.textBoxContainer, {opacity: textBoxOpacity}]}
          >
            <Text>{data[snap.lang].favoritePage.doubleTapText}</Text>
          </Animated.View>
        )}
      </TouchableOpacity>
    );
  };

  return props.tapType === "single" ? (
    <SingleTapComponent />
  ) : (
    <DoubleTapComponent />
  );
};
const styles = StyleSheet.create({
  textBoxContainer: {
    position: "absolute",
    bottom: 20,
    left: -7,
    width: 100,
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
    zIndex: 10,
  },
  favoriteButton: {
    alignItems: "center",
  },
});
export default FavoriteButton;
