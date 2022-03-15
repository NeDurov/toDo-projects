import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Auth from "../components/auth";
import ToDoList from "../components/toDoList";
import Chat from "../components/chat";

const Stack = createNativeStackNavigator();

export default function Routers() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name="Auth" component={Auth} />
				<Stack.Screen name="ToDoList" component={ToDoList} />
				<Stack.Screen name="Chat" component={Chat} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
