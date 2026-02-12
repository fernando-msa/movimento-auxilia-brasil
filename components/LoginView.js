export default {
    template: `
        <div class="container" style="padding: 60px 20px; max-width: 500px;">
            <div style="background: white; padding: 40px; border-radius: 8px; box-shadow: 0 5px 20px rgba(0,0,0,0.1);">
                <h2 style="text-align: center; color: var(--secondary-color); margin-bottom: 30px;">Área do Membro</h2>
                
                <form @submit.prevent="login">
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 5px; font-weight: bold;">E-mail</label>
                        <input type="email" v-model="email" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 5px; font-weight: bold;">Senha</label>
                        <input type="password" v-model="password" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                    </div>

                    <div v-if="error" style="color: red; margin-bottom: 20px; font-size: 0.9rem;">{{ error }}</div>

                    <button type="submit" style="width: 100%; background: var(--primary-color); color: white; padding: 12px; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">
                        {{ loading ? 'Entrando...' : 'Entrar' }}
                    </button>
                </form>

                <p style="text-align: center; margin-top: 20px; font-size: 0.9rem; color: #777;">
                    Apenas para membros autorizados.
                </p>
            </div>
        </div>
    `,
    data() {
        return {
            email: '',
            password: '',
            loading: false,
            error: null
        }
    },
    methods: {
        async login() {
            this.loading = true;
            this.error = null;
            try {
                await window.auth.signInWithEmailAndPassword(this.email, this.password);
                this.$router.push('/admin');
            } catch (e) {
                console.error(e);
                this.error = "Erro ao entrar. Verifique suas credenciais.";
            } finally {
                this.loading = false;
            }
        }
    }
}
