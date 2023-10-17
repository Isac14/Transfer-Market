class Index {
    constructor() {
        this.positions = ['Atacante', 'Meio-Campista', 'Defensor', 'Goleiro'];
        this.players = [];
        this.stadiums = [];
    }

    async fetchDataFromBackend() {
        try {
            let response = await fetch('http://127.0.0.1:5000/get/data/index'); 
            let data = await response.json();
            
            this.players = data.players;
            this.stadiums = data.stadiums;

        } catch (error) {
            console.error("Erro ao buscar dados do backend:", error);
        }
    }

    createPlayerCard(player) {
        const card = document.createElement('div');
        card.className = 'cardPlayer';
        
        // Estrutura do HTML do card usando os dados do jogador
        card.innerHTML = `
            <div class="content">
                <p id="playerName">Nome: ${player.firstName} ${player.lastName}</p>
                <p>Idade: ${player.age}</p>
                <p>Posição: ${player.position}</p>
                <p>Time atual: ${player.currentTeam}</p>
            </div>
            <div id="status">
                <span class="status">Status: ${player.status}</span>
            </div>
        `;
        return card;
    }

    createStadiumCard(stadium) {
        const card = document.createElement('div');
        card.className = 'cardTeam';
        
        // Estrutura do HTML do card usando os dados do time
        card.innerHTML = `
            <div class="content">
                <p id="teamName">Nome: ${stadium.teamName}</p>
            </div>
            <div id="statusTeam">
                <span class="statusTeam">Jogadores Disponíveis: ${stadium.playersAvailable}</span>
            </div>
        `;
        return card;
    }

    displayPlayerCards() {
        const container = document.getElementById('playersContainer');
        this.players.forEach(player => {
            const card = this.createPlayerCard(player);
            container.appendChild(card);
        });
    }

    displayStadiumCards() {
        const container = document.getElementById('stadiumsContainer');
        this.stadiums.forEach(stadium => {
            const card = this.createStadiumCard(stadium);
            container.appendChild(card);
        });
    }

    searchPlayer() {
        let input = document.querySelector('.searchPlayer input');

        input.addEventListener('input', function() {
            let filter = input.value.toUpperCase();
            let names = document.querySelectorAll('#playerName');

            for (let i = 0; i < names.length; i++) {
                let name = names[i];
                if (name.textContent.toUpperCase().indexOf(filter) > -1) {
                    name.closest('.cardPlayer').style.display = "";
                } else {
                    name.closest('.cardPlayer').style.display = "none";
                }
            }
        });
    }

    searchTeam() {
        let inputTeam = document.querySelector('.searchTeam input');

        inputTeam.addEventListener('input', function() {
            let filterTeam = inputTeam.value.toUpperCase();
            let teamNames = document.querySelectorAll('#teamName');

            for (let i = 0; i < teamNames.length; i++) {
                let teamName = teamNames[i];

                if (teamName.textContent.toUpperCase().indexOf(filterTeam) > -1) {
                    teamName.closest('.cardTeam').style.display = "";
                } else {
                    teamName.closest('.cardTeam').style.display = "none";
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    const index = new Index();
    await index.fetchDataFromBackend();
    index.displayPlayerCards();
    index.displayStadiumCards();
    index.searchPlayer();
    index.searchTeam();
});
