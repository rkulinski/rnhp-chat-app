import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements'
import { _storeData, _retrieveData } from '../../utils/async-storage'

const GENERIC_FIELD_ERROR_MSG = 'Please fill all parameters'
const GENERIC_ASYNC_ERROR_MSG =
  'Error while saving parameters. Please try again'
export const USERNAME_STORAGE_KEY = 'username'
export const NICK_STORAGE_KEY = 'nick'

class Config extends PureComponent {
  static navigationOptions = {
    title: 'Configuration',
  }
  constructor(props) {
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
    const savedUsername = await _retrieveData(USERNAME_STORAGE_KEY)
    const savedNick = await _retrieveData(NICK_STORAGE_KEY)

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
      await _storeData(USERNAME_STORAGE_KEY, username)
      await _storeData(NICK_STORAGE_KEY, nick)
      this.setState({
        savedUsername: username,
        savedNick: nick,
      })
    } catch (error) {
      this.setState({ error: GENERIC_ASYNC_ERROR_MSG })
    }
    this.setState({ fetching: false })
  }

  userNameInputHandler = value => {
    this.setState({ username: value, error: false })
  }

  nickInputHandler = value => {
    this.setState({ nick: value, error: false })
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

        <Text>Your current credentials:</Text>
        <Text>username: {savedUsername}</Text>
        <Text>nick: {savedNick}</Text>
      </View>
    )
  }
}

export default Config
