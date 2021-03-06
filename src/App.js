import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import firebase from "./firebaseConfig";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

// Components - Pages
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Game from "./components/Game";
import Profile from "./components/Profile";

// Components - Utils
import SignIn from "./components/utils/SignIn";
import SignOut from "./components/utils/SignOut";

// Stylesheet
import "./App.css";

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  //
  //
  // The Striong foijdsiopfj here!
  //
  //
  const garbik = "Playing Against Player 2"
  const registerUser = async () => {
    const { uid, photoURL, email, displayName } = auth.currentUser;
    const usersRef = firestore.collection("users");
    const doc = await usersRef.doc(uid).get();
    if (!doc.exists) {
      console.log("Welcome to our app!");
      usersRef.doc(uid).set({
        uid: uid,
        name: displayName,
        email: email,
        photoURL: photoURL,
        ELO: 1000,
      });
    } else {
      console.log("Welcome back " + displayName + "!");
    }
  };

  return (
    <Router className="App">
      {true ? (
        <header>
          <a class="logo" href="/">
            <img
              src="https://cdn.discordapp.com/attachments/799443679495323712/800265029361991720/logo8.png"
              alt="logo"
              class="logo-img"
            />
          </a>
          <nav>
            <ul class="nav__links">
              <li>
                <Link to="/game/test">Competitive</Link>
              </li>
              <li>
                <Link to="/game">Unranked</Link>
              </li>
            </ul>
          </nav>
          <a class="cta" href="/profile">
            Profile
          </a>
        </header>
      ) : (
        <header>
          <a class="logo" href="/">
            <img
              src="https://i.imgur.com/ADMwlOq.png"
              alt="logo"
              class="logo-img"
            />
          </a>
          <nav>
            <ul class="nav__links">
              <li>
                <a href="/">About</a>
              </li>
            </ul>
          </nav>
          <a class="cta" href="/">
          <SignIn />
          </a>
        </header>
      )}
      <Switch>
        <Route path="/lobby">{user ? <Landing /> : <Login />}</Route>
        <Route path="/game/:id">

            <div>
              <Game />
              <footer>
                <div>{garbik}</div>
              </footer>
            </div>

        </Route>

        <Route path="/custom">{user ? <Landing /> : <Login />}</Route>
        <Route path="/profile"><Profile/></Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

/*
                  <Timer initialTime={600000} direction="backward">
                    {() => (
                      <React.Fragment>
                        <Timer.Minutes /> minutes and <Timer.Seconds /> seconds
                      </React.Fragment>
                    )}
                  </Timer>

*/
