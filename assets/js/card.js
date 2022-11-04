
const card = {

    init:function () 
    {
        console.log('Card init');   
    },

    setCardTemplate:function (projects, tags, searchInput)
    {   
        
        card.resetCardsDiv();
        
        projects.forEach(project => {
    
            const cardsContainer = document.getElementById("cards--init");
            const cardTemplate = document.getElementById("cardTemplate").content.cloneNode(true);
            const path = 'http://127.0.0.1:8000/public/asssets/media/'; 

            cardTemplate.getElementById('title').innerText = `${project.title}`;
            cardTemplate.querySelector('img').src = `${path + project.picture}`;
            cardTemplate.getElementById('date').textContent = `${project.date}`;
            cardTemplate.getElementById('text').innerText = `${project.desciption}`;

            project.technos.forEach(techno => {
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

            project.links.forEach(site => {
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
        card.countDisplayProject(count, tags, searchInput);
    },

    setSpanColor:function (span, techno)
    {   

        techno = techno.toLowerCase();

        switch (techno) {
            
            case 'php':
                span.classList.add('card--span', 'card--span--php');
                break;
            case 'html':
                span.classList.add('card--span', 'card--span--html');
                break;
            case 'css':
                span.classList.add('card--span', 'card--span--css');
                break;
            case 'bootstrap5':
                span.classList.add('card--span', 'card--span--bootstrap5');
                break;
            case 'alto router':
                span.classList.add('card--span', 'card--span--altorouter');
                break;
            case 'plates':
                span.classList.add('card--span', 'card--span--plates');
                break;
            case 'symfony router':
                span.classList.add('card--span', 'card--span--symfonyrouter');
                break;
            default:
                span.classList.add('card--span');
            }
    },  
    
    setTagsList:function (projects) 
    {   
        console.log('setTagsList');

        const technos = [];
        const technoContainer = document.getElementById("tags");

        projects.forEach(project => {

            project.technos.forEach(techno => {

                for (let key in techno)
                {
                    if(techno[key] != '')
                    {
                        technos.push(techno[key]);
                    }
                }
            });
        });

        const filterDuplicateTechno = [...new Set(technos)];

        filterDuplicateTechno.forEach(techno => {

            let tagContainer = document.createElement('section');
            tagContainer.classList.add('tags--container');

            let checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.id = techno.toLowerCase();
            checkBox.classList.add('tags--checkbox');
            tagContainer.appendChild(checkBox);
            technoContainer.appendChild(tagContainer);

            let techBtn = document.createElement('button');
            techBtn.classList.add('card--span--btn' , 'tags--btn');
            techBtn.textContent = `${techno}`;
            techBtn.id = techno.toLowerCase();
            card.setSpanColor(techBtn, techno);   
            tagContainer.appendChild(techBtn);
            technoContainer.appendChild(tagContainer);

        });  
    },

    countDisplayProject:function (count, tags, searchInput){

        document.getElementById('count').classList.remove('count--block');
        const countDisplay = document.getElementById('count--message');


        if(searchInput != undefined && tags != undefined)
        {   
            tags = tags.toString().replace(/,/g, " + ");
            searchInput = searchInput.replace(/\s/g, " + ");

            count > 1 ? countDisplay.textContent = `${count} projets pour ${searchInput} ${tags}` : countDisplay.textContent = `${count} projet pour  ${searchInput} ${tags}`;
            document.getElementById('count').classList.add('count--block');
            document.getElementById('count').appendChild(countDisplay);     
        } 
    },

    resetCardsDiv : function() 
    {
        document.getElementById("cards--init").innerHTML = '';
    },

}

window.addEventListener('DOMContentLoaded', card.init);