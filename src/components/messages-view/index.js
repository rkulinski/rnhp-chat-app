/**
 *
 * @format
 * @flow
 */
import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import MessageElementComponent from '../message'

const styles = StyleSheet.create({
  container: {},
})

type Props = {
  loading: boolean,
  messages: string[],
}


const keyExtractor = item => item.id;

const MessageViewComponent = ({ loading, messages }: Props) => (
  <View style={styles.container}>
    {loading ? (
      <Text>Loading</Text>
    ) : (
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <MessageElementComponent {...item} />
        )}
        keyExtractor={keyExtractor}
      />
    )}
  </View>
)

export default MessageViewComponent
