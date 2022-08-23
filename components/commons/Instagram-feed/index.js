import { useEffect, useState } from "react"
import { getInstagramToken } from "firebaseApi/firestoreDB/instagram-token"

import Image from "next/image"

import style from './style'

export default function InstagramFeed(){

    const [instagramPosts, setInstagramPosts] = useState([])

    useEffect( () => {
        const getLastPost = async () => {
            const token = await getInstagramToken()
            if(token.access_token){
                const resPosts = await fetch(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,thumbnail_url,username,timestamp,caption&access_token=${token.access_token}`)
                const posts = await resPosts.json()

                let showPosts = posts.data.slice(0,6)
                setInstagramPosts(showPosts)
            }

        }

        getLastPost()
    },[])

    return(
        <div className="instagram-feed">
            {
                instagramPosts.map( post => {
                    let img = post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url
                    let { id, caption } = post
                    return(
                        <div className="instagram-post" key={id}>
                            <Image 
                                alt={caption} 
                                src={img} 
                                layout="fill"
                                className="instagram-image"
                            />
                        </div>
                    )
                })
            }
            <style jsx>{style}</style>
        </div>
    )
}