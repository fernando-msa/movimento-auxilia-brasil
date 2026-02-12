export default {
    template: `
        <div class="together-view">
            <!-- Hero Emotional -->
            <div class="video-hero" style="position: relative; height: 60vh; background: #000; overflow: hidden; display: flex; align-items: center; justify-content: center; color: white; text-align: center;">
                <img src="https://placehold.co/1920x1080/5D4037/FFF?text=Juntos+Somos+Mais" style="position: absolute; top:0; left:0; width: 100%; height: 100%; object-fit: cover; opacity: 0.6;">
                <div style="position: relative; z-index: 2; padding: 20px;">
                    <h1 style="font-size: 3.5rem; margin-bottom: 20px; font-family: var(--font-heading);">Together</h1>
                    <p style="font-size: 1.5rem; max-width: 800px; margin: 0 auto;">"Sozinhos vamos mais rápido, mas juntos vamos mais longe."</p>
                </div>
            </div>

            <div class="container" style="padding: 60px 20px;">
                <div class="row" style="display: flex; flex-wrap: wrap; gap: 40px; align-items: center;">
                    <div style="flex: 1; min-width: 300px;">
                        <h2 class="section-title">Por que sua ajuda importa?</h2>
                        <p style="font-size: 1.1rem; margin-bottom: 20px; color: #555;">
                            O Movimento Auxilia Brasil mantém centenas de jovens longe das ruas, oferece formação humana e espiritual, e leva alimento a quem tem fome.
                        </p>
                        <p style="font-size: 1.1rem; margin-bottom: 20px; color: #555;">
                            Cada doação se transforma em um prato de comida, um livro escolar ou um retiro que muda uma vida para sempre.
                        </p>
                        <blockquote style="border-left: 4px solid var(--primary-color); padding-left: 20px; font-style: italic; color: var(--secondary-color); margin: 30px 0;">
                            "Basta que sejam jovens para que eu vos ame." - Dom Bosco
                        </blockquote>
                    </div>
                    <div style="flex: 1; min-width: 300px;">
                        <div class="donation-card" style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center;">
                            <h3 style="margin-bottom: 20px; color: var(--secondary-color);">Faça parte desta história</h3>
                            
                            <div style="margin-bottom: 20px;">
                                <button style="background: var(--primary-color); color: white; border: none; padding: 15px 30px; font-size: 1.2rem; border-radius: 50px; cursor: pointer; width: 100%; font-weight: bold; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                                    Quero Doar Mensalmente
                                </button>
                            </div>
                            
                            <button style="background: transparent; border: 2px solid var(--primary-color); color: var(--primary-color); padding: 10px 25px; font-size: 1rem; border-radius: 50px; cursor: pointer; width: 100%; font-weight: bold;">
                                Doação Única
                            </button>

                            <p style="margin-top: 20px; font-size: 0.9rem; color: #777;">Chave PIX: pix@auxiliabrasil.org</p>
                        </div>
                    </div>
                </div>
            </div>

            <div style="background: var(--light-bg); padding: 60px 20px; text-align: center;">
                <div class="container">
                    <h2 style="margin-bottom: 40px; color: var(--secondary-color);">Vidas Transformadas</h2>
                    <div class="grid-cards">
                        <div class="card" style="text-align: left;">
                            <img src="https://placehold.co/400x300/333/FFF?text=Depoimento+1" class="card-img-top">
                            <div class="card-body">
                                <p>"O movimento me resgatou quando eu não via mais sentido na vida."</p>
                                <strong style="color: var(--primary-color);">- João, 22 anos</strong>
                            </div>
                        </div>
                        <div class="card" style="text-align: left;">
                            <img src="https://placehold.co/400x300/555/FFF?text=Depoimento+2" class="card-img-top">
                            <div class="card-body">
                                <p>"Aqui encontrei uma família e descobri minha vocação de servir."</p>
                                <strong style="color: var(--primary-color);">- Maria, 19 anos</strong>
                            </div>
                        </div>
                        <div class="card" style="text-align: left;">
                            <img src="https://placehold.co/400x300/777/FFF?text=Depoimento+3" class="card-img-top">
                            <div class="card-body">
                                <p>"Ser benfeitor desta obra é a maior alegria do meu coração."</p>
                                <strong style="color: var(--primary-color);">- Sr. Antônio, Benfeitor</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}
