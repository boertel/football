import React, { Component } from "react";
import { values } from "lodash";
import { connect } from "react-redux";

import { createOrUpdateBet } from "../resources/bet";
import { updateGame } from "../resources/games";

class ScoreInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.format(this.props.value),
      saving: false,
      saved: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: this.format(nextProps.value) });
    }
  }

  format = (v) => {
    if (this.props.disabled) {
      return v;
    } else {
      return v === null || isNaN(parseInt(v, 10)) ? "" : parseInt(v, 10);
    }
  };

  onChange = (evt) => {
    this.setState({ value: this.format(evt.target.value) });
  };

  onBlur = (evt) => {
    const { name, gameId, is_superuser, locked } = this.props;
    const { value } = this.state;

    if (!isNaN(parseInt(value, 10))) {
      if (this.props.value !== value) {
        this.saving();
        if (is_superuser && locked) {
          this.props.updateGame(gameId, { [name]: value }).then(this.done);
        } else {
          this.props
            .createOrUpdateBet(gameId, { [name]: value })
            .then(this.done);
        }
      }
    }
  };

  saving = () => this.setState({ saving: true });
  done = () => this.setState({ saving: false, saved: true });

  onClick = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    this.setState({
      saving: false,
      saved: false,
    });
    return false;
  };

  render() {
    const {
      betId,
      gameId,
      createOrUpdateBet,
      updateGame,
      locked,
      is_superuser,
      ...rest
    } = this.props;

    const { saving, saved } = this.state;

    const disabled = !is_superuser ? saving || rest.disabled : false;

    return (
      <div className="score-input">
        <input
          type="text"
          onChange={this.onChange}
          onClick={this.onClick}
          {...rest}
          placeholder={locked ? "?" : null}
          disabled={disabled}
          onBlur={this.onBlur}
          value={this.state.value}
          pattern="[0-9]*"
          autoComplete="off"
        />
        <div className={`async-status${saved ? " saved" : ""}`}>
          {saving && "saving"}
          {saved && "saved"}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const userId = state.auth.id;
  const { gameId } = ownProps;

  const bet =
    values(state.bet).find(
      (bet) => bet.user.id === userId && bet.game.id === gameId
    ) || {};
  let value = bet[ownProps.name];

  const is_superuser = state.user[state.auth.id].is_superuser;
  const game = state.games[gameId];
  if (game.locked) {
    value = "";
  }
  if (game[ownProps.name] !== null) {
    value = game[ownProps.name];
  }
  return {
    value,
    locked: game.locked,
    is_superuser,
  };
};

export default connect(mapStateToProps, { createOrUpdateBet, updateGame })(
  ScoreInput
);
