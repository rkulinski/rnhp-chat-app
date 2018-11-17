/**
 *
 * @format
 * @flow
 */
import React, { PureComponent } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import MessageElementComponent from '../message'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
})

type Props = {
  messages: string[],
  loading: boolean,
  fetchData: () => {},
}

const keyExtractor = item => `${item.id}`

class MessageViewComponent extends PureComponent<Props> {
  render() {
    const { messages, loading, fetchData } = this.props

    return (
      <View style={styles.container}>
        <FlatList
          inverted
          data={messages}
          keyExtractor={keyExtractor}
          renderItem={({ item }) => <MessageElementComponent {...item} />}
          onRefresh={fetchData}
          refreshing={loading}
        />
      </View>
    )
  }
}

export default MessageViewComponent
