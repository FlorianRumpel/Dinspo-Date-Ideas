import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import {useSnapshot} from "valtio";
import {selected} from "../../globalState";
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
      <Text style={styles.buttonText}>
        {data[snap.lang].sharePage.PdfButton}
      </Text>
    </TouchableOpacity>
  );
};

export default GeneratePdfButton;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: Colors.lightBlue,
    marginTop: 40,
    borderRadius: 10,

    width: "90%",
    borderWidth: 1,
  },
  buttonText: {
    textAlign: "center",
    fontFamily: "Quick-Sand-Regular",
    fontSize: 18,
  },
});
