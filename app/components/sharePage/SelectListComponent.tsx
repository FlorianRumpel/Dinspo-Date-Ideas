import {StyleSheet} from "react-native";
import React from "react";
import {useSnapshot} from "valtio";
import {SelectList} from "react-native-dropdown-select-list";
import {selected} from "../../globalState";
import data from "../../data.json";

import {AntDesign, MaterialIcons} from "@expo/vector-icons";
import {useIsFocused} from "@react-navigation/native";
import Colors from "../../constants/Colors";

type Props = {
  setSelectedVal: Function;
};

const SelectListComponent = (props: Props) => {
  const snap: any = useSnapshot(selected);
  const {setSelectedVal} = props;
  const isFocused = useIsFocused();

  const sharePageTexts = data[snap.lang].sharePage;
  const selectListData = snap.favorites
    .map((item: number) => {
      return {
        value: data[snap.lang].dateIdeasTexts[item].heading,
        key: item + 1,
        disabled: false,
      };
    })
    .sort();
  return (
    <SelectList
      data={selectListData}
      save="key"
      searchPlaceholder={sharePageTexts.dropdownSearchPlaceholderText}
      placeholder={sharePageTexts.dropdownPlaceholderText}
      setSelected={(val: number) => {
        setSelectedVal(val);
      }}
      notFoundText={data[snap.lang].favoritePage.noFavoritText}
      boxStyles={{width: 350, borderColor: "black"}}
      inputStyles={{fontFamily: "Quick-Sand"}}
      dropdownTextStyles={{
        fontFamily: "Quick-Sand",
      }}
      closeicon={<AntDesign name="close" color={"grey"} size={25} />}
      arrowicon={
        <MaterialIcons name="keyboard-arrow-down" color={"grey"} size={25} />
      }
      searchicon={<MaterialIcons name="search" color={"grey"} size={25} />}
      dropdownShown={!isFocused}
    />
  );
};

export default SelectListComponent;

const styles = StyleSheet.create({
  dropDownStyles: {
    position: "absolute",
    width: 350,
    backgroundColor: Colors.white,
    zIndex: 20,
    top: 50,
  },
});
