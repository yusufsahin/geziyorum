import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReviews } from '../store/reviewSlice';

const HomeScreen = ({ navigation }) => {
  const reviews = useSelector(state => state.reviews);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchReviews())
  }, [dispatch]);

  return (
    <View>
      <Button title="Add Review" onPress={() => navigation.navigate('AddReview')} />
      <FlatList
        data={reviews}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ReviewDetail', { reviewId: item.id })}>
            <Text>{item.title}</Text>
            <Text>{item.Description}</Text>
          </TouchableOpacity>)}
      />
    </View>
  )
}

export default HomeScreen