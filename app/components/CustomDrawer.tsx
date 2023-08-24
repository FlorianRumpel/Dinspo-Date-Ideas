import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import {useSnapshot} from "valtio";

import {selected} from "../globalState";
import Colors from "../constants/Colors";
import data from "../data.json";
const CustomDrawer = (props: any) => {
  const snap: any = useSnapshot(selected);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{data[snap.lang].drawerNavText}</Text>
      </View>
      <DrawerContentScrollView
        contentContainerStyle={styles.itemContainer}
        {...props}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    backgroundColor: Colors.mint,
    padding: 10,
  },
  title: {
    fontSize: 23,
    textAlign: "center",
    fontFamily: "Quick sand",
  },
  itemContainer: {
    paddingTop: 0,
  },
});
