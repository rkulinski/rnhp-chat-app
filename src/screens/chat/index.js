/**
 *
 * @format
 * @flow
 */
import React, { PureComponent, Provider } from 'react'
import {
  View,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { MessageInputComponent, MessagesViewComponent } from '../../components'
import { retrieveData } from '../../utils/async-storage'
import { createMessage, getMessages } from '../../utils/api'
import { UserContext } from './user-context'
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
    this.messageInputRef = React.createRef()
  }

  async componentDidMount() {
    const { navigation } = this.props

    this.fetchMessages()
    listener = navigation.addListener('didFocus', () => this.onTabEnter())
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
    const newMessages = await getMessages()
    const reversedMessages = newMessages.data.reverse()

    this.setState(() => ({
      messages: reversedMessages,
      fetching: false,
    }))
  }

  sendMessage = async (text: string) => {
    const { username, photo } = this.state

    try {
      await createMessage(text, username, photo)
      this.clearMessageInput()
      await this.fetchMessages()
    } catch (err) {
      console.log(err)
    }
  }

  clearMessageInput = () => {
    this.messageInputRef.current.clearFields()
    Keyboard.dismiss()
    this.setState({ photo: '' })
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

  renderInputView = () => {
    const { error } = this.state

    return (
      <View style={styles.messageInputWrapper}>
        <Text style={styles.errorMessage}>{error}</Text>
        <MessageInputComponent
          ref={this.messageInputRef}
          sendMessage={this.sendMessage}
          attachPhoto={this.attachPhoto}
        />
      </View>
    )
  }

  render() {
    const { messages, fetching, username } = this.state

    return (
      <View style={styles.chatContainer}>
        <View style={styles.messagesContainer}>
          <UserContext.Provider value={username}>
            <MessagesViewComponent
              messages={messages}
              loading={fetching}
              fetchData={this.fetchMessages}
            />
          </UserContext.Provider>
        </View>

        {Platform.OS === 'ios' ? (
          <KeyboardAvoidingView behavior="padding" enabled>
            {this.renderInputView()}
          </KeyboardAvoidingView>
        ) : (
          this.renderInputView()
        )}
      </View>
    )
  }
}

export default ChatScreen
