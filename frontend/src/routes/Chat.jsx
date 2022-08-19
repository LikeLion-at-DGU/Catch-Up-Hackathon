import styled from 'styled-components';
import ChatList from '../components/chating/ChatList';

const ToCenter = styled.div`
    width:100vw;
    display: flex;
    justify-content: center;
`

const Background = styled.section`
    background-color: #68DCC4;
    max-width: 700px;
    width : 100%; 
    margin-top: 2.22px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Title = styled.h1`
    color: rgb(24,62,78);
    margin-top:60px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 700;
    font-size: 36px;
    width: ${props => props.theme.mainWidth};
    max-width:580px;
    text-align: left;
`


function Chat () {
    return(
        <ToCenter>
            <Background>
                <Title>
                    채팅하기
                </Title>
                <ChatList />
            </Background>
        </ToCenter>
    )
}

export default Chat;