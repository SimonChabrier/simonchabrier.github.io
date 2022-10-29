

const card = {

    init:function () 
    {
        console.log('init');
        card.fetchData();
        //reset results to original full display
        card.handleReload();
    },

    fetchData:function ()
    {   
            data.forEach(project => {
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
    
    handleReload: function() 
    {

        const resetButton = document.getElementById("reset_btn");

        resetButton.addEventListener("click", () => {
        search.reset();    
        card.fetchData();
        });

    },
}    

window.addEventListener('DOMContentLoaded', card.init);