import style from './style'

export const Toast = ({title = '', msg = ''}) => {
    return(
        <div className="toast-container">
            <div className="toast">
                <h3>{title}</h3>
                <p>{msg}</p>
            </div>
            <style jsx>{style}</style>
        </div>
    )
}