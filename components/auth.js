import React, { useState, useRef, useEffect } from "react";
import { TextInput, View, Animated, Text, SafeAreaView } from "react-native";

export default function Auth({ navigation }) {
	const [phoneNumber, setPhoneNumber] = useState("");

	const fadeAnimWriteYourPhonePlease = useRef(new Animated.Value(0)).current;
	const fadeIn = () => {
		// Will change fadeAnim value to 1 in 5 seconds
		Animated.timing(fadeAnimWriteYourPhonePlease, {
			toValue: 1,
			duration: 5000,
			useNativeDriver: true,
		}).start();
	};
	useEffect(() => {
		fadeIn();
		moveAuth();
		moveWorkspace();
		moveNumber();
	}, []);

	const moveAnimationAuth = useRef(new Animated.Value(-180)).current;
	const moveAuth = () => {
		Animated.timing(moveAnimationAuth, {
			toValue: 0,
			duration: 3000,
			useNativeDriver: true,
		}).start();
	};

	const moveAnimationWorkspace = useRef(new Animated.Value(350)).current;
	const moveWorkspace = () => {
		Animated.timing(moveAnimationWorkspace, {
			toValue: 0,
			duration: 3000,
			useNativeDriver: true,
		}).start();
	};

	const moveAnimationNumber = useRef(new Animated.Value(500)).current;
	const moveNumber = () => {
		Animated.timing(moveAnimationNumber, {
			toValue: 0,
			duration: 3000,
			useNativeDriver: true,
		}).start();
	};

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
			<Animated.Text
				style={{
					fontSize: 30,
					transform: [{ translateX: moveAnimationAuth }],
				}}
			>
				{"Авторизация"}
			</Animated.Text>
			<Animated.Text
				style={{
					fontSize: 50,
					fontWeight: "bold",
					transform: [{ translateX: moveAnimationWorkspace }],
				}}
			>
				{"Цифровое рабочее место"}
			</Animated.Text>
			<Animated.Text
				style={{
					fontSize: 20,
					marginTop: 40,
					color: "#808080",
					opacity: fadeAnimWriteYourPhonePlease,
				}}
			>
				{"Введите Ваш номер телефона"}
			</Animated.Text>
			<Animated.View
				style={{
					marginTop: 60,
					flexDirection: "row",
					transform: [{ translateY: moveAnimationNumber }],
				}}
			>
				<Text
					style={{
						fontSize: 40,
					}}
				>
					{"+7"}
				</Text>
				<TextInput
					style={{
						fontSize: 40,
					}}
					value={phoneNumber}
					onChangeText={(text) => setNormalizePhoneNumber(text)}
					placeholder=" (999) 999-99-99"
					keyboardType="numeric"
					maxLength={16}
					textContentType="telephoneNumber"
				/>
			</Animated.View>
		</SafeAreaView>
	);
}
