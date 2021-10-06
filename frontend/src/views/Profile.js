import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import moment from "moment";
import { sortBy, groupBy } from "lodash";

import CompetitorFlag from "../ui/CompetitorFlag";
import { asyncConnect, withParams } from "../utils/components";
import { loadUser } from "../resources/user";
import { loadBetsForProfile } from "../resources/bet";
import { withClassNames } from "../ui/utils";
import { proxy, getStatus } from "../resources/utils";

const GROUP_BY = {
  day: {
    fn: ({ game: { start } }) => moment(start).format("YYYY-MM-DD"),
    title: (bets) => {
      const m = moment.utc(bets[0].game.start);
      return m.calendar(null, {
        sameDay: "[Today]",
        nextDay: "[Tomorrow]",
        nextWeek: "dddd",
        lastDay: "[Yesterday]",
        lastWeek: "[Last] dddd",
        sameElse: "dddd, MMMM DD",
      });
    },
  },
  group: {
    fn: ({
      game: {
        group: { id },
      },
    }) => id,
    title: (bets) => bets[0]?.game.group.name,
  },
  status: {
    fn: ({ game: { score_a, score_b }, ...bet }) =>
      getStatus(score_a, score_b, bet),
    title: (bets) =>
      getStatus(bets[0].game.score_a, bets[0].game.score_b, bets[0]),
  },
};

const Profile = ({ full_name, points, className, bets }) => {
  const [search, setSearchParams] = useSearchParams({ groupBy: "day" });
  const _groupBy = search.get("groupBy");
  const groups = groupBy(bets, GROUP_BY[_groupBy].fn);

  let stats = {
    win: 0,
    perfect: 0,
    loss: 0,
    validated: 0,
  };

  bets.forEach((bet) => {
    const status = getStatus(bet.game.score_a, bet.game.score_b, bet);
    if (bet.validated) {
      stats.validated += 1;
    }
    stats[status] += 1;
  });
  return (
    <main className={className}>
      <h2 style={{ marginBottom: 36 }}>
        <div>{full_name}</div>
        <div>{points} points</div>
      </h2>
      <ul style={{ marginBottom: 36, display: "flex", width: "100%" }}>
        <li
          className="border-win"
          data-content={`${stats.win} wins`}
          style={{
            padding: "8px",
            borderWidth: "0px",
            borderBottomWidth: "4px",
            borderStyle: "solid",
            width: `${(stats.win / stats.validated) * 100}%`,
          }}
        ></li>
        <li
          className="border-perfect"
          data-content={`${stats.perfect} perfects`}
          style={{
            padding: "8px",
            borderWidth: "0px",
            borderBottomWidth: "4px",
            borderStyle: "solid",
            width: `${(stats.perfect / stats.validated) * 100}%`,
          }}
        ></li>
        <li
          className="border-loss"
          data-content={`${stats.loss} losses`}
          style={{
            padding: "8px",
            borderWidth: "0px",
            borderBottomWidth: "4px",
            borderStyle: "solid",
            width: `${(stats.loss / stats.validated) * 100}%`,
          }}
        ></li>
      </ul>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: "26px",
        }}
      >
        Show games by{" "}
        <select
          value={search.get("groupBy")}
          onChange={(evt) => setSearchParams({ groupBy: evt.target.value })}
          style={{ marginLeft: "12px" }}
        >
          <option value="day">day</option>
          <option value="group">group</option>
          <option value="status">perfect/win/loss</option>
        </select>
      </div>
      {Object.keys(groups).map((groupId) => {
        const bets = groups[groupId];
        const title = GROUP_BY[_groupBy].title(bets);
        return (
          <div style={{ marginBottom: "40px" }} key={groupId}>
            <h3 style={{ marginBottom: "16px" }}>{title}</h3>
            {sortBy(bets, "order").map((bet, index) => {
              const status = getStatus(bet.game.score_a, bet.game.score_b, bet);
              return (
                <Link
                  to={`../../games/${bet.game.id}`}
                  key={bet.id}
                  className={`bg-${status}`}
                  style={{
                    textDecoration: "none",
                    color: "var(--default)",
                    display: "grid",
                    width: "100%",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    padding: "12px",
                    borderTopLeftRadius: index === 0 && "4px",
                    borderTopRight: index === 0 && "4px",
                    borderBottomLeftRadius: index === bets.length - 1 && "4px",
                    borderBottomRight: index === bets.length - 1 && "4px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div style={{ paddingRight: "12px" }}>
                      {bet.game.competitor_a.name}
                    </div>
                    <CompetitorFlag
                      name={bet.game.competitor_a.name}
                      size={20}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ marginBottom: "6px", fontWeight: "bold" }}>
                      {bet.game.score_a} – {bet.game.score_b}
                    </div>
                    {status === "perfect" ? (
                      <>🏅</>
                    ) : (
                      <div className={`text-${status}`}>
                        {bet.score_a} – {bet.score_b}
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <CompetitorFlag
                      name={bet.game.competitor_b.name}
                      size={20}
                    />
                    <div style={{ paddingLeft: "12px" }}>
                      {bet.game.competitor_b.name}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        );
      })}
    </main>
  );
};

function waitForUser(WrappedComponent) {
  return asyncConnect(null, { load: loadUser })(WrappedComponent);
}

export default withParams(
  waitForUser(
    asyncConnect(
      (state, { params }) => {
        const userId = params.userId || state.auth.id;
        const user = state.user[userId];
        const competition = user.competitions.find(
          ({ slug }) => slug === params.competition
        );

        const bets = Object.values(state.bet)
          .filter(({ user: { id } }) => `${id}` === `${userId}`)
          .map((bet) => proxy(bet, state));

        return { ...user, bets, points: competition?.points, competition };
      },
      {
        load: [loadBetsForProfile],
      }
    )(withClassNames("profile")(Profile))
  )
);
