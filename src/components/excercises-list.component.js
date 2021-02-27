import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import EditExercise from "./edit-excercise.component";

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = {
      exercises: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises")
      .then((response) => {
        this.setState({
          exercises: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // to delete exercises
  deleteExercise(id) {
    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then((res) => console.log(res.data));

    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    });
  }

  // to get all the exercises
  exerciseList() {
    return this.state.exercises.map((currentExercise) => {
      return (
        <tr>
          <td>{currentExercise.username}</td>
          <td>{currentExercise.description}</td>
          <td>{currentExercise.duration}</td>
          <td>{currentExercise.date.substring(0, 10)}</td>
          <td>
            <Link to={"/edit/" + currentExercise._id}>edit</Link> |{" "}
            <a
              href="#"
              onClick={() => {
                this.deleteExercise(currentExercise._id);
              }}
            >
              delete
            </a>
          </td>
        </tr>
      );
    });
  }
  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}
