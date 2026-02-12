
export default {
    props: ['type'],
    template: `
        <div class="container" style="padding: 60px 20px; max-width: 800px;">
            <div style="background: var(--card-bg); padding: 40px; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
                <h1 style="color: var(--primary-color); margin-bottom: 30px;">
                    {{ type === 'privacy' ? 'Política de Privacidade' : 'Termos de Uso' }}
                </h1>
                
                <div v-if="type === 'privacy'">
                    <p><strong>Última atualização: Fevereiro de 2026</strong></p>
                    <p>O Movimento Auxilia Brasil valoriza sua privacidade. Esta política descreve como coletamos e usamos seus dados.</p>
                    
                    <h3>1. Coleta de Dados</h3>
                    <p>Coletamos informações fornecidas voluntariamente, como nome e e-mail ao preencher formulários de oração ou doação. Utilizamos o Google Analytics para entender o tráfego do site de forma anônima.</p>
                    
                    <h3>2. Uso das Informações</h3>
                    <p>Seus dados são usados exclusivamente para:</p>
                    <ul>
                        <li>Processar seus pedidos de oração.</li>
                        <li>Gerenciar doações via contato direto.</li>
                        <li>Melhorar a experiência no site.</li>
                    </ul>
                    
                    <h3>3. Cookies</h3>
                    <p>Utilizamos cookies essenciais para funcionamento do site. Você pode desativá-los nas configurações do navegador.</p>
                </div>
                
                <div v-else>
                    <p><strong>Última atualização: Fevereiro de 2026</strong></p>
                    
                    <h3>1. Aceite dos Termos</h3>
                    <p>Ao acessar este site, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis.</p>
                    
                    <h3>2. Uso do Conteúdo</h3>
                    <p>Todo o conteúdo deste site (textos, imagens, logotipos) é propriedade do Movimento Auxilia Brasil ou de seus parceiros e está protegido por leis de direitos autorais.</p>
                    
                    <h3>3. Conduta</h3>
                    <p>É proibido usar o site para qualquer finalidade ilegal ou não autorizada. O respeito e a caridade cristã devem guiar todas as interações.</p>
                </div>
                
                <div style="margin-top: 40px;">
                    <router-link to="/" style="color: var(--primary-color); text-decoration: none;">&larr; Voltar para o Início</router-link>
                </div>
            </div>
        </div>
    `
}
