import { db, collection, getDocs } from '../firebase-config.js';

export default {
    template: `
        <div class="transparency-view">
            <h1>{{ $t('transparency.title') }}</h1>
            <div class="chart-container">
                <canvas id="donationChart"></canvas>
            </div>
            <div class="stats-summary" v-if="summary">
                <div class="stat-box">
                    <h3>Total Arrecadado</h3>
                    <p>{{ summary.total }}</p>
                </div>
                <div class="stat-box">
                    <h3>Meta do Mês</h3>
                    <p>{{ summary.goal }}</p>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            chartData: null,
            summary: { total: 'R$ 0,00', goal: 'R$ 0,00' }
        }
    },
    async mounted() {
        await this.loadData();
    },
    methods: {
        async loadData() {
            let labels = [];
            let data = [];
            try {
                const querySnapshot = await getDocs(collection(db, "donations"));
                // Assuming documents have 'month' and 'amount' fields
                // Simulating a proper structure or fetching a single 'summary' doc could be better, 
                // but let's assume we fetch a list of monthly records.

                if (!querySnapshot.empty) {
                    const docs = querySnapshot.docs.map(doc => doc.data());
                    // Sort by some index or assume order
                    labels = docs.map(d => d.month);
                    data = docs.map(d => d.amount);

                    // Simple summary calculation logic or fetched directly
                    this.summary.total = "R$ " + data.reduce((a, b) => a + b, 0).toLocaleString('pt-BR');
                    this.summary.goal = "R$ 50.000,00"; // Fixed for now or fetch from DB
                } else {
                    throw new Error("No data");
                }
            } catch (e) {
                console.warn("Using mock chart data:", e);
                labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
                data = [12000, 19000, 3000, 5000, 2000, 3000];
                this.summary.total = "R$ 44.000,00";
                this.summary.goal = "R$ 50.000,00";
            }

            this.renderChart(labels, data);
        },
        renderChart(labels, data) {
            const ctx = document.getElementById('donationChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: this.$t('transparency.chartTitle'),
                        data: data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }
}
