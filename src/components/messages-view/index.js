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
  constructor(props: Props) {
    super(props)

    this.messageListRef = React.createRef()
  }

  scrollListToBottom = () => {
    this.messageListRef.current.scrollToEnd()
  }

  render() {
    const { messages } = this.props

    return (
      <View style={styles.container}>
        <FlatList
          data={messages}
          renderItem={({ item }) => <MessageElementComponent {...item} />}
          keyExtractor={keyExtractor}
          ref={this.messageListRef}
        />
      </View>
    )
  }
}

export default MessageViewComponent
