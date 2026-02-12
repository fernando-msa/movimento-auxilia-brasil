import { db, collection, getDocs } from '../firebase-config.js';

export default {
    template: `
        <div class="pastorals-view">
            <h1>{{ $t('pastorals.title') }}</h1>
            <div v-if="loading" class="loading">Carregando...</div>
            <div class="pastorals-grid" v-else>
                <div class="pastoral-card" v-for="pastoral in pastorals" :key="pastoral.id">
                    <img :src="pastoral.image" :alt="pastoral.name" class="card-img">
                    <div class="card-content">
                        <!-- Support both DB text and Translation Keys -->
                        <h3>{{ pastoral.isMock ? $t(pastoral.name) : pastoral.name }}</h3>
                        <p>{{ pastoral.isMock ? $t(pastoral.description) : pastoral.description }}</p>
                        <button class="btn-more">{{ $t('pastorals.knowMore') }}</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            pastorals: [],
            loading: true
        }
    },
    async mounted() {
        try {
            const querySnapshot = await getDocs(collection(db, "pastorals"));
            if (!querySnapshot.empty) {
                this.pastorals = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            } else {
                console.log("Pastorals collection empty. Using Localized Mock Data.");
                this.pastorals = this.getMockData();
            }
        } catch (e) {
            console.error("Error fetching pastorals:", e);
            this.pastorals = this.getMockData();
        } finally {
            this.loading = false;
        }
    },
    methods: {
        getMockData() {
            // Using translation keys defined in locale files
            return [
                { id: 1, isMock: true, name: 'pastorals.vocational', description: 'pastorals.vocationalDesc', image: 'https://placehold.co/400x300/003366/FFF?text=Vocacional' },
                { id: 2, isMock: true, name: 'pastorals.communication', description: 'pastorals.communicationDesc', image: 'https://placehold.co/400x300/FFCC00/333?text=Pascom' },
                { id: 3, isMock: true, name: 'pastorals.music', description: 'pastorals.musicDesc', image: 'https://placehold.co/400x300/cc0000/FFF?text=Musica' },
                { id: 4, isMock: true, name: 'pastorals.social', description: 'pastorals.socialDesc', image: 'https://placehold.co/400x300/006633/FFF?text=Social' }
            ];
        }
    }
}
