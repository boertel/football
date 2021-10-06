import { Link, useParams } from "react-router-dom";

import { Loader } from "../utils/components";
import { useGames } from "../resources/games";
import Tasks from "./Tasks";

const QUOTES = [
  {
    quote:
      "The best part of the app is that it makes the crap games interesting.",
    author: "– Winner of Euro 2016 edition",
  },
  {
    quote: "If I don't get a perfect, no one get one!",
    author: "– Runner-up of World Cup 2018 edition",
  },
  {
    quote:
      "Whoever made this app is a baller. Simple, basic but it does exactly what we want",
    author: "– a random (Irish?) person",
  },
];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const Dashboard = () => {
  const { competition } = useParams();
  const [, { loadGames }] = useGames({ competition });

  const random = getRandomInt(QUOTES.length);
  const quote = QUOTES[random];

  return (
    <Loader load={{ loadGames }}>
      <div style={{ textAlign: "center" }}>
        <Link to="../games#today">Go to the matches</Link>
      </div>
      <Tasks />
      <div style={{ textAlign: "center", lineHeight: "1.6em" }}>
        <em>
          {quote.quote}
          <br />
          <span>{quote.author}</span>
        </em>
      </div>
    </Loader>
  );
};

export default Dashboard;
