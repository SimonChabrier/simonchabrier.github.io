const search = {

init: function() 
{   
    search.search();
    console.log('search init');
},

search: function() 
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
    card.fetchData(results);

    if (search_value == ""){
        search.resetSearchResults();
        card.resetCards();
        card.fetchData(data);
    }
},   


resetSearchResults : function() 
{
    const resultContainer = document.getElementById("search--results");
    resultContainer.innerHTML = '';
},

}

document.addEventListener('DOMContentLoaded', search.init);