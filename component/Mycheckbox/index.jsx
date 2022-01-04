import React from "react";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Mycheckbox({ checked, setChecked }) {
  return (
    <Pressable
      onPress={setChecked.bind(null, !checked)}
      style={{
        width: 28,
        height: 28,
        backgroundColor: checked ? "#00adc1" : "white",
        borderRadius: 28,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {checked && <Ionicons name="checkmark" size={24} color="white" />}
    </Pressable>
  );
}
