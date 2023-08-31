import {StyleSheet, Text, View, ScrollView} from "react-native";
import React from "react";
import {selected} from "../globalState";
import {useSnapshot} from "valtio";
import data from "../data.json";
import FavoriteButton from "../components/favoritePage/FavoriteButton";
import {TouchableOpacity} from "react-native-gesture-handler";
import {Link} from "expo-router";
import Colors from "../constants/Colors";
import {LinearGradient} from "expo-linear-gradient";
const Favorites = () => {
  const snap: any = useSnapshot(selected);

  const texts = data[snap.lang].favoritePage;

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
              <LinearGradient
                start={{x: 0.1, y: 0.1}}
                style={styles.itemContainer}
                colors={["#AA49A1", "#00DFAE"]}
              >
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
                  <Link href="/(tabs)/card" style={styles.buttonText}>
                    {texts.button}
                  </Link>
                </TouchableOpacity>
              </LinearGradient>
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
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 25,
    fontFamily: "Quick-Sand",
    textAlign: "center",
    textDecorationLine: "underline",
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
    color: Colors.deleteRed,
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

    borderRadius: 4,
  },
  item: {
    maxWidth: 200,
    fontSize: 21,
    fontFamily: "Quick-Sand-Regular",
    color: "white",
  },
  buttonContainer: {
    backgroundColor: Colors.darkPurple,
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    textAlign: "center",
    fontFamily: "Quick-Sand-Regular",
  },
});
