import { css } from '@emotion/core'
import colors from '../../globals/colors'

export const UsernameLink = css`
    color: ${colors.primary};

    &:hover {
        font-weight:bold;
    }
`

export const CommentCardHover = css`

    &:hover {
        border: 1px solid rgba(0,0,0,0.1)
    }
`