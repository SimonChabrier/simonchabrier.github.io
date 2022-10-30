
const card = {

    init:function () 
    {
        console.log('Card init');   
    },

    setCardTemplate:function (projects, search_value)
    {   
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

        for (let i = 0; i < allProjects.length; i++) 
        {
            allProjects[i].techno.forEach(techno => {
                for (let key in techno) 
                { 
                    technos.push(techno[key]);
                }
            });
        };

        const filterDuplicateTechno = [...new Set(technos)];

        filterDuplicateTechno.forEach(techno => {

            let checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.id = techno.toLowerCase();
            checkBox.classList.add('tags--checkbox');
            technoContainer.appendChild(checkBox);

            let techSpan = document.createElement('span');
            techSpan.textContent = `${techno}`;
            techSpan.classList.add('tags--btn');    
            card.setSpanColor(techSpan, techno);   
            technoContainer.appendChild(techSpan);

        });  
    },

    countDisplayProject:function (count, search_value){

        console.log(typeof search_value);
        let countDiv = document.getElementById('count');
        countDiv.classList.remove('count--block');
        
        let countDisplay = document.getElementById('count--message');

        if(search_value != undefined && typeof search_value == 'string'){            
            count > 1 ? countDisplay.textContent = `${count} résultats pour ${search_value}` : countDisplay.textContent = `${count} résultat pour ${search_value}`;
            countDiv.classList.add('count--block');
            countDiv.appendChild(countDisplay);     
        } 

        // if(search_value != undefined && typeof search_value == 'object'){
        //     count > 1 ? countDisplay.textContent = `${count} résultats pour ${search_value}` : countDisplay.textContent = `${count} résultat pour ${search_value}`;
        //     countDiv.classList.add('count--block');
        //     countDiv.appendChild(countDisplay);    
        // }

        if(count == 0 && typeof search_value == 'object'){
            countDiv.classList.remove('count--block');
            card.setCardTemplate(allProjects);    
        }

    },

    resetCountMessage:function (){
        document.getElementById('count--message').innerText = '';;
    },

    resetCardsDiv : function() 
    {
        document.getElementById("cards--init").innerHTML = '';
    },

     

}

window.addEventListener('DOMContentLoaded', card.init);