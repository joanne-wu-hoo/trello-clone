import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import initialData from './initial-data';
import Column from './column'

import { DragDropContext } from 'react-beautiful-dnd';

class App extends Component {
  state = initialData;

  // sync state based no user drag/drop actions (persist changes)
  onDragEnd = result => {
    const {destination, source, draggableId } = result;

    // if destination is null (out of bounds), return
    if (!destination){
      return;
    }

    // if user dropped in same position, return
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // otherwise, update state to reflect drag/drop action
    const column = this.state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn
      },
    };

    // Note: if persistating changes to a database
    // you would want to call endpoint here before 
    // updating state

    this.setState(newState);
  }

  render(){
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.columnOrder.map((columnId) => {
        const column = this.state.columns[columnId];
        const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
        return <Column key={column.id} column={column} tasks={tasks} />
        })}
      </DragDropContext>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

