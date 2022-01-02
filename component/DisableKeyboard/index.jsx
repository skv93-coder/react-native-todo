import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

export default function DisableKeyboard({ children }) {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        console.log(`'pressed'`, "pressed");
        Keyboard.dismiss();
      }}
      style={{ flex: 1, backgroundColor: "red" }}
    >
      {children}
    </TouchableWithoutFeedback>
  );
}
