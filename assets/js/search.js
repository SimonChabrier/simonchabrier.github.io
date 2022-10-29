const search = {

init: function() 
{   
    search.inputSearchInTechnoTags();
    console.log('search init');
},

inputSearchInTechnoTags: function() 
{   
    const searchInput = document.getElementById('search_input');
    searchInput.addEventListener('keyup', (event) => {
        event.target.value.length >= 3 ? card.resetCards() + card.resetCountMessage() + search.dislayResults(event.target.value) : card.resetCards() + card.resetCountMessage() + card.constructCards(data);
    });  
},    

dislayResults: function(search_value) 
{   
    let results = [];
   
    projet_techno = data.forEach(project => { project
        project.techno.forEach(techno => {
            for (let key in techno) 
            {   
                if(techno[key].toLowerCase().includes(search_value.toLowerCase()))
                {      
                    results.push(project);
                }
            } 
        });
    });

    card.constructCards(results, search_value);
},   

inputReset: function() 
{
    const resetButton = document.getElementById("reset_btn");
    const searchInput = document.getElementById("search_input");
    
    resetButton.addEventListener("click", () => {
        searchInput.value = "";
        card.resetCards();    
        card.constructCards(data);
    });

},


}

document.addEventListener('DOMContentLoaded', search.init);