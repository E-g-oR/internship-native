import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Paragraph, Title, TouchableRipple } from "react-native-paper";
import store from "../../../store/store";
import Post, { IPost } from "../../UI/Card/Card";

const CardDetails: React.FC<{ post: IPost }> = ({ post }) => {
	return (
		<View style={styles.CardDetails} >
			<Title>{post.title}</Title>
			<Paragraph>{post.body}</Paragraph>
		</View>
	)
}
export default CardDetails

const styles = StyleSheet.create({
	CardDetails: {
		borderColor: '#ffca28',
		borderWidth: 2,
		marginVertical: 15
	}
});