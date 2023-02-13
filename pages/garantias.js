import Footer from 'components/commons/footer'
import style from 'styles/style-garantias'

export default function Garantias () {
  return (
        <>
            <div className='container'>
                <h1>CAMBIOS, GARANTÍAS Y DEVOLUCIONES</h1>
                <h2>Cambios</h2>
                <ul>
                    <li>Para hacer un cambio puedes  llamarnos al 3153828317 o escribirnos al WhatsApp +57 3153828317 de Lunes a Sábado de 9am a 6pm</li>

                    <li>El cambio o devolución no aplica si usaste producto</li>

                    <li>Los productos deben tener las etiquetas pegadas</li>

                    <li>Tienes 60 días calendario desde que te llega el producto para hacer el cambio</li>
                </ul>

                <h2>¿Cómo hacer un cambio?</h2>
                <ol>
                    <li>Una vez te comuniques con nosotros, reservamos el producto que quieres.</li>

                    <li>Cuando llegue el producto verificaremos que todo este bien y te enviamos el ítem nuevo. El envío hasta tu casa lo asumes tú</li>

                    <li>Si debes pagar algún excedente o quedas con algún saldo a favor te enviaremos toda la información a tu correo</li>

                    <li>Si el producto que nos enviaste no cumple con estas condiciones nos podemos reservar la posibilidad de no realizar el cambio</li>
                </ol>

                <h2>Garantías</h2>
                <ul>
                    <li>Para hacer una garantía puedes llamarnos al 3153828317 o escribirnos al +57 3153828317 de Lunes a Sábado de 9am a 6pm</li>

                    <li>Una vez aprobada la garantía te haremos el cambio por otro producto o te devolveremos el dinero</li>

                    <li>Si debes pagar algún excedente o quedas con algún saldo a favor te enviaremos toda la información a tu correo</li>

                    <li>Si el producto que nos enviaste no cumple con estas condiciones nos podemos reservar la posibilidad de no realizar el cambio</li>
                </ul>
                Importante: Nuestra garantía es de 90 días después de la compra. La vida útil del producto depende de su cuidado y condiciones de uso, por eso la garantía no aplica en productos dañados por uso, desgaste normal o modificaciones

                <h3>Novedad al recibir el pedido</h3>

                En caso de presentarse alguna de las siguientes novedades al momento de recibir tu pedido, tienes un plazo de 7 dias habiles (a partir de la entrega) para informarnos:
                <ul>
                    <li>Unidades faltantes ó sobrantes</li>

                    <li>Pedido incorrecto</li>
                </ul>

                <h2>Devoluciones</h2>
                <ol>
                    <li>Para hacer una devolución puedes llamarnos al 3153828317 o escribirnos al +57 3153828317 de Lunes a Sábado de 9am a 6pm; </li>

                    <li>Tienes 5 días para solicitar devolución una vez recibes tu producto.</li>

                    <li>Tú debes asumir los gastos de envío, Koi Makeup no se hará cargo del pago de fletes</li>

                    <li>La devolución de dinero pueden tomar hasta 30 días calendario</li>

                    <li>Si no recibimos tu producto en los 20 días siguientes a tu solicitud asumiremos que te retractaste de la devolución y finalizaremos el proceso</li>

                    <li>La devolución de dinero se hará a una cuenta débito (no se hacen devoluciones de dinero a través de Efecty ni Baloto).</li>
                </ol>

                <h2>Cambios</h2>

                <p>
                    Se reconocerá el mismo valor pagado solo cuando el cambio sea por el mismo Item o Referencia (sujeto a disponibilidad), de lo contrario se hará la devolución del dinero.
                    El tiempo para solicitar un cambio es de 60 a partir de la fecha de recepción del pedido.
                </p>

                <h2>Garantías</h2>

                <p>
                    Si la persona tiene una garantía, puede hacer el cambio por el mismo Item (sujeto a disponibilidad) y solo en este caso se le respetará el valor pagado, de lo contrario se hará la devolución del dinero.
                    El tiempo para reportar una garantía es de 90 días a partir de la fecha de recepción del pedido.
                </p>

            <h2>Devoluciones</h2>

            <p>
                El valor a devolver será el valor pagado por la persona.
                El tiempo para solicitar una devolución es de 5 días a partir de la recepción del pedido.
            </p>

                <style jsx>{ style }</style>
            </div>
            <Footer />
        </>
  )
}

export async function getStaticProps () {
  return {
    props: {}
  }
}
