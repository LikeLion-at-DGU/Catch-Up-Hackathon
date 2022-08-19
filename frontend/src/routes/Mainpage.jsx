import styled from 'styled-components';
import MainSlider from '../components/mainpage/MainSlider';
import MainInsight from '../components/mainpage/MainInsight';
import MainReview from '../components/mainpage/MainReview';
import MainTop from '../components/mainpage/MainTop';
import MainIntro from '../components/mainpage/MainIntro';

const ToCenter = styled.div`
    width:100vw;
    display: flex;
    justify-content: center;
    margin-top: 7px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`

const Background = styled.section`
    background-color: ${props => props.theme.mainBackColor};
    max-width: 700px;
    width : 100%; 
    margin-top: 1px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;
`

const Title = styled.h1`
    font-weight: 800;
    font-size: 1.8rem;
    margin-top: 5%;
    margin-bottom: 8%;
    color:rgb(24,62,78);
`

const BigCricle = styled.div`
    width: 800px;
    height: 800px;
    border-radius: 800px;
    background: linear-gradient(240deg, #84fab0 0%, #8fd3f4 100%);
    position: absolute;
    top: 1105px;
    right : 250px;

`

const MiddleCircle1 = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 200px;
    background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    position: absolute;
    top: 905px;
    right : -50px;
`

const SmallCircle2 = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 80px;
    background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    position: absolute;
    top: 1805px;
    right : 100px;
`

const SmallCircle1 = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 100px;
    background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    position: absolute;
    top: 775px;
    left : 150px;
`

const MiddleCircle2 = styled.div`
    width: 330px;
    height: 330px;
    border-radius: 330px;
    background: linear-gradient(300deg, #84fab0 0%, #8fd3f4 100%);
    position: absolute;
    top: 2205px;
    right : -10px;
`

const MiddleCircle3 = styled.div`
    width: 230px;
    height: 230px;
    border-radius: 230px;
    background: linear-gradient(30deg, #84fab0 0%, #8fd3f4 100%);
    position: absolute;
    top: 2005px;
    left : 50px;
`

function Mainpage() {


return (
    <ToCenter>
        <Background>
            <Title>CATCHUP</Title>
            <MainSlider />
            <MainInsight />
            <MainReview />
            <MiddleCircle1 />
            <MiddleCircle2 />
            <MiddleCircle3 />
            <BigCricle />
            <SmallCircle1 />
            <SmallCircle2 />
            <MainTop />
            <MainIntro />
        </Background>
    </ToCenter>

);
}

export default Mainpage;