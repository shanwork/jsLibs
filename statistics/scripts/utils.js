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
9.  average(arrayOfNumbers, <decPlaces>,<roundOff?> ) 
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
function addDateEntity(dateObject, quantity){
    let newDateObject = new Date(dateObject);
    return newDateObject.addDays(quantity);
}
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

function deepCopy(src, dest, modifyList=null){
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

