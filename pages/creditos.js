import style from 'styles/style-garantias'
import Footer from 'components/commons/footer'

export default function Creditos({site = 'koi Makeup', siteName = 'Koi Makeup'}){
    return(
        <>
            <div className="container">
                En { siteName } hemos usados recursos fotográficos de <a href="https://www.freepik.es/" rel="noreferrer" target="_blank">Freepik</a>
                <ul>
                    <li><a href="https://www.freepik.es/foto-gratis/winsome-hermosa-joven-posando-pared-marron-toma-primer-plano-maravillosa-chica-morena_12607865.htm#page=4&position=33&from_view=author" rel="noreferrer" target="_blank">Imagen de lookstudio</a> en Freepik</li>
                    <li><a href="https://www.freepik.es/foto-gratis/hermosas-mujeres-felices-aplican-pintalabios-someten-procedimientos-belleza-paran-al-lado-otra-vestidas-camisetas-negras-aisladas-sobre-fondo-rosa-dos-amigas-preparan-fiesta-quieren-verse-bien_26956604.htm#page=4&query=maquillaje&position=41&from_view=search&track=aitestb" rel="noreferrer" target="_blank">Imagen de wayhomestudio</a> en Freepik</li>
                    <li><a href="https://www.freepik.es/foto-gratis/mujer-asiatica-complacida-pelo-rosado-aplica-mascara-cosmetica-ojos-tener-piel-sana-fresca-que-mantiene-ojos-cerrados-usa-venda-ojos-camiseta-informal-aislada-sobre-fondo-rosa-concepto-belleza_27399973.htm#query=mascarilla&position=39&from_view=author" rel="noreferrer" target="_blank">Imagen de wayhomestudio</a> en Freepik</li>
                    <li><a href="https://www.freepik.es/foto-gratis/mujer-piel-muy-oscura-cabello-rizado-aplica-parches-colageno-debajo-ojos-eliminar-ojeras_17680495.htm?query=almohadillas" rel="noreferrer" target="_blank">Imagen de wayhomestudio</a> en Freepik</li>
                    <li><a href="https://www.freepik.es/foto-gratis/filmacion-interiores-seria-modelo-femenino-pelo-rosa-vestida-top-chaqueta-mezclilla-gran-tamano-mira-directamente-lleva-minimo-maquillaje_13663026.htm#query=peluca%20cabello%20rosa&position=17&from_view=author" rel="noreferrer" target="_blank">Imagen de wayhomestudio</a> en Freepik</li>
                </ul>
            </div>
            <style jsx>{ style }</style>
            <Footer />
        </>
    )
}

export async function getStaticProps() {
    return {
        props: {
            site: process.env.URL,
            siteName : process.env.SITE_NAME
        }, 
    }
}