import TreeUtils from "immutable-treeutils";
import Immutable from "immutable";


const Type = {
    abstract: "Abstract",
    interaction: "Interaction",
    application: "Application",
    choice: "User"
};

const Op = {
    choice: "choice",
    sequence: "sequence",
    disabling: "disabling",
    anyOrder: "anyOrder",
};

const State = {
    disabled: 'disabled',
    enabled : 'enabled',
    completed : 'completed',
    performing: 'performing',
    error: 'error'
};

function enable(taskModel, path){
    return down(taskModel, path, State.enabled);
}

function disable(taskModel, path){
    return down(taskModel, path, State.disabled);
}

function down(taskModel, path, state){
    let enabledPath = path.concat('state');
    let enabled = taskModel.setIn(enabledPath, state);
    let node = taskModel.getIn(path);
    let children = taskModel.getIn(path.concat('children'));
    let newPath = null;
    switch(node.get('op')){
        case Op.sequence:
            newPath = path.concat('children').concat(0);
            enabled = enable(enabled, newPath);
            break;
        case Op.disabling:
        case Op.choice:
            for (let i = 0; i < children.toArray().length; i++){
                newPath = path.concat('children').concat(i);
                enabled = enable(enabled, newPath);
            }
            break;
    }
    return enabled;
}

function complete(taskModel, path){
    let utils = new TreeUtils(Immutable.Seq.of(), 'id', 'children');
    let completed = taskModel.setIn(path.concat('state'), State.completed);
    let parentPath = utils.parent(taskModel, path);

    if(parentPath == null){
        return completed;
    }

    let parentNode = completed.getIn(parentPath);
    switch(parentNode.get('op')){
        case Op.sequence:
            if(Immutable.is(path, utils.lastChild(completed, parentPath))){
                // we completed the last child, we go up in the hierarchy
                completed = complete(completed, parentPath);
            }else{
                let nextSiblingPath = utils.nextSibling(completed, path);
                completed = enable(completed, nextSiblingPath);
                completed = performing(completed, parentPath);
            }
            break;
        case Op.choice:
            completed = complete(completed, parentPath);
            break;
    }

    return completed;
}

function performing(taskModel, path){
    let utils = new TreeUtils(Immutable.Seq.of(), 'id', 'children');
    let performed = taskModel.setIn(path.concat('state'), State.performing);
    let parentPath = utils.parent(taskModel, path);
    if(parentPath == null){
        return performed;
    }

    let parentNode = performed.getIn(parentPath);
    let children = performed.getIn(parentPath.concat('children'));
    let node = performed.getIn(path);
    switch(parentNode.get('op')){
        case Op.choice:
            children.forEach(
                el =>{
                    if(!Immutable.is(el, node)){
                        performed = disable(performed, utils.find(performed, n => n === el))
                    }
                }
            );
            performed = performing(performed, parentPath);
            break;

        default:
            performed = performing(performed, parentPath);
            break;

    }
    return performed;
}

export default {
    enable: enable,
    disable: disable,
    complete: complete,
    Type: Type,
    Op: Op,
    State: State,
};