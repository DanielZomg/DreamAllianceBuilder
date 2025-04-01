// Sample players data - you can replace this with your own data
const players = [
    { id: 1, name: "Z0mgphunk", group: "Supreme" },
    { id: 2, name: "Dale", group: "Supreme" },
    { id: 3, name: "Miyu", group: "Apex" },
    { id: 4, name: "Handsome Jack", group: "Apex" },
    { id: 5, name: "te Cain", group: "Apex" },
    { id: 6, name: "Cassiopeia", group: "Apex" },
    { id: 7, name: "Chip", group: "Apex" },
    { id: 8, name: "Maestro98", group: "Elite" },
    { id: 9, name: "nati&nasti", group: "Elite" },
    { id: 10, name: "Pavel", group: "Elite" },
    { id: 11, name: "Hope", group: "Elite" },
    { id: 12, name: "SCORPIO", group: "Elite" },
    { id: 13, name: "Magdalina", group: "Elite" },
    { id: 14, name: "Chimera", group: "Elite" },
    { id: 15, name: "ThomMerilin", group: "Elite" },
    { id: 16, name: "Arlequin", group: "Elite" },
    { id: 17, name: "Avabelle", group: "Elite" },
    { id: 18, name: "Aramos", group: "Elite" },
    { id: 19, name: "Leia Organa", group: "Elite" },
    { id: 20, name: "WickedWitch", group: "Elite" },
    { id: 21, name: "Air", group: "Elite" },
    { id: 22, name: "LadyMarion", group: "Elite" },
    { id: 23, name: "Samushka", group: "Elite" },
    { id: 24, name: "Mialyno", group: "Elite" },
    { id: 25, name: "Antares*", group: "Elite" },
    { id: 26, name: "ApocAlypse", group: "Elite" },
    { id: 27, name: "PaniKotacka", group: "Elite" },
    { id: 28, name: "The Snow Queen", group: "Elite" },
    { id: 29, name: "Daenerys", group: "Elite" },
    { id: 30, name: "Elora", group: "Elite" },
    { id: 31, name: "Aalis", group: "Elite" },
    { id: 32, name: "Léany", group: "Elite" },
];

const availablePlayers = [...players];
const teamPlayers = [];
let currentFilter = 'all';
const MAX_MEMBERS = 39;

function renderPlayers() {
    const availablePlayersContainer = document.getElementById('available-players');
    availablePlayersContainer.innerHTML = '';

    const filteredPlayers = currentFilter === 'all'
        ? availablePlayers
        : availablePlayers.filter(player => player.group === currentFilter);

    filteredPlayers.forEach(player => {
        const playerElement = document.createElement('div');
        playerElement.className = `player player-${player.group.toLowerCase()}`;
        playerElement.innerHTML = `
            <span>${player.name}</span>
            <span class="player-group">${player.group}</span>
        `;
        playerElement.addEventListener('click', () => addToTeam(player.id));
        availablePlayersContainer.appendChild(playerElement);
    });
}

function renderTeam() {
    const teamPlayersContainer = document.getElementById('team-players');
    teamPlayersContainer.innerHTML = '';

    teamPlayers.forEach(player => {
        const playerElement = document.createElement('div');
        playerElement.className = `player player-${player.group.toLowerCase()}`;
        playerElement.innerHTML = `
            <span>${player.name}</span>
            <span class="player-group">${player.group}</span>
        `;
        playerElement.addEventListener('click', () => removeFromTeam(player.id));
        teamPlayersContainer.appendChild(playerElement);
    });

    updateStats();
}

function addToTeam(playerId) {
    if (teamPlayers.length >= MAX_MEMBERS) {
        alert("The maximal number of members allowed in the alliance has been reached.");
        return;
    }
    const playerIndex = availablePlayers.findIndex(p => p.id === playerId);
    if (playerIndex !== -1) {
        const player = availablePlayers[playerIndex];
        teamPlayers.push(player);
        availablePlayers.splice(playerIndex, 1);
        renderPlayers();
        renderTeam();
        checkConstraint();
    }
}

function removeFromTeam(playerId) {
    const playerIndex = teamPlayers.findIndex(p => p.id === playerId);
    if (playerIndex !== -1) {
        const player = teamPlayers[playerIndex];
        availablePlayers.push(player);
        teamPlayers.splice(playerIndex, 1);
        renderPlayers();
        renderTeam();
        checkConstraint();
    }
}

function updateStats() {
    const sCounts = teamPlayers.filter(p => p.group === 'Supreme').length;
    const aCounts = teamPlayers.filter(p => p.group === 'Apex').length;
    const eCounts = teamPlayers.filter(p => p.group === 'Elite').length;
    const oCounts = teamPlayers.filter(p => p.group === 'Ordinary').length;

    document.getElementById('s-count').textContent = sCounts;
    document.getElementById('a-count').textContent = aCounts;
    document.getElementById('e-count').textContent = eCounts;
    document.getElementById('o-count').textContent = oCounts;
    document.getElementById('total-count').textContent = teamPlayers.length;
}

function checkConstraint() {
    const sCounts = teamPlayers.filter(p => p.group === 'Supreme').length;
    const aCounts = teamPlayers.filter(p => p.group === 'Apex').length;
    const eCounts = teamPlayers.filter(p => p.group === 'Elite').length;

    const constraintValue = 9 * sCounts + 3 * aCounts + eCounts;
    const maxValue = 35;
    const percentage = (constraintValue / maxValue) * 100;

    document.querySelector('.constraint-progress').style.width = `${Math.min(percentage, 100)}%`;
    document.querySelector('.constraint-value').textContent = `${constraintValue}/${maxValue}`;

    const errorMessage = document.querySelector('.error-message');
    if (constraintValue > maxValue) {
        errorMessage.style.display = 'block';
        document.querySelector('.constraint-progress').style.backgroundColor = '#ff4d4d';
    } else {
        errorMessage.style.display = 'none';
        document.querySelector('.constraint-progress').style.backgroundColor = '#66cc66';
    }

    if (teamPlayers.length > MAX_MEMBERS) {
        errorMessage.style.display = 'block';
        document.querySelector('.constraint-progress').style.backgroundColor = '#ff4d4d';
    }
}

// Set up filter buttons
document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', () => {
        currentFilter = button.dataset.group;
        document.querySelectorAll('.filter-button').forEach(btn => {
            btn.style.opacity = '0.7';
        });
        button.style.opacity = '1';
        renderPlayers();
    });
});

// Initialize the display
renderPlayers();
renderTeam();
