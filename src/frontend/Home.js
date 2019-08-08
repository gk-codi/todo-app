import React from 'react';
import List from './Component/List';
// import Edit from './Component/Edit';
import './Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      task: {
        title: '',
        type: '',
        description: '',
      },
      tasks: [],
    };
  }

  componentDidMount() {
    fetch('/api/tasks')
      .then(response => response.json())
      .then(data => {
        console.log('data tasks', data);
        if (data.success === true) {
          this.setState({
            tasks: data.data,
          });
        }
      });
  }

  onTitleChange = event => {
    event.preventDefault();
    this.setState({
      task: {
        ...this.state.task,
        title: event.target.value,
      },
    });
  };
  onTypeChange = event => {
    event.preventDefault();
    this.setState({
      task: {
        ...this.state.task,
        type: event.target.value,
      },
    });
  };
  onDescriptionChange = event => {
    event.preventDefault();
    this.setState({
      task: {
        ...this.state.task,
        description: event.target.value,
      },
    });
  };

  onSubmit = event => {
    event.preventDefault();

    fetch('/api/tasks', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.task),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success === true) {
          fetch('/api/tasks')
            .then(response => response.json())
            .then(data => {
              console.log('data tasks', data);
              if (data.success === true) {
                this.setState({
                  task: {
                    title: '',
                    type: '',
                    description: '',
                  },
                  tasks: data.data,
                });
              }
            });
        }
      });
  };

  removeTask = id => {
    fetch(`/api/tasks/${id}`, {
      method: 'delete',
    })
      .then(response => response.json())
      .then(data => {
        console.log('data', data);
        if (data.success === true) {
          // const tasks = this.state.tasks.filter(item => {
          //   return item.id !== id;
          // });
          // this.setState({
          //   tasks,
          // });

          fetch('/api/tasks')
            .then(response => response.json())
            .then(data => {
              console.log('data tasks', data);
              if (data.success === true) {
                this.setState({
                  tasks: data.data,
                });
              }
            });
        }
      });
  };
  handleOnTitleAccept = (id, value) => {
    const task = this.state.tasks.find(task => task.id === id);
    if (task !== undefined) {
      console.log('task ', task);
      task.title = value;
      fetch(`/api/tasks/${id}`, {
        method: 'put',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      })
        .then(response => {
          console.log('response ', response);
          return response.json();
        })
        .then(data => {
          if (data.success === true) {
            alert('Update has been done');
          }
        });
    }
  };

  handleOnTypeAccept = (id, value) => {
    const task = this.state.tasks.find(task => task.id === id);
    if (task !== undefined) {
      task.type = value;
      fetch(`/api/tasks/${id}`, {
        method: 'put',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success === true) {
            alert('Update has been done');
          }
        });
    }
  };

  handleOnDescriptionAccept = (id, value) => {
    const task = this.state.tasks.find(task => task.id === id);
    if (task !== undefined) {
      task.description = value;
      fetch(`/api/tasks/${id}`, {
        method: 'put',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success === true) {
            alert('Update has been done');
          }
        });
    }
  };

  render() {
    return (
      <div className='Home'>
        <form className={'App'} onSubmit={this.onSubmit}>
          <div>
            <label htmlFor={'title'}>Title</label>
            <input
              id='title'
              value={this.state.task.title}
              onChange={this.onTitleChange}
            />
          </div>
          <div>
            <label htmlFor={'type'}>Type</label>
            <input
              id='type'
              value={this.state.task.type}
              onChange={this.onTypeChange}
            />
          </div>
          <div>
            <label htmlFor={'description'}>Description</label>
            <input
              id='description'
              value={this.state.task.description}
              onChange={this.onDescriptionChange}
            />
          </div>
          <button>Add</button>
        </form>
        <List
          tasks={this.state.tasks}
          removeTask={this.removeTask}
          handleOnTitleAccept={this.handleOnTitleAccept}
          handleOnTypeAccept={this.handleOnTypeAccept}
          handleOnDescriptionAccept={this.handleOnDescriptionAccept}
        />
      </div>
    );
  }
}

export default Home;
