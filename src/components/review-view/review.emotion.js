import { css } from '@emotion/core'

export const CardBodyStyle = {
    width: "100%",
    padding: "0"
}

export const CompanyContainer = css`
    display: flex;
    flex-direction: row;
    // background-color: lightblue;
    height: 18%;
    width: 100%;
    margin-top: 1%;
    margin-bottom: 0.2%;
`
export const RatingsContainer = css`
    display: flex;
    flex-direction: row;
    // background-color: lightgreen;
    height: 16%;
    width: 100%;
    justify-content: center;
    align-items: center;
`
export const MetadataContainer = css`
    // background-color: lightpink;
    height: 4%;
    width: 100%;
    margin-top: 2.2%;
`
export const ContentContainer = css`
    // background-color: lightyellow;
    border: 1px solid lightgray;
    border-left: 0;
    border-right: 0;
    // height: 44%;
    height: fit-content;
    width: 100%;
    padding: 17px 40px 17px 40px;
`
export const UpvoteDownvoteContainer = css`
    // background-color: aliceblue;
    height: 3%;
    width: 100%;
    margin-top: 0.5%;
`
export const CreateCommentContainer = css`
    // background-color: coral;
    height: fit-content;
    width: 100%;
    margin-top: 2%;
    border-bottom: 1px solid lightgray;
`
export const ReviewViewCol = css`
    height: 600px;
    padding: 0px 30px 0px 30px;
    border: 1px solid lightgray;
    border-bottom: 0;
    // border-top: 0;
`
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
export const CompanyNameCol = css`
    height: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
    padding-left: 3%;
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
    width: 100%;

    @media (min-width: 992px) { 
        height: 55%;
    }
    @media (min-width: 1200px) { 
        height: 100%;
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
        height: 82%; 
        width: 9%;
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
    font-size: 12px;
    font-weight: 250;
    margin: 0em;
    color: darkblue;
    margin-top: -1.5px;
`
export const MetaText = css`
    text-align: left;
    font-weight: 300;
    margin: 0;
`