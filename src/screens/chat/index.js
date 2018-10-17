/**
 *
 * @format
 * @flow
 */
import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import { MessageInputComponent, MessagesViewComponet } from '../../components'
import { _retrieveData } from '../../utils/async-storage'
import { createMessage } from '../../utils/api'
import { USERNAME_STORAGE_KEY, NICK_STORAGE_KEY } from '../config'

const INFO_ABOUT_CREDENTIALS = 'Please provide credentials in Config tab'
let listener: any

import styles from './styles'

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
      fetching: false,
      photo: null,
    }
  }

  async componentDidMount() {
    this.onInit()
    listener = this.props.navigation.addListener('didFocus', () =>
      this.onTabEnter()
    )
  }

  componentWillUnmount() {
    listener.remove()
  }

  onTabEnter = () => {
    this.onInit()
  }

  onInit = async () => {
    await this.getUserData()
  }

  sendMessage = async text => {
    const { username, photo } = this.state

    try {
      await createMessage(text, username, photo)
    } catch (err) {
      console.log(err)
    }
  }

  attachPhoto = photo => {
    this.setState({ photo })
  }

  getUserData = async () => {
    const username = await _retrieveData(USERNAME_STORAGE_KEY)
    const nick = await _retrieveData(NICK_STORAGE_KEY)

    if (!username) {
      this.setState({ error: INFO_ABOUT_CREDENTIALS })
    } else {
      this.setState({
        username,
        nick,
        error: '',
      })
    }
  }

  render() {
    return (
      <View style={styles.chatContainer}>
        <MessagesViewComponet />
        <Text>{this.state.error}</Text>
        <View style={styles.messageInputWrapper}>
          <MessageInputComponent
            sendMessage={this.sendMessage}
            attachPhoto={this.attachPhoto}
          />
        </View>
      </View>
    )
  }
}

export default ChatScreen
