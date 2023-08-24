import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import {Octicons} from "@expo/vector-icons";
import {Drawer} from "expo-router/drawer";
import React, {useEffect} from "react";
import {StatusBar, View, StyleSheet, TouchableOpacity} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import {useFonts} from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useSnapshot} from "valtio";
import {useNavigation} from "expo-router/src/useNavigation";

import Colors from "../constants/Colors";
import CustomDrawer from "../components/CustomDrawer";
import data from "../data.json";
import {selected} from "../globalState";
import {DrawerActions} from "@react-navigation/native";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

export default function TabLayout() {
  StatusBar.setBackgroundColor(Colors.mint);
  const snap: any = useSnapshot(selected);
  const titleTexts = data[snap.lang];

  const navigation = useNavigation();

  const retrieveLanguage = async () => {
    try {
      const storedLanguage = await AsyncStorage.getItem("language");
      if (storedLanguage !== null) {
        selected.lang = storedLanguage;
      } else {
        selected.lang = "0";
      }
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    retrieveLanguage();
  }, []);

  // fonts
  const [fontsLoaded] = useFonts({
    "Quick sand": require("../assets/fonts/Quicksand.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props} />}
      initialRouteName="card"
      screenOptions={{
        swipeEdgeWidth: 250,
        headerStatusBarHeight: 0,
        headerStyle: {
          backgroundColor: Colors.mint,
        },
        overlayColor: Colors.overlayColor,
        headerTitleContainerStyle: {
          width: "100%",
          alignItems: "center",
        },
        headerTitleStyle: {
          fontFamily: "Quick sand",
          fontSize: 24.5,
          textDecorationLine: "underline",
          textShadowOffset: {width: 2, height: 2},
          textShadowRadius: 4,
          textShadowColor: "rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          marginLeft: -41,
        },
        headerRightContainerStyle: {
          display: "none",
        },
        headerLeft: () => (
          <TouchableOpacity
            style={{marginLeft: 11, marginTop: 8}}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer)}
          >
            <Octicons name="three-bars" size={30} />
          </TouchableOpacity>
        ),
      }}
    >
      <Drawer.Screen
        name="card"
        options={{
          title: titleTexts.dateIdeaHeaderText,
          drawerIcon: ({focused, color}) => (
            <View style={styles.iconContainer}>
              <FontAwesome5
                name="book"
                color={color}
                size={focused ? 24 : 20}
              />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: titleTexts.settingsHeaderText,
          drawerIcon: ({focused, color}) => (
            <View style={styles.iconContainer}>
              <FontAwesome5
                name="cogs"
                color={color}
                size={focused ? 24 : 20}
              />
            </View>
          ),
        }}
      />
    </Drawer>
  );
}
const styles = StyleSheet.create({
  iconContainer: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
