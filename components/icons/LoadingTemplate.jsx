import React from 'react'
import ContentLoader from 'react-content-loader'

const Loadingtext = props => {
  return (
    <ContentLoader viewBox="0 0 300 600" height={600} width={300} {...props}>

    <rect x="0" y="20" rx="5" ry="5" width="300" height="42" />
    <rect x="0" y="80" rx="5" ry="5" width="300" height="42" />
    <rect x="0" y="140" rx="5" ry="5" width="300" height="42" />
    <rect x="0" y="200" rx="5" ry="5" width="300" height="42" />
    <rect x="0" y="260" rx="5" ry="5" width="300" height="42" />
    <rect x="0" y="320" rx="5" ry="5" width="300" height="42" />
    <rect x="0" y="380" rx="5" ry="5" width="300" height="42" />
  </ContentLoader>
  )
}

export default Loadingtext
