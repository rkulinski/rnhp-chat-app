import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import MessageElementComponent from '../message'

const styles = StyleSheet.create({
  container: {},
})

const MessageViewComponent = ({ loading, messages }) => (
  <View style={styles.container}>
    {loading ? (
      <Text>Loading</Text>
    ) : (
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <MessageElementComponent key={item.id} {...item} />
        )}
      />
    )}
  </View>
)

export default MessageViewComponent
