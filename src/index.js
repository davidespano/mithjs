'use strict';

import Immutable from 'immutable';
import TreeUtils from 'immutable-treeutils';

let treeUtils = new TreeUtils();

let data = Immutable.fromJS({
    id: 'root',
    name: 'My Documents',
    type: 'folder',
    childNodes: [
        {
            id: 'node-1',
            name: 'Pictures',
            type: 'folder',
            childNodes: [
                {
                    id: 'node-2',
                    name: 'Me in Paris',
                    type: 'image'
                },
                {
                    id: 'node-3',
                    name: 'Barbecue July 2015',
                    type: 'image'
                }
            ]
        },
        {
            id: 'node-4',
            name: 'Music',
            type: 'folder',
            childNodes: [
                {
                    id: 'node-5',
                    name: 'Pink Floyd - Wish You Were Here',
                    type: 'audio'
                },
                {
                    id: 'node-6',
                    name: 'The Doors - People Are Strange',
                    type: 'audio'
                }
            ]
        }
    ]
});