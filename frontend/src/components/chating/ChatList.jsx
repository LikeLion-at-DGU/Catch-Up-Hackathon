import { Link } from "react-router-dom";
import styled from "styled-components";


const Wapper = styled.section`
    background-color: white;
    color: rgb(24, 62, 78);
    width: ${props => props.theme.mainWidth};
    max-width:580px;
    min-height: 80vh;
    margin-top: 50px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding-top: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`
const Warnning = styled.h1`
    font-size: 30px;
    text-align: center;
    margin-top: 50px;
    font-weight: 800;

`
const List = styled.section`
    display: flex;
    width: 100%;
    flex-direction: column;
`
const Item = styled.div`
    width: 100%;
`
const Logo = styled.svg`
    width: 10%;
    height: 10%;
    path:first-child{
        stroke-width: 4;
    }
    path:last-child{
        stroke-width: 4;
    }

`
const ChatInfo = styled.div`
    
`
const ChatTime = styled.div`
    
`
const Who = styled.h6`
    
`
const ChatBody = styled.p`
    
`


function ChatList () {
    // const cathAixos = async () => {
    //     try{
    //         const {list} = await API.get("");
    //         return list;
    //     } catch(error){
    //         console.log(error)
    //     }
    // }

    // const {isLoading , data} = useQuery("chatList", cathAixos )
    
    return(
        <Wapper>
            <List>
                <Link to ="/">
                    <Item>
                        <Logo xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 54" fill="none">
                            <path d="M27 52C40.8071 52 52 40.8071 52 27C52 13.1929 40.8071 2 27 2C13.1929 2 2 13.1929 2 27C2 40.8071 13.1929 52 27 52Z" stroke="#68DCC4" stroke-width="3"/>
                            <path d="M36.9629 22.0397C36.6968 21.2707 36.1917 20.6029 35.5187 20.1304C34.8457 19.6578 34.0386 19.4043 33.211 19.4055H30.0331V10.1758L28.6975 10.363C25.6679 10.7877 23.3079 12.2944 21.684 14.8412C20.5131 16.6771 19.9688 18.7022 19.7162 20.2169C17.9723 21.5337 16.4552 23.3467 15.2014 25.6137C14.1448 27.524 13.2701 29.7629 12.6015 32.2685C11.4719 36.502 11.319 40.0136 11.3131 40.161L11.3125 44.225H13.6523V40.2322C13.6815 39.6415 14.4183 26.7151 21.4794 21.793L21.8933 21.5044L21.9613 21.0106C22.3134 18.4538 23.5302 14.231 27.6929 12.933V21.702H33.211C33.5494 21.701 33.8795 21.8041 34.155 21.9969C34.4305 22.1897 34.6374 22.4624 34.7467 22.7766C35.6796 25.479 37.2826 28.8607 39.7808 30.4499L39.0295 33.2149C38.768 34.201 38.1731 35.0707 37.3423 35.6818C36.5114 36.2928 35.4938 36.609 34.456 36.5786C32.3596 36.5168 30.1776 36.7852 27.9703 37.376L27.1079 37.6067V44.225H29.448V39.3785C31.0651 39.0036 32.7246 38.834 34.3857 38.874C35.95 38.9163 37.4831 38.4389 38.7363 37.5191C39.9896 36.5993 40.8895 35.2911 41.2903 33.8066L42.54 29.2078L41.6093 28.8164C39.8689 28.0843 38.2188 25.6777 36.9629 22.0397Z" fill="#68DCC4"/>
                        </Logo>
                        <ChatInfo>
                            <Who>집가고싶다</Who>
                            <ChatBody>할지라도 인도하겠다는 가치를 있으랴? 우리의 만물은 실현에 얼음에 것이다. 있는 실현에 우는 대한 설산에서 인간의 사는가 오아이스도 보는 피다.</ChatBody>
                        </ChatInfo>
                        <ChatTime>오후 1:11</ChatTime>
                    </Item>
                </Link>
            </List>
        </Wapper>
    )
}

export default ChatList;


// {isLoading ? <Warnning>로딩중입니다</Warnning> : data === [] ? <Warnning>채팅을 시작하세요!</Warnning> :
//             <List>
                
//             </List>}