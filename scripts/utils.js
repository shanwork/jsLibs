/******* INITIAL SET OF APIs for BUILDING A LIBRARY IN ECMASCRIPT 6 
APIS
<..> = optional argument

1. deepCopy(src, dest) - non referencial copy from one object (src) to another (dest)
2. decimalRound(number, decPlaces) - rounds number to 'decPlaces' decimal places
3. circleArea( radius, <decPlaces>,<roundOff?> ) - area of a circle, given radius
4. circleCircumference( radius, <decPlaces>,<roundOff?> ) - circumference of a circle, given radius
5. average(arrayOfNumbers, <decPlaces>,<roundOff?> ) 

1. deepCopy
The function below is used to deep (non reference ) copy an object to another, ie the source and destination
objects are in totally different location; simply put changing the source object will not affect the destination object and vice versa

Using regression, object.values, typeOf, isArray and regression, this builds the destination object element by element, layer by layer.
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
            deepCopy(objectValues[arrayKey],dest[arrayKey]);
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
                  deepCopy(valueList[kIndex][srr],dest[destKey][srr]);
                }
                else { // simple array  
                  dest[destKey].push(valueList[kIndex][srr]);
                }
              } // for 
            } // isArray
            else if (typeof(valueList[kIndex])=="object"  ){ // element is an object 
              dest[destKey] = {};
              deepCopy(valueList[kIndex],dest[destKey])
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
// Trigo and Math basic functions
// 1. rounding off to x decimal places
function decimalRound(num, decPlaces)
{
    var multiplyBy = Math.pow(10, decPlaces);
    num *= multiplyBy;
    return parseFloat(Math.round(num))/ parseFloat(multiplyBy);
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

// statistical APIS
var average = function(numbersToAverage, decPlaces=4, roundOff=true){
    let totalELements = numbersToAverage.length;
    let totalElementsSum = 0.0;
    numbersToAverage.forEach(function(element) { totalElementsSum += parseFloat(element);});
     if (roundOff)
        return decimalRound(totalElementsSum/parseFloat(totalELements),decPlaces) ;
     return totalElementsSum/parseFloat(totalELements);
}