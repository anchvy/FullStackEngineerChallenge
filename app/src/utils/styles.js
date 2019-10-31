import { css } from 'styled-components'

export const LAYOUT_PADDING = '16px 5%'

const BASE_SPACING = 8
export const SPACING = {
  XS: `${BASE_SPACING / 2}px`,
  SM: `${BASE_SPACING}px`,
  MD: `${BASE_SPACING * 2}px`,
  XL: `${BASE_SPACING * 3}px`,
  XXL: `${BASE_SPACING * 4}px`,
}

export const FLEX_CENTER = css`
  align-items: center;
  display: flex;
  justify-content: center;
`

/**
 * media query for used in styled-component
 */
const MOBILE_MAX_WIDTH = 768
export const ON_MOBILE = (...args) => {
  return css`
    @media (max-width: ${MOBILE_MAX_WIDTH}px) {
      ${css(...args)}
    }
  `
}
