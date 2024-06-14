import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async () => {
  const response = await axios.get('http://192.168.1.13:3000/reviews');
  return response.data;
});

export const createReview = createAsyncThunk('reviews/createReview', async (review) => {
  const response = await axios.post('http://192.168.1.13:3000/reviews', review);
  return response.data;
});

export const createComment = createAsyncThunk('reviews/createComment', async ({ reviewId, comment }) => {
  const response = await axios.patch(`http://192.168.1.13:3000/reviews/${reviewId}`, { comments: [comment] });
  return { reviewId, comment };
});

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(createComment.fulfilled, (state, action) => {
        const { reviewId, comment } = action.payload;
        const review = state.find(review => review.id === reviewId);
        if (review) {
          review.comments.push(comment);
        }
      });
  },
});

export default reviewsSlice.reducer;

