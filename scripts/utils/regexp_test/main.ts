
import {StringSplitAndMore} from './stringSplitAndMore'
let xregexp = new StringSplitAndMore();
console.log('single parenths', xregexp.stringToJSON('()', '(A AND (B or E) and D)  OR (A AND C)'));
let multiLayerObject = xregexp.stringToJSON('()', 'A AND (B OR C) AND (D OR E)', true);
console.log('multiple', multiLayerObject.flatText, ':', multiLayerObject.parenthesized)
let noParenthObject = xregexp.stringToJSON('()', 'A AND E', true);
console.log('no parenths:', noParenthObject.flatText);

// testing the utility with recursion
let treeObject = {
    flatText: '',
    childBranch:[]

}
let testExpressions = [
    'A and (B OR C OR (D AND E)) and (Z AND Y AND (T 2))',
    'A AND B AND C',
    '((W AND X) OR (Y AND Z) OR (A OR (B AND C)))'
]

for (let k = 0; k < testExpressions.length;k++){
    console.log('Raw expression');
    console.log(testExpressions[k]);
    console.log('JSON');
    console.log(JSON.stringify(nestedExpression(testExpressions[k]) );
}

function nestedExpression(flatInput:any){
    let returnTree = {
        flatText: '',
        flatList:[],
        childBranch:[]
    
    };
    let iterativeObject = xregexp.stringToJSON('()',flatInput, true);
    returnTree.flatText = iterativeObject.flatText;
    returnTree.flatList = iterativeObject.flatList;
   // console.log('#', iterativeObject.flatList)
    if (iterativeObject.parenthesized.length > 0){
        for (let i = 0; i < iterativeObject.parenthesized.length;i++){
            returnTree.childBranch.push( nestedExpression(iterativeObject.parenthesized[i]));
        }
    }
    return returnTree;

}