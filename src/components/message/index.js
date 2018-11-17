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
  Vibration,
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

const DEFAULT_TRANSITION_TIME = 250
const SHAKE_DELTA = 25

type Props = {
  id: string,
  image: string,
  content: string,
  author: string,
  likes_count: number,
}

type State = {
  _translateXValue: any,
}

class MessageElementComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      _translateXValue: new Animated.Value(0),
    }
  }

  componentDidMount() {
    this.shakeAnimation()
    Vibration.vibrate()
  }

  shakeAnimation() {
    const { _translateXValue } = this.state
    const { timing, sequence } = Animated
    const duration: number = DEFAULT_TRANSITION_TIME
    const shakeDelta: number = SHAKE_DELTA

    sequence([
      timing(_translateXValue, {
        toValue: shakeDelta,
        duration,
      }),
      timing(_translateXValue, {
        toValue: -shakeDelta,
        duration,
      }),
      timing(_translateXValue, {
        toValue: 0,
        duration,
      }),
    ]).start()
  }

  render() {
    const { id, image, content, author, likes_count: likesCount } = this.props
    const { _translateXValue } = this.state

    return (
      <Animated.View
        style={{
          transform: [{ translateX: _translateXValue }],
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
