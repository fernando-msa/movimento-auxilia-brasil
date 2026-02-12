export default {
    template: `
        <div class="together-view">
            <!-- Hero Emotional -->
            <div class="video-hero" style="position: relative; height: 50vh; background: #000; overflow: hidden; display: flex; align-items: center; justify-content: center; color: white; text-align: center;">
                <img src="https://placehold.co/1920x1080/5D4037/FFF?text=Transparência+e+Doação" style="position: absolute; top:0; left:0; width: 100%; height: 100%; object-fit: cover; opacity: 0.6;">
                <div style="position: relative; z-index: 2; padding: 20px;">
                    <h1 style="font-size: 3rem; margin-bottom: 20px; font-family: var(--font-heading);">{{ $t('together.heroTitle') }}</h1>
                    <p style="font-size: 1.2rem; max-width: 800px; margin: 0 auto;">{{ $t('together.heroSubtitle') }}</p>
                </div>
            </div>

            <div class="container" style="padding: 40px 20px;">
                <!-- Financial Goal Section (New) -->
                <div style="margin-bottom: 60px; background: #f9f9f9; padding: 30px; border-radius: 10px; border: 1px solid #eee;">
                    <h2 class="section-title" style="text-align: center;">{{ $t('transparency.title') }}</h2>
                    <p style="text-align: center; margin-bottom: 30px; color: #666;">Acompanhe nossa meta mensal para manutenção das obras sociais e evangelização.</p>
                    
                    <div class="chart-container" style="position: relative; height: 300px; width: 100%; max-width: 800px; margin: 0 auto;">
                        <canvas id="goalChart"></canvas>
                    </div>
                    
                    <div style="display: flex; justify-content: center; gap: 40px; margin-top: 30px; flex-wrap: wrap;">
                        <div style="text-align: center;">
                            <h3 style="color: var(--secondary-color); font-size: 2rem;">{{ summary.total }}</h3>
                            <p style="color: #777;">Arrecadado este Mês</p>
                        </div>
                        <div style="text-align: center;">
                            <h3 style="color: #bbb; font-size: 2rem;">{{ summary.goal }}</h3>
                            <p style="color: #777;">Meta Mensal</p>
                        </div>
                    </div>
                </div>

                <div class="row" style="display: flex; flex-wrap: wrap; gap: 40px; align-items: center;">
                    <div style="flex: 1; min-width: 300px;">
                        <h2 class="section-title">{{ $t('together.whyTitle') }}</h2>
                        <p style="font-size: 1.1rem; margin-bottom: 20px; color: #555;">{{ $t('together.whyText1') }}</p>
                        <p style="font-size: 1.1rem; margin-bottom: 20px; color: #555;">{{ $t('together.whyText2') }}</p>
                        <blockquote style="border-left: 4px solid var(--primary-color); padding-left: 20px; font-style: italic; color: var(--secondary-color); margin: 30px 0;">
                             {{ $t('together.quote') }}
                        </blockquote>
                    </div>
                    <div style="flex: 1; min-width: 300px;">
                        <div class="donation-card" style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center;">
                            <h3 style="margin-bottom: 20px; color: var(--secondary-color);">{{ $t('together.cardTitle') }}</h3>
                            <div style="margin-bottom: 20px;">
                                <button @click="openModal('monthly')" style="background: var(--primary-color); color: white; border: none; padding: 15px 30px; font-size: 1.2rem; border-radius: 50px; cursor: pointer; width: 100%; font-weight: bold; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                                    {{ $t('together.btnMonthly') }}
                                </button>
                            </div>
                            <button @click="openModal('once')" style="background: transparent; border: 2px solid var(--primary-color); color: var(--primary-color); padding: 10px 25px; font-size: 1rem; border-radius: 50px; cursor: pointer; width: 100%; font-weight: bold;">
                                {{ $t('together.btnOnce') }}
                            </button>
                            <p style="margin-top: 20px; font-size: 0.9rem; color: #777;">{{ $t('together.pix') }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="showModal" style="position: fixed; top:0; left:0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); display: flex; justify-content: center; align-items: center; z-index: 3000;">
                <div style="background: white; padding: 30px; border-radius: 8px; width: 90%; max-width: 500px; position: relative;">
                    <button @click="showModal = false" style="position: absolute; top: 10px; right: 10px; border: none; background: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
                    <h2 style="color: var(--secondary-color); margin-bottom: 20px;">
                        {{ modalType === 'monthly' ? 'Cadastro Mensal' : 'Doação Única' }}
                    </h2>
                    <div v-if="modalType === 'monthly'">
                        <p style="margin-bottom: 15px;">Preencha seus dados para recebermos sua ajuda mensalmente.</p>
                        <form @submit.prevent="submitForm">
                            <input type="text" placeholder="Nome Completo" required style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 4px;">
                            <input type="email" placeholder="E-mail" required style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 4px;">
                            <input type="tel" placeholder="Telefone / WhatsApp" required style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 4px;">
                            <select style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 4px;">
                                <option>R$ 30,00 / mês</option>
                                <option>R$ 50,00 / mês</option>
                                <option>R$ 100,00 / mês</option>
                                <option>Outro valor</option>
                            </select>
                            <button type="submit" style="width: 100%; background: var(--primary-color); color: white; border: none; padding: 12px; border-radius: 4px; font-weight: bold; cursor: pointer;">Finalizar Cadastro</button>
                        </form>
                    </div>
                    <div v-else>
                         <p style="margin-bottom: 15px;">Escolha a forma de pagamento:</p>
                        <div style="display: grid; gap: 10px;">
                            <button style="padding: 15px; border: 1px solid #ddd; border-radius: 4px; background: white; cursor: pointer; display: flex; align-items: center; gap: 10px;"><span style="font-size: 1.5rem;">💠</span> PIX (Copia e Cola)</button>
                            <button style="padding: 15px; border: 1px solid #ddd; border-radius: 4px; background: white; cursor: pointer; display: flex; align-items: center; gap: 10px;"><span style="font-size: 1.5rem;">📄</span> Boleto Bancário</button>
                            <button style="padding: 15px; border: 1px solid #ddd; border-radius: 4px; background: white; cursor: pointer; display: flex; align-items: center; gap: 10px;"><span style="font-size: 1.5rem;">💳</span> Cartão de Crédito</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            showModal: false,
            modalType: 'monthly',
            summary: { total: 'R$ 22.000,00', goal: 'R$ 35.000,00' } // Mock data
        }
    },
    mounted() {
        this.renderChart();
    },
    methods: {
        openModal(type) {
            this.modalType = type;
            this.showModal = true;
        },
        submitForm() {
            alert("Cadastro realizado! Entraremos em contato.");
            this.showModal = false;
        },
        renderChart() {
            const ctx = document.getElementById('goalChart').getContext('2d');
            // Parse currency to number for chart
            const current = 22000;
            const goal = 35000;
            const missing = goal - current;

            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Arrecadado', 'Falta para a Meta'],
                    datasets: [{
                        data: [current, missing],
                        backgroundColor: ['#003366', '#e0e0e0'], // Primary brand color vs Gray
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom' },
                        title: { display: true, text: 'Progresso da Meta Mensal' }
                    }
                }
            });
        }
    }
}
