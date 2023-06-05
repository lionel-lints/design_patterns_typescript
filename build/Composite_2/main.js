"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
var testData = [
    {
        id: '1',
        displayText: 'confidential postings',
        category: 'postings',
        isChecked: true,
        requiredPermissionIds: ['3']
    },
    {
        id: '2',
        displayText: 'non confidential postings',
        category: 'postings',
        isChecked: true,
        requiredPermissionIds: ['3']
    },
    {
        id: '3',
        displayText: 'parent permission for postings',
        category: 'postings',
        isChecked: true,
        requiredPermissionIds: []
    },
    {
        id: '4',
        displayText: 'manage automation',
        category: 'automations',
        isChecked: true,
        requiredPermissionIds: ['3']
    },
    {
        id: '5',
        displayText: 'manage archive reasons',
        category: 'pipeline',
        isChecked: true,
        requiredPermissionIds: ['3', '4']
    },
    {
        id: '6',
        displayText: 'manage automation',
        category: 'automations',
        isChecked: true,
        requiredPermissionIds: []
    },
];
var groupByCategories = function (data) {
    return data.reduce(function (accum, curr) {
        if (accum[curr.category]) {
            accum[curr.category].push(curr);
        }
        else {
            accum[curr.category] = [curr];
        }
        return accum;
    }, {});
};
var main = function () {
    console.log(groupByCategories(testData));
};
exports.main = main;
main();
