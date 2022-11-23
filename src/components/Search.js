import styled from "styled-components";
import SearchIcon from '@mui/icons-material/Search';

const Div = styled.div`
width: 50%;
margin: 0 auto;
margin-top: -1.5em;
background: white;
border-radius: 5px;
box-shadow: 0 0 4px lightgray;
display: flex;
align-items: center;
gap: 1em;
padding: 1em;
`
const Input = styled.input`
border: none;
outline: none;
font-size: 1.5rem;
`

const Search = () => {
    return (
        <Div>
            <SearchIcon />
            <Input />
        </Div>
    )
}
export default Search