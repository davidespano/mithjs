'use strict';

import Immutable from 'immutable';
import TreeUtils from 'immutable-treeutils';
import Task from './task/Task.js'


let model = Immutable.fromJS({
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
                        iterative: true
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
                        iterative: true

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





function test1(){
    let state = new TreeUtils(Immutable.Seq.of(), 'id', 'children');
    let s2 = state.filter(model, node => node.get('id') === TaskTypes.abstract);
    let deleteTask = state.filter(model, node => node.get('id') === 'DELETE_TODO');
    /*deleteTask.forEach(el => {
        console.log(el.toJSON())
    });*/
    let path = deleteTask.get(0).concat('state');
    console.log(model.getIn(deleteTask.get(0)));
    let model2 = model.setIn(path, 'completed');
    console.log(model2.toJSON());
    let completed = state.filter(model2, node => node.get('state') === 'completed');
    console.log(completed);
    completed.forEach(el => {
        console.log(el.toJS())
    });

}

function test2(){
    let utils = new TreeUtils(Immutable.Seq.of(), 'id', 'children');
    let enabled = Task.enable(model, Immutable.Seq.of());
    console.log(enabled.toJSON())

    let completed = Task.complete(enabled, utils.byId(enabled, 'SELECT_COMPLETED_TODO'));
    console.log(completed.toJSON())
}

test2();

