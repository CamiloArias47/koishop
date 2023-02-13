import { colors } from 'styles/theme'

const BillIcon = (props) => (
  <svg width={32} height={32} xmlns="http://www.w3.org/2000/svg" {...props}>
    <g fill="none" fillRule="evenodd">
      <path
        d="M30.35 4.957H1.65c-.487 0-.9.438-.9.998v20.09c0 .56.413.998.9.998h28.7c.487 0 .9-.438.9-.998V5.955c0-.56-.413-.998-.9-.998Z"
        stroke={colors.primary}
        strokeWidth={1.5}
      />
      <path
        d="M0 10.851h32"
        stroke={colors.primary}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g
        stroke={colors.primary}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M27.51 17.538c0-.985-.756-1.777-1.686-1.777-.93 0-1.685.792-1.685 1.777 0 .984.755 1.784 1.685 1.784M24.139 21.106c0 .978.755 1.777 1.685 1.777s1.685-.8 1.685-1.777c0-.984-.755-1.784-1.685-1.784M25.824 22.883v.904M25.824 14.857v.904M4.49 15.104h12.5M4.49 19.22h12.5M4.49 23.335h6.25" />
      </g>
    </g>
  </svg>
)

export default BillIcon
