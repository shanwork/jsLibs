
import { LikeComponent } from './like.component';
import {XRegExp} from './XRegExp'
let component = new LikeComponent(10, true);
let xregexp = new XRegExp();
component.onClick();
console.log(`likesCount: ${component.likesCount}, isSelected: ${component.isSelected}`);
console.log('single parenths', xregexp.matchRecursive('()', '(A AND (B or E) and D)  OR (A AND C)'));
let multiLayerObject = xregexp.matchRecursive('()', 'A AND (B OR C) AND (D OR E)', true);
console.log('multiple', multiLayerObject.flatText, ':', multiLayerObject.parenthesized)
let noParenthObject = xregexp.matchRecursive('()', 'A AND E', true);
console.log('no parenths:', noParenthObject.flatText);
