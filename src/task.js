import React, {Component} from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 3px;
  font-family: Roboto-light;
  // update background color based on drag state
  background-color: ${props => (props.isDragging ? 'lightgrey' : 'white')}
`;


class Task extends Component {
  render(){
    return (
      <Draggable 
        draggableId={this.props.task.id} 
        index={this.props.index}>
        {(provided, snapshot) => (
          <Container 
            {...provided.draggableProps} 
            {...provided.dragHandleProps} // what allows component to be draggable
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            { this.props.task.content }
        </Container>
      )}
      </Draggable>
    );
  }
}

export default Task;

