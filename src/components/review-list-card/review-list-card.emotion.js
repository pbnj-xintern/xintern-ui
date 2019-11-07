import { css } from '@emotion/core'
// import bp from '../../styles/breakpoint'

export const CardContainer = css`
    display: flex;
    // flex-direction: row;
    overflow: hidden;
    width: 100%;
    height: fit-content;
    //height: 125px;
    // background-color: gray; //remove after
    // border-radius: 1em;
    // border-top: 0.5px solid lightgray;
    // border-bottom: 0.5px solid lightgray;
    border: 0.5px solid lightgray;
    padding: 16px 2em;
    cursor: pointer;

    &:hover{
        border-top: 0.5px darkblue solid;
        border-bottom: 0.5px darkblue solid;
        // border: 0.5px darkblue solid;
        -webkit-box-shadow: 6px 10px 31px -17px rgba(0,0,0,0.10);
        -moz-box-shadow: 6px 10px 31px -17px rgba(0,0,0,0.10);
        box-shadow: 6px 10px 31px -17px rgba(0,0,0,0.10);
    }

    @media (min-width: 992px) {
        height: 225px;
    }
    @media (min-width: 1200px) {
        height: fit-content;
    }
`

export const CardBodyStyle = {
    width: "100%",
    padding: "0"
}

export const CompanyLogoContainer = css`
    display: flex;
    height: 100%;
    width: 90%;
    // background-color: aliceblue;
    border-radius: 2em;
    justify-content: center;
    align-items: center;
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
    // justify-content: center;
    // align-items: center;

    @media (min-width: 992px) {
        text-align: left;
    }
`

export const ReviewInfoCol = css`
    @media (min-width: 992px) { 
        height: fit-content; 
    }
    @media (min-width: 1200px) { 
        height: 100%; 
    }
`

export const ReviewRatingsContainer = css`
    display: flex;
    height: 100%;
    width: 100%; 
    // background-color: teal; //remove after
    // border-radius: 1em;
    justify-content: space-evenly;
    align-items: center;
`

export const ReviewRatingCol = css`
    @media (min-width: 992px) { 
        height: 55%;
    }
    @media (min-width: 1200px) { 
        height: 100%;
    }
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
    margin: 0em 0em;
    padding-left: 4%;
    font-size: 18px;
    width: fit-content;
    color: black;
    height: 100%;
    // margin-left: 0;
`

export const LocationText = css`
    font-weight: 100;
    margin: 0em 0em;
    padding-left: 4%;
    font-size: 16px;
    width: fit-content;
    color: black;
    height: 100%;
    margin-bottom: 2%;
    margin-top: 1.9px;
    font-weight: 200;
    color: gray;

    @media (min-width: 992px){
        margin-top: 1.9px;

    }
    @media (min-width: 1200px){
        margin-top: 1px;
    }
`

export const DateReviewText = css`
    font-weight: 100;
    margin: 0em 0em;
    font-size: 12px;
    width: fit-content;
    color: black;
    height: 100%;
    display: flex;
    padding-left: 11%;
    justify-content: center; 
    align-items: center;

    @media (min-width: 992px) {
        width: 100%;
        justify-content: left; 
        align-items: left;
    }
`
export const RatingContainer = css`
    display: flex;
    flex-direction: column;
    // background-color: lightgray; //remove after
    background-color: aliceblue;
    height: 82%;
    width: 22%;
    margin: 0em 0.25em;
    border-radius: 1.25em;
    justify-content: center;
    cursor: pointer;

    @media (min-width: 992px) {
        height: 56%; 
        width: 22.5%;
    }
    @media (min-width: 1200px) {
        height: 93%; 
        width: 22%;
    }
`

export const RatingValue = css`
    color: black;
    font-size: 27px;
    font-weight: 250;
    margin: 0em 0em;
    margin-bottom: 0;

    @media (min-width: 992px){
        font-size: 25px;
    }
    @media (min-width: 1200px){
        font-size: 27px;
    }
`

export const RatingLabel = css`
    font-size: 11px;
    font-weight: 200;
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