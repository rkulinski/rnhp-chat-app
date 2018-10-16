/**
 *
 * @format
 * @flow
 */
import React, { PureComponent } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
  messageInputWrapper: {
    flexDirection: 'row',
    width: '100%',
  },
  messageInput: {
    borderWidth: 1,
    flexGrow: 1,
  },
  buttonsGroup: {
    alignItems: 'flex-end',
    paddingLeft: 5,
    paddingRight: 5,
  },
})

type Props = {
  attachPhoto: () => {},
  sendMessage: () => {},
}

type State = {
  message: string,
}

class MessageInputComponent extends PureComponent<Props,State> {
  constructor(props) {
    super(props)

    this.state = {
      message: '',
    }
  }

  sendMessage = () => {
    this.props.sendMessage(this.state.message)
  }

  attachPhoto = () => {

  }

  render() {
    return (
      <View style={styles.messageInputWrapper}>
        <TextInput
          style={styles.messageInput}
          multiline={true}
          onChangeText={message => this.setState({ message })}
          value={this.state.message}
        />
        <View style={styles.buttonsGroup}>
          <TouchableOpacity onPress={this.attachPhoto}>
            <Icon name="ios-camera" size={50} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.sendMessage}>
            <Icon name="ios-arrow-round-forward" size={50} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default MessageInputComponent
