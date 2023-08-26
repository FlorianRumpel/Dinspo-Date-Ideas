import {SelectList} from "react-native-dropdown-select-list";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {StyleSheet} from "react-native";
import React, {useEffect} from "react";
import {useSnapshot} from "valtio";

import {selected, updateGlobalStateData} from "../globalState";
function SelectListComponent() {
  const snap: any = useSnapshot(selected);

  const handleSelect = (value: string) => {
    selected.lang = value;
    const globalStates = {
      lang: value,
    };
    updateGlobalStateData(globalStates);
  };

  const languages = [
    {key: "0", value: "Deutsch(German)"},
    {key: "1", value: "English(English)"},
    {key: "2", value: "Français(French)"},
    {key: "3", value: "Español(Spanish)"},
  ];

  return (
    <SelectList
      searchPlaceholder="Search"
      data={languages}
      save="key"
      setSelected={handleSelect}
      defaultOption={languages[snap.lang]}
      boxStyles={styles.boxStyles}
      dropdownStyles={styles.dropDownStyles}
      dropdownItemStyles={styles.singleItemStyles}
    />
  );
}

const styles = StyleSheet.create({
  boxStyles: {
    borderColor: "#333",
    marginTop: 15,
    borderWidth: 1.5,
  },
  singleItemStyles: {
    backgroundColor: "transparent",
  },
  dropDownStyles: {
    borderColor: "#333",
    borderWidth: 1.5,
  },
});

export default SelectListComponent;
