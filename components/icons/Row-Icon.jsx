function RowIcon({props, height=21, width=21 }) {
    return (
      <svg
        height={height}
        viewBox="0 0 21 21"
        width={width}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M11.5 14.5l-4-4 4-4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  
  export default RowIcon