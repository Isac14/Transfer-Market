document.getElementById('updateTeamForm').onsubmit = async function(e) {
    e.preventDefault();
    const nameTeam = document.getElementById('nameTeam').value;
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;
    const estructure= document.getElementById('estructure').value;
    const stadiumName= document.getElementById('stadiumName').value;
    const stadiumCapacity= document.getElementById('stadiumCapacity').value;
    const trainingCenter= document.getElementById('trainingCenter').value;

    const params = new URLSearchParams(window.location.search);
    const teamId = params.get('teamId');
    try {
        const response = await fetch(`http://127.0.0.1:5000/atualizar/time/${teamId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nameTeam,
                country,
                city,
                estructure,
                stadiumName,
                stadiumCapacity,
                trainingCenter,
            }),
        });

        if (response.ok) {
            const result = await response.json();
            alert(result);
            window.location.href = "index.html";
        } else {
            alert('Erro ao atualizar o time.');
        }
    } catch (error) {
        alert('Erro ao atualizar o time: ' + error);
    }
};
