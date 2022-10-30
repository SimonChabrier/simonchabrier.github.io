const mainInit = {

init: function() 
{   
    console.log('Main init');
    card.setCardTemplate(allProjects);   
    card.setTagsList();
    search.handleFilterByTechnoTag();
    search.handlesearchInDescription();
    search.handleInputReset();
},

}

document.addEventListener('DOMContentLoaded', mainInit.init);