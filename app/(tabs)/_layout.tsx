import {
  FontAwesome5,
  Octicons,
  MaterialIcons,
  Entypo,
  Foundation,
} from "@expo/vector-icons/";
import {Drawer} from "expo-router/drawer";
import React, {useEffect} from "react";
import {
  StatusBar,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  Text,
} from "react-native";
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
  if (Platform.OS == "android") {
    StatusBar.setBackgroundColor(Colors.mint);
  }
  const snap: any = useSnapshot(selected);
  const titleTexts = data[snap.lang];

  const navigation = useNavigation();

  const retrieveGlobalState = async () => {
    try {
      const stored = await AsyncStorage.getItem("global_state");
      if (stored !== null) {
        const globalStates = JSON.parse(stored);
        selected.lang = globalStates.lang;
        selected.favorites = globalStates.favorites;
        selected.pdfs = globalStates.pdfs;
      } else {
        selected.lang = "0";
        selected.favorites = [];
        selected.pdfs = [];
      }
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    retrieveGlobalState();
  }, []);

  // fonts
  const [fontsLoaded] = useFonts({
    "Quick-Sand": require("../assets/fonts/Quicksand-Light.ttf"),
    "Quick-Sand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "Quick-Sand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
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
        headerRight: () => {
          return (
            <Image
              style={{height: 50, width: 40, marginRight: 20, marginTop: 6}}
              source={require("../assets/images/icon-text.png")}
            />
          );
        },
        headerTitle: "",
        drawerLabelStyle: {
          fontFamily: "Quick-Sand-Regular",
          marginLeft: -25,
        },
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
          fontFamily: "Quick-Sand",
          fontSize: 24.5,
          textDecorationLine: "underline",
          textShadowOffset: {width: 2, height: 2},
          textShadowRadius: 4,
          textShadowColor: "rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          marginLeft: -41,
        },
        headerLeft: () => (
          <TouchableOpacity
            accessibilityHint="tap to open drawer"
            style={{padding: 11, paddingTop: 8}}
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
          title: data[snap.lang].cardPage.dateIdeaDrawerText,

          headerTitleStyle: {
            textDecorationLine: "none",
            fontSize: 24,
            fontFamily: "Quick-Sand-Medium",
          },
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
        name="favorites"
        options={{
          title: data[snap.lang].favoritePage.favoriteDrawerText,
          drawerIcon: ({focused, color}) => (
            <View style={styles.iconContainer}>
              <MaterialIcons
                name="favorite"
                color={color}
                size={focused ? 24 : 20}
              />
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="share"
        options={{
          title: data[snap.lang].sharePage.shareDrawerText,
          drawerIcon: ({focused, color}) => (
            <View style={styles.iconContainer}>
              <Entypo name="export" color={color} size={focused ? 22 : 20} />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="pdfs"
        options={{
          title: data[snap.lang].pdfsPage.pdfsDrawerText,
          drawerIcon: ({focused, color}) => (
            <View style={styles.iconContainer}>
              <Foundation
                name="page-pdf"
                color={color}
                size={focused ? 24 : 20}
              />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="submit"
        options={{
          title: data[snap.lang].submitPage.submitDrawerText,
          headerTitleContainerStyle: {
            marginLeft: 35,
          },

          drawerIcon: ({focused, color}) => (
            <View style={styles.iconContainer}>
              <MaterialIcons
                name="create"
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
          title: titleTexts.settingsPage.settingsDrawerText,
          drawerIcon: ({focused, color}) => (
            <View style={styles.iconContainer}>
              <FontAwesome5
                name="cogs"
                color={color}
                size={focused ? 22 : 20}
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
    width: 29,
    height: 29,
    justifyContent: "center",
    alignItems: "center",
  },
});
