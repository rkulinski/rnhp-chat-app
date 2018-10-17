/**
 *
 * @format
 * @flow
 */
import React, { PureComponent } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
  messageInputWrapper: {
    flexDirection: 'row',
    width: '100%',
    padding: 5,
  },
  messageInput: {
    borderWidth: 1,
    flexGrow: 1,
    borderRadius: 10,
    marginRight: 10,
    maxHeight: 150,
  },
  textInput: {
    flex: 1,
    alignItems: 'flex-start',
  },
  buttonsGroup: {
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  photo: {
    width: 50,
    height: 50,
  },
})

type Props = {
  attachPhoto: () => {},
  sendMessage: () => {},
}

type State = {
  message: string,
}

const imagePickerOptions = {
  title: 'Select photo',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
}

class MessageInputComponent extends PureComponent<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      message: '',
      photoSource: null,
    }
  }

  sendMessage = () => {
    this.props.sendMessage(this.state.message)
  }

  attachPhoto = () => {
    ImagePicker.showImagePicker(imagePickerOptions, response => {
      if (response.didCancel) {
      } else if (response.error) {
        alert('ImagePicker Error: ', response.error)
      } else {
        const source = { uri: 'data:image/jpeg;base64,' + response.data }

        this.props.attachPhoto(response.data)
        this.setState({ photoSource: source })
      }
    })
  }

  render() {
    const { message, photoSource } = this.state
    return (
      <View style={styles.messageInputWrapper}>
        <View style={styles.messageInput}>
        <TextInput
          multiline={true}
          style={styles.textInput}
          onChangeText={message => this.setState({ message })}
          value={message}
        />
        </View>
        <View style={styles.buttonsGroup}>
          <TouchableOpacity onPress={this.attachPhoto}>
            {photoSource ? (
              <Image source={photoSource} style={styles.photo} />
            ) : (
              <Icon name="ios-image" size={45} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={this.sendMessage}>
            <Icon name="ios-paper-plane" size={45} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default MessageInputComponent
