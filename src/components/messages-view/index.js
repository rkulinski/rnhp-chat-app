import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  messagesContainer: {},
})

const MessageViewComponent = () => (
  <View styles={styles.messagesContainer}>
    <Text>Fake message 1</Text>
  </View>
)

export default MessageViewComponent
