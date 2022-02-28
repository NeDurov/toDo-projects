import React, { useState } from "react";
import { TextInput, View, Animated, Text, SafeAreaView } from "react-native";

export default function Auth({ navigation }) {
	const [phoneNumber, setPhoneNumber] = useState("");

	const setNormalizePhoneNumber = function (text) {
		if (phoneNumber.length < text.length) {
			number = text[text.length - 1];
			let normalizeCounter = phoneNumber.length;
			switch (normalizeCounter) {
				case 0:
					setPhoneNumber(" (" + number);
					break;
				case 4:
					setPhoneNumber(phoneNumber.concat(number + ") "));
					break;
				case 10:
				case 13:
					setPhoneNumber(phoneNumber.concat("-" + number));
					break;
				default:
					setPhoneNumber(phoneNumber.concat(number));
					break;
			}
		} else {
			setPhoneNumber(text);
		}
	};

	return (
		<SafeAreaView style={{ marginStart: 30, marginVertical: 60 }}>
			<Text style={{ fontSize: 30 }}>{"Авторизация"}</Text>
			<Text style={{ fontSize: 50, fontWeight: "bold" }}>
				{"Цифровое рабочее место"}
			</Text>
			<Text style={{ fontSize: 20, marginTop: 40, color: "#808080" }}>
				{"Введите Ваш номер телефона"}
			</Text>
			<View style={{ marginTop: 60, flexDirection: "row" }}>
				<Text style={{ fontSize: 40 }}>{"+7"}</Text>
				<TextInput
					style={{ fontSize: 40 }}
					value={phoneNumber}
					onChangeText={(text) => setNormalizePhoneNumber(text)}
					placeholder=" (999) 999-99-99"
					keyboardType="numeric"
					maxLength={16}
					textContentType="telephoneNumber"
				/>
			</View>
		</SafeAreaView>
	);
}
