export default {
    template: `
        <div class="spirituality-view">
            <div class="hero" style="background: url('https://placehold.co/1920x600/003366/FFF?text=Espiritualidade+Salesiana') no-repeat center/cover; height: 300px; display: flex; align-items: center; justify-content: center; color: white;">
                <h1 style="font-size: 3rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">{{ $t('spirituality.title') }}</h1>
            </div>
            
            <div class="container" style="padding: 40px 20px;">
                <div class="tabs">
                    <button :class="{ active: currentTab === 'salesian' }" @click="currentTab = 'salesian'">{{ $t('spirituality.salesian') }}</button>
                    <button :class="{ active: currentTab === 'marian' }" @click="currentTab = 'marian'">{{ $t('spirituality.marian') }}</button>
                    <button :class="{ active: currentTab === 'vatican' }" @click="currentTab = 'vatican'">Acervo Vaticano</button>
                </div>

                <div class="tab-content" style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                    <!-- Salesianas -->
                    <div v-if="currentTab === 'salesian'">
                        <h3>Orações Salesianas</h3>
                        <div class="prayer-item" v-for="prayer in salesianPrayers" :key="prayer.title">
                            <h4 style="color: var(--primary-color); margin-top: 20px;">{{ prayer.title }}</h4>
                            <p style="white-space: pre-wrap; color: #555; background: #f9f9f9; padding: 15px; border-left: 3px solid var(--primary-color);">{{ prayer.content }}</p>
                        </div>
                    </div>

                    <!-- Marianas -->
                    <div v-if="currentTab === 'marian'">
                        <h3>Orações Marianas</h3>
                        <div class="prayer-item" v-for="prayer in marianPrayers" :key="prayer.title">
                            <h4 style="color: #64b5f6; margin-top: 20px;">{{ prayer.title }}</h4>
                            <p style="white-space: pre-wrap; color: #555; background: #e3f2fd; padding: 15px; border-left: 3px solid #64b5f6;">{{ prayer.content }}</p>
                        </div>
                    </div>
                    
                    <!-- Vaticano Archive -->
                    <div v-if="currentTab === 'vatican'">
                        <h3>Acervo Vaticano</h3>
                        <p style="margin-bottom: 20px;">Seleção de orações oficiais da Igreja (Fonte: Vatican News).</p>
                        
                        <div class="prayer-item" v-for="prayer in vaticanPrayers" :key="prayer.title">
                            <h4 style="color: #d4ac0d; margin-top: 20px;">{{ prayer.title }}</h4>
                            <p style="white-space: pre-wrap; color: #555; background: #fcf3cf; padding: 15px; border-left: 3px solid #d4ac0d;">{{ prayer.content }}</p>
                        </div>
                        
                        <div style="margin-top: 30px; text-align: center;">
                            <a href="https://www.vaticannews.va/pt/oracoes.html" target="_blank" style="display: inline-block; padding: 10px 20px; background: #d4ac0d; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">
                                Ver Acervo Completo no Vatican News &rarr;
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            currentTab: 'salesian',
            salesianPrayers: [
                { title: 'Oração a Dom Bosco', content: 'Ó Pai e Mestre da Juventude, São João Bosco, que tanto trabalhastes pela salvação das almas, sede nosso guia em buscar o bem de nossas almas e a salvação do próximo. Ajudai-nos a vencer as paixões e o respeito humano, a fim de que, apaixonados por Jesus Sacramentado e devotos de Maria Auxiliadora, possamos ser na terra felizes e convosco no céu eternamente. Amém.' }
            ],
            marianPrayers: [
                { title: 'Salve Rainha', content: 'Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós bradamos, os degredados filhos de Eva. A vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei, e depois deste desterro mostrai-nos Jesus, bendito fruto do vosso ventre, ó clemente, ó piedosa, ó doce sempre Virgem Maria.' }
            ],
            vaticanPrayers: [
                { title: 'Angelus', content: 'V. O Anjo do Senhor anunciou a Maria.\nR. E ela concebeu do Espírito Santo.\n\nAve Maria...\n\nV. Eis aqui a serva do Senhor.\nR. Faça-se em mim segundo a vossa palavra.\n\nAve Maria...\n\nV. E o Verbo se fez carne.\nR. E habitou entre nós.\n\nAve Maria...\n\nV. Rogai por nós, Santa Mãe de Deus.\nR. Para que sejamos dignos das promessas de Cristo.' },
                { title: 'Regina Caeli (Tempo Pascal)', content: 'Rainha do Céu, alegrai-vos, aleluia.\nPorque Aquele que merecestes trazer em vosso seio, aleluia.\nRessuscitou como disse, aleluia.\nRogai a Deus por nós, aleluia.\n\nV. Alegrai-vos e exultai, ó Virgem Maria, aleluia.\nR. Porque o Senhor ressuscitou verdadeiramente, aleluia.' }
            ]
        }
    }
}
