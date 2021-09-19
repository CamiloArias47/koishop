import style from './style'

export default function EnvioTab(){
    return(
        <div>
            <form>
                <div className="facturacion-container">
                    <h1>Detalles de facturación</h1>
                    <div className="form-controller">
                        <label htmlFor="nombres">Nombres</label>
                        <input className="input input-primary" type="text" name="nombres" id="nombres" required/>
                    </div> 

                    <div className="form-controller">
                        <label htmlFor="apellidos">Apellidos</label>   
                        <input className="input input-primary" type="text" name="apellidos" id="apellidos" required/>
                    </div>

                    <div className="form-controller">
                        <label htmlFor="cedula">Cédula</label>   
                        <input className="input input-primary" type="number" name="cedula" id="cedula" required/>
                    </div>

                    <div className="form-controller">
                        <label htmlFor="telefono">Teléfono</label>   
                        <input className="input input-primary" type="number" name="telefono" id="telefono" required/>
                    </div>
                </div>

                <div className="envio-container">
                    <h1>Datos de envío</h1>

                    <div className="form-controller">
                        <label htmlFor="departamento">Departamento</label>   
                        <select className="input input-primary" name="departamento" id="departamento" required>
                            <option value="valle">Valle</option>
                            <option value="Antioquia">Antioquia</option>
                            <option value="Cauca">Cauca</option>
                        </select>
                    </div>

                    <div className="form-controller">
                        <label htmlFor="departamento">Ciudad / Municipio</label>   
                        <select className="input input-primary" name="departamento" id="departamento" required>
                            <option value="Cali">Cali</option>
                            <option value="Palmira">Palmira</option>
                            <option value="Jamundi">Jamundi</option>
                        </select>
                    </div>

                    <div className="form-controller">
                        <label htmlFor="direccion">Dirección</label>   
                        <input className="input input-primary" type="text" name="direccion" id="direccion" required/>
                    </div>

                    <div className="form-controller">
                        <label htmlFor="direccioncomplemento">Unidad, Apartamento, bloque...</label>   
                        <input className="input input-primary" type="text" name="direccioncomplemento" id="direccioncomplemento" required/>
                    </div>

                    <div className="form-controller">
                        <label htmlFor="barrio">Barrio</label>   
                        <input className="input input-primary" type="text" name="barrio" id="barrio" required/>
                    </div>

                    <div className="form-controller">
                        <label htmlFor="referenciaDireccion">Lugar de referencia</label>   
                        <input className="input input-primary" type="text" name="referenciaDireccion" id="referenciaDireccion" required/>
                    </div>
                </div>

            </form>
            <style jsx>{ style }</style>
        </div>
    )
}