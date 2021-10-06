import React from "react";
import { useDispatch, Provider } from "react-redux";
import {
  Navigate,
  useParams,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { FeedbackFish } from "@feedback-fish/react";

import PrivateRoute from "./PrivateRoute";
import { useAuth } from "./resources/auth";

import {
  Auth,
  Dashboard,
  Header,
  Games,
  Login,
  Logout,
  Forgot,
  ForgotSuccess,
  Reset,
  Signup,
  AuthRedirect,
  Profile,
  Friends,
} from "./views";
import GameView from "./views/GameView";
import { loadCompetitions } from "./resources/competition";
import { FeedbackIcon } from "./icons";

import { Button } from "./ui";
import Footer from "./ui/Footer";
import ScrollToTop from "./ui/ScrollToTop";

import store from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <Auth>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/forgot/success" element={<ForgotSuccess />} />
            <Route path="/reset" element={<Reset />} />

            <Route path="/:competition/*" element={<Competition />} />
            <Route path="/" exact element={<AuthRedirect />} />
          </Routes>
          <Footer />
        </Router>
      </Auth>
    </Provider>
  );
}

const Competition = (props) => {
  const { competition } = useParams();
  const dispatch = useDispatch();
  const { id: userId } = useAuth();

  dispatch(loadCompetitions());

  return (
    <>
      <Header />
      <Routes>
        <PrivateRoute path="dashboard" element={<Dashboard />} />
        <PrivateRoute
          path="games/*"
          element={<Games competition={competition} />}
        />
        <PrivateRoute
          path="profile/:userId"
          element={<Profile competition={competition} />}
        />
        <PrivateRoute
          path="profile"
          element={<Profile competition={competition} />}
        />
        <PrivateRoute
          path="leaderboard/:friendId"
          element={<Friends competition={competition} />}
        />
        <PrivateRoute
          path="leaderboard"
          element={<Friends competition={competition} />}
        />

        <PrivateRoute
          path="*"
          element={<Navigate to="/euro-2021/dashboard" />}
        />
      </Routes>
      <Routes>
        <PrivateRoute path="games/:gameId" element={<GameView />} />
      </Routes>
      <div style={{ position: "fixed", bottom: 0, right: 0, margin: 20 }}>
        <FeedbackFish projectId="4772b25e9d06fe" userId={userId}>
          <Button className="large" style={{ paddingRight: "36px" }}>
            <FeedbackIcon />
            Send feedback
          </Button>
        </FeedbackFish>
      </div>
    </>
  );
};
