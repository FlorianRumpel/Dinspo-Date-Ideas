import React from "react";
import {Redirect} from "expo-router";
import {useRouter, useFocusEffect} from "expo-router";
const Index = () => {
  const router = useRouter();

  useFocusEffect(() => {
    // Call the replace method to redirect to a new route without adding to the history.
    // We do this in a useFocusEffect to ensure the redirect happens every time the screen
    // is focused.
    router.replace("(tabs)/card");
  });
  return <></>;
};

export default Index;
