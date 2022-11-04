const mainInit = {

init: function() 
{   
    console.log('Main init');
    projects.fetchProjectsList();
    search.allListeners(); 
},

}

document.addEventListener('DOMContentLoaded', mainInit.init);