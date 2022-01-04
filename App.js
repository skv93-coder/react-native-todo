import React, { useEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  Dimensions,
  Keyboard,
  Text,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import DisableKeyboard from "./component/DisableKeyboard";
import Mycheckbox from "./component/Mycheckbox";

export default function App() {
  const [isInputActive, setIsInputActive] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState({ list: [], count: 0 });
  const [startIndex, setStartIndex] = useState(0);
  const { width, height } = Dimensions.get("window");
  const handleKeyboardShow = () => {
    setIsInputActive((prev) => !prev);
  };

  const createTask = async (name) => {
    // Default options are marked with *
    Keyboard.dismiss();
    console.log(`name`, name);
    if (name.trim()) {
      setNewTask("");
      const body = await JSON.stringify({ name });
      console.log(`body`, body);
      const response = await fetch(`http://192.168.43.189:3000`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body, // body data type must match "Content-Type" header
      }).catch(() => {});
      return response.json(); // parses JSON response into native JavaScript objects  }
    }
  };
  const updateTask = async (status, id) => {
    const response = await fetch(`http://192.168.43.189:3000/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ status }), // body data type must match "Content-Type" header
    })
      .then(() => {
        setTasks((prev) => ({
          ...prev,
          list: prev?.list?.map((d) => (d?._id === id ? { ...d, status } : d)),
        }));
      })
      .catch(() => {});
  };
  const getTasks = (index = 0) => {
    console.log(`index`, index);
    if (index == 0 || index < tasks?.count) {
      setStartIndex(index);

      fetch(`http://192.168.43.189:3000?skip=${index}`)
        .then((res) => res.json())
        .then((res) => {
          setTasks((prev) => ({ ...res, list: [...prev?.list, ...res?.list] }));
          console.log(`res`, JSON.stringify(res));
        });
    }
  };
  useEffect(() => {
    getTasks();
    const showSubscription = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyboardShow
    );
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      handleKeyboardShow();
      // createTask(newTask);
    });

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
            // position: "absolute",
            // bottom: 0,
            // backgroundColor:'red'
          }}
        >
          <TextInput
            placeholder="Enter a task"
            value={newTask}
            onChangeText={(val) => setNewTask(val)}
            style={{
              backgroundColor: "#F4FAFB",
              width: isInputActive ? width * 0.8 : width * 0.9,
              height: height * 0.07,
              paddingTop: 4,
              paddingBottom: 4,
              paddingHorizontal: 8,
              margin: "auto",
              borderBottomColor: "#088000",
              borderWidth: 2,
            }}
            onSubmitEditing={(ev) => {
              console.log(`ev`, ev);
              createTask(newTask);
            }}
          />
          {isInputActive && (
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: 8,
              }}
              onPress={() => {
                console.log(`ev`, newTask);
                createTask(newTask);
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
        <FlatList
          keyExtractor={(item) => item?._id}
          data={tasks.list}
          onEndReachedThreshold={0.1}
          onEndReached={getTasks.bind(null, startIndex + 10)}
          renderItem={(data) => (
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
                <Text style={{}} ellipsizeMode="tail" numberOfLines={1}>
                  {data?.item?.name?.length > 40
                    ? data?.item?.name.substring(0, 37) + "..."
                    : data?.item?.name}
                </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Mycheckbox
                  checked={!!data?.item?.status}
                  setChecked={() => {}}
                />
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </DisableKeyboard>
  );
}
