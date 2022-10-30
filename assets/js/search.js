const search = {

init: function() 
{   
    console.log('Search init');
},

handlesearchInDescription: function() 
{   
    const searchInput = document.getElementById('search_input');
    searchInput.addEventListener('keyup', (event) => {
        event.target.value.length >= 2 ? card.resetCardsDiv() + card.resetCountMessage() + search.searchInDescription(event.target.value) : card.resetCardsDiv() + card.resetCountMessage() + card.setCardTemplate(allProjects);
    });  
},    

searchInDescription: function(inputValue)
{
    let projects = [];

    allProjects.forEach( project => { 
        project.description.toLowerCase().includes(inputValue.toLowerCase()) ? projects.push(project) : null; 
    });
    
    card.setCardTemplate(projects, inputValue);
},

handleFilterByTechnoTag:function ()
{   
    const tags = [];

    document.querySelectorAll('.tags--checkbox').forEach(tagCheckBox => {
        tagCheckBox.addEventListener('click', (event) => {
            tags.push(event.target.id);
            search.filterByCheckedTag(tags);
        });
    }); 
},  

filterByCheckedTag: function(tags) 
{    
    const projects = [];
    const uniqueTags = [...new Set(tags)];

    allProjects.forEach(project => {
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
    card.resetCardsDiv();
    card.setCardTemplate(uniqueProjects, uniqueTags);
},   

handleInputReset: function() 
{   
    document.getElementById("reset_btn").addEventListener("click", () => {
        document.getElementById("search_input").value = "";
        document.getElementById("count--message").innerHTML = "";
        card.resetCardsDiv();    
        card.setCardTemplate(allProjects);
    });
},


}

document.addEventListener('DOMContentLoaded', search.init);