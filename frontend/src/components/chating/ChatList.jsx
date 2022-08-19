import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LogAPI } from "../../axios";
import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { isChatId } from '../../atoms';


const Wapper = styled.section`
    background-color: white;
    color: rgb(24, 62, 78);
    width: ${props => props.theme.mainWidth};
    max-width:580px;
    min-height: 80vh;
    margin-top: 50px;
    display: flex;
    justify-content: center;
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
    align-items: center;
`
const Item = styled.div`
    padding: 15px 0px;
    cursor: pointer;
    width: 100%;
    display: flex;
    transition: all 0.5s;
    &:hover{
        transition: all 0.5s;
        background-color: #F5F5F5;
    }
`
const Logo = styled.img`
    width: 52px;
    height: 52px;
    border-radius: 50%;
`
const ChatHead = styled.div`
    width: 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const ChatInfo = styled.div`
    width:75%;
    margin-right: 3px;
    display: flex;
    flex-direction: column;

`
const ChatTitle = styled.h3`
    font-size: 17px;
    font-weight: 700;
`
const ChatTime = styled.div`
    width:10%;
    text-align: center;
    font-size: 12px;
    margin-top: 3px;
`
const Who = styled.h6`
    font-size: 11px;
    font-weight: 600;
    margin-top: 5px;
`
const ChatBody = styled.p`
    margin-top: 7px;
    line-height: 1.3;
    opacity: 0.8;
    
`


function ChatList () {
    const [info, setInfo] = useState([])
    const navigate = useNavigate()
    const setChatAtom = useSetRecoilState(isChatId);
    const cathAixos = async () => {
        try{
            const list = await LogAPI.get("/chat/room/");
            setInfo(list.data)
        } catch(error){
            console.log(error)
        }
    }

    console.log(info)
    useEffect(()=> {
        cathAixos()
    },[])
    
    const gotoChat = (info) => {
        setChatAtom(info.room.id)
        navigate(`/chat/room/${info.room.post}`)
    }

    return(
        <Wapper>
            <List>
                {info?.map(i => (
                    <Item key={i.room.id} onClick={() => gotoChat(i)}>
                        <ChatHead>
                            <Logo src={i.opponent.image} />
                            <Who>{i.opponent.nickname}</Who>
                        </ChatHead>
                        <ChatInfo>
                            <ChatTitle>{i.topic}</ChatTitle>
                            <ChatBody>{i.last_chat.content === "" ? "첫 채팅을 시작하세요!!" : i.last_chat.content }</ChatBody>
                        </ChatInfo>
                        <ChatTime>{i.last_chat.created_at === null ? "" : i.last_chat.created_at.slice(11,16)}</ChatTime>
                    </Item>
                ))}
                    
            </List>
        </Wapper>
    )
}

export default ChatList;


// {isLoading ? <Warnning>로딩중입니다</Warnning> : data === [] ? <Warnning>채팅을 시작하세요!</Warnning> :
//             <List>
                
//             </List>}