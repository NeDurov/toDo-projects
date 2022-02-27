import React, { useState, useEffect, useRef } from "react";
import { TextInput, View, Animated } from "react-native";
import { LinearProgress } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Auth({ navigation }) {
	const [Login, setLogin] = useState();
	const [Password, setPassword] = useState();
	const [progress, setProgress] = useState(0);

	const animation = useRef(new Animated.Value(0)).current;
	const startAnimation = () => {
		Animated.timing(animation, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true,
		}).start();
	};

	useEffect(() => {
		let subs = true;
		if (progress < 1 && progress !== 0) {
			setTimeout(() => {
				if (subs) {
					setProgress(progress + 0.1);
				}
			}, 100);
		}
		return () => {
			subs = false;
		};
	}, [progress]);

	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<View style={{ flexDirection: "column", height: 80 }}>
				<View
					style={{ flexDirection: "row", flex: "1", alignItems: "flex-start" }}
				>
					<Icon name="account-circle" size={30} color="#000" />
					<TextInput
						style={{ fontSize: 24 }}
						value={Login}
						placeholder="Login"
						onChangeText={setLogin}
					/>
				</View>

				<View
					style={{ flexDirection: "row", flex: "1", alignItems: "flex-start" }}
				>
					<Icon name="onepassword" size={30} color="#000" />
					<TextInput
						style={{ fontSize: 24 }}
						value={Password}
						placeholder="Password"
						onChangeText={setPassword}
						secureTextEntry={true}
					/>
				</View>
			</View>

			<Icon
				name="login"
				size={30}
				color="#000"
				onPress={() => {
					startAnimation();
					setProgress(0.00001);
					navigation.navigate("ToDoList");
				}}
			/>
			<Animated.View style={{ width: "100%", opacity: animation }}>
				<LinearProgress value={progress} variant="determinate" />
			</Animated.View>
		</View>
	);
}
