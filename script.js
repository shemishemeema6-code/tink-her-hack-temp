// Bus Buddy - Demo Logic

// --- Constants & Mock Data ---
const BUS_DATA = [
    // --- HOW TO ADD NEW DATA ---
    // Copy the block below and paste it inside this array to add a new bus.
    // Change the id, name, time, etc. to whatever you want.
    /*
    {
        id: 4,
        name: "New Bus Name",
        start: "10:00 AM",
        reach: "11:00 AM",
        duration: "1h 00m",
        crowd: "low", // options: 'high' (red), 'medium' (yellow), 'low' (green)
        fare: "$2.00",
        distance: "10 km"
    },
    */

    {
        id: 1,
        name: "Metro Express 202",
        start: "09:00 AM",
        reach: "10:15 AM",
        duration: "1h 15m",
        crowd: "high", // red
        fare: "$2.50",
        distance: "12 km"
    },
    {
        id: 2,
        name: "City Loop 55",
        start: "09:15 AM",
        reach: "10:45 AM",
        duration: "1h 30m",
        crowd: "medium", // yellow
        fare: "$2.00",
        distance: "14 km"
    },
    {
        id: 3,
        name: "Rapid Transit 11",
        start: "09:30 AM",
        reach: "10:30 AM",
        duration: "1h 00m",
        crowd: "low", // green
        fare: "$3.00",
        distance: "12 km"
    }
];

let currentStep = 1;
let selectedBus = null;

// --- DOM Elements ---
const layouts = {
    1: document.getElementById('landing'),
    2: document.getElementById('search'),
    3: document.getElementById('results'),
    4: document.getElementById('details'),
    5: document.getElementById('tracking'),
    6: document.getElementById('success')
};

// --- Navigation Functions ---

function showLayout(stepId) {
    // Hide all
    Object.values(layouts).forEach(el => {
        if (el) el.classList.remove('active');
    });

    // Show current
    const target = layouts[stepId];
    if (target) {
        target.classList.add('active');
        currentStep = stepId;
    }
}

// --- Event Handlers & Logic ---

// 1. Landing -> Search
function startApp() {
    showLayout(2);
}

// 2. Search -> Results
function searchBuses() {
    // Mock API Call delay
    const btn = document.querySelector('#search .btn-primary');
    const originalText = btn.innerText;
    btn.innerText = 'Searching...';
    btn.disabled = true;

    setTimeout(() => {
        renderBusList();
        showLayout(3);

        // Reset button
        btn.innerText = originalText;
        btn.disabled = false;
    }, 1500);
}

// Render List
function renderBusList() {
    const listContainer = document.querySelector('.bus-list');
    listContainer.innerHTML = ''; // Clear

    BUS_DATA.forEach(bus => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => selectBus(bus);

        // Simple crowd dot color map
        const colorMap = {
            'high': 'red',
            'medium': 'yellow',
            'low': 'green'
        };

        card.innerHTML = `
            <div class="bus-card-content">
                <div>
                    <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
                        <h3 style="font-size:16px; margin:0;">${bus.name}</h3>
                        <div class="status-dot ${colorMap[bus.crowd]}" title="Crowd: ${bus.crowd}"></div>
                    </div>
                    <div class="subtext">AC • Wi-Fi</div>
                </div>
                <div style="text-align:right;">
                    <div class="bus-time">${bus.start}</div>
                    <div class="bus-duration">${bus.duration}</div>
                </div>
            </div>
        `;
        listContainer.appendChild(card);
    });
}

// 3. Results -> Details
function selectBus(bus) {
    selectedBus = bus;

    // Populate Details
    document.getElementById('detail-name').textContent = bus.name;
    document.getElementById('detail-time').textContent = `${bus.start} - ${bus.reach}`;
    document.getElementById('detail-fare').textContent = bus.fare;
    document.getElementById('detail-dist').textContent = bus.distance;

    // Set crowd indicator
    const crowdText = bus.crowd.charAt(0).toUpperCase() + bus.crowd.slice(1) + " Crowd";
    document.getElementById('detail-crowd-text').textContent = crowdText;

    const dot = document.getElementById('detail-crowd-dot');
    dot.className = 'status-dot'; // reset
    dot.classList.add(bus.crowd === 'high' ? 'red' : bus.crowd === 'medium' ? 'yellow' : 'green');

    showLayout(4);
}

// 4. Details -> Tracking
let trackingInterval;

function startJourney() {
    document.getElementById('track-bus-name').textContent = selectedBus ? selectedBus.name : "Bus";

    // Update time dynamically
    updateTime();

    // Mock Tracking Updates
    let stops = ["City Mall", "Central Park", "Market Street", "Destination"];
    let stopIndex = 0;
    const nextStopEl = document.querySelector('#tracking .card h3'); // Select the Next Stop element

    if (trackingInterval) clearInterval(trackingInterval);

    trackingInterval = setInterval(() => {
        updateTime();

        // Cycle through mock stops
        stopIndex = (stopIndex + 1) % stops.length;
        if (nextStopEl) nextStopEl.textContent = stops[stopIndex];
    }, 3000);

    showLayout(5);
}

function updateTime() {
    const now = new Date();
    document.getElementById('current-time').textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function emergencyCall() {
    alert("Calling 911... (Demo)");
}

// 5. Tracking -> Success
function finishJourney() {
    if (trackingInterval) clearInterval(trackingInterval);
    showLayout(6);
}

// 6. Success -> Reset
function resetApp() {
    selectedBus = null;
    showLayout(1);
    // Clear inputs if any
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showLayout(1);
});
