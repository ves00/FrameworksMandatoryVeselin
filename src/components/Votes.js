import React, { Component } from "react";

class Votes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: this.props.votes
    };
  }

  addVote(value) {
    const URL = process.env.REACT_APP_API_ANSWER;

    let body = {
      answer_id: this.props.id,
      value: value,
      votes: this.props.votes + value
    };
    fetch(`${URL}${this.props.id}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(response => console.log(response))
      .then(vote => {
        console.log(`Before: ${this.props.votes}`);
        console.log(`After: ${this.props.votes + value}`);
      });
  }

  vote = e => {
    e.preventDefault();
    this.addVote(1);
  };

  render() {
    return (
      <div>
        <button onClick={this.vote} className="btn btn-success">Upvote</button>
      </div>
    );
  }
}
export default Votes;
