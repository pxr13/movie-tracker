import axios from 'axios';
import { createAction } from 'redux-actions';

import {
  addFavoriteEndpoint,
  getDeleteFavoriteEndpoint
} from '../utils/endpoints';

export const addFavorite = (data) => {
  const {
    movie_id,
    user_id,
    title,
    overview,
    poster_path,
    release_date,
    vote_average
  } = data;
  axios.post(addFavoriteEndpoint, {
    movie_id,
    user_id,
    title,
    overview,
    poster_path,
    release_date,
    vote_average
  });
};

export const deleteFavorite = (data) => {
  const deleteFavoriteEndpoint = getDeleteFavoriteEndpoint(data);
  const { user_id, movie_id } = data;
  axios.delete(deleteFavoriteEndpoint, { user_id, movie_id });
};
