import Colors from "../../constants/Colors";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import React from "react";

import {MaterialIcons} from "@expo/vector-icons";

const GenerateButton = (props: any) => {
  return (
    <TouchableOpacity
      accessibilityHint="tap to generate new date idea"
      {...props}
      style={[
        styles.buttonContainer,
        props.disabled ? {backgroundColor: Colors.lightGray, opacity: 0.5} : {},
      ]}
    >
      <MaterialIcons name="refresh" color={Colors.black} size={40} />
    </TouchableOpacity>
  );
};

export default GenerateButton;

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    textAlign: "center",
    letterSpacing: 1,
    fontFamily: "Quick-Sand-Medium",
  },
  buttonContainer: {
    marginTop: 20,
    height: 70,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 400,

    backgroundColor: "white",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.8,
    // shadowRadius: 6,
    // elevation: 5,
  },
});
