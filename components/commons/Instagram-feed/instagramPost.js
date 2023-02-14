import Image from 'next/image'
import koiLogo from 'public/images/logos/koi192.png'
import { VideoComponent } from 'components/icons'
import style from './style-post'

export default function InstagramPost ({ id, caption, img, permalink, mediatype }) {
  return (
        <a href={permalink} target="_blank" rel="noreferrer" className="instagram-post" key={id}>
            <div className="instagram-post__header">
                <div className="instagram-post__profile-conatiner">
                    <Image
                        src={koiLogo}
                        alt="koi makeup Instagram logo"
                        className="instagram-post__profile-logo"
                        width={32}
                        height={32}
                    />
                </div>
                <span className="instagram-post__profile-name">koimakeup_</span>
            </div>
            <div className="instagram-post__image">
                {
                    mediatype === 'VIDEO' ? <VideoComponent className="instagram-post__video-icon"/> : null
                }
                <Image
                    alt={caption}
                    src={img}
                    layout="fill"
                    className="instagram-image"
                />
            </div>
            <div className="instagram-post__footer">
                <span className="instagram-post__profile-name">koimakeup_ </span>{caption}
            </div>
            <style jsx>{ style }</style>
        </a>
  )
}
