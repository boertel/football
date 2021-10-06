import api from '../api';
import { keyBy, mapValues } from 'lodash';
import { LOAD as GAMES_LOAD } from './games';


export const LOAD = 'football/points/LOAD';

export const loadPoints = () => {
  return dispatch => {
    return api.get('/points/').then(response => {
      dispatch({
        type: LOAD,
        payload: keyBy(response.data, 'id'),
      });
    });
  }
}


const initialState = {};

export default function (state=initialState, action) {
  switch(action.type) {
    case LOAD:
      return {
        ...state,
        ...action.payload,
      }

    case GAMES_LOAD:
      let points = {};
      mapValues(action.payload, ({ group, }) => {
        points[group.points.id] = {
          ...state[group.points.id],
          ...group.points,
        }
      });
      return {
        ...state,
        ...points,
      }

    default:
      return state;
  }
}

