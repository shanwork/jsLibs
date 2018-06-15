# Overview
This is a simple utility for string manipulation. 
One of the intents was to rewrite or mimic some API's which belong to other third party libaries and whose content would require to be dug into, to be studied
The code I've written is an attempt to be clean, not using JavaScript specific features, and easy to translate to some other language like Java

## APIs
### stringToJSON:
 Ihe API used is to split a string by boundary pair e.g '()' splits '(A and B) or (B and C)' into an array with ['A and B', 'B and C']; optionally a string like 'TOP AND (A and B) or (B and C)' will return an object with a string 'TOP AND' and the array  ['A and B', 'B and C']

 main.ts applies this to a complex nested expression.. 
 Go look at it!!