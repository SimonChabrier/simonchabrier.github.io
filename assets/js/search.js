const search = {

init: function() 
{   
    search.searchInTechnoTags();
    console.log('search init');
},

searchInTechnoTags: function() 
{   
    const searchInput = document.getElementById('search_input');
    
    searchInput.addEventListener('keyup', (e) => {
    let search_value = e.target.value;
    search.dislayResults(search_value);
    });  
},    

dislayResults: function(search_value) 
{   
    let results = [];

    projet_techno = data.forEach(project => { project
        project.techno.forEach(techno => {
            for (let key in techno) 
            { 
                if(techno[key].toLowerCase() == (search_value.toLowerCase()))
                {
                    results.push(project);
                }
            } 
        });
    });

    card.resetCards();
    card.resetCountMessage();
    card.fetchData(results);

    if (search_value == ""){
        card.resetCards();
        card.resetCountMessage();
        card.fetchData(data);
    }   
},   



}

document.addEventListener('DOMContentLoaded', search.init);