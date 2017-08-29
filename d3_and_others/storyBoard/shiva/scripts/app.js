
/* Slide show functions..*/
var start=null, slideShowIndex=1;

startSlideShow = function(){
   let startShow = document.getElementById('startShow');
    if (startShow){
        startShow.disabled= true;
        startShow.className = 'playButtons' ;
   } 
   let endShow = document.getElementById('endShow');
    if (endShow) {
        endShow.disabled= false ;
        endShow.className = 'playButtons playButtonPink' ;
    }
    start = window.setInterval( function(){
        loadChapterDiv(slideShowIndex++,true,false);
   },slideShowInterval);
}
endSlideShow = function(){
    window.clearInterval(start);
    if(slideShowIndex > chapterData.length)
        slideShowIndex=1;
    let startShow = document.getElementById('startShow');
    if (startShow){ 
        startShow.disabled= false;
        startShow.className = 'playButtons playButtonGreen' ;
    }
    let endShow = document.getElementById('endShow');
    if (endShow){
        endShow.disabled= true ;
        endShow.className = 'playButtons' ;
    }
}
/* ... Slide show functions*/

/* cover page to main section merge.. in time, the cover page will be absorbed in the json as well */
var currentIndex =1, prevIndex=1;
var currentContentIdTest = 'testpage1', currentContentId = 'page1'
var storyBoard = document.getElementById('storyBoard');
var details = document.getElementById('details');
var storyBoardHeader = document.getElementById('storyBoardHeader') ;
openStory = function(fadeMode=0){
     let index = 0;
    
    let domElementCurtain = DOMElement('curtain');
    let domElementMainStory = DOMElement('mainStory');
    let fadeOutIterations = [
        { start:1.0, end:0.9, timout:200 }, 
        { start:0.9, end:0.8, timout:200 },
        { start:0.8, end:0.6, timout:600 },
        { start:0.6, end:0.4, timout:400 },
        { start:0.4, end:0.2, timout:500 } ,
        { start:0.2, end:0.0, timout:500 }
    ];
            
    switch(fadeMode){
        case 0: domElementCurtain.transitionFadeParallel(domElementMainStory,fadeOutIterations,index,null);
            break;
        case 1: 
            let iterationsFadeIn = [
                { start:0.0, end:0.2, timout:400 },
                { start:0.2, end:0.4, timout:500 }, 
                { start:0.4, end:0.6, timout:300 }, 
                { start:0.6, end:0.8, timout:100 },
                { start:0.8, end:1.0, timout:100 }
            ];
            domElementCurtain.transitionFadeSequential(domElementMainStory,fadeOutIterations,index,null);
            break;
    }
    let domElement = DOMElement('curtain');
}

highlightSelectionButton = function(index){
    if (index != currentIndex){
        prevIndex = currentIndex;
        let prevClickButton = document.getElementById('chapt_'+ currentIndex);
        if (prevClickButton)
            prevClickButton.style.opacity='1.0';
        let currentClickButton = document.getElementById('chapt_'+ index);
        if (currentClickButton) 
            currentClickButton.style.opacity='0.2';
        currentIndex=index;
            slideShowIndex=index;
    }
}
loadChapterDiv = function(index, postBack=true,static=true){
   
    // for the slide show
    if (index > chapterData.length){
        endSlideShow();
    }
    if (postBack==false) {
        let chapterRowDiv = document.getElementById('chapterRow');
        if (chapterRowDiv) {
            let prevButton = document.createElement("button");
            prevButton.setAttribute("style", defaultButtonStyle);
            prevButton.innerHTML = '<<< PREV'
            prevButton.addEventListener('click', function() { loadChapterDiv( -1 ) } );
            chapterRowDiv.appendChild(prevButton);
            for (let chaptIndex=0; chaptIndex < chapterData.length;chaptIndex++){
                let chapterButton = document.createElement("button");
                let buttonText = chapterData[chaptIndex].buttonText?
                    chapterData[chaptIndex].buttonText:"" + (chaptIndex+1);
                chapterButton.innerHTML = buttonText;
                chapterButton.setAttribute("style", chapterData[chaptIndex].buttonStyle?   chapterData[chaptIndex].buttonStyle  :defaultButtonStyle);
                chapterButton.setAttribute("id", 'chapt_' + (chaptIndex+1) );
                chapterButton.setAttribute("title", chapterData[chaptIndex].title);
                chapterButton.addEventListener('click', function() { loadChapterDiv( chaptIndex+1 ) } );
                chapterRowDiv.appendChild(chapterButton);
                let currentButton = document.getElementById('chapt_1');
                if (currentButton)
                    currentButton.style.opacity='0.2';
                        
            }
            let nextButton = document.createElement("button");
            nextButton.setAttribute("style", defaultButtonStyle);
            nextButton.innerHTML = 'NEXT >>>'
            nextButton.addEventListener('click', function() { loadChapterDiv( -2 ) } );
            chapterRowDiv.appendChild(nextButton);
            
        }
    } // postback == false
    // next and previous btns, prev click has -1 parameter
    if (index ==-1){
        index = currentIndex-1;
        if (index ==0 )
            index =  chapterData.length;
    }
    // next has -2 param
    if (index ==-2){
        index = currentIndex+1;
        if (index >  chapterData.length)
            index = 1;
    }
    highlightSelectionButton(index);
    // .. loading content
    let currentChapter = chapterData[index-1]; 
    let subTitleList = [];
    let contentText = '',text=''; 
    for (let i = 0; i < currentChapter.subsections.length;i++){
        if (currentChapter.subsections[i].subTitle && currentChapter.subsections[i].subTitle != '') {
            if (subTitleList.length >= 1){
                contentText += "<a href='#top'><strong>Back To Top</strong></a>";
                contentText += "<h4 id='sect" + (subTitleList.length) +"'>" + currentChapter.subsections[i].subTitle + "</h4>";
            }
            else {
                contentText += "<h4>" + currentChapter.subsections[i].subTitle + "</h4>";
            }
        
            subTitleList.push( currentChapter.subsections[i].subTitle);
        }
        if (currentChapter.subsections[i].content && currentChapter.subsections[i].content != '') {
            contentText +=   currentChapter.subsections[i].content  ;
        }
                if (currentChapter.subsections[i].tableData)
                        {
                            let tableBuilder = '<table border=1 cellspacing=0 cellpadding=0>';
                            if (currentChapter.subsections[i].tableData.header){
                                tableBuilder += '<tr'; 
                               tableBuilder +=      currentChapter.subsections[i].tableData.tableHeaderRowStyle?
                                    ' style="' +  currentChapter.subsections[i].tableData.tableHeaderRowStyle + '">':'>';
                                for (let m = 0;
                                     m < currentChapter.subsections[i].tableData.header.length;
                                     m++)
                                    {
                                        tableBuilder += '<th>' + currentChapter.subsections[i].tableData.header[m] + '</th>'
                                    }
                                tableBuilder += '</tr>'
                            }
                            if (currentChapter.subsections[i].tableData.content)
                            {
                                for (n = 0 ; n < currentChapter.subsections[i].tableData.content.length;n++){
                                     tableBuilder += '<tr';
                                    if (n % 2== 0 && currentChapter.subsections[i].tableData.tableEvenRowStyle){
                                         tableBuilder += ' style="' +  currentChapter.subsections[i].tableData.tableEvenRowStyle + '">';
                                    }
                                    else if (currentChapter.subsections[i].tableData.tableOddRowStyle){
                                         tableBuilder += ' style="' +  currentChapter.subsections[i].tableData.tableOddRowStyle + '">';
                                    }
                                    else {
                                        tableBuilder += ">";
                                    }
                                    for (o = 0 ; o < currentChapter.subsections[i].tableData.content[n].length;o++){
                                        tableBuilder += '<td>' + currentChapter.subsections[i].tableData.content[n][o] + '</td>';
                                    }
                                    tableBuilder += '</tr>'
                           
                                }
                            }
                            tableBuilder += '</table>';
                            contentText +=   tableBuilder  ;
                        }
    }//.. loading content
    if (subTitleList.length > 1){
        contentText += "<a href='#top'><strong>Back To Top</strong></a>";
        /*
        <ul>
                <li><a href=#about>About</a></li>
                <li><a href='#cloning'>Cloning and modifying</a></li>
                <li><a href='#mathsAndStats'>Mathematical and Statistics API</a></li>
                <li><a href='#domManupulation'>Dom Manipulation</a></li>
            </ul>
        */
        text += "<ul id=top style='text-align:left'>";
        for (let j = 0 ; j < subTitleList.length;j++){
            text += "<li><a href=#sect" + (j) + ">" + subTitleList[j] + "</a></li>";
        }
        text+= "</ul>";
    }
    text += contentText;
    // fade out
  let headerStyleNoCSS = currentChapter.headerStyleNoCSS?currentChapter.headerStyleNoCSS:defaultHeaderStyleNoCSS ;
  let detailStyleNoCSS = currentChapter.detailStyleNoCSS?currentChapter.detailStyleNoCSS:defaultDetailStyleNoCSS;
  
  loadContent = function () {
               details.setAttribute("style", detailStyleNoCSS);
   
    if (postBack==false){
        let firstChapterDiv = document.createElement("div");
        firstChapterDiv.setAttribute('id',currentContentId);
        firstChapterDiv.innerHTML=text;
        details.appendChild(firstChapterDiv);
    }
    let contentContainer = document.createElement("div");
    let newPageID = 'page' + index;
    if (storyBoard && (newPageID != currentContentId)){
        if (!document.getElementById(currentContentId)){
            let oldChapterDiv = document.createElement('div');
            oldChapterDiv.setAttribute('id',currentContentId);
            oldChapterDiv.innerHTML = text ;
            details.appendChild(oldChapterDiv);
    }
        let newChapterDiv = document.createElement('div');
        newChapterDiv.setAttribute('id',newPageID);
        newChapterDiv.innerHTML = text ;
        details.appendChild(newChapterDiv);
        let oldChapterD = DOMElement(currentContentId);
        let newChapterD = DOMElement(newPageID);
        newChapterD.display('none');
        currentContentId = newPageID;
        let fadeOutIterations = [
        { start:1.0, end:0.9, timout: 200 }, 
        { start:0.9, end:0.8, timout: 200 },
        { start:0.8, end:0.6, timout: 600 },
        { start:0.6, end:0.4, timout: 400 },
        { start:0.4, end:0.2, timout: 500 } ,
        { start:0.2, end:0.0, timout: 500 }
        ];
        let fadeIndex =0;
        oldChapterD.transitionFadeParallel(newChapterD,fadeOutIterations,fadeIndex,null);
        if(oldChapterD)
            details.removeChild(oldChapterD.element);
    }
    }();
   // contentContainer = 
    let headerStyle = currentChapter.headerStyle?currentChapter.headerStyle:defaultHeaderStyle
    let detailStyle = currentChapter.detailStyle?currentChapter.detailStyle:defaultDetailStyle
    // using d3 ..
     d3Load = function() {
    d3.select("#storyBoard")
        .select('H2')
        .style(headerStyle)
        .text(currentChapter.title );
    let contentStyle =currentChapter.contentStyle?  currentChapter.contentStyle:defaultContentStyle ;
    d3.select("#storyBoard")
        .style(contentStyle  );
    d3.select("#details")
        .style(detailStyle)
      .html(text); 
    };
    
}
