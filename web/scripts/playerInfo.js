class PlayerInfo {
    constructor() {
        this.positions = ['Atacante', 'Meio-Campista', 'Defensor', 'Goleiro'];
        this.players = [];
    }
    generateData() {
        for (let i = 0; i < 6; i++) {
            const person = {
                Name: faker.name.firstName(),
                lastName: faker.name.lastName(),
                age: faker.random.number({min: 18, max: 40}),
                nationality: faker.address.country(),
                city: faker.address.city(),
                state: faker.address.state(),
                position: this.positions[Math.floor(Math.random() * this.positions.length)],
                currentTeam: faker.company.companyName(),
                previousTeams: [faker.company.companyName(), faker.company.companyName()],
                shirtNumber: faker.random.number({min: 1, max: 99}),
                dominantFoot: faker.random.arrayElement(['Direito', 'Esquerdo', 'Ambos']),
                height: faker.random.number({min: 160, max: 200}),
                weight: faker.random.number({min: 60, max: 100}),
                status: "Disponivel"
            }
            this.players.push(person);  
        }
    }
    displayPlayerCard() {
        const player = this.players[0];
        document.getElementById('fullName').textContent = player.Name + ' ' + player.lastName;
        let elements = ['Name', 'age', 'nationality', 'city', 'state', 'position', 'currentTeam', 'previousTeams', 'shirtNumber', 'dominantFoot', 'height', 'weight'];

        elements.forEach(element => {
            let currentElement = document.getElementById(element);
            currentElement.textContent = currentElement.textContent + ' ' + player[element];
        });
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const player = new PlayerInfo();
    player.generateData();
    player.displayPlayerCard();
});