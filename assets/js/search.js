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
    search.searchResults(search_value);
    });  
},    

searchResults: function(search_value) 
{   
    $projet_techno = data.forEach(project => { project
        project.techno.forEach(techno => {
            for (let key in techno) 
            { 
                if(techno[key].toLowerCase() == (search_value.toLowerCase())){
                    search.fetchResults(project);
                } 
            } 
        });
    });

    if (search_value == ""){
        search.reset();
        card.fetchData();
    }
},   

fetchResults:function(result){

        let results = [result];
        console.log(result);

        results.forEach(project => {
            // target
            const cardsContainer = document.getElementById("cards");
            // template
            const cardTemplate = document.getElementById("cardTemplate").content.cloneNode(true);

            cardTemplate.getElementById('title').innerText = `${project.title}`;
            cardTemplate.querySelector('img').src = `${project.picture}`;
            cardTemplate.getElementById('date').textContent = `${project.date}`;
            cardTemplate.getElementById('text').innerText = `${project.description}`;

            project.techno.forEach(techno => {
                for (let key in techno) { 
                    let span = document.createElement('span');
                    span.textContent = `${techno[key]}`;
                    span.className = "card--span"
                    cardTemplate.getElementById('techno').appendChild(span)
                    } 
                });

            project.web.forEach(site => {
                for (let key in site) { 
                    if(site[key] != null){
                    let link = document.createElement('a');
                    link.href = `${site[key]}`;
                    link.innerText = `${key}`;
                    cardTemplate.getElementById('web').appendChild(link)
                    } 
                    }
                });

                cardsContainer.appendChild(cardTemplate);
        });

},


}

document.addEventListener('DOMContentLoaded', search.init);