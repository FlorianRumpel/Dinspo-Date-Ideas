import {proxy} from "valtio";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface newData {
  lang?: string;
  favorites?: number[];
}

async function updateGlobalStateData(updateData: newData) {
  const key: string = "global_state";
  try {
    const existingDataString = await AsyncStorage.getItem(key);
    const existingData = JSON.parse(existingDataString || "{}") as newData;

    if (updateData.lang !== undefined) {
      existingData.lang = updateData.lang;
    }
    if (updateData.favorites !== undefined) {
      existingData.favorites = updateData.favorites;
    }

    await AsyncStorage.setItem(key, JSON.stringify(existingData));
  } catch (error) {
    console.error("Error updating AsyncStorage:", error);
  }
}

type Selected = {
  lang: string;
  favorites: number[];
  textNumHasBeenSet: boolean;
};
const selected: Selected = proxy({
  lang: "",
  favorites: [],
  textNumHasBeenSet: false,
});

export {selected, updateGlobalStateData};
