var removeAll = function()
{
       console.log(d3.select("#storyBoard").selectAll('div').html());
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
             'background-image': 'url("images/300px-Tirpitz-2.jpg")',
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
        'border':'2px solid antiquewhite'})
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
    .style( { 'border':'3px outset gray',
             'border-radius':'4px', 
             'padding':'2px',
             'color':'black', 
             'background-color':'silver'}  ) 
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