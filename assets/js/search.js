const search = {

init: function() 
{   
    console.log('Search init');
},

allListeners: function() 
{   
    document.getElementById('search_input').addEventListener('input', () => {
        search.handleSearch();
    });

    document.getElementById('tags').addEventListener('input', () => {
        search.handleSearch();
    });

    document.getElementById('reset_btn').addEventListener('click', () => {
        search.handleResetBtn();
    });

    let buttons = document.getElementsByClassName('tags--btn');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', event => {
            search.handleTagsBtn(event.target.id);
        }
    )};

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

    if (results.length == 0 && searchInput == '') 
    {   
        card.setCardTemplate(allProjects);
    } 
    
    if (tags.length > 0 || searchInput != '') 
    {

        allProjects.forEach(project => {

            if(tags.length > 0)
            {
                project.techno.forEach(techno => {
                    for (let key in techno) 
                    { 
                        if(tags.includes(techno[key].toLowerCase()))
                        {
                            results.push(project);
                        }
                    }
                });
            }

            if(searchInput.length > 2 && project.description.toLowerCase().includes(searchInput))
            {
                results.push(project);
            }

        });

            const filteredResults = [...new Set(results)];
            card.setCardTemplate(filteredResults);
            card.countDisplayProject(filteredResults.length, tags, searchInput);   
    } 
},

handleResetBtn: function()
{
    document.getElementById('search_input').value = '';
    document.getElementById('count--message').textContent = '';
    document.querySelectorAll('.tags--checkbox').forEach(checkbox => {
        checkbox.checked = false;
    });
    card.setCardTemplate(allProjects);
},

handleTagsBtn: function(event)
{   
    let checkbox = document.getElementById(event);
    checkbox.checked = !checkbox.checked;
    search.handleSearch();
}

}

document.addEventListener('DOMContentLoaded', search.init);