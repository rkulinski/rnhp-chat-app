import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  chatContainer: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  errorMessage: {
    color: 'red',
  },
  messagesContainer: {
    flex: 3,
  },
  messageInputWrapper: {
    flex: 1,
  },
})
