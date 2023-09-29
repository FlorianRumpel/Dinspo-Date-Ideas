import {View, Text, StyleSheet} from "react-native";
import React from "react";
import {useSnapshot} from "valtio";

import {selected} from "../globalState";
import SelectListComponent from "../components/settingsPage/SelectList";
import data from "../data.json";
import Colors from "../constants/Colors";
function Settings() {
  const snap: any = useSnapshot(selected);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {data[snap.lang].settingsPage.settingsLanguageText}
      </Text>
      <SelectListComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 22,
    fontFamily: "Quick-Sand-Regular",
    textAlign: "center",
    marginTop: 10,
  },
});

export default Settings;
