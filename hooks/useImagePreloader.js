import { useEffect, useState } from 'react'

function preloadImage (src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = function () {
      resolve(img)
    }
    img.onerror = img.onabort = function () {
      reject(src)
    }
    img.src = src
  })
}

export default function useImagePreloader (imageList) {
  const [imagesPreloaded, setImagesPreloaded] = useState(false)

  useEffect(() => {
    let isCancelled = false

    async function effect () {
      if (isCancelled) {
        return
      }

      const imagesPromiseList = imageList.map(url => preloadImage(url))

      await Promise.all(imagesPromiseList)

      if (isCancelled) {
        return
      }

      setImagesPreloaded(true)
    }

    if (imageList?.length > 0) effect()

    return () => {
      isCancelled = true
    }
  }, [imageList])

  return { imagesPreloaded }
}
