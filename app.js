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
                <h2 class="section-title">{{ $t('home.upcoming') }}</h2>
                
                <div v-if="loading" class="loading">{{ $t('home.loading') }}</div>
                
                <div v-else class="grid-cards">
                    <article class="card" v-for="activity in activities" :key="activity.id">
                        <img :src="activity.image" class="card-img-top" alt="Imagem">
                        <div class="card-body">
                            <span class="card-category">{{ activity.category || 'Evento' }}</span>
                            <h3 class="card-title">{{ activity.title }}</h3>
                            <p class="card-text">{{ activity.description }}</p>
                            <a href="#" class="btn-read">{{ $t('home.readMore') }} &rarr;</a>
                        </div>
                    </article>
                </div>

                <!-- Youtube Section -->
                <div style="margin-top: 60px;">
                    <h2 class="section-title">{{ $t('home.youtubeTitle') }}</h2>
                    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; background: #000;">
                        <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
                            src="https://www.youtube.com/embed/videoseries?list=PLy2778c_K61tq5HbeiwS_zM5N8M0vKwb1" 
                            title="YouTube video player" frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() { return { activities: [], loading: true } },
    mounted() { this.loadData(); },
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
                    { id: 1, title: 'Acampamento Jovem reúne centenas em Aracaju', description: 'Foi um final de semana de muita oração, lazer e encontro com Deus. O evento marcou o início das atividades do ano.', image: 'https://placehold.co/600x400/C59D5F/FFF?text=Acampamento', category: 'Notícia' },
                    { id: 2, title: 'Inscrições abertas para o Retiro de Quaresma', description: 'Venha se preparar para a Páscoa conosco. O retiro acontecerá na casa de formação e contará com pregadores convidados.', image: 'https://placehold.co/600x400/5D4037/FFF?text=Retiro', category: 'Evento' },
                    { id: 3, title: 'Ação Social: Sopa Solidária distribui 500 refeições', description: 'Nossa equipe de voluntários esteve presente no centro da cidade levando alimento e esperança para os irmãos em situação de rua.', image: 'https://placehold.co/600x400/333/FFF?text=Social', category: 'Ação Social' },
                    { id: 4, title: 'O que é o Carisma Salesiano?', description: 'Entenda os pilares da educação de Dom Bosco: Razão, Religião e Amorevolezza. Um caminho de santidade para a juventude.', image: 'https://placehold.co/600x400/999/FFF?text=Formação', category: 'Formação' }
                ];
            } finally { this.loading = false; }
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
        { path: '/transparencia', component: TransparencyView },
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
