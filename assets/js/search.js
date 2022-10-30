const search = {

init: function() 
{   
    search.handleInputSearchInTechnoTags();
    search.handleSearchInDescription();
    console.log('search init');
},

handleInputSearchInTechnoTags: function() 
{   
    const searchInput = document.getElementById('search_input');
    searchInput.addEventListener('keyup', (event) => {
        event.target.value.length >= 2 ? card.resetCardsDiv() + card.resetCountMessage() + search.handleSearchInDescription(event.target.value) : card.resetCardsDiv() + card.resetCountMessage() + card.setCardTemplate(data);
    });  
},    

handleSearchInDescription: function(search_value)
{
    let results = [];
   
    if(search_value)
    {
        projet_description = data.forEach(project => { 
            project.description.toLowerCase().includes(search_value.toLowerCase()) ? results.push(project) : null; 
        });
    }

    card.setCardTemplate(results, search_value);

},

//TODO gérer ici le filtre sur l'ensemble des tags sélectionnés
dislayResults: function(search_value) 
{   
    let selectedTags = [];
    let matchingProjects = [];
    
    search_value.forEach(tag => {
        selectedTags.push(tag);
    });

    data.forEach(project => {
        project.techno.forEach(techno => {
            for (let key in techno) 
            {   
                if (search_value.find(tag => tag == techno[key].toLowerCase()))
                {
                    matchingProjects.push(project);
                }
            }
        });
    });
    
    filteredProjects = [...new Set(matchingProjects)];

   card.setCardTemplate(filteredProjects, search_value);
},   

inputReset: function() 
{
    const resetButton = document.getElementById("reset_btn");
    const searchInput = document.getElementById("search_input");
    
    resetButton.addEventListener("click", () => {
        searchInput.value = "";
        card.resetCardsDiv();    
        card.setCardTemplate(data);
    });

},


}

document.addEventListener('DOMContentLoaded', search.init);