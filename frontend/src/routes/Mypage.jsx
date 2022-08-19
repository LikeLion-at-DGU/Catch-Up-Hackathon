import styled from 'styled-components';
import ProfileBox from '../components/mypage/ProfileBox';
import ProfileList from '../components/mypage/ProfileList';

const ToCenter = styled.div`
    width:100vw;
    display: flex;
    justify-content: center;
    margin-top: 2.22px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`

const Background = styled.section`
    max-width: 700px;
    width : 100%; 
    display: flex;
    flex-direction: column;
    align-items: center;
`

const FirstBack = styled.div`
    width: 100%;
    background-color: ${props => props.theme.mainSecondBackColor};
    height: 45vh;
`

const SecondBack = styled.div`
    width: 100%;
    background-color: #F5F5F5;
    height: 60vh;
`
const RealBack = styled.div`
    z-index: 10;
    width: 100%;
    height: 100vh;
    position: absolute;
    top:52px;
    left:0;
    display: flex;
    flex-direction: column;
    align-items: center;
`

function Mypage() {
    return (
    <ToCenter>
        <Background>
            <FirstBack />
            <SecondBack />
            <RealBack>
                <ProfileBox />
                <ProfileList />
            </RealBack>
        </Background>
    </ToCenter>
    );
}

export default Mypage;