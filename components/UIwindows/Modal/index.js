import { useUI } from 'components/UIcontext'
import style from './style'

import { CloseIcon } from 'components/icons'

export const Modal = ({ children }) => {
  const { closeModal } = useUI()

  const closeM = () => {
    document.getElementsByTagName('html')[0].style.overflow = 'auto'
    closeModal()
  }

  return (
        <div className="modal-container">
            <div className="modal">
                <button className="close-icon" onClick={closeM}>
                    <CloseIcon width="32" height="32"/>
                </button>
                { children }
            </div>

            <style jsx>{style}</style>
        </div>
  )
}
