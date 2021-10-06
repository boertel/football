import { useCallback, useEffect, useRef } from "react";
import { pickBy, sortBy, values } from "lodash";
import moment from "moment";
import { Routes, Link, useLocation } from "react-router-dom";

import { asyncConnect, withParams } from "../utils/components";
import { loadGames } from "../resources/games";
import GameItem from "./Game";
import PrivateRoute from "../PrivateRoute";

function Games({ games }) {
  const { hash } = useLocation();
  let groupBy = {};
  values(games).forEach((game) => {
    const day = moment(game.start).format("YYYY-MM-DD");
    groupBy[day] = groupBy[day] || {
      day,
      games: [],
    };
    groupBy[day].games.push(game);
  });

  const today = useRef();

  const scrollToToday = useCallback(() => {
    if (today.current) {
      window.scrollTo({
        behavior: "smooth",
        top: today.current.offsetTop - 70,
      });
    }
  }, [today]);

  useEffect(() => {
    if (hash === "#today") {
      scrollToToday();
    }
  }, [hash, scrollToToday]);

  let past = false;
  let now = false;
  const days = sortBy(values(groupBy), "day").map(({ day, games }) => {
    const m = moment.utc(day);
    const title = m.calendar(null, {
      sameDay: "[Today]",
      nextDay: "[Tomorrow]",
      nextWeek: "dddd",
      lastDay: "[Yesterday]",
      lastWeek: "[Last] dddd",
      sameElse: "dddd, MMMM DD",
    });
    past = m.isBefore(moment.utc());
    now = m.isSame(moment(), "day");
    return (
      <div
        className={`day ${past ? "past" : ""} ${now ? "today" : ""}`}
        ref={now ? today : null}
        key={day}
      >
        <h2>{title}</h2>
        <div className="games">
          {sortBy(games, "order").map((game) => (
            <Link to={`../games/${game.id}`} key={game.id} className="game">
              <GameItem id={game.id} />
            </Link>
          ))}
        </div>
      </div>
    );
  });

  return (
    <main>
      <div className="instructions">
        <p>
          Before getting started, here is some advice and a few instructions:
        </p>
        <ul>
          <li>
            You can set the score <strong>15 minutes before</strong> kick-off.
            After that time, you will be able to see everyone's predictions.
          </li>
          <li>
            It is the score at <strong>90 minutes</strong> that counts, so there
            are opportunities for ties during the knockout phase.
          </li>
          <li>
            Don't miss out on any points! Fill up all the matches{" "}
            <strong>now</strong>. You can always update your score later on.
          </li>
          <li>
            Don't loose hope, matches during the knockout phase will be{" "}
            <strong>worth more points</strong>!
          </li>
          <li>Have fun and good luck 🏆 </li>
        </ul>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <Link to="#today" onClick={scrollToToday}>
          Scroll to today's games ↓
        </Link>
      </div>
      <div>{days}</div>
    </main>
  );
}

const mapStateToProps = (state, { competitionId }) => {
  const games = pickBy(
    state.games,
    ({ competition: { id } }) => id === competitionId
  );
  return {
    games,
    refresh: Object.keys(games).length === 0,
  };
};
export default withParams(
  asyncConnect(mapStateToProps, { load: loadGames })(Games)
);
