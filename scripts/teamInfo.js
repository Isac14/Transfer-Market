class TeamInfo {
    constructor() {
        this.teams = [];
    }
    generateData() {
        for (let i = 0; i < 6; i++) {
            const team = {
                Name: faker.company.companyName(),
                nameTeam: faker.company.companyName(),
                city: faker.address.city(),
                country: faker.address.country(),
                estructure: faker.company.bs(),
                stadiumName: faker.address.streetName(),
                stadiumCapacity: faker.random.number({min: 500, max: 5000}),
                trainingCenter: faker.address.streetName()
            }
            this.teams.push(team);  
        }
    }
    displayTeamCard() {
        const team = this.teams[0];
        document.getElementById('name').textContent = team.Name;
        let elements = [
            'nameTeam',
            'city', 
            'country', 
            'estructure', 
            'stadiumName', 
            'stadiumCapacity', 
            'trainingCenter'
        ];

        elements.forEach(element => {
            let currentElement = document.getElementById(element);
            currentElement.textContent = currentElement.textContent + ' ' + team[element];
        });
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const teamInfo = new TeamInfo();
    teamInfo.generateData();
    teamInfo.displayTeamCard();
});