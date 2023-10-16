class Index {
    constructor() {
        this.positions = ['Atacante', 'Meio-Campista', 'Defensor', 'Goleiro'];
        this.players = [];
        this.stadiums = [];
    }

    generateData() {
        for (let i = 0; i < 6; i++) {
            const person = {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                age: faker.random.number({min: 18, max: 40}),
                position: this.positions[Math.floor(Math.random() * this.positions.length)],
                currentTeam: faker.company.companyName(),
                status: "Disponivel"
            }
            const stadium = {
                teamName: faker.company.companyName(),
                playersAvailable: faker.random.number({min: 0, max: 12})
            }
            this.players.push(person);
            this.stadiums.push(stadium);
        }
    }

    displayPlayerCards() {
        var playerCards = document.querySelectorAll('.cardPlayer');

        playerCards.forEach((card, index) => {
            if (this.players[index]) {
                var pElements = card.querySelectorAll('.content p');
                pElements[0].textContent = 'Nome: ' + this.players[index].firstName + ' ' + this.players[index].lastName;
                pElements[1].textContent = 'Idade: ' + this.players[index].age; 
                pElements[2].textContent = 'Posição: ' + this.players[index].position; 
                pElements[3].textContent = 'Time atual: ' + this.players[index].currentTeam; 

                card.querySelector('#status .status').textContent = 'Status: ' + this.players[index].status;
            }
        });
    }

    displayStadiumCards() {
        var stadiumCards = document.querySelectorAll('.cardTeam');

        stadiumCards.forEach((card, index) => {
            if (this.stadiums[index]) {
                var pElements = card.querySelectorAll('.content p');
                pElements[0].textContent = 'Nome: ' + this.stadiums[index].teamName;

                card.querySelector('#statusTeam .statusTeam').textContent = 'Jogadores Disponíveis: ' + this.stadiums[index].playersAvailable;
            }
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

document.addEventListener('DOMContentLoaded', function() {
    const index = new Index();
    index.generateData();
    index.displayPlayerCards();
    index.displayStadiumCards();
    index.searchPlayer();
    index.searchTeam();
});