import { css } from '@emotion/core'
// import bp from '../../styles/breakpoint'

export const CardContainer = css`
    display: flex;
    // flex-direction: row;
    overflow: hidden;
    width: 100%;
    height: 125px;
    // background-color: gray; //remove after
    // border-radius: 1em;
    border-top: 0.5px solid lightgray;
    border-bottom: 0.5px solid lightgray;
    padding: 16px 2em;
    cursor: pointer;
    margin-bottom: 0.5em;

    // &:hover{
    //     border: 0.5px lightgreen solid;
    // }
`

export const CardBodyStyle = {
    width: "100%",
    padding: "0"
}

export const CompanyLogoContainer = css`
    display: flex;
    height: 100%;
    width: 90%;
    background-color: honeydew; //remove after
    border-radius: 2em;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`
export const ContentContainer = css`
    display: flex;
    flex-direction: row;
    width: 90%;
    height: calc(100% - 0.5em);
    // background-color: lightgreen; //remove after
    border-radius: 1em;
    // margin-left: 1.5%;
    padding: 0.2em 0em;
    align-items: center;
    position: relative;
`
export const ReviewInfoContainer = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%; 
    // background-color: purple; //remove after
    justify-content: center;
    align-items: center;
`
export const ReviewRatingsContainer = css`
    display: flex;
    height: 100%;
    width: 100%; 
    // background-color: teal; //remove after
    border-radius: 1em;
    justify-content: space-evenly;
    align-items: center;
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
    margin: 0em 2.15em;
    text-align: left;
    font-size: 18px;
    width: 80%;
    color: black;
    height: fit-content;
    // margin-left: 0;
`
export const RatingContainer = css`
    display: flex;
    flex-direction: column;
    background-color: lightgray; //remove after
    height: 82%;
    width: 22%;
    margin: 0em 0.25em;
    border-radius: 1.5em;
    justify-content: center;
    cursor: pointer;
`

export const RatingValue = css`
    color: black;
    font-size: 27px;
    font-weight: 100;
    margin: 0em 0em;
    margin-bottom: 0;
`

export const RatingLabel = css`
    font-size: 10px;
    font-weight: 300;
    margin: 0em;
    color: black;
    margin-top: -1.5px;
`
//     ${bp['medium']} {
//         width: 720px;
//     }

//     ${bp['large']} {
//         width: 1080px;
//     }
// `