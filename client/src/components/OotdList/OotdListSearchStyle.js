import styled from "styled-components";

export const OotdListSearchContainer = styled.div`
    width: 40%;
    min-width: 20em;
    height: 2.8em;
    border: 2px solid #6588db;
    margin: 4em auto 2em;
    box-sizing: border-box;
    display: flex;
    padding: 0 3px;
    justify-content: space-between;
    background-color: #fff;
`;

export const OotdListSearchInput = styled.input.attrs(props => ({
    type: "text",
    placeholder: "Search"
}))`
    display: block;
    width: 90%;
    border: none;
    box-sizing: border-box;
    &:focus{
        outline: none;
    }
`;
export const OotdListSearchIcon = styled.span.attrs(props => {
    
})`
    display: flex;
    align-items: center;
    cursor: pointer;
`