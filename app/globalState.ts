import {proxy} from "valtio";
import AsyncStorage from "@react-native-async-storage/async-storage";
type Pdf = {
  id: string;

  dateIdea: number;
  imagePath: string;
  language: number;
  text: string;
};

interface newData {
  lang?: string;
  favorites?: number[];
  pdfs?: Pdf[];
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
    if (updateData.pdfs !== undefined) {
      existingData.pdfs = updateData.pdfs;
    }
    await AsyncStorage.setItem(key, JSON.stringify(existingData));
  } catch (error) {
    console.error("Error updating AsyncStorage:", error);
  }
}

type Selected = {
  lang: string;
  favorites: number[];
  currentIdea: unknown;
  pdfs: Pdf[];
  theme: number;
};
const selected: Selected = proxy({
  lang: "",
  favorites: [],
  currentIdea: undefined,
  pdfs: [],
  theme: 1,
});

export {selected, updateGlobalStateData};
