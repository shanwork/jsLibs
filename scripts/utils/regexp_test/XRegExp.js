"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var XRegExp = /** @class */ (function () {
    function XRegExp() {
    }
    XRegExp.prototype.matchRecursive = function (pattern, inputStr, unwrapped) {
        if (unwrapped === void 0) { unwrapped = false; }
        var patParams = pattern.split('');
        var pattList = inputStr.split('');
        var pattInd = 0, parenthCount = 0;
        var splitString = [];
        var unwrappedText = '';
        var stringElement = '';
        while (pattInd < pattList.length) {
            switch (pattList[pattInd]) {
                case patParams[0]:
                    if (parenthCount++ > 0) {
                        stringElement = stringElement + pattList[pattInd];
                    }
                    break;
                case patParams[1]:
                    parenthCount--;
                    if (parenthCount === 0) {
                        splitString.push(stringElement);
                        stringElement = '';
                    }
                    else if (parenthCount < 0) {
                        splitString[0] = 'Error unbalanced parentheses';
                        return splitString;
                    }
                    else {
                        stringElement = stringElement + pattList[pattInd];
                    }
                    break;
                default:
                    if (parenthCount > 0) {
                        stringElement = stringElement + pattList[pattInd];
                    }
                    else if (parenthCount == 0) {
                        unwrappedText += pattList[pattInd];
                    }
                    break;
            }
            pattInd++;
        }
        if (unwrapped === true) {
            return {
                flatText: unwrappedText,
                parenthesized: splitString
            };
        }
        else {
            return splitString;
        }
    };
    return XRegExp;
}());
exports.XRegExp = XRegExp;
