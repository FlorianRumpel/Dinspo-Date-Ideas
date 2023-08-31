import {StyleSheet, TextInput, View, Text, Keyboard} from "react-native";
import React from "react";

import data from "../../data.json";
import {useSnapshot} from "valtio";
import {selected} from "../../globalState";

type Props = {
  setText: Function;
  text: string;
};
const TextInputComonent = (props: Props) => {
  const snap: any = useSnapshot(selected);
  const sharePageTexts = data[snap.lang].sharePage;

  const {setText, text} = props;
  return (
    <View style={{marginTop: 20, width: "85%"}}>
      <Text style={styles.headingText}>
        {sharePageTexts.textfieldHeaderText}
      </Text>
      <TextInput
        style={styles.textArea}
        multiline
        numberOfLines={10} // Du kannst die Anzahl der sichtbaren Zeilen anpassen
        placeholder={sharePageTexts.textfieldPlaceholder}
        onSubmitEditing={Keyboard.dismiss}
        blurOnSubmit={true}
        value={text}
        onChangeText={(val: string) => {
          setText(val);
        }}
        textAlignVertical="top"
        underlineColorAndroid="transparent"
        selectionColor="#007BFF"
      />
    </View>
  );
};

export default TextInputComonent;

const styles = StyleSheet.create({
  headingText: {
    textAlign: "center",
    fontFamily: "Quick-Sand",
    fontSize: 21,
    paddingVertical: 5,
  },
  textArea: {
    fontFamily: "Quick-Sand-Regular",
    height: 300,
    borderColor: "#000",
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderRadius: 10,
  },
});
