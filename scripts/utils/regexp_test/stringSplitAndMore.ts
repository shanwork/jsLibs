// This is a script written as a (at present) one API class to simulate the match recursive functionality of XRegexp
// API
// matchrecursive 
// Splits based on pair of characters. e.g. '()' - applied to '(A OR B) AND (B OR C)' gives two items 'A OR B', 'B OR C"
// Optionally also returns the 'AND' which is not wrapped in parenths
// parameters - 
// 'pattern': '()'
// 'inputStr': '(A AND B ) OR '(B AND C)'
// 'unwrapped': optional, default false, if true, returns 'OR' in addition to the array
// return  
export class  StringSplitAndMore {
    stringToJSON(pattern:string, inputStr: string, unwrapped=false ){
        let patParams = pattern.split('');
        let pattList = inputStr.split('');
        let pattInd = 0, parenthCount=0;
        let splitString = [];
        let unwrappedText = '';
        let unwrappedElement = '';
        let unwrappedList = [];
        let stringElement = '';
        while (pattInd < pattList.length){
           switch (pattList[pattInd]){
               case patParams[0]:
               if (parenthCount++ > 0){
                   stringElement += pattList[pattInd];
                }
                if (parenthCount <= 1){
                    unwrappedList.push(unwrappedElement);
                    unwrappedElement='';
                }

                break;
                
                case patParams[1]:
                parenthCount--;
                    if (parenthCount === 0){
                        splitString.push(stringElement);
                        stringElement = '';
                        
                    }
                    else if (parenthCount < 0){
                        splitString[0] = 'Error unbalanced parentheses';
                        return splitString;
                    }
                    else {
                        stringElement += pattList[pattInd];
                           
                    }
                    break;
                default:
                if (parenthCount > 0){
                stringElement += pattList[pattInd];
                }
                else if (parenthCount == 0){
                    unwrappedText += pattList[pattInd];
                    unwrappedElement += pattList[pattInd];
                }
                  break
           }
           pattInd++;
        } 
        if (unwrappedElement !== ''){
            unwrappedList.push(unwrappedElement);
        }
            return {
                flatText: unwrappedText,
                flatList:unwrappedList,
                parenthesized: splitString
            }
         

    }
    JSONToString(pattern:any, inputObject:any){
        let outputString = '';
        let patternList = pattern.split('');
        console.log(JSON.stringify(inputObject));
        if (inputObject.parenthesized.length > inputObject.flatList.length){
            for (let parInd = 0, flatInd=0 ; parInd < inputObject.parenthesized.length;parInd++, flatInd++){
                if (flatInd < inputObject.flatList.length){
                        outputString += inputObject.flatList[flatInd];

                }
                outputString += '(' + inputObject.parenthesized[parInd] + ')' ;
            }
        }
        else {
            for (let parInd = 0, flatInd=0 ; flatInd < inputObject.flatList.length;parInd++, flatInd++){
                
                outputString += inputObject.flatList[flatInd];

                if (parInd < inputObject.parenthesized.length){
                    outputString += '(' + inputObject.parenthesized[parInd] + ')' ;
                }
            }
        }
        return outputString;
    }
    
    
}