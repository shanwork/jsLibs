export class  XRegExp {
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
                   stringElement = stringElement + pattList[pattInd];
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
                        stringElement = stringElement + pattList[pattInd];
                           
                    }
                    break;
                default:
                if (parenthCount > 0){
                stringElement = stringElement + pattList[pattInd];
                }
                else if (parenthCount == 0){
                    unwrappedText += pattList[pattInd];
                }
                  break
           }
           pattInd++;
        }
        if (unwrapped === true){
            return {
                flatText: unwrappedText,
                parenthesized: splitString
            }
        }
        else {
                return splitString;
        }

    }
}