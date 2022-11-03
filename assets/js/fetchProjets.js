const projects = 
{
    init: function() {
        console.log("app init");
    },
    
    state : {
        count : 0,
    },

    fetchProjetsList: async function () {

        const location = window.location.origin;
        const endPoint = '/api';
        const apiRootUrl = location + endPoint;

        let fetchOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };
        try
        {
            response = await fetch('http://127.0.0.1:8000/api', fetchOptions);
            data = await response.json();
        }
        catch (error)
        {
            console.log(error);
        }

        console.log(data);
    },

    

 };

// Call init() on DOMContentLoaded
document.addEventListener('DOMContentLoaded', projects.init);

