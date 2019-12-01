import { css } from '@emotion/core'

export const CardContainer = css`
    display: flex;
    // flex-direction: row;
    overflow: hidden;
    width: 100%;
    height: fit-content;
    //height: 125px;
    // background-color: gray; //remove after
    // border-radius: 1em;
    border: 0.5px solid lightgray;
    padding: 16px 2em;

    &:hover{
        border: 0.5px darkblue solid;
        -webkit-box-shadow: 6px 10px 31px -17px rgba(0,0,0,0.10);
        -moz-box-shadow: 6px 10px 31px -17px rgba(0,0,0,0.10);
        box-shadow: 6px 10px 31px -17px rgba(0,0,0,0.10);
        box-shadow: inset 0 0 20px rgba(0, 0, 0, .01), 0 0 20px rgba(0, 0, 0, .2);
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
    // justify-content: center;
    // align-items: center;
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
    margin: 0em 0em;
    padding-left: 5%;
    font-size: 25px;
    width: 600px;
    color: black;
    height: 100%;
    // margin-left: 0;

    &:hover {
        color: darkblue;
    }
`
