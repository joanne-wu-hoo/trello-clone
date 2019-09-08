import React, {Component} from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 3px;
  // update background color based on drag state
  background-color: ${props => (props.isDragging ? 'lightpink' : 'white')}
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


/** snapshot contains properties to style componetn during drag
 * 
 * 
 * snapshot = {
 *  isDragging: true/false
 *  draggingOver: id of column currently being dragged over
 * }
 */