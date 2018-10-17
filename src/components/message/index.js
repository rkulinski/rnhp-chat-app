import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
  messagesContainer: {
    backgroundColor: '#d9dadd',
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  captionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  author: {
    fontWeight: 'bold',
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeButton: {
    paddingRight: 10,
  }
})

const MessageElementComponent = ({
  id,
  image,
  content,
  author,
  likes_count,
}) => (
  <View style={styles.messagesContainer}>
    {image && (
      <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
    )}
    <Text>{content}</Text>
    <View style={styles.captionContainer}>
      <Text style={styles.author}>{author}</Text>
      <View style={styles.likeContainer}>
        <TouchableOpacity style={styles.likeButton}>
        <Icon name="ios-thumbs-up" size={35} />
        </TouchableOpacity>
        <Text>{likes_count}</Text>
      </View>
    </View>
  </View>
)

export default MessageElementComponent
