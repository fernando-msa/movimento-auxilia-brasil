import { db, collection, getDocs } from '../firebase-config.js';

export default {
    template: `
        <div class="missions-view">
            <h1>{{ $t('missions.title') }}</h1>
            <div id="map" style="height: 500px; width: 100%; border-radius: 8px; margin-top: 1rem;"></div>
        </div>
    `,
    data() {
        return {
            map: null
        };
    },
    async mounted() {
        this.initMap();
        await this.loadMissions();
    },
    methods: {
        initMap() {
            // Center map on Brazil
            this.map = L.map('map').setView([-14.235, -51.925], 4);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.map);
        },
        async loadMissions() {
            let missions = [];
            try {
                const querySnapshot = await getDocs(collection(db, "missions"));
                if (!querySnapshot.empty) {
                    missions = querySnapshot.docs.map(doc => doc.data());
                } else {
                    console.log("Missions collection empty. Run seedData() to populate.");
                }
            } catch (e) {
                console.error("Error fetching missions:", e);
                missions = this.getMockMissions();
            }

            missions.forEach(mission => {
                L.marker([mission.lat, mission.lng])
                    .addTo(this.map)
                    .bindPopup(`<b>${mission.name}</b><br>Atuando na comunidade.`);
            });
        },
        getMockMissions() {
            return [
                { lat: -23.5505, lng: -46.6333, name: "Missão São Paulo (Mock)" },
                { lat: -22.9068, lng: -43.1729, name: "Missão Rio de Janeiro (Mock)" },
                { lat: -3.7172, lng: -38.5434, name: "Missão Fortaleza (Mock)" }
            ];
        }
    }
}
