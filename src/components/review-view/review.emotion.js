import { css } from '@emotion/core'
import colors from '../../globals/colors'

export const CardBodyStyle = {
    width: "100%",
    padding: "0"
}

export const CompanyContainer = css`
    display: flex;
    flex-direction: row;
    // background-color: lightblue;
    height: 100px;
    width: 100%;
    margin-top: 2%;
    margin-bottom: 1%;
`
export const RatingsContainer = css`
    display: flex;
    flex-direction: row;
    // background-color: lightgreen;
    height: 92px;
    width: 100%;
    justify-content: center;
    align-items: center;
`
export const MetadataContainer = css`
    // background-color: lightpink;
    height: 25px;
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
    padding: 22px 50px 22px 50px;
`
export const UpvoteDownvoteContainer = css`
    // background-color: aliceblue;
    height: 21px;
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
    height: 100%;
    padding: 0px 30px 0px 30px;
    border: 1px solid lightgray;
    box-shadow: 6px 10px 31px -17px rgba(0,0,0,0.56);
    // border-bottom: 0;
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
    justify-content: space-between;
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
export const RatingContainer = css`
    display: flex;
    flex-direction: column;
    // background-color: lightgray; //remove after
    // background-color: lightblue;
    border: 1.4px solid ${colors.primary};
    height: 82%;
    width: 22%;
    margin: 0em 0.25em;
    border-radius: 1em;
    justify-content: center;
    // cursor: pointer;

    @media (min-width: 992px) {
        height: 56%; 
        width: 22.5%;
    }
    @media (min-width: 1200px) {
        height: 83%; 
        width: 18%;
    }
`
export const RatingValue = css`
    color: ${colors.primary};
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
    color: black;
    margin-top: -1.5px;
`
export const MetaText = css`
    text-align: left;
    font-weight: 300;
    margin: 0;
    width: 100%;
`
export const CommentsContainer = css`
    display: flex;
    width: 100%;
    height: 100%;
    padding-bottom: 20px;
`
export const ReviewPositionSalaryContainer = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    // padding-left: 2 %;
`
export const ReviewPosSalCol = css`
    height: 100%;
    display: flex;
`
export const CompanyNameLinkStyle = css`
    color: black;

    &:hover {
        color: ${colors.primary};
        border-bottom: 1px solid ${colors.primary};
    }
`