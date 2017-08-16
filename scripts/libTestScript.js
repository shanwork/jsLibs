    /* General */
            document.getElementById('dateSpan').textContent= new Date().toDateString();
            
            /* #### Cloning */
            function nonReferenceCopy( source, destination,modifyList=null){
                let jsObjects = JSObjects() ;
                console.log( 'jsObjects.deepCopy(source,destination,modifyList); ');
                jsObjects.deepCopy(source,destination,modifyList);
            }// non reference copy
            
            var testObj = 
                {
                    name: 'Anna',
                    place: 'Agra',
                    animal: 'Antelope',
                    thing :'Armchair',
                    0:"zero",
                    points: 10,
                    playerNumber: 1,
                    alternates : {
                        item1:'Andrew',
                        item2:'Arnold' ,
                        item3:'Accra',
                        item4:'Adis Ababa' ,
                        item5:'African Elephant',
                        item6:'Armadillo' ,
                        item7: {
                            ten: "ten" ,
                            arr: [ "a", "b", {name:'1',afe:'2'}]
                        }
                    }
                };
            
            var simpleCopy = {} ;
            nonReferenceCopy(testObj,simpleCopy) ;
            document.getElementById('original').innerHTML = '/*This is the element being copied*/<br/><strong>var src= ' + 
                JSON.stringify(testObj) + ';</strong>';
            document.getElementById('simpleDeepCopy').innerHTML =  '/* dest = <strong>' + JSON.stringify(simpleCopy) + 
                '*/</strong>'; 
            
            var copyModified = {};
            var modifyList =
                [
                    {
                        key: 'name',
                        operation: 'searchReplace',
                        searchString: 'na',
                        operand: 'nabelle'
                    } ,
                    {
                        key: 'animal',
                        operation: 'concat',
                        operand: 's'
                    } ,
                    {
                        key: 'arr',
                        operation: 'concat',
                        operand: '32'
                    },
                    {
                        key: 'points',
                        operation: '*',
                        operand: '1.5'
                    },
                    {
                        key: 'playerNumber',
                        operation: '+',
                        operand: '1'
                    },
                    {
                        key: 'item2',
                        operation: 'explicitReplace',
                        operand: 'Armitage'
                    },
                    {
                        key: 'item1',
                        operation: 'searchReplace',
                        searchString: 'drew',
                        operand: 'toine'
                    }
                ];
            nonReferenceCopy(testObj,copyModified,modifyList);
            document.getElementById('modifyObjectWith').innerHTML = '/* copying and modifying the object */<br/><strong>var copyModified = {} ;<br/> var modifyList = ' + JSON.stringify(modifyList) + '<br/><br/>jsObjects.deepCopy(src,destination,copyModified);</strong>'; 
            document.getElementById('deepCopyModified').innerHTML = '/* copyModified = <strong>' + JSON.stringify(copyModified)+ '*/</strong>';  
            /**** CLONING **/
            
            /* #### MATHS AND STATS*/
            var mathAPITest = MathsAndStats()
            document.getElementById('roundAndtrigo').innerHTML = '/* Rounding off and Circle APIs*/<br/>';
            document.getElementById('roundAndtrigo').innerHTML += '<strong>mathAPITest.decimalRound(3.45557,3) = ' + mathAPITest.decimalRound(3.45557,3) + ';<br/>';
            document.getElementById('roundAndtrigo').innerHTML += '<strong>mathAPITest.decimalRound(3.45557,4) = ' + mathAPITest.decimalRound(3.45557,4) + ';<br/>';
            document.getElementById('roundAndtrigo').innerHTML += '<strong>mathAPITest.circleCircumference(3,4, false/* no rounding */) = '
                + mathAPITest.circleCircumference(3,4, false) + '; <br/>';
               
            document.getElementById('stats').innerHTML = '/* Statistics APIs*/<br/>';
            document.getElementById('stats').innerHTML += '<strong>mathAPITest.average([1,2,3,4]) = ' + mathAPITest.average([1,2,3,4]) + ';<br/>';
            document.getElementById('stats').innerHTML += '<strong>mathAPITest.average([1,2,3,4,6,7]) = ' + mathAPITest.average([1,2,3,4,6,7]) + ';<br/>';
            document.getElementById('stats').innerHTML += '<strong>mathAPITest.average([1,2,3,4,6,7],4,false) = ' + mathAPITest.average([1,2,3,4,6,7],0,false) + '; // no rounding off<br/>';
            document.getElementById('stats').innerHTML += '<strong>mathAPITest.meanDeviation([3, 6, 6, 7, 8, 11, 15, 16]) = ' + mathAPITest.meanDeviation([3, 6, 6, 7, 8, 11, 15, 16]) + ';<br/>';
            document.getElementById('stats').innerHTML += '<strong>mathAPITest.meanDeviation([3, 6, 6, 7, 8, 11, 15, 16,<em>-10</em>]) = ' + mathAPITest.meanDeviation([3, 6, 6, 7, 8, 11, 15, 16,-10]) + ';<br/>';
            document.getElementById('stats').innerHTML += '<strong>mathAPITest.variance([9, 2, 5, 4, 12, 7, 8, 11, 9, 3, 7, 4, 12, 5, 4, 10, 9, 6, 9, 4]) = ' 
                + mathAPITest.variance([9, 2, 5, 4, 12, 7, 8, 11, 9, 3, 7, 4, 12, 5, 4, 10, 9, 6, 9, 4]) + ';<br/>';
            document.getElementById('stats').innerHTML += '<strong>mathAPITest.variance([9, 2, 5, 4, 12, 7, 8, 11, 9, 3, 7, 4, 12, 5, 4, 10, 9, 6, 9, 4, <em>100</em>]) = ' 
                + mathAPITest.variance([9, 2, 5, 4, 12, 7, 8, 11, 9, 3, 7, 4, 12, 5, 4, 10, 9, 6, 9, 4, 100]) + ';<br/>';
            document.getElementById('stats').innerHTML += '<strong>mathAPITest.variance([9, 2, 5, 4, 12, 7, 8, 11, 9, 3, 7, 4, 12, 5, 4, 10, 9, 6, 9, 4, <em>100</em>],0) = ' 
                + mathAPITest.variance([9, 2, 5, 4, 12, 7, 8, 11, 9, 3, 7, 4, 12, 5, 4, 10, 9, 6, 9, 4, 100],0) + '; // zero dec places = whole number<br/>';
            document.getElementById('stats').innerHTML += '<strong>mathAPITest.standardDeviation([9, 2, 5, 4, 12, 7, 8, 11, 9, 3, 7, 4, 12, 5, 4, 10, 9, 6, 9, 4]) = '
                + mathAPITest.standardDeviation([9, 2, 5, 4, 12, 7, 8, 11, 9, 3, 7, 4, 12, 5, 4, 10, 9, 6, 9, 4]) + ';<br/>';
            document.getElementById('stats').innerHTML += '<strong>mathAPITest.standardDeviation([9, 2, 5, 4, 12, 7, 8, 11, 9, 3, 7, 4, 12, 5, 4, 10, 9, 6, 9, 4, <em>100</em>],6) = '
                + mathAPITest.standardDeviation([9, 2, 5, 4, 12, 7, 8, 11, 9, 3, 7, 4, 12, 5, 4, 10, 9, 6, 9, 4,100],6) + '; // six places<br/>';
            

            /**** MATHS AND STATS **/
            /* ### DOM */
            manipulateStyle = function(){
                let domElement = DOMElement('domDom');
                domElement.background('white') 
                    .fade(1.0, 0.5, 900, function() { 
                            let domElement2 = DOMElement("domDom2");
                            domElement2
                                .html('ADDING CONTENT <br/>IN CALLBACK OF FADE API',"padding:3px;color:firebrick;background-color:pink;border:3px inset brown; border-radius:6px;");
                        })
                    .border("2px solid orange")
                    .fade(0.01, 1.0, 3000, function() { 
                            let domElementAPI2 = DOMElement("domDomAPI2");
                            domElementAPI2.fade(0.0, 1, 900)
                                .text('SECOND CALL BACK DELAY And FADE IN',"padding:3px;color:darkgreen;background-color:#22CC88;border:4px outset darkgreen; border-radius:10px;") }
                    )
                    .text('Hope you are doing good')
                    .border("3px solid brown")
                    .foreground('red')
    
                    ;
                let domAPIElement = DOMElement('domDomAPI')
                domAPIElement.html("Code:<br/>let domElement = DOMElement('domDom');<br/>" + 
                                        "domElement.background('white') <br/>" + 
                                        "&nbsp;&nbsp;.fade(1.0, 0.5, 800, 900, function() { <br/>" +
                                        "&nbsp;&nbsp;&nbsp;&nbsp;let domElement2 = DOMElement(\"domDom2\");<br/>" +
                                        "&nbsp;&nbsp;&nbsp;&nbsp;domElement2..html('ADDING CONTENT &lt;br&gt; IN CALLBACK OF FADE API',<br/>" +
                                        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"padding:3px;color:firebrick;border:3px inset brown; border-radius:6px;\");<br/>" +
                                        "&nbsp;&nbsp;&nbsp;&nbsp; })<br/>" + 
                                        "&nbsp;&nbsp;.border('2px solid orange')<br/>" + 
                                        "&nbsp;&nbsp;.fade(0.5, 1.0, 3000, function() { <br/>" +
                                        "&nbsp;&nbsp;&nbsp;&nbsp;let domElement2 = DOMElement(\"domDom2\");<br/>" +
                                        "&nbsp;&nbsp;&nbsp;&nbsp;domElement2.text('SECOND CALL BACK DELAY And FADE IN',<br/>"+ 
                                         "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"padding:3px;color:darkgreen;background-color:#22CC88;border:4px outset darkgreen; border-radius:10px;\");<br/>" +
                                        "&nbsp;&nbsp;&nbsp;&nbsp; })<br/>" + 
                                        "&nbsp;&nbsp;.text('Hope you are doing good')<br/>" + 
                                        "&nbsp;&nbsp;.border('3px solid brown')<br/>" + 
                                        "&nbsp;&nbsp;.foreground('red')", "background-color:silver;padding:3px;font-weight:bold")
                                .border('2px outset gray');
    
            }
            let startNumber = 1000.00;
            let startNumberClass = 2000.00;
            var conditionalDOM = DOMElement('testNumbers');
            var conditionalDOMClass = DOMElement('testNumbersClass');
            var start = null;
            conditionalDOM.text(startNumber,'font-weight:bold;padding-left:3px;border:1px solid silver;width:auto;margin-left:15px;background-color:gray');
            conditionalDOMClass.textClass(startNumberClass,'dynamicGauge');
            function Start() {
             start = window.setInterval(function() {
                return function(domAPI, domAPI2, element, element2, value, value2){ 
                    let newValue = Math.random()* value * 1.5; 
                    element.textContent = mathAPITest.decimalRound(newValue,4).toString();
                    domAPI.conditionExpressionStyle(newValue < value/2.0, 
                                                    "color: red;font-weight:600;padding-left:3px;border:1px solid silver;width:auto;margin-left:15px;background-color:silver", 
                                                    "color: green;;font-weight:800;padding-left:3px;border:1px solid silver;width:auto;margin-left:15px;background-color:silver");
                    let newValue2 = Math.random()* value2 * 1.5; 
                    element2.textContent = mathAPITest.decimalRound(newValue2,4).toString();
                    domAPI2.conditionExpressionClass(newValue2 < value2/2.0, 
                                                    'badValue', 
                                                    'goodValue');
                 
                }(conditionalDOM, conditionalDOMClass, document.getElementById('testNumbers'), document.getElementById('testNumbersClass'),startNumber,startNumberClass, mathAPITest);
            },500 );
            }
            function End()
            {
                window.clearInterval(start);
            }
            function fallThrough() {
/*
  .dollar30 {
                 border:3px solid black;
                 background-color:  lightgrey;
                 color:black;
             }
             .dollar50 {
                 border:3px solid darkslateblue;
                 background-color:skyblue;
                 color: darkslateblue;
             }
             .dollar75 {
                 border:3px solid saddlebrown ;
                 background-color:  sandybrown;
                 color:saddlebrown ;
             }
             .emblem {
                 border: 2px black outset;
                 background-color: azure;   
                 padding: 3px;
                 margin:3px;
                 border-radius: 5px;
                 min-width: 200px;
                 min-height: 200px;
             }
             .nyGiants {
                background: linear-gradient( #001E62,#A6192E, #A2AAAD )
             }
             .azCardinals {
                background: linear-gradient( #9B2743,#FFCD00 )
             }
             .ordBears {  
                background: linear-gradient( #051C2C,#DC4405 )
             }
             .cvgBengals {
                  background: linear-gradient( #FB4F14,#000000) 
             }
             .oakRaiders {
                background: linear-gradient( #101820, #A5ACAF )
             }
*/
            let footballViewers = 
                [
                    {
                        name: 'JANE',
                        ticketPurchased: '$30',
                        teamSupported: 'New York Giants'
                    },
                    {
                        name: 'JOHN',
                        ticketPurchased: '$50',
                        teamSupported: 'Arizona Cardinals'
                    },
                    {
                        name: 'HARRY',
                        ticketPurchased: '$75',
                        teamSupported: 'Oakland Raiders'
                    },
                    {
                        name: 'SEJAL',
                        ticketPurchased: '$105',
                        teamSupported: 'None'
                    },
                    {
                        name: 'Dirty HARRY',
                        ticketPurchased: '$30',
                        teamSupported: 'Oakland Raiders'
                    }
                    ,
                    {
                        name: 'Sengupta',
                        ticketPurchased: '$130',
                        teamSupported: 'Cincinnati Bengals'
                    }
                    ,
                    {
                        name: 'Dasgupta',
                        ticketPurchased: '$130',
                        teamSupported: 'Cincinnati Bengals'
                    },
                     {
                        name: 'Mathew',
                        ticketPurchased: '$30',
                        teamSupported: 'Chicago Bears'
                    },
                    {
                        name: 'Matt',
                        ticketPurchased: '$50',
                        teamSupported: 'Chicago Bears'
                    },
                    {
                        name: 'Marie',
                        ticketPurchased: '$75',
                        teamSupported: 'Chicago Bears'
                    },
                    {
                        name: 'Snehal',
                        ticketPurchased: '$105',
                        teamSupported: 'None'
                    },
                    {
                        name: 'Bob',
                        ticketPurchased: '$30',
                        teamSupported: 'Arizona Cardinals'
                    }
                ]
            
            let conditionExpression = [
              {
                 exp: 'New York Giants',
                 className: 'nyGiants'
               },
               {
                 exp: 'Arizona Cardinals',
                 className: 'azCardinals'
               },
               {
                 exp: 'Chicago Bears',
                 className: 'ordBears'
               },
               {
                 exp: 'Cincinnati Bengals',
                 className: 'cvgBengals'
               },
               {
                 exp: 'Oakland Raiders',
                 className: 'oakRaiders'
               },
               {
                 exp: '$30',
                 className: 'dollar30'
               },
               {
                 exp:  '$50' ,
                 className: 'dollar50'
               },
               {
                 exp: '$75',
                 className: 'dollar75'
               },
               {
                 exp: "ticketPurchased=='$30'",
                 className: 'dollar30'
               },
               {
                 exp: "ticketPurchased=='$30'",
                 className: 'dollar30'
               },
               {
                 exp: "ticketPurchased=='$30'",
                 className: 'dollar30'
               },
               {
                 exp: "ticketPurchased=='$30'",
                 className: 'dollar30'
               }
                ];
                 let footballFans = document.getElementById('footballFans');
                if (footballFans){
                    
                     footballViewers.forEach(function (footballViewer){
                         let footballFanDivOuter = document.createElement("DIV");
                         footballFanDivOuter.id = footballViewer.name + 'O_' + footballViewer.ticketPurchased;
                         
                         
                         footballFans.appendChild(footballFanDivOuter); 
                         let footballFanDivOuterlDOM = DOMElement(footballFanDivOuter.id);
                         footballFanDivOuterlDOM.html(footballViewer.teamSupported + '<br/>', 'font-size:XLarge; color:white');
                         footballFanDivOuter.setAttribute('class', 'emblem') ;
                         conditionExpression.forEach (function(condition ){
                               footballFanDivOuterlDOM.conditionExpressionClass(footballViewer.teamSupported== condition.exp,condition.className, null, true)   ;
                                                   
                         })
                         let footballFanDivInner = document.createElement("DIV");
                         footballFanDivInner.id = footballViewer.name + 'I_' + footballViewer.ticketPurchased;
                         footballFanDivInner.className = 'innerInfo';
                         footballFanDivInner.innerHTML = footballViewer.name + '<br/>' + footballViewer.ticketPurchased ;
                       //  footballFanDivInner.className = 'dollar30';
                         footballFanDivOuter.appendChild(footballFanDivInner);
                         let footballFanDivInnerDOM = DOMElement(footballFanDivInner.id);
                          conditionExpression.forEach (function(condition ){
                               footballFanDivInnerDOM.conditionExpressionClass(footballViewer.ticketPurchased== condition.exp,condition.className, null, true)   ;
                                                   
                         })
                         
                            
                          //  footballFans
                })
                }
                } // .. fallThrough
                fallThrough();
          //  console.log(Boolean(Boolean.valueOf( "footballViewers[0]." + conditionExpression[0].exp)));
            /*** DOM */