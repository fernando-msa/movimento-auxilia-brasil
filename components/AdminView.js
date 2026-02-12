export default {
    template: `
        <div class="container" style="padding: 40px 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                <h1 style="color: var(--secondary-color);">Painel Administrativo</h1>
                <button @click="logout" style="background: #dc3545; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer;">Sair</button>
            </div>

            <div class="tabs">
                <button :class="{ active: currentTab === 'activities' }" @click="currentTab = 'activities'" class="tab-btn">Notícias/Eventos</button>
                <button :class="{ active: currentTab === 'missions' }" @click="currentTab = 'missions'" class="tab-btn">Missões</button>
            </div>

            <!-- Activities CRUD -->
            <div v-if="currentTab === 'activities'">
                <div style="margin-bottom: 20px; text-align: right;">
                    <button @click="showAddModal = true" style="background: var(--primary-color); color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">+ Nova Postagem</button>
                </div>

                <div v-if="loading" class="loading">Carregando...</div>
                
                <table v-else style="width: 100%; border-collapse: collapse; background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                    <thead>
                        <tr style="background: var(--light-bg); border-bottom: 2px solid #ddd;">
                            <th style="padding: 15px; text-align: left;">Título</th>
                            <th style="padding: 15px; text-align: left;">Categoria</th>
                            <th style="padding: 15px; text-align: right;">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in items" :key="item.id" style="border-bottom: 1px solid #eee;">
                            <td style="padding: 15px;">{{ item.title }}</td>
                            <td style="padding: 15px;">{{ item.category || 'Geral' }}</td>
                            <td style="padding: 15px; text-align: right;">
                                <button @click="deleteItem(item.id)" style="color: red; background: none; border: none; cursor: pointer;">Excluir</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <!-- Simple Add Modal -->
            <div v-if="showAddModal" style="position: fixed; top:0; left:0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 2000;">
                <div style="background: white; padding: 30px; border-radius: 8px; width: 90%; max-width: 500px;">
                    <h3>Nova Postagem</h3>
                    <form @submit.prevent="addItem">
                        <input v-model="newItem.title" placeholder="Título" required style="width: 100%; margin-bottom: 10px; padding: 8px;">
                        <textarea v-model="newItem.description" placeholder="Descrição" required style="width: 100%; margin-bottom: 10px; padding: 8px; height: 100px;"></textarea>
                        <input v-model="newItem.image" placeholder="URL da Imagem" style="width: 100%; margin-bottom: 10px; padding: 8px;">
                        <select v-model="newItem.category" style="width: 100%; margin-bottom: 10px; padding: 8px;">
                            <option>Notícia</option>
                            <option>Evento</option>
                            <option>Formação</option>
                        </select>
                        <div style="display: flex; gap: 10px; justify-content: flex-end;">
                            <button type="button" @click="showAddModal = false" style="background: #ccc; border: none; padding: 8px 15px; cursor: pointer;">Cancelar</button>
                            <button type="submit" style="background: var(--primary-color); color: white; border: none; padding: 8px 15px; cursor: pointer;">Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            currentTab: 'activities',
            items: [],
            loading: true,
            showAddModal: false,
            newItem: { title: '', description: '', image: '', category: 'Notícia' }
        }
    },
    mounted() {
        this.loadItems();
    },
    watch: {
        currentTab() { this.loadItems(); }
    },
    methods: {
        async loadItems() {
            this.loading = true;
            try {
                const snapshot = await window.db.collection(this.currentTab).get();
                this.items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            } catch (e) {
                console.error(e);
            } finally {
                this.loading = false;
            }
        },
        async addItem() {
            try {
                await window.db.collection(this.currentTab).add(this.newItem);
                this.showAddModal = false;
                this.newItem = { title: '', description: '', image: '', category: 'Notícia' };
                this.loadItems();
                alert("Adicionado com sucesso!");
            } catch (e) {
                alert("Erro ao adicionar: " + e.message);
            }
        },
        async deleteItem(id) {
            if (!confirm("Tem certeza?")) return;
            try {
                await window.db.collection(this.currentTab).doc(id).delete();
                this.loadItems();
            } catch (e) {
                alert("Erro ao excluir: " + e.message);
            }
        },
        logout() {
            window.auth.signOut().then(() => {
                this.$router.push('/login');
            });
        }
    }
}
