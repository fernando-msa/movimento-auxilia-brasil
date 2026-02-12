// Global Variables
const { createApp, ref } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;
const { createI18n } = VueI18n;

import ptBR from './locales/pt-BR.js';
import es from './locales/es.js';
import en from './locales/en.js';
import LoginView from './components/LoginView.js';
import AdminView from './components/AdminView.js';
import TogetherView from './components/TogetherView.js';

// --- Components ---

const HomeView = {
    template: `
        <div class="home-view">
            <!-- Hero Section -->
            <div class="hero">
                <h1>{{ $t('home.heroTitle') }}</h1>
                <p>{{ $t('home.heroSubtitle') }}</p>
            </div>

            <div class="container">
                <!-- Prayer Request Section (New) -->
                <div style="background: white; padding: 20px; margin-bottom: 40px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-left: 5px solid var(--primary-color);">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
                        <div>
                            <h3 style="color: var(--secondary-color); margin-bottom: 5px;">{{ $t('home.latestPrayers') }}</h3>
                            <div v-if="prayers.length === 0" style="color: #777; font-style: italic;">Nenhum pedido recente. Seja o primeiro!</div>
                            <div v-else class="prayer-ticker" style="max-height: 100px; overflow-y: auto; font-size: 0.95rem;">
                                <div v-for="prayer in prayers" :key="prayer.id" style="margin-bottom: 8px; border-bottom: 1px dotted #eee; padding-bottom: 4px;">
                                    <strong>{{ prayer.name }} ({{ prayer.city }}):</strong> {{ prayer.intention }}
                                </div>
                            </div>
                        </div>
                        <button @click="showPrayerModal = true" style="background: var(--primary-color); color: white; border: none; padding: 10px 20px; border-radius: 4px; font-weight: bold; cursor: pointer; white-space: nowrap;">
                            {{ $t('home.prayerBtn') }} 🙏
                        </button>
                    </div>
                </div>

                <h2 class="section-title">{{ $t('home.upcoming') }}</h2>
                
                <div v-if="loading" class="loading">{{ $t('home.loading') }}</div>
                
                <div v-else class="grid-cards">
                    <article class="card" v-for="activity in activities" :key="activity.id">
                        <img :src="activity.image" class="card-img-top" alt="Imagem">
                        <div class="card-body">
                            <span class="card-category">{{ activity.category || 'Evento' }}</span>
                            <h3 class="card-title">{{ activity.title }}</h3>
                            <p class="card-text">{{ activity.description }}</p>
                            <button @click="openActivity(activity)" class="btn-read" style="background:none; border:none; color:var(--primary-color); cursor:pointer; font-weight:bold; padding:0;">
                                {{ $t('home.readMore') }} &rarr;
                            </button>
                        </div>
                    </article>
                </div>

                <!-- Instagram Section -->
                <div style="margin-top: 60px; text-align: center;">
                    <h2 class="section-title">Siga-nos no Instagram</h2>
                    <p style="margin-bottom: 20px; font-size: 1.2rem;">@somosauxilia</p>
                   
                    <!-- Simulated Feed Grid (Fallback) -->
                    <div id="instagram-feed-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin-bottom: 30px; opacity: 0.8;">
                       <a href="https://www.instagram.com/somosauxilia" target="_blank" style="display:block; overflow:hidden; border-radius:8px;">
                            <img src="https://placehold.co/300x300/C59D5F/FFF?text=Retiro" style="width:100%; aspect-ratio:1; object-fit:cover;">
                        </a>
                        <a href="https://www.instagram.com/somosauxilia" target="_blank" style="display:block; overflow:hidden; border-radius:8px;">
                            <img src="https://placehold.co/300x300/5D4037/FFF?text=Missa" style="width:100%; aspect-ratio:1; object-fit:cover;">
                        </a>
                         <a href="https://www.instagram.com/somosauxilia" target="_blank" style="display:block; overflow:hidden; border-radius:8px;">
                            <img src="https://placehold.co/300x300/333/FFF?text=Social" style="width:100%; aspect-ratio:1; object-fit:cover;">
                        </a>
                        <a href="https://www.instagram.com/somosauxilia" target="_blank" style="display:block; overflow:hidden; border-radius:8px;">
                            <img src="https://placehold.co/300x300/999/FFF?text=Jovens" style="width:100%; aspect-ratio:1; object-fit:cover;">
                        </a>
                    </div>

                    <a href="https://www.instagram.com/somosauxilia" target="_blank" 
                       style="background: #E1306C; color: white; padding: 15px 30px; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 1.1rem; display: inline-flex; align-items: center; gap: 10px;">
                        <span>📸</span> Ver Instagram Oficial
                    </a>
                </div>
            </div>

            <!-- Prayer Request Modal -->
            <div v-if="showPrayerModal" style="position: fixed; top:0; left:0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); display: flex; justify-content: center; align-items: center; z-index: 5000;">
                <div style="background: white; padding: 30px; border-radius: 8px; width: 90%; max-width: 400px; position: relative;">
                    <button @click="showPrayerModal = false" style="position: absolute; top: 10px; right: 10px; border: none; background: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
                    <h3 style="color: var(--secondary-color); margin-bottom: 20px;">{{ $t('home.prayerForm.title') }}</h3>
                    <form @submit.prevent="submitPrayer">
                        <input v-model="newPrayer.name" :placeholder="$t('home.prayerForm.name')" required style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 4px;">
                        <input v-model="newPrayer.city" :placeholder="$t('home.prayerForm.city')" required style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 4px;">
                        <textarea v-model="newPrayer.intention" :placeholder="$t('home.prayerForm.intention')" required style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 4px; height: 80px;"></textarea>
                        <button type="submit" style="width: 100%; background: var(--primary-color); color: white; border: none; padding: 12px; border-radius: 4px; font-weight: bold; cursor: pointer;">
                            {{ $t('home.prayerForm.send') }}
                        </button>
                    </form>
                </div>
            </div>

            <!-- News Detail Modal -->
            <div v-if="selectedActivity" style="position: fixed; top:0; left:0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center; z-index: 4000; padding: 20px;">
                <div style="background: white; border-radius: 8px; max-width: 600px; width: 100%; max-height: 90vh; overflow-y: auto; position: relative;">
                    <button @click="selectedActivity = null" style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.1); border: none; font-size: 1.5rem; cursor: pointer; width: 40px; height: 40px; border-radius: 50%;">&times;</button>
                    
                    <img :src="selectedActivity.image" style="width: 100%; height: 300px; object-fit: cover;">
                    
                    <div style="padding: 30px;">
                        <span style="background: var(--primary-color); color: white; padding: 4px 10px; border-radius: 4px; font-size: 0.8rem; text-transform: uppercase;">
                            {{ selectedActivity.category || 'Notícia' }}
                        </span>
                        <h2 style="margin: 15px 0; color: var(--secondary-color);">{{ selectedActivity.title }}</h2>
                        <p style="line-height: 1.6; color: #555; white-space: pre-wrap;">{{ selectedActivity.description }}</p>
                        
                        <hr style="margin: 30px 0; border: 0; border-top: 1px solid #eee;">
                        
                        <div style="text-align: center;">
                            <button @click="selectedActivity = null" style="background: var(--light-bg); border: 1px solid #ddd; padding: 10px 25px; border-radius: 4px; cursor: pointer;">Fechar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() { return { activities: [], loading: true, selectedActivity: null, showPrayerModal: false, newPrayer: { name: '', city: '', intention: '' }, prayers: [] } },
    mounted() { this.loadData(); this.loadPrayers(); },
    methods: {
        async loadData() {
            try {
                const snapshot = await window.db.collection('activities').get();
                if (!snapshot.empty) {
                    this.activities = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                } else { throw new Error('Empty'); }
            } catch (e) {
                // Mock Data Portal Style
                this.activities = [
                    { id: 1, title: 'Acampamento Jovem reúne centenas em Aracaju', description: 'Foi um final de semana de muita oração, lazer e encontro com Deus. O evento marcou o início das atividades do ano. Contou com a presença de diversos movimentos e pastorais.', image: 'https://placehold.co/600x400/C59D5F/FFF?text=Acampamento', category: 'Notícia' },
                    { id: 2, title: 'Inscrições abertas para o Retiro de Quaresma', description: 'Venha se preparar para a Páscoa conosco. O retiro acontecerá na casa de formação e contará com pregadores convidados. As vagas são limitadas.', image: 'https://placehold.co/600x400/5D4037/FFF?text=Retiro', category: 'Evento' },
                    { id: 3, title: 'Ação Social: Sopa Solidária distribui 500 refeições', description: 'Nossa equipe de voluntários esteve presente no centro da cidade levando alimento e esperança para os irmãos em situação de rua. Precisamos de doações de alimentos não perecíveis.', image: 'https://placehold.co/600x400/333/FFF?text=Social', category: 'Ação Social' },
                    { id: 4, title: 'O que é o Carisma Salesiano?', description: 'Entenda os pilares da educação de Dom Bosco: Razão, Religião e Amorevolezza. Um caminho de santidade para a juventude que transforma vidas através da alegria.', image: 'https://placehold.co/600x400/999/FFF?text=Formação', category: 'Formação' }
                ];
            } finally { this.loading = false; }
        },
        async loadPrayers() {
            try {
                // Get latest 5 prayers
                const snap = await window.db.collection('prayer_requests').orderBy('timestamp', 'desc').limit(5).get();
                this.prayers = snap.docs.map(doc => doc.data());
            } catch (e) { console.log('No prayers yet or offline'); }
        },
        async submitPrayer() {
            try {
                const prayer = { ...this.newPrayer, timestamp: new Date() };
                await window.db.collection('prayer_requests').add(prayer);
                this.prayers.unshift(prayer); // Optimistic update
                if (this.prayers.length > 5) this.prayers.pop();

                alert(this.$t('home.prayerForm.success'));
                this.showPrayerModal = false;
                this.newPrayer = { name: '', city: '', intention: '' };
            } catch (e) {
                alert('Erro ao enviar: ' + e.message);
            }
        },
        openActivity(item) {
            this.selectedActivity = item;
        }
    }
};

const MissionsView = {
    template: `
        <div class="container" style="padding-top: 40px;">
            <h2 class="section-title">{{ $t('missions.title') }}</h2>
            <div class="map-container" style="position: relative; height: 500px; width: 100%;">
                <div id="map" style="height: 100%; width: 100%;"></div>
            </div>
            <div style="margin-top: 30px; display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))">
                <div class="card" style="padding: 20px;">
                    <h3 style="color: var(--secondary-color);">{{ $t('missions.aracaju') }}</h3>
                    <p>{{ $t('missions.aracajuDesc') }}</p>
                </div>
                <div class="card" style="padding: 20px;">
                    <h3 style="color: var(--secondary-color);">{{ $t('missions.fortaleza') }}</h3>
                    <p>{{ $t('missions.fortalezaDesc') }}</p>
                </div>
            </div>
        </div>
    `,
    mounted() { setTimeout(this.initMap, 200); },
    methods: {
        async initMap() {
            const map = L.map('map').setView([-10.9472, -37.0731], 6); // Focus NE Brazil
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
            L.marker([-10.9472, -37.0731]).addTo(map).bindPopup("<b>Aracaju</b><br>Sede Principal");
        }
    }
};

const SpiritualityView = {
    template: `
        <div class="container" style="padding-top: 40px;">
            <h2 class="section-title">{{ $t('spirituality.title') }}</h2>
            
            <div class="tabs">
                <button class="tab-btn" :class="{ active: currentTab === 'salesian' }" @click="currentTab = 'salesian'">{{ $t('spirituality.salesian') }}</button>
                <button class="tab-btn" :class="{ active: currentTab === 'marian' }" @click="currentTab = 'marian'">{{ $t('spirituality.marian') }}</button>
            </div>
            
            <div v-if="currentTab === 'salesian'" class="grid-cards">
                <article class="card">
                    <div class="card-body">
                        <h3 class="card-title">Oração a Dom Bosco</h3>
                        <p class="card-text">Pai e Mestre da Juventude, São João Bosco, que tanto trabalhaste pela salvação das almas, sê nosso guia...</p>
                    </div>
                </article>
                <article class="card">
                    <div class="card-body">
                        <h3 class="card-title">Sistema Preventivo</h3>
                        <p class="card-text">O segredo da educação salesiana não é a punição, mas a prevenção através do amor e da presença constante.</p>
                    </div>
                </article>
            </div>

            <div v-if="currentTab === 'marian'" class="grid-cards">
                <article class="card">
                    <div class="card-body">
                        <h3 class="card-title">Auxiliadora dos Cristãos</h3>
                        <p class="card-text">Ó Maria, Virgem Poderosa, Tu grande e ilustre defensora da Igreja...</p>
                    </div>
                </article>
            </div>
        </div>
    `,
    data() { return { currentTab: 'salesian' } }
};

const TransparencyView = {
    template: `
        <div class="container" style="padding-top: 40px;">
            <h2 class="section-title">{{ $t('transparency.title') }}</h2>
            <div style="background: #fff; padding: 30px; border: 1px solid #ddd;">
                <canvas id="donationChart" style="max-height: 400px;"></canvas>
            </div>
        </div>
    `,
    mounted() { setTimeout(this.loadData, 200); },
    methods: {
        loadData() {
            new Chart(document.getElementById('donationChart'), {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
                    datasets: [{
                        label: 'Doações (R$)',
                        data: [12000, 15000, 8000, 11000, 18000],
                        backgroundColor: '#C59D5F'
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });
        }
    }
};

const PastoralsView = {
    template: `
        <div class="container" style="padding-top: 40px;">
            <h2 class="section-title">{{ $t('pastorals.title') }}</h2>
            <div class="grid-cards">
                <article class="card" v-for="p in pastorals" :key="p.id">
                    <img :src="p.image" class="card-img-top">
                    <div class="card-body">
                        <h3 class="card-title">{{ p.name }}</h3>
                        <p class="card-text">{{ p.description }}</p>
                        <a href="#" class="btn-read">Conheça mais</a>
                    </div>
                </article>
            </div>
        </div>
    `,
    data() { return { pastorals: [] } },
    async mounted() {
        // Mock Portal Cards
        this.pastorals = [
            { id: 1, name: 'Pastoral Vocacional', description: 'Descubra o chamado de Deus para sua vida. Encontros mensais de discernimento.', image: 'https://placehold.co/400x300/C59D5F/FFF?text=Vocacional' },
            { id: 2, name: 'Ministério de Música', description: 'Servindo a Deus através da arte e dos louvores nas celebrações e grupos de oração.', image: 'https://placehold.co/400x300/5D4037/FFF?text=Música' },
            { id: 3, name: 'Promoção Humana', description: 'Ações concretas de caridade e auxílio às famílias carentes da região.', image: 'https://placehold.co/400x300/333/FFF?text=Caridade' },
        ];
    }
};

// --- App Init ---
const i18n = createI18n({
    legacy: false,
    locale: 'pt-BR',
    fallbackLocale: 'en',
    messages: { 'pt-BR': ptBR, 'es': es, 'en': en }
});

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: HomeView },
        { path: '/missoes', component: MissionsView },
        { path: '/espiritualidade', component: SpiritualityView },
        { path: '/transparencia', component: TogetherView },
        { path: '/pastorais', component: PastoralsView },
        { path: '/together', component: TogetherView },
        { path: '/login', component: LoginView },
        { path: '/admin', component: AdminView, meta: { requiresAuth: true } },
    ]
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    // Check auth properly
    const checkAuth = () => {
        if (requiresAuth && !window.auth.currentUser) {
            next('/login');
        } else {
            next();
        }
    };

    if (window.auth.currentUser !== undefined) {
        checkAuth();
    } else {
        const unsubscribe = window.auth.onAuthStateChanged((user) => {
            unsubscribe();
            checkAuth();
        });
    }
});

const app = createApp({
    setup() {
        const { t, locale } = VueI18n.useI18n();
        const isMenuOpen = ref(false);
        const toggleMenu = () => isMenuOpen.value = !isMenuOpen.value;
        const closeMenu = () => isMenuOpen.value = false;
        const changeLang = (l) => { locale.value = l; isMenuOpen.value = false; };

        // Expose user to template
        const user = ref(null);
        window.auth.onAuthStateChanged(u => user.value = u);

        return { t, changeLang, isMenuOpen, toggleMenu, closeMenu, user };
    }
});

app.use(router);
app.use(i18n);
app.mount('#app');
