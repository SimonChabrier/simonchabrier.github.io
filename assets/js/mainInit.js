const mainInit = {

init: function() 
{   
    console.log('Main init');
    
    card.setCardTemplate(allProjects);
    card.setTagsList(allProjects);
    search.allListeners();
},

}

document.addEventListener('DOMContentLoaded', mainInit.init);