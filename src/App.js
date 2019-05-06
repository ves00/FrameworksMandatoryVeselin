import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ListOfQuestion from "./components/ListOfQuestion";
import QuestionPage from "./components/QuestionPage";
import QuestionAnswerPage from "./components/QuestionAnswerPage";


import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          Made by Veselin Veselinov
        </div>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">

            <Link to="/questions" className="nav-link">
              All Questions
            </Link>
            
            <Link to="/ask" className="nav-link">
              Ask your question
            </Link>
          </nav>
          <br />
          <Switch>
            <Route exact path="/" render={props => <QuestionPage />} />
            <Route exact path="/questions/" render={props => <ListOfQuestion />} />
            <Route exact path="/ask/" render={props => <QuestionPage />} />
            <Route
              path="/QAnswer/:id"
              render={props => <QuestionAnswerPage {...props} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
