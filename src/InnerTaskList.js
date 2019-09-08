import React, {Component} from 'react';
import Task from './Task';

class InnerTaskList extends Component {
  shouldComponentUpdate(nextProps){
    if (nextProps.tasks === this.props.tasks){
      return false;
    }
    return true;
  }
  
  render(){
    return(
      this.props.tasks.map((task, index) => 
        <Task 
          key={task.id} 
          task={task} 
          index={index}
        />
    ))
  }
}

export default InnerTaskList;