import style from './style'
import { SuccessAnimation } from 'components/icons'

export default function Success () {
  return (
        <div className="success-register">

            <SuccessAnimation />

            <h1>¡Felicitaciones!</h1>
            <p>
                Solo una cosita más 😊, te hemos enviado un correo de verificación, solo debes darle click al link.
            </p>

            <style jsx>{style}</style>
        </div>
  )
}
