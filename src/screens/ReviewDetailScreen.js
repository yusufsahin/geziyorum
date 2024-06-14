import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createComment } from '../store/reviewSlice';

const ReviewDetailScreen = ({ route }) => {
  const { reviewId } = route.params;
  const review = useSelector(state => state.reviews.find(r => r.id === reviewId));
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const handleAddComment = () => {
    if (comment.trim() === '') {
      return;
    }

    dispatch(createComment({ reviewId, comment }));
    setComment('');
  };

  if (!review) {
    return (
      <View style={styles.container}>
        <Text>Review not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{review.title}</Text>
      <Text>{review.description}</Text>
      {review.image && <Image source={{ uri: review.image.uri }} style={styles.image} />}
      <Text style={styles.location}>Location: {review.location.latitude}, {review.location.longitude}</Text>
      <FlatList
        data={review.comments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.comment}>{item}</Text>}
      />
      <TextInput
        placeholder="Add a comment"
        value={comment}
        onChangeText={setComment}
        style={styles.input}
      />
      <Button title="Add Comment" onPress={handleAddComment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 12,
  },
  location: {
    marginBottom: 12,
  },
  comment: {
    backgroundColor: '#f1f1f1',
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
});

export default ReviewDetailScreen;
