import useInstagramPosts from 'hooks/useInstagramPost'
import { useEffect } from 'react'
import InstagramPost from './instagramPost'

import style from './style'

export default function InstagramFeed () {
  const instagramPosts = useInstagramPosts()

  useEffect(() => {
    const moveSlider = () => {
      const slider = document.querySelector('.instagram-slider')

      setInterval(() => {
        const { scrollLeft, offsetWidth } = slider
        const scrollWidth = slider.scrollWidth
        if ((scrollLeft + offsetWidth) - 250 >= scrollWidth - 250) {
          slider.scrollBy({
            left: -scrollWidth,
            behaviour: 'smooth'
          })
        } else {
          slider.scrollBy({
            left: 250,
            behaviour: 'smooth'
          })
        }
      }, 4000)
    }

    moveSlider()
  }, [])

  return (
        <div className="instagram-slider">
            <div className="instagram-feed">
                {
                    instagramPosts.map(post => {
                      const { id, caption, permalink, media_type } = post
                      const img = media_type === 'VIDEO' ? post.thumbnail_url : post.media_url
                      return <InstagramPost key={id} caption={caption} img={img} permalink={permalink} mediatype={media_type}/>
                    })
                }
            </div>
            <style jsx>{style}</style>
        </div>
  )
}
