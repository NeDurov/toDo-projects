import React, { useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";

// import { db } from "../firebase";

export default function Chat() {
	const [messages, setMessages] = useState([]);
	useEffect(() => {
		// setMessages(unsubscribe);
	}, []);
	return <GiftedChat />;
}
