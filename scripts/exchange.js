class Exchange {
    constructor() {
        this.players = [];
        this.stadiums = [];
    }
    generateData() {
        for (let i = 0; i < 6; i++) {
            const person = {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
            }
            const stadium = {
                teamName: faker.company.companyName(),
            }
            this.players.push(person);
            this.stadiums.push(stadium);
        }
    }

    fillSelectOptions() {
        let playerSelect = document.getElementById('playerSelect');
        let teamSelect = document.getElementById('teamSelect');
    
        for (let player of this.players) {
            let option = document.createElement('option');
            option.value = player.firstName + ' ' + player.lastName;
            option.text = player.firstName + ' ' + player.lastName;
            playerSelect.appendChild(option);
        }
    
        for (let team of this.stadiums) {
            let option = document.createElement('option');
            option.value = team.teamName;
            option.text = team.teamName;
            teamSelect.appendChild(option);
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const index = new Exchange();
    index.generateData();
    index.fillSelectOptions();
});