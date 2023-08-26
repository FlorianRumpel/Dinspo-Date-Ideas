import {TouchableOpacity, Text, View, StyleSheet, Animated} from "react-native";
import React, {useState, useEffect} from "react";
import {AntDesign} from "@expo/vector-icons";
import {selected, updateGlobalStateData} from "../globalState";
import {useSnapshot} from "valtio";

type Props = {
  currentIdea: number;
  tapType: "single" | "double";
  starBool?: boolean;
};

const FavoriteButton = (props: Props) => {
  const snap = useSnapshot(selected);
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
        (item) => item !== props.currentIdea,
      );
    }

    updateGlobalStateData(selected);
  }

  function SingleTapComponent() {
    return (
      <TouchableOpacity
        accessibilityHint="tap to add to favorites"
        style={{paddingHorizontal: 15, paddingTop: 15}}
        onPress={() => {
          handlePress();
        }}
      >
        <AntDesign
          name={starFilled ? "star" : "staro"}
          color={"#fcba03"}
          size={33}
        />
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
          (item) => item !== props.currentIdea,
        );
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
        style={{padding: 15}}
        onPress={() => handleDoublePress()}
      >
        <AntDesign name={"star"} color={"#fcba03"} size={33} />
        {showTextBox && (
          <Animated.View
            style={[styles.textBoxContainer, {opacity: textBoxOpacity}]}
          >
            <Text>Double Tap to delete</Text>
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
    bottom: 15,
    left: -25,
    width: 100,
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
    zIndex: 10,
  },
});
export default FavoriteButton;
