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

import DisableKeyboard from "./component/DisableKeyboard";

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
            paddingTop: 24,
            marginHorizontal: 32,
            flexDirection: "row",
            justifyContent: "center",
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
                // backgroundColor: "#19920b",
                // marginLeft: 12,

                paddingLeft: 8,
                // aspectRatio: 1.2,
                // transform: [{ rotate: "45deg" }],
                // borderRadius: Math.round((height * 0.07 + height * 0.07) / 2),
              }}
              onPress={() => {
                console.log(`9`, 9);
              }}
            >
              <Image
                style={{
                  width: height * 0.07,
                  height: height * 0.07,
                }}
                source={require("./assets/plus.png")}
              />
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            backgroundColor: "#00adc1",
            width: 0.75 * width,
            marginLeft: 0.125 * width,
            marginRight: 0.25 * width,
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
            width: 0.75 * width,
            marginLeft: 0.125 * width,
            marginRight: 0.25 * width,
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
            <TouchableOpacity style={{ marginRight: 8 }}>
              <Image
                style={{ height: 20, width: 20 }}
                source={require("./assets/delete.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={{ height: 20, width: 20 }}
                source={require("./assets/eye.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </DisableKeyboard>
  );
}
