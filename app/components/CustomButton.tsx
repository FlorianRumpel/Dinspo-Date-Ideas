import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {TouchableOpacity} from "react-native-gesture-handler";
import Colors from "../constants/Colors";
type Props = {
  onPressFuction?: () => void;
  color: string;
  textColor: string;
  title: string;
  otherStyles?: object;
};

const CustomButton = (props: Props) => {
  const {onPressFuction, color, title, otherStyles, textColor} = props;
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: color}, otherStyles]}
      onPress={onPressFuction}
    >
      <Text style={[styles.buttonText, {color: textColor}]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: "Quick-Sand-Medium",
    fontSize: 18,
  },
});
