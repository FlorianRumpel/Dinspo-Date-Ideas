import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {TextInput} from "react-native-gesture-handler";
import {db} from "../firebaseconfig";
import {ref, set} from "firebase/database";
import data from "../data.json";
import {snapshot, useSnapshot} from "valtio";
import {selected} from "../globalState";
import NetInfo from "@react-native-community/netinfo";
import Colors from "../constants/Colors";

const SubmitPage = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const disabled = title.length < 3 || body.length < 40;
  const snap: any = useSnapshot(selected);
  const submitPageText = data[snap.lang].submitPage;

  function addData() {
    const id = Date.now();

    function date() {
      const today = new Date();
      const tag = String(today.getDate()).padStart(2, "0");
      const monat = String(today.getMonth() + 1).padStart(2, "0");
      const jahr = today.getFullYear();

      return `${tag}.${monat}.${jahr}`;
    }
    const dateNow = date();
    console.log(dateNow);
    set(ref(db, "posts/" + id), {
      title: title,
      body: body,
      id: id,
      date: dateNow,
    });
    setTitle("");
    setBody("");
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>{submitPageText.titleText1}</Text>
        <TextInput
          style={styles.textInput}
          placeholder={submitPageText.placeholderText1}
          value={title}
          maxLength={20}
          onChangeText={setTitle}
        />
        <Text style={styles.letterCount}>
          {title.length} {submitPageText?.characterText}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>{submitPageText.titleText2}</Text>

        <TextInput
          style={[styles.textInput, {height: 200}]}
          placeholder={submitPageText.placeholderText2}
          value={body}
          onChangeText={setBody}
          textAlignVertical="top"
          multiline
          numberOfLines={9}
          maxLength={250}
        />
        <Text style={styles.letterCount}>
          {body.length} {submitPageText?.characterText}
        </Text>
      </View>
      <TouchableOpacity
        disabled={disabled}
        style={[styles.submitButton, disabled ? {opacity: 0.5} : {}]}
        onPress={() => addData()}
      >
        <Text style={styles.buttonText}>{submitPageText?.submitText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubmitPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  submitButton: {
    padding: 10,
    backgroundColor: Colors.mint,
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontFamily: "Quick-Sand-Medium",
    fontSize: 20,
  },
  textContainer: {
    width: "90%",
    marginTop: 10,
  },
  heading: {
    fontFamily: "Quick-Sand-Regular",
    fontSize: 23,
    textAlign: "center",
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    fontSize: 17,
    fontFamily: "Quick-Sand",
  },
  letterCount: {
    alignSelf: "flex-end",
    fontFamily: "Quick-Sand",
  },
});
