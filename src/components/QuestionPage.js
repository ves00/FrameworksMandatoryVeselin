import React, { Component } from "react";
import axios from 'axios';


class QuestionPage extends Component {
  /*  First we start by adding a constructor to the component class.
   Inside the constructor we’re setting the initial state of the component by assigned an object to this.state */
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      title: "",
      input: ""  
    };

    /* Because in the three implemented methods we’re dealing with the component’s 
        state object we need to make sure to bind those methods to (this)  */

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.handleSubmit.bind(this);
  }

  /*  This methods will be used to update the state properties */
  handleNameChange(event){
    this.setState({name: event.target.value});
  }
 
  handleTitleChange(event){
    this.setState({title: event.target.value});
  }

  handleInputChange(event){
    this.setState({input: event.target.value });
  }
  /*This method is needed to handle the submit event of the form 
       which will be implemented to create a new questions*/

       handleSubmit  = (event) => {
      event.preventDefault();

    const newQuestion = {
      name: this.state.name,
      title: this.state.title,
      input: this.state.input,
    };
    const URL_QUESTION = process.env.REACT_APP_API_QUESTION;
    axios.post(`${URL_QUESTION}add`, newQuestion)
            .then(res => console.log(res.data));

    this.setState({
      name: "",
      title: "",
      input: ""
    });
  }
  render() {
    return (
      <div style={{ marginTop: 10 }}>
      <div className="form-group">
        <label>What is your name? </label>
        <input
          type="text"
          className="form-control"
          value={this.state.name}
          onChange={this.handleNameChange}
         // onChange={e => this.handleNameChange({ name: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>What is your question title? </label>
        <input
          type="text"
          className="form-control"
          value={this.state.title}
          onChange={this.handleTitleChange}
        />
      </div>
      <form onSubmit={this.handleSubmit }>
        <div className="form-group">
          <label>Ask Question? </label>
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
            value="Submit Question"
            className="btn btn-primary btn-block"
          />
        </div>
        </form>
      </div>
    );
  }
}

export default QuestionPage;
