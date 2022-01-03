import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  Dimensions,
  Keyboard,
  Text,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import DisableKeyboard from "./component/DisableKeyboard";
import Mycheckbox from "./component/Mycheckbox";

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  console.log(`object`, StatusBar.currentHeight);
  const { width, height } = Dimensions.get("window");
  const handleKeyboardShow = () => {
    setSelectedImage((prev) => !prev);
  };
  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyboardShow
    );
    const hideSubscription = Keyboard.addListener(
      "keyboardDidHide",
      handleKeyboardShow
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  return (
    <DisableKeyboard>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "ffff",
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <View
          style={{
            paddingBottom: 24,
            marginHorizontal: 32,
            flexDirection: "row",
            justifyContent: "center",
            position: "absolute",
            bottom: 0,
            // backgroundColor:'red'
          }}
        >
          <TextInput
            placeholder="Enter a task"
            style={{
              backgroundColor: "#F4FAFB",
              width: selectedImage ? width * 0.8 : width * 0.9,
              height: height * 0.07,
              // padding: "4 8",
              paddingTop: 4,
              paddingBottom: 4,
              paddingHorizontal: 8,
              margin: "auto",
              borderBottomColor: "#088000",
              borderWidth: 2,
            }}
            onSubmitEditing={(ev) => {
              console.log(`ev`);
            }}
          />
          {selectedImage && (
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: 8,
              }}
              onPress={() => {
                console.log(`9`, 9);
              }}
            >
              <AntDesign color="#00adc1" name="pluscircle" size={40} />
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            backgroundColor: "#00adc1",
            width: 0.9 * width,
            marginLeft: 0.05 * width,
            marginRight: 0.05 * width,
            marginTop: 48,
            paddingVertical: 8,
            paddingHorizontal: 16,
            // flexDirection: "row",
            justifyContent: "center",
            borderRadius: 8,
          }}
        >
          <View>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "700" }}>
              To Do Tasks
            </Text>
            <Text style={{ color: "white", fontSize: 16 }}>15 Tasks left</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#f2f2f2",
            width: 0.9 * width,
            marginLeft: 0.05 * width,
            marginRight: 0.05 * width,
            marginVertical: 16,
            paddingVertical: 8,
            paddingHorizontal: 16,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{}}>This is the task and want to talk...</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Mycheckbox />
          </View>
        </View>
      </SafeAreaView>
    </DisableKeyboard>
  );
}
