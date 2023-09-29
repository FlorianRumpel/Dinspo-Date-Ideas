import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import {useSnapshot} from "valtio";
import {selected} from "../../globalState";
import {Entypo} from "@expo/vector-icons";
import data from "../../data.json";
type Props = {
  disabled: boolean;
  // All other props
  [x: string]: any;
};

const GeneratePdfButton = (props: Props) => {
  const {disabled, ...otherProps} = props;
  const snap: any = useSnapshot(selected);

  return (
    <TouchableOpacity
      {...otherProps}
      disabled={disabled}
      style={[
        styles.button,
        disabled ? {backgroundColor: Colors.lightGray, opacity: 0.2} : {},
      ]}
    >
      <Entypo name="export" size={40} />
    </TouchableOpacity>
  );
};

export default GeneratePdfButton;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: Colors.pink,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontFamily: "Quick-Sand-Regular",
    fontSize: 18,
  },
});
