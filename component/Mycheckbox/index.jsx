import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Mycheckbox() {
  const [checked, setChecked] = useState(false);
  return (
    <Pressable
      onPress={() => {
        setChecked((prev) => !prev);
      }}
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
