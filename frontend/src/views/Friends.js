import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { asyncConnect } from "../utils/components";
import { loadFriends, join, leave, create } from "../resources/friend";
import { Button, Leaderboard, TextInput } from "../ui";
import LeaderboardAll from "../views/LeaderboardAll";

import SelectFriends from "./SelectFriends";

const FriendList = connect((state, ownProps) => ({
  friend: state.friend[ownProps.id],
}))(({ friend, currentUserId, competition }) => {
  return (
    <div className="friend-list">
      <Leaderboard
        users={friend.members}
        currentUserId={currentUserId}
        competition={competition}
      >
        for {friend.name}
      </Leaderboard>
    </div>
  );
});

function Friends(props) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const { friendId } = useParams();

  const onChange = (value) => {
    let to = [".."];
    if (friendId) {
      to.push("..");
    }
    to.push("leaderboard");
    if (value !== "all") {
      to.push(value);
    }
    navigate(to.join("/"));
  };

  const join = () => props.join(friendId);
  const leave = () => props.leave(friendId);
  const create = () =>
    props.create(name).then((response) => {
      navigate(`../leaderboard/${response.data.id}`);
    });

  const onChangeName = (evt) => setName(evt.target.value);

  const { match, currentUserId, friends, users, competition } = props;

  const friend = friends[friendId];

  let button = (
    <Button onClick={create} className="secondary">
      Create a group
    </Button>
  );
  if (friendId) {
    const already =
      Object.keys(friend.members).indexOf(`${currentUserId}`) !== -1;
    button = (
      <Button onClick={join} className="primary">
        Join this group
      </Button>
    );
    if (already) {
      button = (
        <Button onClick={leave} className="danger">
          Leave the group
        </Button>
      );
    }
  }

  return (
    <main>
      <div className="actions">
        <label>
          Select a group of friends:{" "}
          <SelectFriends onChange={onChange} value={friendId} />
        </label>
        <div style={{ flexShrink: 0, display: "flex" }}>
          {!friend ? (
            <TextInput
              onChange={onChangeName}
              value={name}
              placeholder="Group's name"
            />
          ) : null}
          {button}
        </div>
      </div>
      {friendId && (
        <FriendList
          id={friendId}
          currentUserId={currentUserId}
          competition={competition}
        />
      )}
      {!friendId && (
        <div className="friend-list">
          <LeaderboardAll competition={competition} />
        </div>
      )}
    </main>
  );
}

export default asyncConnect(
  (state) => ({
    friends: state.friend,
    currentUserId: state.auth.id,
    refresh: Object.keys(state.friend).length === 0,
  }),
  { load: loadFriends, join, leave, create }
)(Friends);
