import { useEffect, useState } from "react"
import { getInstagramToken } from "firebaseApi/firestoreDB/instagram-token"
import  useLocalInstagramPosts  from "hooks/useLocalInstagramPost"

import Image from "next/image"

import style from './style'

export default function InstagramFeed(){

    const [instagramPosts, setInstagramPosts] = useState([])
    const { getPosts, savePosts, expiredLastGetTime } = useLocalInstagramPosts()

    useEffect( () => {
        const getLastPost = async () => {
            const token = await getInstagramToken()
            if(token.access_token){
                const resPosts = await fetch(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,thumbnail_url,username,timestamp,caption&access_token=${token.access_token}`)
                const posts = await resPosts.json()

                let showPosts = posts.data.slice(0,6)
                setInstagramPosts(showPosts)
                savePosts({data:showPosts})
            }
        }

        const instPost = getPosts()
        const expired = expiredLastGetTime()
        if(instPost.data && !expired){
            setInstagramPosts(instPost.data)
        }
        else{
            getLastPost()
        }
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