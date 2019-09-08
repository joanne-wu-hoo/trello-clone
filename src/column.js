import React, {Component} from 'react';
import InnerTaskList from './InnerTaskList';
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
                <InnerTaskList tasks={this.props.tasks} />
                {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    )
  }

}

export default Column;
