import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import Votes from "./Votes";

const Answer = props => (
  <tr>
    <td>{props.answers.name}</td>
    <td>{props.answers.input}</td>
    <td>{props.answers.created_date}</td>
    <td>{props.answers.votes} <Votes id={props.answers._id} votes={props.answers.votes}/></td>
  </tr>
);

class QuestionAnswerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: {},
      answers: [],
      name: "",
      input: "",
      created_date:"",
      replyTo: ""
    };

    /* Because in the three implemented methods we’re dealing with the component’s 
        state object we need to make sure to bind those methods to (this)  */
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.handleSubmit.bind(this);
  }

    /*  This methods will be used to update the state properties */
  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleInputChange(event) {
    this.setState({ input: event.target.value });
  }

 /*This method is needed to handle the submit event of the form 
       which will be implemented to create a new Answes*/

  handleSubmit = event => {
    event.preventDefault();

    const newAnswer = {
      name: this.state.name,
      input: this.state.input,
      created_date: this.state.created_date,
      replyTo: this.props.match.params.id,
      votes: 0
    };
    const URL_ANSWER = process.env.REACT_APP_API_ANSWER;
    axios
      .post(`${URL_ANSWER}add`, newAnswer)
      .then(res => console.log(res.data));

    this.setState({
      name: "",
      input: "",
      created_date:"",
      replyTo: this.props.match.params.id,
      votes: 0
    });
  };
  componentDidMount() {
    this.setState({
      replyTo: this.props.match.params.id
    });
    const URL_QUESTION = process.env.REACT_APP_API_QUESTION;
    axios.get(URL_QUESTION).then(response => {
      this.setState({
        currentQuestion: response.data.find(
          elm => elm._id === this.props.match.params.id
        )
      });
    });
    const URL_ANSWER = process.env.REACT_APP_API_ANSWER;
    axios
      .get(URL_ANSWER)
      .then(response => {
        this.setState({ answers: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  ALLAnswer() {
    return this.state.answers
      .filter(e => e.replyTo === this.props.match.params.id)
      .map(function(currentAnswers, i) {
        return <Answer answers={currentAnswers} key={i} />;
      });
  }
  render() {
    return (
      <div>
        <h3>Question</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>

              <th>UserName</th>
              <th>Title</th>
              <th>Question</th>
              <th>DateTime</th>
            </tr>
            <tr>
            <th>{this.state.currentQuestion.name}</th>
              <th>{this.state.currentQuestion.title}</th>
              <th>{this.state.currentQuestion.input}</th>
              <th>{this.state.currentQuestion.created_date}</th>
            </tr>
          </thead>
          <tbody />
        </table>
        <h3>Answers</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>UserName</th>
              <th>Answers</th>
              <th>DateTime</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>{this.ALLAnswer()}</tbody>
        </table>
        <div style={{ marginTop: 10 }}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Answer: </label>
              <textarea
                text="textarea"
                className="form-control"
                value={this.state.input}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Submit Answer"
                className="btn btn-primary btn-block"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default QuestionAnswerPage;
   