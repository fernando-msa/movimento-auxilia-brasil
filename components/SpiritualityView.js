export default {
    template: `
        <div class="spirituality-view">
            <h1>{{ $t('spirituality.title') }}</h1>
            
            <div class="tabs">
                <button 
                    :class="{ active: currentTab === 'salesian' }" 
                    @click="currentTab = 'salesian'">
                    {{ $t('spirituality.salesian') }}
                </button>
                <button 
                    :class="{ active: currentTab === 'marian' }" 
                    @click="currentTab = 'marian'">
                    {{ $t('spirituality.marian') }}
                </button>
            </div>

            <div v-if="loading" class="loading">Carregando orações...</div>
            <div v-else class="tab-content">
                <div v-if="currentTab === 'salesian'" class="prayers-list">
                    <h3>Orações Salesianas</h3>
                    <div class="prayer-card" v-for="prayer in salesianPrayers" :key="prayer.id">
                        <h4>{{ prayer.title }}</h4>
                        <p>{{ prayer.content }}</p>
                    </div>
                </div>

                <div v-if="currentTab === 'marian'" class="prayers-list">
                    <h3>Orações Marianas</h3>
                    <div class="prayer-card" v-for="prayer in marianPrayers" :key="prayer.id">
                        <h4>{{ prayer.title }}</h4>
                        <p>{{ prayer.content }}</p>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            currentTab: 'salesian',
            prayers: [],
            loading: true
        }
    },
    computed: {
        salesianPrayers() {
            return this.prayers.filter(p => p.type === 'salesian');
        },
        marianPrayers() {
            return this.prayers.filter(p => p.type === 'marian');
        }
    },
    async mounted() {
        try {
            const querySnapshot = await getDocs(collection(db, "spirituality"));
            if (!querySnapshot.empty) {
                this.prayers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            }
            // If empty, will just show nothing or we could keep hardcoded fallback, 
            // but for "Real Data" goal, let's rely on DB + Seed.
        } catch (e) {
            console.error("Error fetching spirituality data:", e);
        } finally {
            this.loading = false;
        }
    }
}
