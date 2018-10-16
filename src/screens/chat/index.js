import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import { _retrieveData } from '../../utils/async-storage'
import { USERNAME_STORAGE_KEY, NICK_STORAGE_KEY } from '../config'

const INFO_ABOUT_CREDENTIALS = 'Please provide credentials in Config tab'

class ChatScreen extends PureComponent {
  static navigationOptions = {
    title: 'Chat',
  }

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      nick: '',
      error: '',
    }
  }

  async componentDidMount() {
    const username = await _retrieveData(USERNAME_STORAGE_KEY)
    const nick = await _retrieveData(NICK_STORAGE_KEY)

    if (!username) {
      this.setState({ error: INFO_ABOUT_CREDENTIALS })
    }
    console.log(username)
    console.log(nick)
  }

  render() {
    return (
      <View>
        <Text>Chat screen</Text>

        <Text>{this.state.error}</Text>
      </View>
    )
  }
}

export default ChatScreen
