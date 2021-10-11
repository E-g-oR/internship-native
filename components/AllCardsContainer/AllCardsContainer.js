import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Post from "../Card/Card";

const AllCardsContainer = () => {
	const [fetching, setFetching] = useState(true)
	const [posts, setPosts] = useState(null)
	const putPosts = (data) => {
		setPosts(prev => prev = data)
		console.log(posts);
	}
	const requestPosts = async () => {
		const RESP = await fetch('https://jsonplaceholder.typicode.com/posts')
		const DATA = await RESP.json()
		putPosts(DATA)
		setFetching(false)
	}
	useEffect(() => {
		requestPosts()
	}, [fetching])
	return (
		<View style={styles.AllCardsContainer}>
			{posts
				?
				<ScrollView>
					{posts.map(post =>
						<Post
							key={post.id}
							title={post.title}
							body={post.body}
						/>
					)}
				</ScrollView>

				: <ActivityIndicator />}
		</View>
	)
}

export default AllCardsContainer

const styles = StyleSheet.create({
	AllCardsContainer: {
		height: 350,
		borderColor: '#ef5350',
		borderWidth: 2,
		paddingVertical: 7
	}
});