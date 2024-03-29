import useLocalStorage from './useLocalStorage'

export default function useLocalInstagramPosts () {
  const getPosts = () => {
    const { canIUseLocalStorage } = useLocalStorage()
    if (canIUseLocalStorage) {
      const storage = window.localStorage
      const localPost = storage.getItem('instagram-posts')
      if (localPost) return JSON.parse(localPost)
      return {}
    }
  }

  const expiredLastGetTime = () => {
    const { canIUseLocalStorage } = useLocalStorage()
    if (canIUseLocalStorage) {
      const storage = window.localStorage
      const time = storage.getItem('instagram-posts-timestamp')
      if (time) {
        const lastGet = new Date(time)
        const now = new Date()
        let hours = Math.abs(now - lastGet) / (60 * 60 * 1000)
        hours = Math.trunc(hours)
        if (hours >= 3) return true
        return false
      }
      return true
    }
  }

  const savePosts = posts => {
    const { canIUseLocalStorage } = useLocalStorage()
    if (canIUseLocalStorage) {
      const storage = window.localStorage
      storage.setItem('instagram-posts', JSON.stringify(posts))
      storage.setItem('instagram-posts-timestamp', Date())
    }
  }

  return {
    getPosts,
    savePosts,
    expiredLastGetTime
  }
}
