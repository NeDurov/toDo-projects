import React, { useContext, useEffect } from "react";
import {
	FlatList,
	SafeAreaView,
	TouchableOpacity,
	View,
	Text,
} from "react-native";
import ButtonToggleGroup from "react-native-button-toggle-group";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ToDoList({ navigation }) {
	const [value, setValue] = React.useState("Важные");
	//! this and async work!!!

	useEffect(async () => {
		console.log(await AsyncStorage.getItem("user"));
	}, []);
	const DATA = [
		{
			id: "0001",
			date: "today",
			last: "sdfsdfsd",
		},
		{
			id: "0002",
			date: "yesterday",
			last: "sdlfksdfsd",
		},
		{
			id: "0003",
			date: "tomorrov",
			last: "asolkfskldf",
		},
		{
			id: "0004",
			date: "one week ago",
			last: "sdfgidsfgkj",
		},
	];

	const renderItem = ({ item }) => {
		return (
			<TouchableOpacity
				style={{
					maxHeight: 50,
					flexWrap: "wrap",
					alignContent: "space-between",
					borderBottomColor: "grey",
					borderBottomWidth: 1,
				}}
				onPress={() => {
					navigation.navigate("Chat");
				}}
			>
				<View>
					<Text style={{ fontSize: 24 }}>{`Задание№${
						item.id[item.id.length - 1]
					}`}</Text>
					<Text style={{ color: "grey", borderBottomWidth: 1 }}>
						{item.last}
					</Text>
				</View>
				<View>
					<Text style={{ color: "grey" }}>{item.date}</Text>
				</View>
			</TouchableOpacity>
		);
	};
	return (
		<SafeAreaView style={{ backgroundColor: "#ffffff", height: "100%" }}>
			<View
				style={{
					marginStart: 15,
					marginTop: 20,
					backgroundColor: `#e5e5ea`,
					height: 35,
					justifyContent: "center",
					borderRadius: 5,
					marginEnd: 15,
				}}
			>
				<ButtonToggleGroup
					style={{
						paddingStart: 2.5,
						paddingEnd: 2.5,
						height: 30,
					}}
					highlightBackgroundColor={"#fff"}
					inactiveTextColor={"#000"}
					values={["Важные", "Неважные", "Исходящие"]}
					value={value}
					onSelect={(val) => setValue(val)}
					textStyle={{ fontWeight: "bold" }}
				/>
			</View>
			<View
				style={{
					marginTop: 30,
					marginLeft: 15,
					marginRight: 15,
					height: "100%",
				}}
			>
				<FlatList
					data={DATA}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
				></FlatList>
			</View>
		</SafeAreaView>
	);
}
