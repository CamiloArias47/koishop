import { useEffect, useState } from "react"
import { getInstagramToken } from "firebaseApi/firestoreDB/instagram-token"
import useLocalInstagramPosts from "./useLocalInstagramPost";

export default function useInstagramPosts(){
    const [instagramPosts, setInstagramPosts] = useState([])
    const { getPosts, savePosts, expiredLastGetTime } = useLocalInstagramPosts()

    useEffect( () => {
        const getLastPost = async () => {
            const token = await getInstagramToken()
            if(token.access_token){
                const resPosts = await fetch(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,thumbnail_url,username,timestamp,caption&access_token=${token.access_token}`)
                const posts = await resPosts.json()

                if(posts.data){
                    let showPosts = posts.data.slice(0,6)
                    setInstagramPosts(showPosts)
                    savePosts({data:showPosts})
                }
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

    return instagramPosts
}