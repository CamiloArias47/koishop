import { traslates } from "components/traslate/traslates"

export const ErrorInline = ({code = 'none' , defaultText = 'Lo sentimos 🙏 intentalo más tarde'} ) =>{
    return(
            <div className="alert-message">{ 
                traslates[code] !== undefined 
                    ? traslates[code]
                    : defaultText
                }
            </div>
    )
}