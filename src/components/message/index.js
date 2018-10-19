/**
 *
 * @format
 * @flow
 */
import React, { Component } from 'react'
import {
  Animated,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from 'react-native'
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

class MessageElementComponent extends Component<Props> {
  _defaultTransition = 250

  state = {
    _translateXValue: new Animated.Value(0),
  }

  componentDidMount() {
    this.shakeAnimation()
  }

  shakeAnimation() {
    const { _translateXValue } = this.state

    const { timing, sequence } = Animated

      sequence([
        timing(_translateXValue, {
          toValue: 25,
          duration: this._defaultTransition,
        }),
        timing(_translateXValue, {
          toValue: -25,
          duration: this._defaultTransition,
        }),
        timing(_translateXValue, {
          toValue: 0,
          duration: this._defaultTransition,
        }),
      ])
    .start()
  }

  render() {
    const { id, image, content, author, likes_count: likesCount } = this.props

    return (
      <Animated.View
        style={{
          transform: [{ translateX: this.state._translateXValue }],
        }}
      >
        <View style={styles.messagesContainer}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 100, height: 100 }}
            />
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
      </Animated.View>
    )
  }
}

export default MessageElementComponent
