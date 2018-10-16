/**
 *
 * @format
 * @flow
 */
import React, { Component } from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import ChatScreen from './screens/chat'
import ConfigScreen from './screens/config'

const AppNavigator = createBottomTabNavigator(
  {
    Chat: ChatScreen,
    Config: ConfigScreen,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state
        let iconName: string

        if (routeName === 'Chat') {
          iconName = 'ios-contacts'
        } else if (routeName === 'Config') {
          iconName = 'ios-cog'
        }

        return (
          <Icon name={iconName} size={horizontal ? 20 : 25} color={tintColor} />
        )
      },
    }),
    tabBarOptions: {
      activeTintColor: 'green',
      inactiveTintColor: 'gray',
    },
  }
)

const AppContext = React.createContext()

class AppProvider extends Component {
  appState = {
    username: '',
    nick: '',
    updateUsername: input => {
      this.setState({ username: input })
    },
    updateNick: input => {
      this.setState({ nick: input })
    },
  }

  render() {
    return <AppContext.Provider value={this.appState} />
  }
}

export default () => <AppNavigator />
