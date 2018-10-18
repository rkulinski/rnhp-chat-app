/**
 *
 * @format
 * @flow
 */
import React, { PureComponent } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { MessageInputComponent, MessagesViewComponent } from '../../components'
import { retrieveData } from '../../utils/async-storage'
import { createMessage, getMessages } from '../../utils/api'
import { USERNAME_STORAGE_KEY, NICK_STORAGE_KEY } from '../config'

import styles from './styles'

const INFO_ABOUT_CREDENTIALS = 'Please provide credentials in Config tab'
let listener: any

type Props = {
  navigation: any,
}

type State = {
  username: string,
  nick: string,
  error: string,
  fetching: boolean,
  photo: string,
  messages: any[],
}

class ChatScreen extends PureComponent<Props, State> {
  static navigationOptions = {
    title: 'Chat',
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      username: '',
      nick: '',
      error: '',
      fetching: false,
      photo: '',
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

  sendMessage = async (text: string) => {
    const { username, photo } = this.state

    try {
      await createMessage(text, username, photo)
      await this.fetchMessages()
    } catch (err) {
      console.log(err)
    }
  }

  attachPhoto = (photo: string) => {
    this.setState({ photo })
  }

  getUserData = async () => {
    const username = await retrieveData(USERNAME_STORAGE_KEY)
    const nick = await retrieveData(NICK_STORAGE_KEY)

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
          <MessagesViewComponent messages={messages} loading={fetching} />
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
