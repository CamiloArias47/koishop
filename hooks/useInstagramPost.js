import { useEffect, useState, startTransition } from 'react'
import { getInstagramToken } from 'firebaseApi/firestoreDB/instagram-token'
import useLocalInstagramPosts from './useLocalInstagramPost'

export default function useInstagramPosts () {
  const [instagramPosts, setInstagramPosts] = useState([])
  const { getPosts, savePosts, expiredLastGetTime } = useLocalInstagramPosts()

  useEffect(() => {
    const getLastPost = async () => {
      try {
        const token = await getInstagramToken()
        const resPosts = await fetch(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,thumbnail_url,username,timestamp,caption&access_token=${token.access_token}`)
        const posts = await resPosts.json()

        if (posts.data) {
          const showPosts = posts.data.slice(0, 6)
          startTransition(() => {
            setInstagramPosts(showPosts)
            savePosts({ data: showPosts })
          })
        }
      } catch (e) {
        startTransition(() => {
          setInstagramPosts([])
        })
      }
    }

    const instPost = getPosts()
    const expired = expiredLastGetTime()
    if (instPost.data && !expired) {
      startTransition(() => {
        setInstagramPosts(instPost.data)
      })
    } else {
      getLastPost()
    }
  }, [])

  return instagramPosts
}
