import {StyleSheet, Text, View, ScrollView} from "react-native";
import React from "react";
import {selected} from "../globalState";
import {useSnapshot} from "valtio";
import data from "../data.json";
import FavoriteButton from "../components/favoritePage/FavoriteButton";
import {TouchableOpacity} from "react-native-gesture-handler";
import {Link, router} from "expo-router";
import Colors from "../constants/Colors";
import {LinearGradient} from "expo-linear-gradient";
import {Entypo, MaterialIcons} from "@expo/vector-icons";
const Favorites = () => {
  const snap: any = useSnapshot(selected);
  const texts = data[snap.lang].favoritePage;

  function handlePress() {}
  return (
    <ScrollView style={styles.container}>
      <View style={{paddingBottom: 20}}>
        <Text style={styles.title}>
          {snap.favorites.length !== 0
            ? data[snap.lang].favoritePage.favoritePageText
            : data[snap.lang].favoritePage.noFavoritText}
        </Text>
        <View style={styles.helpContainer}>
          {snap.favorites.length !== 0 && (
            <Text style={styles.helpText}>{texts.deleteText}</Text>
          )}
        </View>
        {snap.favorites.map((item: number, index: any) => {
          return (
            <View key={index}>
              <View style={styles.itemContainer}>
                <View style={{marginLeft: 10}}>
                  <FavoriteButton tapType="double" currentIdea={item} />
                </View>

                <Text adjustsFontSizeToFit={true} style={styles.item}>
                  {data[snap.lang].dateIdeasTexts[item].heading
                    .charAt(0)
                    .toLocaleUpperCase() +
                    data[snap.lang].dateIdeasTexts[item].heading.slice(1)}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    selected.currentIdea = item;
                  }}
                  style={styles.buttonContainer}
                >
                  <Link href={"/(tabs)/card"}>
                    <MaterialIcons
                      name="touch-app"
                      size={40}
                      color={Colors.black}
                    />
                  </Link>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mint,
  },
  title: {
    fontSize: 25,
    fontFamily: "Quick-Sand-Regular",
    textAlign: "center",
    margin: 10,
  },
  helpContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  helpText: {
    fontFamily: "Quick-Sand-Regular",
    fontSize: 16,
    color: Colors.white,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    paddingRight: 5,
    backgroundColor: "white",
    borderRadius: 4,
  },
  item: {
    maxWidth: 200,
    fontSize: 21,
    fontFamily: "Quick-Sand-Regular",
    color: Colors.black,
  },
  buttonContainer: {
    borderRadius: 10,
  },
});
