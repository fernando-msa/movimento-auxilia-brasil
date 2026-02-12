import { db, collection, getDocs } from '../firebase-config.js';

export default {
    template: `
        <div class="home-view">
            <h1>{{ $t('home.title') }}</h1>
            <section class="activity-feed">
                <h2>{{ $t('home.upcoming') }}</h2>
                <div v-if="loading" class="loading">Carregando...</div>
                <div v-else-if="error" class="error">{{ error }}</div>
                
                <div v-else class="activity-card" v-for="activity in activities" :key="activity.id">
                    <div class="date-badge">
                        <span class="day">{{ activity.day }}</span>
                        <span class="month">{{ activity.month }}</span>
                    </div>
                    <div class="details">
                        <h3>{{ activity.title }}</h3>
                        <p>{{ activity.description }}</p>
                        <small>{{ activity.location }}</small>
                    </div>
                </div>
            </section>
        </div>
    `,
    data() {
        return {
            activities: [],
            loading: true,
            error: null
        }
    },
    async mounted() {
        try {
            const querySnapshot = await getDocs(collection(db, "activities"));
            if (!querySnapshot.empty) {
                this.activities = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            } else {
                // Fallback / Mock data if DB is empty or not configured yet
                console.warn("Firestore empty or not accessible. Using mock data.");
                this.activities = this.getMockData();
            }
        } catch (e) {
            console.error("Error fetching activities:", e);
            // Fallback for demo purposes so the UI doesn't look broken during setup
            this.activities = this.getMockData();
        } finally {
            this.loading = false;
        }
    },
    methods: {
        getMockData() {
            return [
                { id: 1, day: '15', month: 'FEV', title: 'Encontro Jovem (Mock)', description: 'Reunião mensal da juventude.', location: 'Paróquia Central' },
                { id: 2, day: '22', month: 'FEV', title: 'Ação Social (Mock)', description: 'Distribuição de alimentos.', location: 'Comunidade São José' },
                { id: 3, day: '01', month: 'MAR', title: 'Retiro Espiritual (Mock)', description: 'Momento de oração e reflexão.', location: 'Casa de Retiros' }
            ];
        }
    }
}
