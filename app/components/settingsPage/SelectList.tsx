import {SelectList} from "react-native-dropdown-select-list";

import {StyleSheet} from "react-native";
import React from "react";
import {useSnapshot} from "valtio";
import {AntDesign, MaterialIcons} from "@expo/vector-icons";

import {selected, updateGlobalStateData} from "../../globalState";
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
      fontFamily="Quick-Sand"
      searchPlaceholder="Search"
      data={languages}
      save="key"
      setSelected={handleSelect}
      defaultOption={languages[snap.lang]}
      boxStyles={styles.boxStyles}
      dropdownStyles={styles.dropDownStyles}
      dropdownItemStyles={styles.singleItemStyles}
      closeicon={<AntDesign name="close" color={"grey"} size={25} />}
      arrowicon={
        <MaterialIcons name="keyboard-arrow-down" color={"grey"} size={25} />
      }
      searchicon={<MaterialIcons name="search" color={"grey"} size={25} />}
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
