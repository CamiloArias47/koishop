import React from 'react'
import ContentLoader from 'react-content-loader'

const LoadingPedido = props => {
  return (
    <ContentLoader width={730} height={304} uniqueKey="pedidos" {...props}>
      <rect x="10" y="10" rx="0" ry="0" width="30%" height="41" />
      <rect x="10" y="75" rx="0" ry="0" width="100%" height="4" />
      <rect x="10" y="95" rx="0" ry="0" width="100%" height="4" />
      <rect x="10" y="115" rx="0" ry="0" width="100%" height="4" />
      <rect x="10" y="135" rx="0" ry="0" width="100%" height="4" />
      <rect x="10" y="155" rx="0" ry="0" width="100%" height="4" />
      <rect x="10" y="175" rx="0" ry="0" width="100%" height="4" />
    </ContentLoader>
  )
}

export default LoadingPedido
