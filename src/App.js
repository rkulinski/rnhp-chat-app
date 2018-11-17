import React from 'react'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import { SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import ChatScreen from './screens/chat'
import ConfigScreen from './screens/config'

const withSafeAreaView = WrappedComponent =>
  // eslint-disable-next-line react/prefer-stateless-function
  class WithSafeAreaView extends React.Component {
    render() {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <WrappedComponent />
        </SafeAreaView>
      )
    }
  }

const TabNavigator = createBottomTabNavigator(
  {
    Chat: withSafeAreaView(ChatScreen),
    Config: withSafeAreaView(ConfigScreen),
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
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

export default createAppContainer(TabNavigator)
