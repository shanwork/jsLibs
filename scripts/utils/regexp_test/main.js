"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stringSplitAndMore_1 = require("./stringSplitAndMore");
var xregexp = new stringSplitAndMore_1.StringSplitAndMore();
console.log('single parenths', xregexp.stringToJSON('()', '(A AND (B or E) and D)  OR (A AND C)'));
var multiLayerObject = xregexp.stringToJSON('()', 'A AND (B OR C) AND (D OR E)', true);
console.log(JSON.stringify(multiLayerObject));
console.log('multiple', multiLayerObject.flatText, ':', multiLayerObject.parenthesized);
var noParenthObject = xregexp.stringToJSON('()', 'A AND E', true);
console.log('no parenths:', noParenthObject.flatText);
// testing the utility with recursion
var treeObject = {
    flatText: '',
    childBranch: []
};
var testExpressions = [
    'A and (B OR C OR (D AND E)) and (Z AND Y AND (T 2))',
    'A AND B AND C',
    '((W AND X) OR (Y AND Z) OR (A OR (B AND C)))'
];
for (var k = 0; k < testExpressions.length; k++) {
    console.log('Raw expression');
    console.log(testExpressions[k]);
    console.log('JSON');
    console.log(JSON.stringify(nestedExpression(testExpressions[k])));
}
var outputJSON = xregexp.stringToJSON('()', 'A AND (B OR C) AND D', true);
console.log('Full Test, string to JSON', JSON.stringify(outputJSON));
console.log('Full Test, JSON to string', xregexp.JSONToString('()', outputJSON));
function nestedExpression(flatInput) {
    var returnTree = {
        flatText: '',
        flatList: [],
        childBranch: []
    };
    var iterativeObject = xregexp.stringToJSON('()', flatInput, true);
    returnTree.flatText = iterativeObject.flatText;
    returnTree.flatList = iterativeObject.flatList;
    // console.log('#', iterativeObject.flatList)
    if (iterativeObject.parenthesized.length > 0) {
        for (var i = 0; i < iterativeObject.parenthesized.length; i++) {
            returnTree.childBranch.push(nestedExpression(iterativeObject.parenthesized[i]));
        }
    }
    return returnTree;
}
