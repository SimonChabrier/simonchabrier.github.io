const search = {

init: function() 
{   
    search.handleInputSearchInDescription();
    console.log('search init');
},

handleInputSearchInDescription: function() 
{   
    const searchInput = document.getElementById('search_input');
    searchInput.addEventListener('keyup', (event) => {
        event.target.value.length >= 2 ? card.resetCardsDiv() + card.resetCountMessage() + search.searchInDescription(event.target.value) : card.resetCardsDiv() + card.resetCountMessage() + card.setCardTemplate(data);
    });  
},    

searchInDescription: function(search_value)
{
    let projects = [];

    data.forEach( project => { 
        project.description.toLowerCase().includes(search_value.toLowerCase()) ? projects.push(project) : null; 
    });
    
    card.setCardTemplate(projects, search_value);
},


findProjectByClickedTag: function(clickedTags) 
{   

    const projects = [];
    const uniqueTags = [...new Set(clickedTags)];

    data.forEach(project => {
        project.techno.forEach(techno => {
            for (let key in techno) 
            {   
                if (uniqueTags.find(tag => tag == techno[key].toLowerCase()))
                {
                    projects.push(project);
                }
            }
        });
    });

    const uniqueProjects = [...new Set(projects)];
    
    card.setCardTemplate(uniqueProjects, uniqueTags);
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