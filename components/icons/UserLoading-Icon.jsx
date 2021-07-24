import ContentLoader from "react-content-loader"

const UserLoadingIcon = (props) => (
  <ContentLoader 
    speed={1.5}
    width={42}
    height={42}
    viewBox="0 0 42 42"
    backgroundColor="#d4d4d4"
    foregroundColor="#fffafa"
    uniqueKey="userloadingicon"
    {...props}
  >
    <circle cx="102" cy="117" r="13" /> 
    <circle cx="21" cy="21" r="20" />
  </ContentLoader>
)

export default UserLoadingIcon