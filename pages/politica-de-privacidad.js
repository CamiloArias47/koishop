import style from 'styles/style-garantias'
import Footer from 'components/commons/footer'

export default function PoliticaPrivacidad({site = 'koi Makeup', siteName = 'Koi Makeup'}){
    return(
        <>
            <div className="container">
                <h1>
                    POLÍTICA DE PRIVACIDAD
                </h1>
                <h2>SEGURIDAD EN EL E-COMMERCE</h2> 
                <p>
                    Realizar pagos a través del sitio web de { siteName } es seguro porque: <br/>

                    { siteName  } cuenta con máximas medidas de seguridad. El proceso funciona sobre un servidor seguro utilizando el 
                    protocolo SSL (Secure Socket Layer). El servidor seguro establece una conexión que asegura que sólo sea inteligible 
                    para el ordenador del Cliente y el del E-Commerce. De esta forma, al utilizar el protocolo SSL se garantiza:

                    <ul>
                        <li>
                            Que el Cliente está comunicando sus datos únicamente al centro servidor de { siteName }.
                        </li>
                        <li>
                            Que entre el Cliente y el centro servidor de { siteName } los datos se transmiten cifrados, evitando su posible 
                            lectura o manipulación por terceros.
                        </li>
                    </ul> 
                </p>

                
                <p>
                    Desde { site }, { siteName } no captura, almacena ni transmite datos transaccionales, ya que cuenta con la pasarela 
                    de pago: Wompi (Tarjeta de crédito, debito a travez de PSE, Nequi, Transferencia Bancolombia); certificado en altos 
                    estándares de seguridad que incluye, entre otros, software de encriptación, procedimientos de validación y medidas 
                    robustas de protección de datos.  
                </p>

                <h2>ACCESO A CONTENIDOS DE { siteName }</h2> 

                <p>
                    Los Clientes y Usuarios son totalmente responsables de su conducta al acceder a la información del sitio web mientras naveguen 
                    en el mismo, así como después de haber accedido. Como consecuencia de lo anterior, los Clientes y Usuarios son los únicos 
                    responsables ante { sitename } y ante terceros, de las consecuencias que se puedan derivar de una utilización: 
                </p>
                
                <p>
                    Con fines o efectos ilícitos o contrarios al presente documento, de cualquier contenido del sitio web, elaborado o no por { siteName},
                    publicado o no bajo su nombre de forma oficial.
                    Contraria al contenido del presente documento y lesivade los intereses o derechos de terceros, o que de cualquier forma pueda 
                    dañar, inutilizar o deteriorar el sitio web o sus servicios o impedir el normal disfrute por otros clientes o usuarios. 
                </p>
                
                <p>
                    { siteName } se reserva el derecho a actualizar los contenidos cuando lo vea conveniente, así como a eliminar, limitar o impedir
                    el acceso a ellos, de manera temporal o definitiva, o a denegar el acceso al sitio web a Clientes o Usuarios que hagan un mal uso 
                    de los contenidos y/o incumplan cualquiera de las condiciones que aparecen en el presente documento. 
                </p>

                

                <h2>PROPIEDAD INTELECTUAL</h2>

                <p>
                 { siteName } tiene todos los derechos sobre el contenido, diseño, diagramación y código fuente de esta página Web. 
                  Estos derechos están protegidos por la legislación vigente relativa a la propiedad intelectual. 
                </p>

                <p>
                    Queda expresamente prohibida la reproducción total o parcial de este sitio web sin el permiso expreso y 
                    por escrito de { siteName }. 
                </p>
                
                <p>
                    Asimismo, queda totalmente prohibida la copia, reproducción, adaptación, modificación, distribución, 
                    comercialización, comunicación pública y/o cualquier otra acción que comporte una infracción de la normativa 
                    vigente en Colombia o en el resto del mundo en materia de propiedad intelectual y/o industrial si no 
                    es con la previa autorización expresa y por escrito de { siteName }. 
                </p>

                <p>
                    { siteName } informa que no concede licencia o autorización implícita alguna sobre los derechos de propiedad 
                    intelectual y/o industrial o sobre cualquier otro derecho o propiedad relacionado, directa o indirectamente,
                     con los contenidos incluidos en su sitio web. 
                </p>

                <h2>RESPONSABILIDAD</h2>

                <p>
                    { siteName} no asume responsabilidad derivada del acceso de menores de edad a los contenidos incluidos en el 
                    sitio web, siendo responsabilidad de los padres o tutores legales, ejercer un control adecuado sobre la 
                    actividad de los hijos o menores a su cargo o bien instalar alguna de las herramientas de control del uso de 
                    Internet, con el objeto de evitar el acceso a materiales o contenidos no aptos para menores, así como el envío 
                    de datos personales sin la previa autorización de sus padres o tutores. 
                </p>
                
                <p>
                    Asimismo, { siteName } no será responsable en ningún caso cuando se produzcan: 
                    <ul>
                        <li>
                            Errores o retrasos en el acceso al sitio web por parte del Cliente a la hora de introducir sus datos en el 
                            formulario de pedido, la lentitud o imposibilidad de recepción por parte de los Clientes de la confirmación 
                            del pedido o cualquier anomalía que pueda surgir cuando estas incidencias sean debidas a problemas en la red 
                            Internet, causas de fuerza mayor y cualquier otra contingencia imprevisible ajena a la buena fe de { siteName }.
                        </li>
                        <li>
                            Fallos o incidencias que pudieran producirse en las comunicaciones, borrado o transmisiones incompletas, 
                            de manera que no se garantiza que los servicios del sitio web estén constantemente operativos.
                        </li>
                        <li>
                            De errores o daños producidos al sitio web por un uso del servicio ineficiente y de mala fe por parte del Cliente.
                        </li>
                    </ul>
                </p>

                <h2>POLÍTICA DE TRATAMIENTO DE LA INFORMACIÓN </h2>

                <p>
                    Debido a que el sitio web { site }, y la información contenida en él, es de conocimiento público, la aceptación 
                    integral de esta política de privacidad y de datos es indispensable para la utilización del mismo. La presente política 
                    se acepta en los siguientes casos: 

                    <ul>
                        <li>
                            Cuando se suministre información para el registro en el sitio web
                        </li>
                        <li>
                            Cuando se consulta cualquier contenido o información contenido en el sitio web
                        </li>
                        <li>
                            Cuando se utiliza alguno de los servicios disponibles en el sitio web
                        </li>
                        <li>
                            Los demás casos que establezca { siteName }
                        </li>
                    </ul>
                </p>

                <p>
                    Para la principal actividad de la empresa, la cual se basa en la comercialización de cosmeticos; { siteName } requiere acceso 
                    a los datos de clientes, proveedores, empleados y demás terceros para el normal funcionamiento de sus actividades comerciales 
                    y laborales. Por ello, { siteName }., sociedad identificada con NIT 1113043109-1, domiciliada en Cali - Valle y teléfono 3153828317,
                    es responsable del manejo de datos personales y lo hará obrando con criterios de confidencialidad, seguridad y circulación 
                    restringida. 
                </p>

                <h2>ADQUISICIÓN DE LOS DATOS</h2>
                
                <p>
                    Uno de los métodos mediante el cual { siteName } recopila datos de sus clientes es a través de su página oficial { site } 
                    al momento del cliente hacer sus compras virtuales. En su página y tienda virtual, { siteName } le solicita a los clientes, 
                    por medio de un formulario, la información básica personal para poder realizar envíos, también se puede presentar que los 
                    clientes proporcionen sus datos personales de manera espontánea queriendo recibir información especial por parte de la empresa. 
                </p>
                
                <p>
                    El manejo de los datos con personas naturales o jurídicas susceptibles de una relación con { siteName }, se realiza a través 
                    de correos electrónicos corporativos u otros medios utilizados para el conocimiento de los datos pertinentes. 
                </p>

                <h2>TRATAMIENTO, SEFURIDAD Y EXCLUSIVIDAD DE DATOS</h2>

                <p>
                    { siteName } garantiza que los datos personales obtenidos son de acceso y uso exclusivo de la compañía y el tratamiento que se 
                    les da es confiable y seguro. Los datos autorizados serán utilizados únicamente por personas autorizadas por la empresa. 
                    De igual manera, { siteName } cuenta con un equipo de trabajo calificado para el manejo de la información, desde el manejo de 
                    la base de datos hasta recursos tecnológicos destinados a este fin. 
                </p>

                <h2>FINALIDAD DE LA INFORMACIÓN</h2>
                
                <p>
                    { siteName } garantiza que la finalidad del manejo de datos personales es asegurar el ejercicio normal de las relaciones 
                    comerciales y laborales; así como de sus actividades inherentes. 
                </p>
                                
                <h2>DERECHOS COMO TITULAR Y PROCEDIMIENTOS ESPECÍFICOS</h2>
                 
                <p>
                    Los derechos que asisten al cliente como titular de los datos suministrados, son: el derecho a conocer, actualizar, rectificar 
                    y suprimir su información personal, a revocar el consentimiento otorgado, solicitar prueba de la autorización, a solicitar y 
                    recibir información acerca de la finalidad del uso de sus datos, presentar quejas ante la SIC por mal uso de sus datos, y 
                    a informarse gratuitamente de los datos objeto de tratamiento.  
                </p>

                <p>
                    Conforme a lo anterior, la atención de peticiones, consultas y reclamos, está a cargo de: Camilo Arias, Gerente de 
                    eCommerce, con quien se puede comunicar enviando un correo a koimaquillaje@gmail.com, para datos relacionados con 
                    clientes. 
                </p>
                <p>
                    Los derechos de los Titulares de la Información podrán ejercerse por las siguientes personas, siempre y cuando se acredite 
                    la calidad correspondiente por medio de documentos idóneos: 
                    <ul>
                        <li>
                            Por el Titular
                        </li>
                        <li>
                            Por sus causahabientes, quienes deberán presentar el documento de identidad, registro civil de defunción 
                            del Titular, documento que acredite la calidad en que actúa y el número del documento de identidad del 
                            Titular.
                        </li>
                        <li>
                            Por el representante y/o apoderado del Titular, quien deberá presentar documento de identidad válido, documento que acredite 
                            la calidad en la que actúa (poder) y el número del documento de identidad del Titular.
                        </li>
                    </ul>
                </p>

                <h2>DATOS SENSIBLES Y DATOS DE MENORES DE EDAD</h2>

                <p>
                    { siteName } se compromete a dar el uso adecuado y seguro a los datos de niñas, niños y adolescentes menores de 18 años, 
                    respondiendo y respetando el interés superior de los niños; así como respetará y dará un manejo adecuado a los datos 
                    sensibles, siendo consciente de que ameritan un cuidado especial y sin perjuicio de ningún derecho fundamental, 
                    entendiendo que los datos sensibles son aquellos que afectan la intimidad del Titular o cuyo uso indebido puede generar su 
                    discriminación, tales como aquellos que revelen el origen racial o étnico. 
                </p>

                <p>
                    La política de tratamiento de información tiene duración indefinida en el tiempo y es publicada a los interesados 
                    a partir del día 30 de septiembre de 2013. 
                </p>

                <p>
                    El tiempo durante el cual { siteName } hace uso de los datos es por tiempo indefinido, dependiendo de las necesidades 
                    de la empresa para realizar su actividad, o hasta que las personas involucradas lo determinen. 
                </p>

                <p>
                    Cuando los datos versen sobre datos sensibles o sobre datos de niñas, niños y adolescentes podrá abstenerse de responder. 
                </p>
                
                <p>
                    Si el Cliente ya hacía parte de la base de datos de { siteName }, es necesario contar con su autorización para continuar 
                    teniendo registro y haciendo uso de sus datos. Si después de 30 días hábiles de recibir este aviso no realiza la acción 
                    correspondiente a revocar la autorización, se entiende de manera inequívoca y expresa que usted da autorización de mantener 
                    su información, lo anterior, conforme a la ley 1581 de 2012 y su decreto reglamentario 1377 de 2013. 
                </p>

                <p>
                    Si usted está de acuerdo con lo que dispone esta política y autoriza a { siteName } a hacer uso de sus datos personales, 
                    tenga presente esta información para acciones futuras. Si, por el contrario, desea que sus datos no sean utilizados por 
                    la empresa en ningún contexto, puede comunicarse con la persona anteriormente designada como responsable a través de su 
                    correo electrónico. 
                </p>
                
                <p>
                    Última Actualización Febreo 2022.
                </p>
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