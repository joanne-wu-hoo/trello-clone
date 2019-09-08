import React, { Component } from 'react';
import styled from 'styled-components';

import initialData from './initialData';
import Column from './Column'
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
  constructor(props){
    super(props);
    this.state = initialData;
    this.moveTaskToSameList = this.moveTaskToSameList.bind(this);
    this.moveTaskToDifferentList = this.moveTaskToDifferentList.bind(this);
  }

  /** onDragEnd
   * - if destination is null (out of bounds), return
   * - if user dropped into same position, return
   * - otherwise, sync state based on drag/drop action
   */
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
    
    if (start === finish){
      this.moveTaskToSameList(start, source, destination, draggableId);
    } else {
      this.moveTaskToDifferentList(start, finish, source, destination, draggableId)
    }
  }

  /** moveTaskToSameList
   * - rearrange taskIds in list
   * - setState
   */
  moveTaskToSameList(start, source, destination, draggableId){
    const newTaskIds = start.taskIds;
    // rearrange taskIds in list
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

    this.setState(newState);
  }

  
  moveTaskToDifferentList(start, finish, source, destination, draggableId){
    // remove task from start tasks
    const newStartTaskIds = start.taskIds;
    newStartTaskIds.splice(source.index, 1);
    const newStartColumn = {
      ...start,
      taskIds: newStartTaskIds
    }
  
    // add task to finish tasks
    const newFinishTaskIds = finish.taskIds;
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
    let todoBoard = this.state.columnOrder.map((columnId) => {
      const column = this.state.columns[columnId];
      const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
      return <Column key={column.id} column={column} tasks={tasks} />
    })

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>
          { todoBoard }
        </Container>
      </DragDropContext>
    );
  }
}

export default App;


// add task

// edit task