import {View, Text, StyleSheet} from "react-native";
import React from "react";
import {useSnapshot} from "valtio";

import {selected} from "../globalState";
import SelectListComponent from "../components/SelectList";
import Colors from "../constants/Colors";
import data from "../data.json";
function Settings() {
  const snap: any = useSnapshot(selected);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data[snap.lang].settingsLanguageText}</Text>
      <SelectListComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",

    backgroundColor: Colors.mint,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: "Quick sand",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});

export default Settings;
