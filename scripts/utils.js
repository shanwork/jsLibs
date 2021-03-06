/******* INITIAL SET OF APIs for BUILDING A LIBRARY IN ECMASCRIPT 6 
APIS
<..> = optional argument

1. deepCopy(src, dest, <modify list>) 
- non referencial copy from one object (src) to another (dest), 
- optionally, the cloned object fields can be modified after the copy using an array 'modifyList' 
  This is a list of objects name (key), operation (string operations - concat, replace, search-replace, simple math operations )
    
2. modifyFields(modify list)  added to the Object.prototype 
  - modifies field values of an object (as above)
 ### NOTE: at this point, it fails for trying to modify fields of objects cloned by Object.create or new object, because the fields in the cloned object go to the '__proto__' component of the cloned object and my current logic does not yet provision for this
 
3. decimalRound(number, decPlaces) - rounds number to 'decPlaces' decimal places

4. swap(boxedSwapElements, ascending) 
  - swaps two elements elem1, elem2 boxed in the object 'boxedSwapElements'
  - ascending = true, swaps them so elem1 < elem2, ascending = false swaps so elem1 > elem2, ascending=null/undefined, swaps them anyway

5. bubble (list, startIndex, endIndex) 
    - pushes an element in list at startIndex to endIndex, after saving in temp and pushing in between elements forward
6. circleArea( radius, <decPlaces>,<roundOff?> ) - area of a circle, given radius
7. circleCircumference( radius, <decPlaces>,<roundOff?> ) - circumference of a circle, given radius
8. sortList(list, ascending)  - sorts a list ascending (true) or descending (ascending=false). Currently using bubble sort. Quicksort WIP
9. average(arrayOfNumbers, <decPlaces>,<roundOff?> ) 
10. meanDeviation(arrayOfNumbers, <decPlaces>, <roundOff>)
11. variance(arrayOfNumbers, <decPlaces>, <roundOff>) 
12. standardDeviation(arrayOfNumbers, <decPlaces>, <roundOff>) 

1. deepCopy
The function below is used to deep (non reference ) copy an object to another, ie the source and destination
objects are in totally different location; simply put changing the source object will not affect the destination object and vice versa

Using object.values, typeOf, isArray and recusrsion, this builds the destination object element by element, layer by layer.
Works for combination of JSON type objects and Arrays; havent implemented yet for functions.at

July 5 2017 - variation as step 1 to generate test data.
modifyList array of the following object
{
   key: <keyName>,
   operation: <string used in a switch case>
   operand
}

This will use binding ultimately, and also include arrays. See the index.js for an example ('Name', 'place' animal thing ) where a deep copy has some keys' values modified and progressively modified objects are pushed into an array
*/
// This function is used by deep copy, passing the key, keyname, existing value and the list of keys to be modified along with how to modify 
// them. If the key passed is found in the list, the value is modified
// will figure out how to bind this
function keyModify(key,keyName, originalValue, modifyList )
{
    var returnValue = originalValue;
    modifyList.forEach(function (keyElement){
        if (keyElement.key== keyName){
            switch(keyElement.operation){
                case '+' : originalValue  += parseFloat(keyElement.operand);
                    break;
               case '-' :  originalValue  -= parseFloat(keyElement.operand);
                    break;
              case '*' :  originalValue  *= parseFloat(keyElement.operand);
                    break;
              case '//' :  originalValue  /= parseFloat(keyElement.operand);
                    break;
               case 'concat' :  originalValue +=  keyElement.operand ;
                    break;
               case 'explicitReplace' :  originalValue = keyElement.operand;
                    break;
                case 'searchReplace' :  if(keyElement.searchString && originalValue.indexOf(keyElement.searchString)>=0)
                     originalValue =  originalValue.replace(keyElement.searchString,  keyElement.operand) ;
                    break;
            
                                    }
        }
    })
    return originalValue ;
}
// to make sure this one isnt called
function deepCopy2(src, dest, modifyList=null){
    if (src){
      var objectValues = Object.values(src);
      // small 'variance' from the recursion where the initial check whether the top level object is a JSON object or array
      if (Array.isArray(src) ) {
        for (var arrayKey=0; arrayKey < objectValues.length;arrayKey++) {
          if (typeof(objectValues[arrayKey]) =="object") { // array element is an object 
            dest.push(new Object());
            deepCopy(objectValues[arrayKey],dest[arrayKey], modifyList);
           }
           else { // array element is a primitive    
             dest.push(objectValues[arrayKey]);
           } 
         } 
       } // top level element is an array
       else if (typeof(src)=="object" ) {
         var keyList = Object.keys(src);
         var valueList = Object.values(src);
         if (keyList ) { // the object has keys
          for (let kIndex=0; kIndex < keyList.length;kIndex++){
            var destKey = keyList[kIndex];
            if (Array.isArray(valueList[kIndex])){ // element is an array 
              dest[destKey] = [];
              for (var srr=0; srr < valueList[kIndex].length;srr++){
                if (typeof(valueList[kIndex][srr]) =="object"){
                  dest[destKey].push(new Object());
                  deepCopy(valueList[kIndex][srr],dest[destKey][srr],modifyList);
                }
                else { // simple array  
              //    dest[destKey].push(valueList[kIndex][srr]);
                  dest[destKey].push(modifyList? keyModify(dest[destKey],destKey, valueList[kIndex][srr], modifyList ):valueList[kIndex][srr]);
                }
              } // for 
            } // isArray
            else if (typeof(valueList[kIndex])=="object"  ){ // element is an object 
              dest[destKey] = {};
              deepCopy(valueList[kIndex],dest[destKey],modifyList)
            }
            else {
              dest[destKey] = modifyList? keyModify(dest[destKey],destKey, valueList[kIndex], modifyList ):valueList[kIndex];
            }
           }

         } // ... if keylist
      }
      else {
        dest = src ; // 
      }
   } // if src
}

Object.prototype.modifyFields = function(modifyList) {
    let currentObject = this ;
    if (typeof(currentObject)== "object"){
        let currentObjectValues = Object.values(currentObject);
        let currentObjectKeys = Object.keys(currentObject);
        for (let valueIndex = 0; valueIndex < currentObjectValues.length; valueIndex++) {
            if (Array.isArray(currentObjectValues[valueIndex])){
            }
            else if (typeof(currentObjectValues[valueIndex])=="object"){
                currentObjectValues[valueIndex].modifyFields(modifyList);
            }
            else {
                let currentKey = currentObjectKeys[valueIndex];
                let modified =  keyModify(null, currentKey,currentObjectValues[valueIndex],  modifyList);
                console.log(':::::',currentObject[currentKey]);
                currentObject[currentKey] = modified;//keyModify(null, currentKey,currentObjectValues[valueIndex],  modifyList);
                console.log(':::::',currentObject[currentKey]);
                
            }
        }
    }
}

// Trigo and Math basic functions
// reused utilities
// 1. rounding off to x decimal places
function decimalRound(num, decPlaces)
{
    var multiplyBy = Math.pow(10, decPlaces);
    num *= multiplyBy;
    return parseFloat(Math.round(num))/ parseFloat(multiplyBy);
}
// Swap used mostly in sorting
function swap( swapObject,  ascending){
    if ((ascending == true && swapObject.elem1 > swapObject.elem2) ||
        (ascending == false && swapObject.elem1 < swapObject.elem2) ||
        (ascending==null || ascending==undefined)) {
      swapObject.trans = swapObject.elem1;
      swapObject.elem1 = swapObject.elem2;
      swapObject.elem2 = swapObject.trans;
    }
    return swapObject;
}
// bubbling
function bubble( arrayToBubble, bubbleStartIndex, bubbleEndIndex){
    let tempValue = arrayToBubble[bubbleStartIndex];
    for (let x = bubbleStartIndex; x < (bubbleEndIndex); x++){
        if ((x+1) < arrayToBubble.length){
            arrayToBubble[x] = arrayToBubble[x+1];
        }
    }
    arrayToBubble[bubbleEndIndex]= tempValue;
}
// Circle area and cicumference
function circleArea(radius,decPlaces=4, roundOff=true)
{
    if (roundOff)
        return decimalRound(radius * radius * (22.0/7.0),decPlaces) ;
     return radius * radius * (22.0/7.0);
    
}
var circleCircumference = function(radius, decPlaces=4, roundOff=true)
{
    if (roundOff)
        return decimalRound(radius * 2 * (22.0/7.0),decPlaces) ;
     return radius * 2 * (22.0/7.0);
    
}

// algorithmic and statistical APIS
var sortList =  function(numbersToSort, ascending=true){
    let listLength = numbersToSort.length;
    switch(listLength){
        case 0:
        case 1:
            return numbersToSort;
            break;
        case 2:
             
            let swapValues = swap({elem1:numbersToSort[0], elem2:numbersToSort[1], trans:0}, ascending);
            numbersToSort[0] = swapValues.elem1;
            numbersToSort[1] = swapValues.elem2;
            return numbersToSort;
            break;
        default:
            break;
      }
    for (let pivotalIndex = 0; pivotalIndex <  listLength; pivotalIndex++){
        for(remIndex = pivotalIndex+1; remIndex <  listLength; remIndex++){
            let swapValues = swap({elem1:numbersToSort[pivotalIndex], elem2:numbersToSort[remIndex], trans:0}, ascending);
            numbersToSort[pivotalIndex] = swapValues.elem1;
            numbersToSort[remIndex] = swapValues.elem2;
            
        }
    }
    // quickSort does not work
    // reverting to bubble sort
    // ....
    //pivotElement = numbersToSort[listLength-1];
    //quickSortRecurse(numbersToSort, pivotElement, listLength-1);
    return numbersToSort;
    
}
function quickSortRecurse(sortArray, pivot, pivotIndex){
    if (sortArray.length <= 1)
        return;
    let arrIndex = 0;
    let outOfOrder = false ;
    while (arrIndex < pivotIndex){
        if (sortArray[arrIndex] >= pivot ) {
            bubble(sortArray, arrIndex,pivotIndex );
            pivotIndex--;
            outOfOrder=true ;
            arrIndex = 0;
            continue;
        }
        arrIndex++;
    }
     
    console.log('sorted ', sortArray)
    if (pivotIndex <= 0 || !outOfOrder)
        return;
    let lowerArray = sortArray.slice(0,pivotIndex);
    let lowerPivot = lowerArray[pivotIndex-1]
    quickSortRecurse(sortArray, lowerPivot, pivotIndex-1)
   // quickSortRecurse(lowerArray, lowerPivot, pivotIndex-1)
    let upperArray = sortArray.slice(pivotIndex+1, sortArray.length);
    let upperPivot = sortArray[sortArray.length-1]
  // quickSortRecurse(upperArray, upperPivot, sortArray.length-1);
     quickSortRecurse(sortArray, upperPivot, sortArray.length-1);
    
}
var average = function(numbersToAverage, decPlaces=4, roundOff=true){
    let totalELements = numbersToAverage.length;
    let totalElementsSum = 0.0;
    numbersToAverage.forEach(function(element) { totalElementsSum += parseFloat(element);});
     if (roundOff)
        return decimalRound(totalElementsSum/parseFloat(totalELements),decPlaces) ;
     return totalElementsSum/parseFloat(totalELements);
}
// mean deviation routine
var meanDeviation = function(numbersToMeanDeviation, decPlaces=4, roundOff=true){
    let totalELements = numbersToMeanDeviation.length;
    let totalElementsDiffWithAvg = 0.0;
    // 1. calculate the average
    let mean = average(numbersToMeanDeviation,null, false) ;// round off at the end, we keep all decimal places until the last calculation
    // 2. get the positive difference between each number and the average and add them
    numbersToMeanDeviation.forEach(function(element) { totalElementsDiffWithAvg += Math.abs  ((element - mean),2);});
    // 3. mean deviation - divide the above sum by the number of elements
     if (roundOff)
        return decimalRound(totalElementsDiffWithAvg/parseFloat(totalELements),decPlaces) ;
     return totalElementsDiffWithAvg/parseFloat(totalELements);
}
// Variance - also called by the standard deviation routine
var variance = function(numbersToVariance, decPlaces=4, roundOff=true){
    let totalELements = numbersToVariance.length;
    let totalElementsMinusAvgSquare = 0.0;
    // 1. calculate the average
    let mean = average(numbersToVariance,null, false) ;// round off at the end, we keep all decimal places until the last calculation
    // 2. square the difference between each number and the average and add them
    numbersToVariance.forEach(function(element) { totalElementsMinusAvgSquare += Math.pow((element - mean),2);});
    // 3. Variance - divide the above sum by the number of elements
     if (roundOff)
        return decimalRound(totalElementsMinusAvgSquare/parseFloat(totalELements),decPlaces) ;
     return totalElementsMinusAvgSquare/parseFloat(totalELements);
}
// standard deviation
var standardDeviation = function(numbersToStdDev, decPlaces=4, roundOff=true){
     // the first three steps are done in the variance method
     var varianceNum = variance(numbersToStdDev, null, false );// round off at the end, we keep all decimal places until the last calculation
     if (roundOff)
        return decimalRound(Math.sqrt(varianceNum),decPlaces) ;
     return Math.sqrt(varianceNum) ;
}