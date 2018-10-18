/**
 *
 * @format
 * @flow
 */
import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import {
  Button,
  Card,
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements'
import { storeData, retrieveData } from '../../utils/async-storage'

const GENERIC_FIELD_ERROR_MSG = 'Please fill all parameters'
const GENERIC_ASYNC_ERROR_MSG =
  'Error while saving parameters. Please try again'
export const USERNAME_STORAGE_KEY = 'username'
export const NICK_STORAGE_KEY = 'nick'

type Props = {}

type State = {
  username: string,
  nick: string,
  error: string,
  fetching: boolean,
  savedUsername: string,
  savedNick: string,
}

class Config extends PureComponent<Props, State> {
  static navigationOptions = {
    title: 'Configuration',
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      username: '',
      nick: '',
      error: '',
      fetching: false,
      savedUsername: '',
      savedNick: '',
    }
  }

  async componentDidMount() {
    const savedUsername = await retrieveData(USERNAME_STORAGE_KEY)
    const savedNick = await retrieveData(NICK_STORAGE_KEY)

    if (savedUsername && savedNick) {
      this.setState({
        savedUsername,
        savedNick,
        username: savedUsername,
        nick: savedNick,
      })
    }
  }

  saveUserData = async () => {
    const { username, nick } = this.state

    this.setState({ fetching: true })

    if (!username || !nick) {
      this.setState({ error: GENERIC_FIELD_ERROR_MSG })
      return
    }

    try {
      await storeData(USERNAME_STORAGE_KEY, username)
      await storeData(NICK_STORAGE_KEY, nick)
      this.setState({
        savedUsername: username,
        savedNick: nick,
      })
    } catch (error) {
      this.setState({ error: GENERIC_ASYNC_ERROR_MSG })
    }
    this.setState({ fetching: false })
  }

  userNameInputHandler = (value: string) => {
    this.setState({ username: value, error: '' })
  }

  nickInputHandler = (value: string) => {
    this.setState({ nick: value, error: '' })
  }

  render() {
    const {
      error,
      fetching,
      username,
      nick,
      savedNick,
      savedUsername,
    } = this.state

    return (
      <View>
        <FormLabel>Username:</FormLabel>
        <FormInput onChangeText={this.userNameInputHandler} value={username} />

        <FormLabel>Nick:</FormLabel>
        <FormInput onChangeText={this.nickInputHandler} value={nick} />

        <FormValidationMessage>{error}</FormValidationMessage>

        <Button
          large
          raised
          backgroundColor="#4286f4"
          icon={{ name: 'cached' }}
          title="Save user data"
          loading={fetching}
          onPress={this.saveUserData}
        />
        <Card title="Your current credentials:">
          <Text>username: {savedUsername}</Text>
          <Text>nick: {savedNick}</Text>
        </Card>
      </View>
    )
  }
}

export default Config
