'use strict';
import React from 'react';
import {Label} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap'
import Task from "./Task";

function taskStyle(state) {
    switch (state) {
        case Task.State.enabled:
            return 'success';
        case Task.State.performing:
            return 'warning';
        case Task.State.disabled:
            return 'default';
        case Task.State.error:
            return 'danger';
        case Task.State.completed:
            return 'warning';
        default:
            return 'info';
    }
}

function taskGlyph(type) {
    switch (type) {
        case Task.Type.abstract:
            return 'cloud';
        case Task.Type.application:
            return 'cog';
        case Task.Type.interaction:
            return 'transfer';
        case Task.Type.user:
            return 'user';
    }
}

function opSymbol(op){
    switch(op){
        case Task.Op.anyOrder:
            return '|=|';
        case Task.Op.choice:
            return '[ ]';
        case Task.Op.disabling:
            return '[>';
        case Task.Op.sequence:
            return '>>';
        default:
            return '';
    }
}

function TaskTree(props) {
    return (
        <ul className="tree" key={'ul-' + props.id}>
            {props.data && props.data.map(function(item, index, data){
                return(
                    [
                        <TaskLi key={item.id} item={item}/>,
                        index !== data.length  -1 ? <TaskOpLi key={'op-' + item.id} id={item.id} op={props.op}/> : null
                    ]);
            })}
        </ul>);
}

function TaskLi(props) {
    return (
        <li >
            <Label  bsStyle={taskStyle(props.item.state)}>
                <Glyphicon  glyph={taskGlyph(props.item.type)}/> {props.item.name}
            </Label>
            {props.item.children && <TaskTree data={props.item.children} op={props.item.op} id={props.item.id}/>}
        </li>);
}

function TaskOpLi(props) {
    if (props.op != null) {
        return (
            <li>{opSymbol(props.op)}</li>
        );
    } else {
        return null;
    }
}

export default TaskTree;