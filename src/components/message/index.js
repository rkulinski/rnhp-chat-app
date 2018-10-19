/**
 *
 * @format
 * @flow
 */
import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { likeMessage } from '../../utils/api'
import { UserContext } from '../../screens/chat/user-context'

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
  },
})

type Props = {
  id: string,
  image: string,
  content: string,
  author: string,
  likes_count: number,
}

const MessageElementComponent = ({
  id,
  image,
  content,
  author,
  likes_count: likesCount,
}: Props) => (
  <View style={styles.messagesContainer}>
    {image && (
      <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
    )}
    <Text>{content}</Text>
    <View style={styles.captionContainer}>
      <Text style={styles.author}>{author}</Text>
      <View style={styles.likeContainer}>
        <UserContext.Consumer>
          {username => (
            <TouchableOpacity
              style={styles.likeButton}
              onPress={() => {
                likeMessage(id, username)
              }}
            >
              <Icon name="ios-thumbs-up" size={35} />
            </TouchableOpacity>
          )}
        </UserContext.Consumer>
        <Text>{likesCount}</Text>
      </View>
    </View>
  </View>
)

export default MessageElementComponent
