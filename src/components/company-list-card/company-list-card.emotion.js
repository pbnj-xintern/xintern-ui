import { css } from '@emotion/core'
import colors from '../../globals/colors'
import hover from '../../globals/hover'

export const CardContainer = css`
    display: flex;
    overflow: hidden;
    width: 100%;
    // height: fit-content;
    // background-color: gray; //remove after
    // border-radius: 1em;
    border: 0.5px solid lightgray;
    margin-left: 2em;
    margin-right: 2em;
    padding: 16px 2em;
    transition: all .2s ease-in-out;
    cursor: pointer;

    &:hover{
        ${hover.primaryBorders}
        ${hover.shadow}
    }

`

export const CardBodyStyle = {
    width: "100%",
    padding: "0",
}

export const CompanyLogoContainer = css`
    display: flex;
    height: 100%;
    width: 90%;
    border-radius: 2em;
    cursor: pointer;
`

export const CompanyLogoCol = css`
    @media (min-width: 992px) { 
        height: 51%; 
    } 
    @media (min-width: 1200px) {
        height: 100%;
    }
`

export const CompanyInfoContainer = css`
    display: flex;
    flex-direction: row;
    position: relative;
    height: 100%;
    width: 100%; 
    // background-color: purple; //remove after
    justify-content: left;
    align-items: center;

    @media (min-width: 992px) {
        text-align: left;
    }
`

export const CompanyInfoCol = css`
    @media (min-width: 992px) { 
        height: fit-content; 
    }
    @media (min-width: 1200px) { 
        height: 100%; 
    }
`

export const CompanyText = css`
    font-weight: 200;
    font-size: 25px;
    color: black;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    text-align: left;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
        color: ${colors.primary};
    }
`
