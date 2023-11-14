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

    async deletePlayer(playerId) {
        try {
            console.log(playerId)
            // O método HTTP DELETE é usado para indicar que você está tentando deletar um recurso
            let response = await fetch(`http://127.0.0.1:5000/delete/player/${playerId}`, {
                method: 'DELETE'
            });
    
            // Verifica se a requisição foi bem-sucedida
            if (response.ok) {
                let data = await response.json();
                
                // Atualiza os dados locais, removendo o jogador deletado
                this.players = this.players.filter(player => player.id !== playerId);
                
                // Atualizar a interface do usuário aqui, se necessário
                // Por exemplo, você pode chamar uma função para atualizar a lista de jogadores exibidos
    
                console.log('Jogador deletado com sucesso:', data);
            } else {
                // Trata o caso de resposta não bem-sucedida
                console.error('Falha ao deletar o jogador, status:', response.status);
            }
        } catch (error) {
            console.error("Erro ao deletar o jogador:", error);
        }
    }

    async deleteTeam(stadio) {
        try {
            console.log(stadio)
            // O método HTTP DELETE é usado para indicar que você está tentando deletar um recurso
            let response = await fetch(`http://127.0.0.1:5000/delete/stadio/${stadio}`, {
                method: 'DELETE'
            });
    
            // Verifica se a requisição foi bem-sucedida
            if (response.ok) {
                let data = await response.json();
                
                // Atualiza os dados locais, removendo o jogador deletado
                this.stadiums = this.stadiums.filter(stadium => stadium.teamName !== stadio);
                
                // Atualizar a interface do usuário aqui, se necessário
                // Por exemplo, você pode chamar uma função para atualizar a lista de jogadores exibidos
    
                console.log('Jogador deletado com sucesso:', data);
            } else {
                // Trata o caso de resposta não bem-sucedida
                console.error('Falha ao deletar o jogador, status:', response.status);
            }
        } catch (error) {
            console.error("Erro ao deletar o jogador:", error);
        }
    }

    createPlayerCard(player) {
        const card = document.createElement('div');
        card.className = 'cardPlayer';
        
        // Estrutura do HTML do card usando os dados do jogador
        card.innerHTML = `
            <div class="cardPlayer">
                <div class="playerHeader">
                    <h2>${player.firstName} ${player.lastName}</h2>
                    <div class="playerInfo">
                        <p>Idade: ${player.age}</p>
                        <p>Posição: ${player.position}</p>
                        <p>Time atual: ${player.currentTeam}</p>
                    </div>
                </div>
                <div class="playerStatus">
                    <span>Status: ${player.status}</span>
                </div>
                <div class="playerActions">
                    <button class="viewBtn" player="${player.firstName}">Ver</button>
                    <button class="editBtn" player="${player.firstName+"_"+player.lastName}">Editar</button>
                    <button class="deleteBtn" player="${player.firstName+" "+player.lastName}">Deletar</button>
                </div>
            </div>
        `;
        return card;
    }

    createStadiumCard(stadium) {
        const card = document.createElement('div');
        card.className = 'cardTeam';
        
        // Estrutura do HTML do card usando os dados do time
        card.innerHTML = `
            <div class="teamHeader">
                <h2 id="teamName">${stadium.teamName}</h2>
            </div>
            <div class="teamInfo">
                <p>Jogadores Disponíveis: ${stadium.playersAvailable}</p>
            </div>
            <div class="teamActions">
                <button class="viewBtn" data-team-name="${stadium.teamName}">Ver</button>
                <button class="editBtn" data-team-name="${stadium.teamName}">Editar</button>
                <button class="deleteBtn" data-team-name="${stadium.teamName}">Deletar</button>
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
            // Seleciona todos os elementos h2 dentro dos cabeçalhos dos cartões de jogador
            let playerNames = document.querySelectorAll('.playerHeader h2');
    
            playerNames.forEach(function(playerName) {
                // Utiliza textContent para verificar se o nome do jogador inclui o texto do filtro
                if (playerName.textContent.toUpperCase().includes(filter)) {
                    playerName.closest('.cardPlayer').style.display = ""; // Mostra o cartão se corresponder
                } else {
                    playerName.closest('.cardPlayer').style.display = "none"; // Esconde o cartão se não corresponder
                }
            });
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
    viewPlayer(playerName) {
        console.log('Tentando visualizar o jogador com ID:', playerName);
        const player = this.players.find(p => p.firstName == playerName); 
        if (player) {
            console.log('Jogador encontrado:', player);
            this.showPlayerCard(player);
        } else {
            console.error('Jogador não encontrado para o ID:', playerName);
            this.showNotFoundPopup();
        }
    }

    viewStadium(teamName) {
        console.log('Tentando visualizar o estádio:', teamName);
        const stadium = this.stadiums.find(s => s.teamName == teamName);
        if (stadium) {
            console.log('Estádio encontrado:', stadium);
            this.showTeamCard(stadium);
        } else {
            console.error('Estádio não encontrado para o nome:', teamName);
            this.showNotFoundPopup();
        }
    }

    showPlayerCard(player) {
        // Cria o conteúdo do card do jogador
        const card = `
            <div class="cardPlayer">
                <div class="playerHeader">
                    <h2>${player.firstName} ${player.lastName}</h2>
                    <div class="playerInfo">
                        <p>Idade: ${player.age}</p>
                        <p>Posição: ${player.position}</p>
                        <p>Time atual: ${player.currentTeam}</p>
                    </div>
                </div>
                <div class="playerStatus">
                    <span>Status: ${player.status}</span>
                </div>
            </div>
        `;
    
        // Seleciona o popup e insere o conteúdo do card
        const playerPopup = document.getElementById('playerPopup');
        playerPopup.querySelector('.popup-content').innerHTML = card;
        playerPopup.querySelector('.popup-content').onclick = function() {
            playerPopup.style.display = 'none';
        };
    
        // Exibe o popup
        playerPopup.style.display = 'block';
    }

    showTeamCard(stadium) {
        // Cria o conteúdo do card do jogador
        const card = `
        <div class="cardTeam">
            <div class="teamHeader">
            <h2 id="teamName">${stadium.teamName}</h2>
            </div>
            <div class="teamInfo">
            <p>Jogadores Disponíveis: ${stadium.playersAvailable}</p>
            </div>
        </div>
        `;
    
        // Seleciona o popup e insere o conteúdo do card
        const playerPopup = document.getElementById('teamPopup');
        playerPopup.querySelector('.popup-content').innerHTML = card;
        playerPopup.querySelector('.popup-content').onclick = function() {
            playerPopup.style.display = 'none';
        };
    
        // Exibe o popup
        playerPopup.style.display = 'block';
    }

}

function setupCloseEventForPopupPlayer() {
    const playerPopup = document.getElementById('playerPopup');
    if (playerPopup) {
        const closeButton = playerPopup.querySelector('.close');
        if (closeButton) {
            closeButton.onclick = function() {
                playerPopup.style.display = 'none';
            };
        }
    }
}

function setupCloseEventForPopupPlayer() {
    const playerPopup = document.getElementById('teamPopup');
    if (playerPopup) {
        const closeButton = playerPopup.querySelector('.close');
        if (closeButton) {
            closeButton.onclick = function() {
                playerPopup.style.display = 'none';
            };
        }
    }
}


document.addEventListener('DOMContentLoaded', async function() {
    const index = new Index();
    await index.fetchDataFromBackend();
    index.displayPlayerCards();
    index.displayStadiumCards();
    index.searchPlayer();
    index.searchTeam();
    setupCloseEventForPopupPlayer();

    document.getElementById('playersContainer').addEventListener('click', function(event) {
        if (event.target.classList.contains('deleteBtn')) {
            const playerName = event.target.getAttribute('player');
            if (playerName) {
                index.deletePlayer(playerName);
            }
        }
    });

    document.getElementById('stadiumsContainer').addEventListener('click', function(event) {
        if (event.target.classList.contains('deleteBtn')) {
            const teamName = event.target.dataset.teamName;
            if (teamName) {
                index.deleteTeam(teamName);
            }
        }
    });

    document.getElementById('playersContainer').addEventListener('click', function(event) {
        if (event.target.classList.contains('editBtn')) {
            const playerName = event.target.getAttribute('player');
            if (playerName) {
                window.location.href = `../pages/updatePlayer.html?playerId=${playerName}`;
            }
        }
    });

    document.getElementById('stadiumsContainer').addEventListener('click', function(event) {
        if (event.target.classList.contains('editBtn')) {
            const teamName = event.target.dataset.teamName;
            if (teamName) {
                window.location.href = `../pages/updateTime.html?teamId=${teamName}`;
            }
        }
    });

    document.getElementById('playersContainer').addEventListener('click', function(event) {
        if (event.target.classList.contains('viewBtn')) {
            const playerName = event.target.getAttribute('player');
            index.viewPlayer(playerName);
        }
    });

    document.getElementById('stadiumsContainer').addEventListener('click', function(event) {
        if (event.target.classList.contains('viewBtn')) {
            const teamName = event.target.dataset.teamName;
            index.viewStadium(teamName);
        }
    });
});