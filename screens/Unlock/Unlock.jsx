import { Button, View, Text } from "react-native";
import * as React from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Unlock({ navigation }) {
  const cabinet = useSelector((state) => state.cabinet);
  const phoneNum = useSelector((state) => state.phoneNum);
  console.log(cabinet, phoneNum, "from payment");
  function HandleConfirm() {
    let feedKey = "rc-servo-590-number-1";
    let bodyParameter = {
      value: 0,
    };
    let bodyServer = {
      state: "ready",
      id: cabinet,
    };
    console.log(bodyServer);
    const config = {
      headers: {
        "X-AIO-Key": "aio_YSxh54X6nv3Q4a2Cq5PB13fpwOa3",
      },
    };
    axios
      .post(
        `https://io.adafruit.com/api/v2/Leo1601/feeds/${feedKey}/data`,
        bodyParameter,
        config
      )
      .then((res) => {
        console.log(res.data, "unlock cabinet successful");
      })
      .catch((err) => console.log(err));
    axios
      .post(`http://192.168.1.11:3001/ChangeCabinetState`, bodyServer)
      .then((res) => {
        console.log(res.data, "update state cabinet server successful");
      });
    navigation.navigate("Finish");
  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Open door</Text>
      <Button title="Confirm" onPress={() => HandleConfirm()} />
    </View>
  );
}
