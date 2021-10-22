import React from "react";
import { View, StyleSheet } from "react-native";
import { Paragraph, Title } from "react-native-paper";
import { IPost } from "../../UI/Card/CardLogic";

const CardDetails: React.FC<{ post: IPost }> = ({ post }) => {
	return (
		<View style={styles.CardDetails} >
			<Title>{post.title}</Title>
			<Paragraph>{post.body}</Paragraph>
			<Paragraph>{post.location.latitude.toString()}</Paragraph>
			<Paragraph>{post.location.longtitude.toString()}</Paragraph>
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