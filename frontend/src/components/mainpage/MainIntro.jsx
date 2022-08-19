import styled  from 'styled-components';
import HowImg from './how.png'
import AboutImg from './p.png'
import { Link } from 'react-router-dom';

const Wapper = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    z-index: 2;
`

const Title = styled.h2`
    margin-top: 30px;
    color : ${props => props.theme.mainColor};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 700;
    font-size: 24px;
    width: ${props => props.theme.mainWidth};
    max-width:${props => props.theme.mainMaxWidth};
    text-align: left;
    margin-bottom: 50px;
`

const Intro = styled.section`
    width: ${props => props.theme.mainWidth};
    max-width:${props => props.theme.mainMaxWidth};
    width: 80%;
    max-width: 440px;
    display: grid;
    grid-template-columns: 8fr 1fr 8fr;
    margin-bottom: 130px;
`

const AboutUs = styled.img`
    height: 200px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    position: relative;
    cursor: pointer;
    transition: all 0.4s;
    &:hover{
        box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
        transition: all 0.4s;
    }
    &:active{
        box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
    }
`

const AboutTitle = styled.span`
    color : ${props => props.theme.mainColor};
    position: absolute;
    bottom : 15px;
    right: 15px;
    color:black;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 18px;
    font-weight: 600;
`

const How = styled.img`
    height: 200px;
    width: 200px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    position: relative;
    cursor: pointer;
    transition: all 0.4s;
    &:hover{
        box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
        transition: all 0.4s;
    }
    &:active{
        box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
    }
`

const FBox = styled(Link)`
    grid-column: 0;
`

const SBox =styled(Link)`
    grid-column: 3;
`


function MainIntro() {
    return(
        <Wapper>
            <Title>
                CATCHUP 소개
            </Title>
            <Intro>
                <FBox  style={{position:"relative"}}  to="/about">
                    <AboutUs src={AboutImg}>
                    </AboutUs>
                    <AboutTitle>About Service</AboutTitle>
                </FBox>
                <SBox  style={{position:"relative"}}  to="/how">
                    <How src={HowImg}>
                    </How>
                    <AboutTitle>How To Use</AboutTitle>
                </SBox>
            </Intro>
        </Wapper>
    )
}
export default MainIntro;