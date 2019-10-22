import { css } from '@emotion/core'
// import bp from '../../styles/breakpoint'

export const CardContainer = css`
    display: flex;
    flex-direction: row;
    overflow: hidden;
    width: 950px;
    height: 110px;
    background-color: gray; //remove after
    border-radius: 1.25em;
    padding: 0.5em 1.25em;
    cursor: pointer;

    &:hover{
        border: 0.5px lightgreen solid;
    }
`
export const CompanyLogoContainer = css`
    display: flex;
    height: 100%;
    width: 12%;
    background-color: honeydew; //remove after
    border-radius: 1.5em;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`
export const ContentContainer = css`
    display: flex;
    flex-direction: row;
    width: 85%;
    height: calc(100% - 0.5em);
    // background-color: lightgreen; //remove after
    border-radius: 1em;
    // margin-left: 1.5%;
    padding: 0.2em 0.5em;
    align-items: center;
    position: relative;
`
export const ReviewInfoContainer = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 35%; 
    // background-color: purple; //remove after
    border-radius: 1em;
    justify-content: center;
    position: absolute;
    left: 15px;
`
export const ReviewRatingsContainer = css`
    display: flex;
    flex-direction: row;
    height: calc(100% - 5px);
    width: 65%; 
    // background-color: teal; //remove after
    border-radius: 1em;
    justify-content: flex-end;
    align-items: center;
    // margin-left: 0.51em;
    // margin-right: -1em;
    position: absolute;
    right: 0;
`

export const MetaDataContainer = css`
    display: flex;
    flex-direction: row;
    width: 100%;   
    justify-content: left;
    align-items: center;
`

export const ReviewText = css`
    font-weight: 100;
    margin: 0.35em 1em;
    text-align: left;
    font-size: 20px;
    width: 80%;
    height: fit-content;
    // position: absolute;
`
export const RatingContainer = css`
    display: flex;
    flex-direction: column;
    background-color: cadetblue; //remove after
    height: 100%;
    width: 19%;
    margin: 0em 0.25em;
    border-radius: 2em;
    algin-items: center;
    justify-content: center;
    cursor: pointer;
`

export const RatingValue = css`
    font-size: 37px;
    font-weight: 100;
    margin: 0.2em 0em;
`

export const RatingLabel = css`
    font-size: 12px;
    font-weight: 500;
    margin: 0em;
`
//     ${bp['medium']} {
//         width: 720px;
//     }

//     ${bp['large']} {
//         width: 1080px;
//     }
// `