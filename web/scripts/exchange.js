class Exchange {
    constructor() {
        this.players = [];
        this.stadiums = [];
    }

    async fetchDataFromBackend() {
        try {
            let response = await fetch('http://127.0.0.1:5000/get/data'); 
            let data = await response.json();
            
            this.players = data.players;
            this.stadiums = data.stadiums;

        } catch (error) {
            console.error("Erro ao buscar dados do backend:", error);
        }
    }

    fillSelectOptions() {
        let playerSelect = document.getElementById('playerSelect');
        let teamSelect = document.getElementById('teamSelect');
    
        // Preenchendo os jogadores
        for (let playerName of this.players) {
            let option = document.createElement('option');
            option.value = playerName; // Nome do jogador
            option.text = playerName;  // Nome do jogador
            playerSelect.appendChild(option);
        }
    
        // Preenchendo os times
        for (let teamName of this.stadiums) {
            let option = document.createElement('option');
            option.value = teamName; // Nome do time
            option.text = teamName;  // Nome do time
            teamSelect.appendChild(option);
        }
    }

    async submitTransferForm(event) {
        event.preventDefault();  // Prevent default form submission

        const formData = new FormData(event.target);

        try {
            let response = await fetch(event.target.action, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            let data = await response.json();

            if (data.success) {
                alert(data.success); // Show success message
                window.location.href = "index.html"; // Redirect to the index page
            } else if (data.error) {
                alert(data.error); // Show error message
            } else {
                // Handle any unexpected responses
                alert('Ocorreu um erro inesperado. Por favor, tente novamente.');
            }

        } catch (error) {
            console.error("Error during form submission:", error);
            alert('Ocorreu um erro. Por favor, tente novamente.');
        }
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    const index = new Exchange();
    await index.fetchDataFromBackend();
    index.fillSelectOptions();

    document.getElementById('transferForm').addEventListener('submit', event => index.submitTransferForm(event));
});
