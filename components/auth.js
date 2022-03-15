import React, { useState, useRef, useEffect } from "react";
import {
	TextInput,
	Button,
	Animated,
	Text,
	SafeAreaView,
	Alert,
} from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Notification
Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
});

export default function Auth({ navigation }) {
	const [user, setUser] = useState("");

	const [expoPushToken, setExpoPushToken] = useState("");
	const [notification, setNotification] = useState(false);

	//Notification
	const notificationListener = useRef();
	const responseListener = useRef();

	const [phoneNumber, setPhoneNumber] = useState("");
	const [visibleButtonSend, setVisibleButtonSend] = useState(true);

	const fadeAnimWriteYourPhonePlease = useRef(new Animated.Value(0)).current;
	const fadeWriteYourPhonePlease = () => {
		Animated.timing(fadeAnimWriteYourPhonePlease, {
			toValue: 1,
			duration: 5000,
			useNativeDriver: true,
		}).start();
	};

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

	useEffect(() => {
		setVisibleButtonSend(phoneNumber.length === 16 ? false : true);
	}, [phoneNumber]);

	useEffect(() => {
		fadeWriteYourPhonePlease();
		moveAuth();
		moveWorkspace();
		moveNumber();
		readUser();

		//Notification
		registerForPushNotificationsAsync().then((token) =>
			setExpoPushToken(token)
		);

		notificationListener.current =
			Notifications.addNotificationReceivedListener((notification) => {
				setNotification(notification);
			});

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener((response) => {
				console.log(response);
			});

		return () => {
			Notifications.removeNotificationSubscription(
				notificationListener.current
			);
			Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, []);

	// user
	async function readUser() {
		const userParams = await AsyncStorage.getItem("user");

		if (userParams) {
			await setUser(userParams);
		}
	}
	async function authUser() {
		const _id = Math.random().toString(36).substring(7);
		const userParams = { _id, phoneNumber };
		await AsyncStorage.setItem("user", JSON.stringify(userParams));
		setUser(userParams);
	}

	//Notification
	async function registerForPushNotificationsAsync() {
		let token;
		if (Constants.isDevice) {
			const { status: existingStatus } =
				await Notifications.getPermissionsAsync();
			let finalStatus = existingStatus;
			if (existingStatus !== "granted") {
				const { status } = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}
			if (finalStatus !== "granted") {
				alert("Failed to get push token for push notification!");
				return;
			}
			token = (await Notifications.getExpoPushTokenAsync()).data;
			// console.log(token);
		} else {
			alert("Must use physical device for Push Notifications");
		}

		if (Platform.OS === "android") {
			Notifications.setNotificationChannelAsync("default", {
				name: "default",
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: "#FF231F7C",
			});
		}

		return token;
	}

	const sendCode = (token) => {
		fetch("https://exp.host/--/api/v2/push/send", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Accept-encoding": "gzip, deflate",
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				to: token,
				sound: "default",
				title: "Цифровое рабочее место",
				body: `Ваш код для авторизации: ${1234}`,
			}),
		});
	};

	const setNormalizePhoneNumber = function (text) {
		if (phoneNumber.length < text.length) {
			let number = text[text.length - 1];
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
	if (!user) {
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
				<Animated.View
					style={{
						marginEnd: 30,
						marginTop: 50,
						opacity: fadeAnimWriteYourPhonePlease,
					}}
				>
					<Button
						disabled={visibleButtonSend}
						title="Выслать код"
						onPress={() => {
							sendCode(expoPushToken);
							// KeyEvent.onKeyUpListener((keyEvent) => {
							// 	setCodeFromNotifi(codeFromNotifi + 1);
							// });
							Alert.prompt(
								"Введите код проверки",
								"Сообщение с кодом проверки отправлено на Ваш номер телефона. Введите код чтобы продолжить",

								[
									{
										text: "Подтвердить",
										onPress: async () => {
											await authUser();

											navigation.navigate("ToDoList");
										},
									},
									{ text: "Отменить", onPress: () => {} },
								],
								"plain-text"
							);
						}}
					/>
				</Animated.View>
			</SafeAreaView>
		);
	} else {
		return (
			<SafeAreaView
				style={{
					alignItems: "center",
					justifyContent: "center",
					height: "100%",
				}}
			>
				<Button
					title="Сменить пользователя?"
					onPress={() => {
						AsyncStorage.removeItem("user");
						setPhoneNumber("");
						setUser(null);
					}}
				></Button>
			</SafeAreaView>
		);
	}
}
