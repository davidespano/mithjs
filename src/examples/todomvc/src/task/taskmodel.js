import Immutable from 'immutable';
import Task from 'mithjs/src/task/Task'

const model = Immutable.fromJS({
  id: 'TODO_APP',
  name: 'Todo Application',
  type: Task.Type.abstract,
  iterative: true,
  op: Task.Op.choice,
  children: [
    {
      id: 'ADD_TODO',
      name: 'Add a todo',
      type: Task.Type.interaction,
      iterative: false,
      op: Task.Op.disabling,
      children: [
        {
          id: 'EDIT_TEXT',
          name: 'Insert the new TODO text',
          type: Task.Type.interaction,
          iterative: true
        },
        {
          id: 'CREATE_TODO',
          name: 'Create the TODO',
          type: Task.Type.interaction,
          iterative: false
        }
      ]
    },
    {
      id: 'COMPLETE_TODO',
      name: 'Mark TODO as completed',
      type: Task.Type.interaction,
      iterative: false,
      op: Task.Op.sequence,
      children: [
        {
          id: 'SELECT_COMPLETED_TODO',
          name: 'Select a TODO from the list',
          type: Task.Type.interaction,
          iterative: false
        },
        {
          id: 'MARK_COMPLETED',
          name: 'Mark the TODO as completed',
          type: Task.Type.interaction,
          iterative: false
        }
      ]
    },
    {
      id: 'DELETE_TODO',
      name: 'Delete a TODO',
      type: Task.Type.interaction,
      iterative: false,
      op: Task.Op.sequence,
      children: [
        {
          // TODO insert some referencing mechanism
          id: 'SELECT_DELETED_TODO',
          name: 'Select a TODO from the list',
          type: Task.Type.interaction,
          iterative: false

        },
        {
          id: 'MARK_DELETED',
          name: 'Mark the TODO as deleted',
          type: Task.Type.interaction,
          iterative: false
        }
      ]
    }
  ]
});

export default model;
