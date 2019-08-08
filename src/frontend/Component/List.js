import React, { Component } from 'react';
import Edit from './Edit';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ul>
        {this.props.tasks.map((task, index) => (
          <li key={index}>
            <p>Title {task.title}</p>
            <p>Type {task.type}</p>
            <p>Description {task.description}</p>
            <button
              onClick={() => {
                this.props.removeTask(task.id);
              }}>
              Delete
            </button>
            <Edit task={task} index={index} {...this.props} />
          </li>
        ))}
      </ul>
    );
  }
}

export default List;
