/**
 *
 * @format
 * @flow
 */
import React, { PureComponent } from 'react'
import { View, Text, KeyboardAvoidingView} from 'react-native'
import { MessageInputComponent, MessagesViewComponet } from '../../components'
import { _retrieveData } from '../../utils/async-storage'
import { createMessage, getMessages } from '../../utils/api'
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
      messages: [],
    }
  }

  async componentDidMount() {
    this.fetchMessages()
    listener = this.props.navigation.addListener('didFocus', () =>
      this.onTabEnter()
    )
  }

  componentWillUnmount() {
    listener.remove()
  }

  onTabEnter = () => {
    this.fetchMessages()
  }

  fetchMessages = async () => {
    this.setState({ fetching: true })

    await this.getUserData()
    const messages = await getMessages()

    this.setState({
      messages: messages.data,
      fetching: false,
    })
  }

  sendMessage = async text => {
    const { username, photo } = this.state

    try {
      await createMessage(text, username, photo)
      await this.fetchMessages()
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
    const { messages, error, fetching } = this.state

    return (
      <View style={styles.chatContainer}>
        <View style={styles.messagesContainer}>
          <MessagesViewComponet messages={messages} loading={fetching} />
        </View>

        <KeyboardAvoidingView style={styles.messageInputWrapper}>
          <Text style={styles.errorMessage}>{error}</Text>
          <MessageInputComponent
            sendMessage={this.sendMessage}
            attachPhoto={this.attachPhoto}
          />
        </KeyboardAvoidingView>
      </View>
    )
  }
}

export default ChatScreen
