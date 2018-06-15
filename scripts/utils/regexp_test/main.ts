
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
console.log(JSON.stringify(nestedExpression('A and (B OR C OR (D AND E)) and (Z AND Y AND (T 2))')) ;
function nestedExpression(flatInput:any){
    let returnTree = {
        flatText: '',
        childBranch:[]
    
    };
    console.log('#', flatInput)
    let iterativeObject = xregexp.stringToJSON('()',flatInput, true);
    returnTree.flatText = iterativeObject.flatText;
    console.log('#', iterativeObject.flatText)
    if (iterativeObject.parenthesized.length > 0){
        for (let i = 0; i < iterativeObject.parenthesized.length;i++){
            returnTree.childBranch.push( nestedExpression(iterativeObject.parenthesized[i]));
        }
    }
    return returnTree;

}