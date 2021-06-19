import axios from "axios";
import * as React from "react";
import { useEffect } from "react";
import { View, ScrollView } from "react-native";
import { DataTable } from "react-native-paper";

export default function Transactions({ navigation }) {
  const [trades, setTrades] = React.useState([]);
  useEffect(() => {
    async function getHistoryTrades() {
      await axios
        .get("http://localhost:3001/historyTrades")
        .then((res) => setTrades([...res.data]))
        .catch((err) => console.log(err));
    }
    getHistoryTrades();
  }, []);

  return (
    <ScrollView
      style={{ backgroundColor: "rgb(166, 233, 241)", marginHorizontal: 20 }}
    >
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>ID</DataTable.Title>
          <DataTable.Title>Time Arrive</DataTable.Title>
          <DataTable.Title>Time Leave</DataTable.Title>
          <DataTable.Title>Phone Number Of Sender</DataTable.Title>
          <DataTable.Title>Phone Number Of Receiver</DataTable.Title>
          <DataTable.Title>Fee</DataTable.Title>
          <DataTable.Title>User ID</DataTable.Title>
          <DataTable.Title>Cabinet Number</DataTable.Title>
        </DataTable.Header>
        {trades.map((trade) => (
          <DataTable.Row key={trade.ID}>
            <DataTable.Cell>{trade.ID}</DataTable.Cell>
            <DataTable.Cell>{trade.Time_Arrive}</DataTable.Cell>
            <DataTable.Cell>{trade.Time_Leave}</DataTable.Cell>
            <DataTable.Cell>{trade.PhoneNumSender}</DataTable.Cell>
            <DataTable.Cell>{trade.PhoneNumReceiver}</DataTable.Cell>
            <DataTable.Cell>5000VND</DataTable.Cell>
            <DataTable.Cell>{trade.User_ID}</DataTable.Cell>
            <DataTable.Cell>{trade.Cabinet_ID}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
}
