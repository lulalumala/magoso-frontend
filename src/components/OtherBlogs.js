import styled from "styled-components";
import img2 from "../images/Goat.jpg";
import { Link } from "react-router-dom";

const MainDiv = styled.div`
width: 90%;
margin: 0 auto;
display: flex;
gap: 1em;
flex-wrap: wrap;
padding: 1em;
`

const Div = styled.div`
width: 32%;
box-shadow: 0 0 5px lightgrey;
border-radius: 3px;
cursor:pointer;
// overflow:hidden;
`

const P = styled.p`
font-size: 1.5rem;
`
const ImgDiv = styled.div`
border-radius: 10px; 
height: 50vh;
padding: .5em;
`

const Img = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
object-position: top left;
border-radius: 10px;
`

const Article = styled.div`
padding: 0 1em;
`
const Title = styled.p`
color: #4EB2F2;
font-size: 1.5rem;
font-weight: bold;
padding: .5em 0;
text-transform: uppercase;
`

const Description = styled.p
    `
font-size: 2rem;
`

const OtherBlogs = ({ newsData }) => {

    return (
        <MainDiv>
            {newsData &&

                newsData.map((data) => {
                    return (
                        <Div>
                            <Link to={`post/${data._id}`}>
                                <ImgDiv><Img src={data.image} alt="image" /> </ImgDiv>;
                                <Article>
                                    <Title>{data.title} </Title>
                                    <Description>{data.description} </Description>
                                    <div style={{overflow: "scroll" }}><P >Author: {data.author} </P>
                                    </div>
                                </Article>
                            </Link>

                        </Div>
                    )

                })
            }
        </MainDiv>
    )
}
export default OtherBlogs