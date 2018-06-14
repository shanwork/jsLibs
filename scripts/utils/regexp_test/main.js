"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stringSplitAndMore_1 = require("./stringSplitAndMore");
var xregexp = new stringSplitAndMore_1.StringSplitAndMore();
console.log('single parenths', xregexp.matchRecursive('()', '(A AND (B or E) and D)  OR (A AND C)'));
var multiLayerObject = xregexp.matchRecursive('()', 'A AND (B OR C) AND (D OR E)', true);
console.log('multiple', multiLayerObject.flatText, ':', multiLayerObject.parenthesized);
var noParenthObject = xregexp.matchRecursive('()', 'A AND E', true);
console.log('no parenths:', noParenthObject.flatText);
