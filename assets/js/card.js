
const card = {

    init:function () 
    {
        console.log('init');
        card.fetchData(data);   
    },

    fetchData:function (projects)
    {   
        card.inputReset();
        
        
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

        card.countDisplayProject();
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
    
    countDisplayProject:function (){

        let projects = document.querySelectorAll('.card');
        let count = projects.length;
        let div = document.getElementById('count');
        let count_message = document.getElementById('count--message');

        div.style.display = 'none';

        if (count != 0){ 
            div.style.display = 'block';
            count == 1 ? count_message.innerText = `${count} projet trouvé` : count_message.innerText = `${count} projets enregistrés`;
        }

        div.appendChild(count_message);
    },

    resetCountMessage:function (){
        let count_message = document.getElementById('count--message');
        count_message.innerText = '';
    },

    inputReset: function() 
    {
        const resetButton = document.getElementById("reset_btn");
        const searchInput = document.getElementById("search_input");
        
        resetButton.addEventListener("click", () => {
            searchInput.value = "";
            card.resetCards();    
            card.fetchData(data);
        });

    },

    resetCards : function() 
    {
        const cardsContainer = document.getElementById("cards--init");
        cardsContainer.innerHTML = '';
    },
}    

window.addEventListener('DOMContentLoaded', card.init);