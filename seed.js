// Seed script using Firebase Compat (v8) syntax found in global window.db

const seedData = {
    activities: [
        { day: '15', month: 'FEV', title: 'Encontro Jovem', description: 'Reunião mensal da juventude para partilha e oração.', location: 'Paróquia Central' },
        { day: '22', month: 'FEV', title: 'Ação Social', description: 'Distribuição de alimentos para famílias carentes.', location: 'Comunidade São José' },
        { day: '01', month: 'MAR', title: 'Retiro Espiritual', description: 'Um dia inteiro de silêncio e reflexão.', location: 'Casa de Retiros' }
    ],
    missions: [
        { lat: -23.5505, lng: -46.6333, name: "Missão São Paulo" },
        { lat: -22.9068, lng: -43.1729, name: "Missão Rio de Janeiro" },
        { lat: -3.7172, lng: -38.5434, name: "Missão Fortaleza" }
    ],
    pastorals: [
        { name: 'Vocacional', description: 'Acompanhamento e discernimento vocacional para jovens que buscam seu caminho.', image: 'https://placehold.co/600x400/003366/FFF?text=Vocacional' },
        { name: 'Difusão', description: 'Espalhando a mensagem e a devoção salesiana através da mídia e evangelização.', image: 'https://placehold.co/600x400/FFCC00/333?text=Difusão' },
        { name: 'Liturgia', description: 'Preparação e celebração dos mistérios da fé com zelo e amor.', image: 'https://placehold.co/600x400/cc0000/FFF?text=Liturgia' },
        { name: 'Social', description: 'Obras de caridade e assistência aos mais necessitados da nossa comunidade.', image: 'https://placehold.co/600x400/006633/FFF?text=Social' }
    ],
    spirituality: [
        { type: 'salesian', title: 'Oração a Dom Bosco', content: 'Ó Pai e Mestre da Juventude, São João Bosco, que tanto trabalhaste pela salvação das almas, sê nosso guia...' },
        { type: 'marian', title: 'Ave Maria', content: 'Ave Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres...' },
        { type: 'marian', title: 'Auxiliadora dos Cristãos', content: 'Ó Maria, Virgem Poderosa, Tu, grande e ilustre defensora da Igreja...' }
    ],
    donations: [
        { month: 'Jan', amount: 12000 },
        { month: 'Fev', amount: 15000 },
        { month: 'Mar', amount: 8000 },
        { month: 'Abr', amount: 10000 },
        { month: 'Mai', amount: 9500 },
        { month: 'Jun', amount: 11000 }
    ]
};

async function clearCollection(collName) {
    const querySnapshot = await window.db.collection(collName).get();
    const batch = window.db.batch();

    querySnapshot.forEach(doc => {
        batch.delete(doc.ref);
    });

    await batch.commit();
    console.log(`Cleared collection: ${collName}`);
}

async function seedDatabase() {
    if (!confirm("Isso apagará dados existentes e recriará a base inicial. Continuar?")) return;

    console.log("Starting seed process...");

    try {
        // Clear existing data
        await clearCollection('activities');
        await clearCollection('missions');
        await clearCollection('pastorals');
        await clearCollection('spirituality');
        await clearCollection('donations');

        // Add Activities
        for (const item of seedData.activities) {
            await window.db.collection('activities').add(item);
        }
        console.log("Activities added.");

        // Add Missions
        for (const item of seedData.missions) {
            await window.db.collection('missions').add(item);
        }
        console.log("Missions added.");

        // Add Pastorals
        for (const item of seedData.pastorals) {
            await window.db.collection('pastorals').add(item);
        }
        console.log("Pastorals added.");

        // Add Spirituality
        for (const item of seedData.spirituality) {
            await window.db.collection('spirituality').add(item);
        }
        console.log("Spirituality added.");

        // Add Donations
        for (const item of seedData.donations) {
            await window.db.collection('donations').add(item);
        }
        console.log("Donations added.");

        alert("Banco de dados populado com sucesso!");
        window.location.reload();

    } catch (e) {
        console.error("Error seeding database:", e);
        alert("Erro ao popular banco de dados. Veja o console.");
    }
}

// Expose to window
window.seedData = seedDatabase;
console.log("seed.js loaded. Type seedData() in console to run.");
