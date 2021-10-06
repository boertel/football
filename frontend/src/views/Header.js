import React from "react";
import { useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";

import { asyncConnect } from "../utils/components";
import { logout } from "../resources/auth";
import { loadUser } from "../resources/user";
import { loadGames } from "../resources/games";
import { FootballIcon, CupIcon } from "../icons";

const Header = ({ refresh, id, full_name, competitions }) => {
  const { competition } = useParams();
  const points = competitions.find(({ slug }) => slug === competition)?.points;
  return (
    <header>
      <div className="header-content">
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="/" title="Go to dashboard">
            <FootballIcon size={40} />
          </Link>
          {!!id && <SelectCompetition competitions={competitions} />}
        </div>
        <div className="header-profile">
          {!refresh ? (
            <div>
              <Link to="leaderboard" title="Go to my profile">
                {full_name} {!!points ? `(${points} points)` : null}
              </Link>
            </div>
          ) : null}
          <div>
            <Link to="leaderboard" title="Go to leadeboard">
              <CupIcon size={40} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

const SelectCompetition = ({ competitions, ...props }) => {
  const navigate = useNavigate();
  const { competition } = useParams();
  const dispatch = useDispatch();

  const onChange = ({ target }) => {
    const path = ["", target.value, "/dashboard"];
    dispatch(loadGames({ competition: target.value }));
    navigate(path.join("/"));
  };
  return (
    <select
      style={{ marginLeft: "12px" }}
      onChange={onChange}
      value={competition}
    >
      {competitions.map(({ slug, name }) => (
        <option key={slug} value={slug}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default asyncConnect(
  (state) => ({
    competitions: state.competitions || [],
    ...state.user[state.auth.id],
    refresh: state.user[state.auth.id] === undefined,
  }),
  { logout, load: loadUser },
  { loader: null }
)(Header);
