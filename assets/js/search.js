const search = {

init: function() 
{   
    console.log('Search init');
},

allListeners: function() 
{   
    document.getElementById('search_input').addEventListener('input', function(e){
        search.handleSearch();
    });

    document.getElementById('tags').addEventListener('input', () => {
        search.handleSearch();
    });

},

getSelectdTags: function() 
{   
    let tags = [];

    document.querySelectorAll('.tags--checkbox').forEach(checkbox => {
        if(checkbox.checked){
            tags.push(checkbox.id);
        }
    });

    return tags;
},

getInputValue: function()
{
    let input = document.getElementById('search_input').value;
    return input;
},

handleSearch: function()
{   
    const results = [];

    const tags = search.getSelectdTags();
    const searchInput = search.getInputValue().toLowerCase();

    allProjects.forEach(project => {

        if(tags.length > 0){
            project.techno.forEach(techno => {
                for (let key in techno) 
                { 
                    if(tags.includes(techno[key].toLowerCase())){
                        results.push(project);
                    }
                }
            });
        }

        if(searchInput.length > 2 && project.description.toLowerCase().includes(searchInput)){
                        results.push(project);
        }

    });

    const filteredResults = [...new Set(results)];

    console.log(filteredResults);
},

}

document.addEventListener('DOMContentLoaded', search.init);