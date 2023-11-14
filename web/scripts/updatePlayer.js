document.getElementById('updatePlayerForm').onsubmit = async function(e) {
    e.preventDefault();
    const Name= document.getElementById('Name').value;
    const age= document.getElementById('age').value;
    const nationality= document.getElementById('nationality').value;
    const city= document.getElementById('city').value;
    const state= document.getElementById('state').value;
    const position= document.getElementById('position').value;
    const currentTeam= document.getElementById('currentTeam').value;
    const previousTeams= document.getElementById('previousTeams').value;
    const shirtNumber= document.getElementById('shirtNumber').value;
    const dominantFoot= document.getElementById('dominantFoot').value;
    const height= document.getElementById('height').value;
    const weight= document.getElementById('weight').value;

    const params = new URLSearchParams(window.location.search);
    const playerId = params.get('playerId');
    try {
        const response = await fetch(`http://127.0.0.1:5000/atualizar/jogador/${playerId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Name,
                age,
                nationality,
                city,
                state,
                position,
                currentTeam,
                previousTeams,
                shirtNumber,
                dominantFoot,
                height,
                weight,
            }),
        });

        if (response.ok) {
            const result = await response.json();
            alert(result);
            window.location.href = "index.html";
        } else {
            alert('Erro ao atualizar o jogador.');
        }
    } catch (error) {
        alert('Erro ao atualizar o jogador: ' + error);
    }
};
