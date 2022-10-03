

const app = {

    init:function () {
        console.log('init');
        app.fetchData();
        //console.log(data);
    },

    fetchData:function(){
     
        data.forEach(projet => {
            console.log(projet.id);
            console.log(projet.title);
            console.log(projet.date);
            projet.techno.forEach(tecnho => {
                for (let key in tecnho) { console.log(`technologie ${key} : ${tecnho[key]}`)} 
            });
            console.log(projet.git);
            console.log(projet.web);
        });
    },
    

}

window.addEventListener('DOMContentLoaded', app.init);