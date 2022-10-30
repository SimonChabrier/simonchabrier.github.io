
const card = {

    init:function () 
    {
        console.log('init');
        card.setCardTemplate(data);   
        card.setTagsList();
        card.handleFilterByTechnoTag();
    },

    setCardTemplate:function (projects, search_value)
    {   
        search.inputReset();
        
        projects.forEach(project => {

            const cardsContainer = document.getElementById("cards--init");
            const cardTemplate = document.getElementById("cardTemplate").content.cloneNode(true);

            cardTemplate.getElementById('title').innerText = `${project.title}`;
            cardTemplate.querySelector('img').src = `${project.picture}`;
            cardTemplate.getElementById('date').textContent = `${project.date}`;
            cardTemplate.getElementById('text').innerText = `${project.description}`;

            project.techno.forEach(techno => {
                    for (let key in techno) 
                    { 
                        if(techno[key] != '')
                        {
                            let span = document.createElement('span');
                            span.textContent = `${techno[key]}`;
                            card.setSpanColor(span, techno[key]);
                            cardTemplate.getElementById('techno').appendChild(span)
                        } 
                    }
                });

            project.web.forEach(site => {
                    for (let key in site) 
                    { 
                        if(site[key] != null)
                        {
                            let link = document.createElement('a');
                            link.href = `${site[key]}`;
                            link.innerText = `${key}`;
                            cardTemplate.getElementById('web').appendChild(link)
                        } 
                    }
                });

                cardsContainer.appendChild(cardTemplate);
        });

        let count = projects.length;
        card.countDisplayProject(count, search_value);
    },

    setSpanColor:function (span, techno)
    {   

        switch (techno) {
            
            case 'PHP':
                span.classList.add('card--span', 'card--span--php');
                break;
            case 'HTML':
                span.classList.add('card--span', 'card--span--html');
                break;
            case 'CSS':
                span.classList.add('card--span', 'card--span--css');
                break;
            case 'Bootstrap5':
                span.classList.add('card--span', 'card--span--bootstrap5');
                break;
            case 'Alto Router':
                span.classList.add('card--span', 'card--span--altorouter');
                break;
            case 'Plates':
                span.classList.add('card--span', 'card--span--plates');
                break;
            case 'Symfony Router':
                span.classList.add('card--span', 'card--span--symfonyrouter');
                break;
            default:
                span.classList.add('card--span');
            }
    },  
    
    setTagsList:function () 
    {   
        const technos = [];

        const technoContainer = document.getElementById("tags");

        for (let i = 0; i < data.length; i++) 
        {
            data[i].techno.forEach(techno => {
                for (let key in techno) 
                { 
                    if(techno[key] != '')
                    {
                        technos.push(techno[key]);
                    } 
                }
            });
        };

        const filterDuplicateTechno = [...new Set(technos)];

        filterDuplicateTechno.forEach(techno => {

            let techBtn = document.createElement('button');
            techBtn.textContent = `${techno}`;
            techBtn.classList.add('tags--btn');    
            card.setSpanColor(techBtn, techno);   
            techBtn.setAttribute('id', `${techno.toLowerCase()}`);
            technoContainer.appendChild(techBtn);

        });  
    },

    countDisplayProject:function (count, search_value){

        let divElement = document.getElementById('count');
        divElement.classList.remove('count--block');
        let countDisplay = document.getElementById('count--message');

        if(search_value != undefined){            
            count > 1 ? countDisplay.textContent = `${count} résultats pour ${search_value}` : countDisplay.textContent = `${count} résultat pour ${search_value}`;
            divElement.classList.add('count--block');
            divElement.appendChild(countDisplay);     
        } 
    },

    resetCountMessage:function (){
        let count_message = document.getElementById('count--message');
        count_message.innerText = '';
    },

    resetCardsDiv : function() 
    {
        const cardsContainer = document.getElementById("cards--init");
        cardsContainer.innerHTML = '';
    },

    handleFilterByTechnoTag:function ()
    {   
        const clickedTags = [];
        const tags = document.querySelectorAll('.tags--btn');

        tags.forEach(tag => {
            tag.addEventListener('click', function(event){
                clickedTags.push(event.target.id);
                card.resetCardsDiv();
                search.findProjectByClickedTag(clickedTags)
            });
        }); 
    },   

}

window.addEventListener('DOMContentLoaded', card.init);