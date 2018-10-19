/**
 *
 * @format
 * @flow
 */
import React, { PureComponent } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import MessageElementComponent from '../message'

const styles = StyleSheet.create({
  container: {},
})

type Props = {
  messages: string[],
}

const keyExtractor = item => `${item.id}`

class MessageViewComponent extends PureComponent<Props> {
  render() {
    const { messages } = this.props

    return (
      <View style={styles.container}>
        <FlatList
          data={messages}
          renderItem={({ item }) => <MessageElementComponent {...item} />}
          keyExtractor={keyExtractor}
          removeClippedSubviews={false}
          inverted
        />
      </View>
    )
  }
}

export default MessageViewComponent
