var removeAll = function()
{
       console.log(d3.select("#storyBoard").selectAll('div').html());
}
// shift to API
let fadeSequence = function(domElement, iterations, index, callback){
        console.log(callback);
        console.log(  iterations[index], index);
        if (index < iterations.length){
        domElement.fade(iterations[index].start, iterations[index].end,  iterations[index].timout, function(){
            
                    fadeSequence(domElement, iterations, index,callback) ;
           
        })
            index++;
        }
        else if (callback){
            callback() ;
        
        }
 };
 let fadeParallel = function(domElementFadeout, domElementFadein=null, iterations, iterations2=null, index,index2=0, callback){
        console.log(callback,domElementFadein);
        console.log(  iterations[index], index);
        if (domElementFadein)
            domElementFadeout.fadeIn = domElementFadein;
        if (index < iterations.length){
                    domElementFadeout.fade(iterations[index].start, iterations[index].end,  iterations[index].timout, function(){
                       if(domElementFadeout.fadeIn)// && iterations2 && index < iterations2.length) 
                           {
                               let index2 = iterations.length - index -1;
                               if (index2 >=0 ){
                               domElementFadeout.fadeIn.display('block');
                               domElementFadeout.fadeIn.fade(iterations[index2].end, iterations[index2].start,  iterations[index2].timout);
                               }
                           }
                        fadeParallel(domElementFadeout,null, iterations, iterations2, index,index2, callback) ;
                    })
            index++;
        }
        else if (callback){
            callback() ;
        
        }
    };
// worry about optimization, closure and IIFE later
openStoryWorking = function(){
    let iterations = [
        {
            start:1.0, 
            end:0.9,
            timout:200
        }, {
            start:0.9, 
            end:0.8,
            timout:200
        },
        {
            start:0.8, 
            end:0.6,
            timout:600
        },
        {
            start:0.6, 
            end:0.4,
            timout:400
        },
        {
            start:0.4, 
            end:0.2,
            timout:500
        }
        ,
        {
            start:0.2, 
            end:0.0,
            timout:500
        }
    ];
    let index = 0;
    let domElement = DOMElement('curtain');
    let domElementCurtain = DOMElement('curtain');
    let domElementMainStory = DOMElement('mainStory');
   // fadeNext(domElementCurtain,domElementMainStory,20000)
  
    let domElement2 = DOMElement('mainStory');
   fade (domElement, iterations, index, function() {
        let index2 = 0;
         let iterations2 = [
        {
            start:0.0, 
            end:0.2,
            timout:800
        },
        {
            start:0.2, 
            end:0.4,
            timout:600
        },
        {
            start:0.4, 
            end:0.6,
            timout:400
        },
        {
            start:0.6, 
            end:0.8,
            timout:500
        }
        ,
        {
            start:0.8, 
            end:1.0,
            timout:500
        }
    ];
         let domElement2 = DOMElement('mainStory');
         domElement2.display('block');
        fade(domElement2,iterations2,index2);
      
    });
 
    return;
}
openStory = function(fadeMode=0){
    let fadeOutIterations = [
        {
            start:1.0, 
            end:0.9,
            timout:200
        }, {
            start:0.9, 
            end:0.8,
            timout:200
        },
        {
            start:0.8, 
            end:0.6,
            timout:600
        },
        {
            start:0.6, 
            end:0.4,
            timout:400
        },
        {
            start:0.4, 
            end:0.2,
            timout:500
        }
        ,
        {
            start:0.2, 
            end:0.0,
            timout:500
        }
    ];
      let iterationsFadeIn = [
        {
            start:0.0, 
            end:0.2,
            timout:400
        },
        {
            start:0.2, 
            end:0.4,
            timout:500
        },
        {
            start:0.4, 
            end:0.6,
            timout:300
        },
        {
            start:0.6, 
            end:0.8,
            timout:100
        }
        ,
        {
            start:0.8, 
            end:1.0,
            timout:100
        }
    ];
    let index = 0;
    
    let domElementCurtain = DOMElement('curtain');
    let domElementMainStory = DOMElement('mainStory');
   
    switch(fadeMode){
        case 0: domElementCurtain.transitionFadeParallel(domElementMainStory,fadeOutIterations,index,null);//fadeParallel (domElementCurtain, domElementMainStory, fadeOutIterations, iterationsFadeIn, index,0);
            break;
        case 1: domElementCurtain.transitionFadeSequential(domElementMainStory,fadeOutIterations,index,null);
            /*fadeSequence(domElementCurtain, fadeOutIterations, index, function() {
        let index2 = 0;
         let iterations2 = [
        {
            start:0.0, 
            end:0.2,
            timout:800
        },
        {
            start:0.2, 
            end:0.4,
            timout:600
        },
        {
            start:0.4, 
            end:0.6,
            timout:400
        },
        {
            start:0.6, 
            end:0.8,
            timout:500
        }
        ,
        {
            start:0.8, 
            end:1.0,
            timout:500
        }
    ];
         let domElement2 = DOMElement('mainStory');
         domElement2.display('block');
        fadeSequence(domElement2,iterations2,index2);
      
    });*/
    }
    let domElement = DOMElement('curtain');
   
  
    
  
    return;
}
loadChapterDiv = function(index, postBack=true){
if (postBack==false)
    {
        let chapterRowDiv = document.getElementById('chapterRow');
        if (chapterRowDiv){
            let defaultButtonStyle = "padding:3px;font-weight:bold;color:green;background-color:lightyellow; border: 1px solid green;margin:2px; border-radius:3px;";
            for (let chaptIndex=0; chaptIndex < storyList.length;chaptIndex++){
                let chapterButton = document.createElement("button");
                chapterButton.innerHTML = "Chapter " + (chaptIndex+1);
                chapterButton.setAttribute("style", storyList[chaptIndex].buttonStyle?   storyList[chaptIndex].buttonStyle  :defaultButtonStyle);
                chapterButton.setAttribute("title", storyList[chaptIndex].title);
                chapterButton.addEventListener('click', function() { loadChapterDiv( chaptIndex+1 ) } );
                chapterRowDiv.appendChild(chapterButton);
            }
        }
    }
console.log(index);
let currentChapter = storyList[index-1];// ,end) ;//index+1);
let text = ''; 
for (let i = 0; i < currentChapter.subsections.length;i++){
                        if (currentChapter.subsections[i].subTitle && currentChapter.subsections[i].subTitle != '')
                        {
                            text += "<h4>" + currentChapter.subsections[i].subTitle + "</h4>";
                        }
                        if (currentChapter.subsections[i].content && currentChapter.subsections[i].content != '')
                        {
                            text +=   currentChapter.subsections[i].content  ;
                        }
                    }
let defaultHeaderStyle= 
    {
        'font-weight': '900',
        'color':'firebrick',
         'background-color': 'transparent', 'opacity':'1.5'
    };
let headerStyle = currentChapter.headerStyle?currentChapter.headerStyle:defaultHeaderStyle
d3.select("#storyBoard")
    .select('H2')
    .style(headerStyle)
    .text(currentChapter.title );
let defaultContentStyle =  { 'border':'3px outset orange',
             'background-image': 'url("images/lord-krishna-786.jpg")',
             'background-size': 'contain',
             'border-radius':'4px', 
             'padding':'2px',
             'color':'orange', 
             'opacity':'0.5',
              'background-color':'lightgoldenrodyellow'}
let t = d3.transition()
    .duration(7500);
let contentStyle =currentChapter.contentStyle?  currentChapter.contentStyle:defaultContentStyle ;
d3.select("#storyBoard")
    .style(contentStyle  );
  d3.select("#details")
    .style( { 
      'background-color':'lightgoldenrodyellow',
        'opacity':'0.7',
        'margin': '10px',
      'padding':'5px',
        'color':'black',
        'font-weight':'900',
        'border':'2px solid red'})
      .html(text);          
}

loadChapterDiv2 = function(index, postBack=true){
if (postBack==false)
    {
        let chapterRowDiv = document.getElementById('chapterRow');
        if (chapterRowDiv){
            for (let chaptIndex=0; chaptIndex < storyList.length;chaptIndex++){
                let chapterButton = document.createElement("button");
                chapterButton.value = "Chapter " + (chaptIndex+1);
                chapterButton.addEventListener('click', function() { loadChapterDiv( chaptIndex+1 ) } );
                chapterRowDiv.appendChild(chapterButton);
            }
        }
    }
console.log(index);
let array = storyList.slice(index-1, index+1);// ,end) ;//index+1);
 

d3.select("#storyBoard")
     .data(array )
   .enter()
       .append('div')
    .style( { 'border':'3px outset orange',
             'border-radius':'4px', 
             'padding':'2px',
             'color':'orange', 
             'background-color':'lightgoldenrodyellow'}  ) 
    .style (function(d,i) { return  {'display':'none'} ;} )
    /*   .style(function(d,i) { return '{' +
            "'border':'3px outset orange'," +
            "'border-radius':'4px'," +
            "'padding':'2px'," +
            "'color':'orange'," +
            "'display':" + i==index? "'block'":"'none'" + "," +
            "'background-color':'lightgoldenrodyellow'}" } )  */
            .append('div')
            .attr('id', function(d,i) { return 'part' + i})
            .append('H2')
            .style({
            'padding':'2px',
            'color':'orangered',
            'background-color':'goldenrodyellow'})  
            .text(function(d,i){ return d.title })
            .append("p")
            .style({
            'padding':'2px',
            'color':'darkslateblue',
            'background-color':'greenyellow'})  
            .text(function(d,i){ return d.title })
            .html(function(d) { 
                    let text = '';
                    for (let i = 0; i < d.subsections.length;i++){
                        if (d.subsections[i].subTitle && d.subsections[i].subTitle != '')
                        {
                            text += "<h4>" + d.subsections[i].subTitle + "</h4>";
                        }
                        if (d.subsections[i].content && d.subsections[i].content != '')
                        {
                            text +=   d.subsections[i].content  ;
                        }
                    }
                    return text; }); 
         /*   .data(subsections)
            .enter()
                .append('p')
                .append('h3')
                .text(function(d) { return d.subTitle});
 
.attr('loadDivtle',function(d, i) { return d + ' units' + i;})
.style({  'float':'left','height':  function(d) { return d*20 + 'px';},'margin-top': function(d) { return (max - d*20) + 'px'},'border':'2px outset pink', 'background-color': 'crimson','width':'20px','border-radius':'3px',}).text(function(d){ return d});
    ;
*/
}
//loadChapterDiv(2);