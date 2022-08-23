import { firestore } from "firebaseApi/admin"
import fetch from 'node-fetch'

export default async (request, response) => {

    const instagramTokenRef = firestore.collection('tokens').doc('instagram')
    const token = await instagramTokenRef.get()
    if (token.exists) {
        let {access_token} = token.data()
        console.log({access_token})
        const resToken = await fetch(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${access_token}`)
        const newToken = await resToken.json();

        console.log({newToken})
        if(newToken.access_token){
            console.log('llego nuevo token')
            await instagramTokenRef.update({
                access_token: newToken.access_token,
                token_type: newToken.token_type,
                expires_in:newToken.expires_in
            });
            return response.status(200).json({succes:'token udated'})
        }
        else{
            console.log('sin respuesta instagram')
            return response.status(500).json({err:'no new token'})
        }
    }
    else{
        console.log('No existe en firebase')
        return response.status(500).json({err:'no token find it'})
    }
}