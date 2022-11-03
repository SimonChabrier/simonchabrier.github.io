const mainInit = {

init: function() 
{   
    console.log('Main init');
    card.setTagsList();
    search.handleSearch();
    search.allListeners();
    projects.fetchProjetsList();
},

}

document.addEventListener('DOMContentLoaded', mainInit.init);