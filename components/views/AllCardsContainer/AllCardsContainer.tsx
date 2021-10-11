import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Post, { IPost } from "../../UI/Card/Card";
import { observer } from 'mobx-react'
import { IStore, PostsStore } from "../../../store/store";

const AllCardsContainer: React.FC<{ store: PostsStore }> = observer(({ store }) => {

	useEffect(() => {
		if (!store.allPosts.length) {
			store.getPosts()
		}
	}, [store])

	return (
		<View style={styles.AllCardsContainer}>
			{store.allPosts.length
				?
				<ScrollView>
					{store.allPosts.map(post =>
						<Post key={post.id} post={post} store={store} />
					)}
				</ScrollView>
				: <ActivityIndicator />}
		</View>
	)
})

export default AllCardsContainer

const styles = StyleSheet.create({
	AllCardsContainer: {
		height: 350,
		borderColor: '#ef5350',
		borderWidth: 2,
		paddingVertical: 7
	}
});