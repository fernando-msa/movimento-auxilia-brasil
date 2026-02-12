export default {
    template: `
        <div class="container" style="padding: 40px 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                <h1 style="color: var(--secondary-color);">{{ $t('admin.title') }}</h1>
                <button @click="logout" style="background: #dc3545; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer;">{{ $t('admin.logout') }}</button>
            </div>

            <div class="tabs">
                <button :class="{ active: currentTab === 'activities' }" @click="currentTab = 'activities'" class="tab-btn">{{ $t('admin.tabs.activities') }}</button>
                <button :class="{ active: currentTab === 'missions' }" @click="currentTab = 'missions'" class="tab-btn">{{ $t('admin.tabs.missions') }}</button>
                <button :class="{ active: currentTab === 'profile' }" @click="currentTab = 'profile'" class="tab-btn">{{ $t('admin.tabs.profile') }}</button>
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
            
            <!-- Profile Tab -->
            <div v-if="currentTab === 'profile'" style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); max-width: 600px; margin: 0 auto;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <img :src="profile.photoURL || 'https://placehold.co/150'" style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover; border: 4px solid var(--primary-color);">
                </div>
                
                <form @submit.prevent="saveProfile">
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px; font-weight: bold;">Nome de Exibição</label>
                        <input v-model="profile.displayName" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;" placeholder="Seu Nome">
                    </div>
                    
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px; font-weight: bold;">Foto de Perfil</label>
                        <div style="display: flex; gap: 10px; align-items: center;">
                            <input type="file" @change="uploadPhoto" accept="image/*" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                            <span v-if="uploading" style="color: var(--primary-color);">Enviando...</span>
                        </div>
                        <p style="font-size: 0.8rem; color: #666; margin-top: 5px;">Selecione da Galeria, Google Drive ou tire uma foto.</p>
                    </div>

                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px; font-weight: bold;">{{ $t('admin.profile.role') }}</label>
                        <input v-model="profile.role" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;" placeholder="Ex: Coordenador">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px; font-weight: bold;">{{ $t('admin.profile.time') }}</label>
                        <input v-model="profile.joinDate" type="date" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                    </div>
                    <button type="submit" :disabled="uploading" style="width: 100%; background: var(--primary-color); color: white; border: none; padding: 12px; border-radius: 4px; font-weight: bold; cursor: pointer; opacity: uploading ? 0.7 : 1;">
                        {{ uploading ? 'Aguarde...' : $t('admin.profile.save') }}
                    </button>
                </form>
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
            uploading: false,
            showAddModal: false,
            newItem: { title: '', description: '', image: '', category: 'Notícia' },
            profile: { photoURL: '', role: '', joinDate: '' }
        }
    },
    mounted() {
        this.loadItems();
    },
    watch: {
        currentTab(val) {
            if (val === 'profile') this.loadProfile();
            else this.loadItems();
        }
    },
    methods: {
        async loadItems() {
            if (this.currentTab === 'profile') return;
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
        async loadProfile() {
            const user = window.auth.currentUser;
            if (!user) return;

            try {
                const doc = await window.db.collection('users').doc(user.uid).get();
                if (doc.exists) {
                    this.profile = doc.data();
                } else {
                    this.profile = {
                        displayName: user.displayName || '',
                        photoURL: user.photoURL || '',
                        role: '',
                        joinDate: ''
                    };
                }
            } catch (e) {
                console.error("Erro ao carregar perfil", e);
            }
        },
        async uploadPhoto(event) {
            const file = event.target.files[0];
            if (!file) return;

            this.uploading = true;
            const user = window.auth.currentUser;

            try {
                // Create Reference
                const storageRef = window.storage.ref();
                const fileRef = storageRef.child(`users/${user.uid}/profile_${Date.now()}.jpg`);

                // Upload
                await fileRef.put(file);

                // Get URL
                const url = await fileRef.getDownloadURL();
                this.profile.photoURL = url;
                alert("Foto enviada com sucesso! Clique em Salvar para confirmar.");
            } catch (e) {
                alert("Erro no upload: " + e.message);
                console.error(e);
            } finally {
                this.uploading = false;
            }
        },
        async saveProfile() {
            const user = window.auth.currentUser;
            if (!user) return;

            try {
                await window.db.collection('users').doc(user.uid).set(this.profile, { merge: true });
                // Update Auth profile
                const updates = {};
                if (this.profile.photoURL) updates.photoURL = this.profile.photoURL;
                if (this.profile.displayName) updates.displayName = this.profile.displayName;

                if (Object.keys(updates).length > 0) {
                    await user.updateProfile(updates);
                }
                alert("Perfil salvo com sucesso!");
            } catch (e) {
                alert("Erro ao salvar: " + e.message);
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
