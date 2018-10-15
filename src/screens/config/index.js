import React, { PureComponent } from 'react'
import { View } from 'react-native'
import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements'

const GENERIC_FIELD_ERROR_MSG = 'Please fill all parameters'

class Config extends PureComponent {
  static navigationOptions = {
    title: 'Configuration',
  }
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      nick: '',
      error: false,
      fetching: false,
    }
  }

  saveUserData = () => {
    const { username, nick } = this.state

    if (!username || !nick) {
      this.setState({ error: true })
    }
  }

  userNameInputHandler = value => {
    this.setState({ username: value, error: false })
  }

  nickInputHandler = value => {
    this.setState({ nick: value, error: false })
  }

  render() {
    const { error } = this.state

    return (
      <View>
        <FormLabel>Username:</FormLabel>
        <FormInput onChangeText={this.userNameInputHandler} />

        <FormLabel>Nick:</FormLabel>
        <FormInput onChangeText={this.nickInputHandler} />

        {error && (
          <FormValidationMessage>
            {GENERIC_FIELD_ERROR_MSG}
          </FormValidationMessage>
        )}

        <Button
          large
          raised
          backgroundColor="#4286f4"
          icon={{ name: 'cached' }}
          title="Save user data"
          onPress={this.saveUserData}
        />
      </View>
    )
  }
}

export default Config
