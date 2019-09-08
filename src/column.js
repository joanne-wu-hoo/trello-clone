import React, {Component} from 'react';
import Task from './Task'
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 3px;
  width: 220px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
  font-family: Roboto;
`;

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2x ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')}
  flex-grow: 1;
  min-height: 100px;
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
          {(provided, snapshot) =>  (
            <TaskList 
              ref={provided.innerRef} 
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver} 
            > 
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

/** snapshot contains properties to style componetn during drag
 * 
 * 
 * droppableSnapshot = {
 *  isDraggingOver: true/false
 *  draggingOverWith: id of draggable that is being dragged over (set to null if droppable is not being dropped over)
 * }
 */
