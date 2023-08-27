import {useSnapshot} from "valtio";
import {selected} from "../globalState";
import Colors from "../constants/Colors";
import data from "../data.json";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import React from "react";

const GenerateButton = (props: any) => {
  const snap: any = useSnapshot(selected);
  return (
    <TouchableOpacity
      accessibilityHint="tap to generate new date idea"
      {...props}
      style={[
        styles.buttonContainer,
        props.disabled ? {backgroundColor: Colors.lightGray, opacity: 0.5} : {},
      ]}
    >
      <View>
        <Text
          adjustsFontSizeToFit={true}
          numberOfLines={2}
          style={styles.buttonText}
        >
          {data[snap.lang].cardPage.generateButtonText}
        </Text>
      </View>
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
