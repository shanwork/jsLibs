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
    matchRecursive(pattern:string, inputStr: string, unwrapped=false ){
        let patParams = pattern.split('');
        let pattList = inputStr.split('');
        let pattInd = 0, parenthCount=0;
        let splitString = [];
        let unwrappedText = '';
        let stringElement = '';
        while (pattInd < pattList.length){
           switch (pattList[pattInd]){
               case patParams[0]:
               if (parenthCount++ > 0){
                   stringElement += pattList[pattInd];
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
                }
                  break
           }
           pattInd++;
        } 
            return {
                flatText: unwrappedText,
                parenthesized: splitString
            }
         

    }
}