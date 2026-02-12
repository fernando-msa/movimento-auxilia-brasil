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
                        <h3>{{ pastoral.name }}</h3>
                        <p>{{ pastoral.description }}</p>
                        <button class="btn-more">Saiba Mais</button>
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
                console.log("Pastorals collection empty. Run seedData() to populate.");
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
            return [
                { id: 1, name: 'Vocacional', description: 'Acompanhamento e discernimento vocacional para jovens.', image: 'https://placehold.co/600x400/003366/FFF?text=Vocacional' },
                { id: 2, name: 'Difusão', description: 'Espalhando a mensagem e a devoção salesiana.', image: 'https://placehold.co/600x400/FFCC00/333?text=Difusão' },
                { id: 3, name: 'Liturgia', description: 'Preparação e celebração dos mistérios da fé.', image: 'https://placehold.co/600x400/cc0000/FFF?text=Liturgia' },
                { id: 4, name: 'Social', description: 'Obras de caridade e assistência aos necessitados.', image: 'https://placehold.co/600x400/006633/FFF?text=Social' }
            ];
        }
    }
}
