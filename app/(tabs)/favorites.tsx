import {StyleSheet, Text, View, ScrollView} from "react-native";
import React from "react";
import {selected} from "../globalState";
import {useSnapshot} from "valtio";
import data from "../data.json";
import FavoriteButton from "../components/FavoriteButton";
import {TouchableOpacity} from "react-native-gesture-handler";
import {Link} from "expo-router";
import Colors from "../constants/Colors";
const Favorites = () => {
  const snap: any = useSnapshot(selected);

  return (
    <ScrollView style={styles.container}>
      <View style={{paddingBottom: 20}}>
        <Text style={styles.title}>
          {data[snap.lang].favoritePage.favoritePageText}
        </Text>
        <View style={styles.helpContainer}>
          <Text style={styles.helpContainer.text}>Tap star to delete</Text>
          <Text style={styles.helpContainer.text}>Click to view idea</Text>
        </View>
        {snap.favorites.map((item: number, index: any) => {
          return (
            <View key={index}>
              <View style={styles.itemContainer}>
                <FavoriteButton tapType="double" currentIdea={item} />

                <Text style={styles.item}>
                  {data[snap.lang].dateIdeasTexts[item].heading}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    selected.textNumHasBeenSet = false;
                  }}
                  style={styles.buttonContainer}
                >
                  <Link
                    href={{
                      pathname: "/(tabs)/card",

                      params: {
                        number: item,
                      },
                    }}
                    style={styles.buttonText}
                  >
                    View
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
  },
  title: {
    fontSize: 25,
    fontFamily: "Quick sand",
    textAlign: "center",
    textDecorationLine: "underline",
    margin: 10,
  },
  helpContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    text: {
      fontFamily: "Quick sand",
      fontSize: 15,
      // textDecorationLine: "underline",
    },
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
  },
  item: {
    fontSize: 21,
    fontFamily: "Quick sand",
  },
  buttonContainer: {
    backgroundColor: Colors.viewButton,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    textAlign: "center",
    fontFamily: "Quick sand",
  },
});
