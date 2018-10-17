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
        <TextInput
          style={styles.messageInput}
          multiline={true}
          onChangeText={message => this.setState({ message })}
          value={message}
        />
        <View style={styles.buttonsGroup}>
          <TouchableOpacity onPress={this.attachPhoto}>
            {photoSource ? (
              <Image source={photoSource} style={styles.photo} />
            ) : (
              <Icon name="ios-camera" size={50} />
            )}
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
