import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import initialData from './initial-data';
import Column from './column'

import { DragDropContext } from 'react-beautiful-dnd';

const Container = styled.div`
  display: flex;
`;

// this.state = {
//   tasks: { 'task-1': {id, content}, ... },
//   columns: { 'column-1': {id, title, taskIds: ['task-1', ...] } },
//   columnOrder: ['column-1', 'column-2', ...]
// } 

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
    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];
    
    // moving within same list
    if (start === finish){
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
  
      const newColumn = {
        ...start,
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

    // moving to different list

    const newStartTaskIds = Array.from(start.taskIds);
    // remove task from start tasks
    newStartTaskIds.splice(source.index, 1);
    const newStartColumn = {
      ...start,
      taskIds: newStartTaskIds
    }
  
    const newFinishTaskIds = Array.from(finish.taskIds);
    // add task to finish tasks
    newFinishTaskIds.splice(destination.index, 0, draggableId);
    const newFinishColumn  = {
      ...finish,
      taskIds: newFinishTaskIds
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn
      },
    };

    this.setState(newState);
    
  }

  render(){
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>
          {this.state.columnOrder.map((columnId) => {
          const column = this.state.columns[columnId];
          const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
          return <Column key={column.id} column={column} tasks={tasks} />
          })}
        </Container>
      </DragDropContext>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

