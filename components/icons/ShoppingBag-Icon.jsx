import * as React from "react"

function ShoppingBagIcon(props) {
  let color = props.color !== undefined ? props.color : "#353535"
  return (
    <svg
      viewBox="0 0 321.2 321.2"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M265.034 290.112l-19.58-182.422c-.327-2.937-2.937-5.221-5.874-5.221h-36.224V91.373c0-31.328-25.454-56.782-56.782-56.782-31.329 0-56.783 25.454-56.783 56.782v11.096H52.59c-2.937 0-5.548 2.284-5.874 5.221l-19.58 182.422c-.327 1.632.326 3.263 1.305 4.569.979 1.305 2.61 1.958 4.242 1.958h226.804c1.632 0 3.263-.653 4.242-1.958.98-1.306 1.632-2.937 1.306-4.569zm-67.552-154.683c2.937 0 5.222 2.284 5.222 5.221 0 2.937-2.285 5.221-5.222 5.221-2.937 0-5.221-2.284-5.221-5.221 0-2.937 2.284-5.221 5.221-5.221zM101.54 91.373c0-24.801 20.233-45.034 45.035-45.034 24.801 0 45.034 20.233 45.034 45.034v11.096H101.54zm-5.874 44.056c2.937 0 5.222 2.284 5.222 5.221 0 2.937-2.285 5.221-5.222 5.221-2.937 0-5.221-2.284-5.221-5.221 0-2.937 2.284-5.221 5.221-5.221zm-56.13 149.135L57.81 113.89h31.981v10.77a16.589 16.589 0 00-11.095 15.664c0 9.137 7.506 16.643 16.643 16.643s16.643-7.506 16.643-16.643c0-7.18-4.569-13.38-11.095-15.664v-10.77h90.068v10.77a16.589 16.589 0 00-11.095 15.664c0 9.137 7.506 16.643 16.643 16.643 9.138 0 16.643-7.506 16.643-16.643 0-7.18-4.568-13.38-11.095-15.664v-10.77h33.286l18.275 170.674z"
        fill={color}
      />
    </svg>
  )
}

export default ShoppingBagIcon
