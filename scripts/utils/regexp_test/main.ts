
import {StringSplitAndMore} from './stringSplitAndMore'
let xregexp = new StringSplitAndMore();
console.log('single parenths', xregexp.matchRecursive('()', '(A AND (B or E) and D)  OR (A AND C)'));
let multiLayerObject = xregexp.matchRecursive('()', 'A AND (B OR C) AND (D OR E)', true);
console.log('multiple', multiLayerObject.flatText, ':', multiLayerObject.parenthesized)
let noParenthObject = xregexp.matchRecursive('()', 'A AND E', true);
console.log('no parenths:', noParenthObject.flatText);
