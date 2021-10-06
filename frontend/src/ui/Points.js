import React from 'react';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { getStatus, proxy } from '../resources/utils';
import Badge from './Badge';


const Points = ({ status, points }) => points !== undefined ? <Badge className={status}>{points} points</Badge> : <div />

const mapStateToProps = (state, ownProps) => {
  const game = proxy(state.games[ownProps.gameId], state);
  const status = getStatus(game.score_a, game.score_b, game.bet);
  const points = get(game.group.points, status)
  return {
    status,
    points,
  }
}

export default connect(mapStateToProps)(Points);
