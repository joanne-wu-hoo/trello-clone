import React, {Component} from 'react';
import Task from './task'
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 3px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
`;

class Column extends Component {
  render() {
    let tasks = this.props.tasks.map((task, index) => 
      <Task 
        key={task.id} 
        task={task} 
        index={index}
      />
    );

    let { title } = this.props.column;
    
    return (
      <Container>
        <Title>{ title }</Title>
        <Droppable droppableId={this.props.column.id}>
          {provided =>  (
            <TaskList 
              ref={provided.innerRef} 
              {...provided.droppableProps}> 
                { tasks } 
                {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    )
  }

}

export default Column;
