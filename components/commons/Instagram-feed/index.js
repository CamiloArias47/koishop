import Image from "next/image"
import  useInstagramPosts  from "hooks/useInstagramPost"
import InstagramPost from "./instagramPost"

import style from './style'

export default function InstagramFeed(){

    const instagramPosts = useInstagramPosts()

    return(
        <div className="instagram-slider">
            <div className="instagram-feed">
                {
                    instagramPosts.map( post => {
                        let img = post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url
                        let { id, caption, permalink} = post
                        return <InstagramPost key={id} caption={caption} img={img} permalink={permalink}/>
                    })
                }
            </div>
            <style jsx>{style}</style>
        </div>
    )
}