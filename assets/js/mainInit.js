const mainInit = {

init: function() 
{   
    console.log('Main init');
    
    
    card.setTagsList(allProjects);
    search.handleSearch();
    search.allListeners();
    
},

}

document.addEventListener('DOMContentLoaded', mainInit.init);