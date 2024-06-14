import { View, Text } from 'react-native'
import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import AddReviewScreen from './src/screens/AddReviewScreen';
import ReviewDetailScreen from './src/screens/ReviewDetailScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './src/store/store';


const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddReview" component={AddReviewScreen} />
        <Stack.Screen name="ReviewDetail" component={ReviewDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
  )
}

export default App