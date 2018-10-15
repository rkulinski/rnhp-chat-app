import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'

class ChatScreen extends PureComponent {
  static navigationOptions = {
    title: 'Chat',
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
        <Text>Chat screen</Text>
      </View>
    )
  }
}

export default ChatScreen
