

const card = {

    init:function () {
        console.log('init');
        card.fetchData();
        //console.log(data);
    },

    fetchData:function(){
        
        data.forEach(projet => {
            // target
            const displayProjectCard = document.getElementById("cards");
            // template
            const cardTemplate = document.getElementById("cardTemplate").content.cloneNode(true);

            console.log(cardTemplate);
            cardTemplate.getElementById('title').innerText = `${projet.title}`;
            cardTemplate.querySelector('img').src = `${projet.picture}`;
            cardTemplate.getElementById('date').textContent = `${projet.date}`;
            cardTemplate.getElementById('text').innerText = `${projet.description}`;

            projet.techno.forEach(techno => {
                for (let key in techno) { 
                    let span = document.createElement('span');
                    span.textContent = `${techno[key]}`;
                    span.className = "card--span"
                    cardTemplate.getElementById('techno').appendChild(span)
                    } 
                });

            projet.web.forEach(site => {
                for (let key in site) { 
                    let link = document.createElement('a');
                    link.href = `${site[key]}`;
                    link.innerText = `${site[key]}`;
                    cardTemplate.getElementById('web').appendChild(link)
                    } 
                });

            displayProjectCard.appendChild(cardTemplate);
        });
    },
    

}

window.addEventListener('DOMContentLoaded', card.init);