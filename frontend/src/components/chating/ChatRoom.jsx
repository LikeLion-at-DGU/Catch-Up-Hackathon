import styled from "styled-components";
import { AnimatePresence , motion} from 'framer-motion';
import ByeBox from './ByeBox';
import {useForm} from "react-hook-form"
import { useRecoilValue } from 'recoil';
import { isChatId } from '../../atoms';
import { LogAPI } from "../../axios";
import { useEffect, useState } from 'react';

const Container = styled.section`
    color: rgb(24, 62, 78);
    display: flex;
    flex-direction: column;
    width: 90%;
    overflow: scroll;
`

const ChatForm = styled.form`
    position: relative;
    margin-bottom: 10px;
`
const Chatinput = styled.textarea`
    width: 100%;
    border-radius: 10px;
    border: none;
    height: 100px;
    background-color: #F5F5F5;
    resize: none;
    padding: 8px 80px 8px 7px;
    font-size: 16px;
`
const ChatBtn = styled.button`
    position: absolute;
    top:20px;
    right:10px;
    border: none;
    background-color: #68DCC4;
    height: 60px;
    width: 60px;
    cursor: pointer;
    border-radius: 13px;
    border-bottom-right-radius: 0px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    transition: all 0.1s;
    &:active{
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
        transition: all 0.1s;
    }

`

const ChatList = styled.div`
    z-index: 0;
    overflow-y: scroll;
    height: 60vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-bottom: 20px;
`
const MyChatItem = styled.section`
    margin-bottom: 20px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    span{
        margin-right: 10px;
        font-weight: 500;
        margin-bottom: 5px;
    }
`
const YouChatItem = styled.section`
margin-bottom: 20px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    span{
        margin-left: 10px;
        font-weight: 500;
        margin-bottom: 5px;
    }
`

const MyItem = styled.div`
    background-color: #68DCC4;
    border-radius: 15px;
    border-bottom-right-radius: 0px;
    max-width: 60%;
    font-size: 17px;
    line-height: 1.3;
    font-weight: 600;
    padding: 20px 10px;
    word-break: keep-all;
    text-align: right;

`
const YouItem = styled.div`
    background-color: #F5F5F5;
    max-width: 60%;
    border-radius: 15px;
    border-bottom-left-radius: 0px;
    font-size: 17px;
    font-weight: 600;
    line-height: 1.3;
    word-break: keep-all;
    padding: 20px 10px;

`


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

const Title= styled.div`
    color: rgb(24,62,78);
    margin-top:60px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 700;
    font-size: 22px;
    width: ${props => props.theme.mainWidth};
    max-width:580px;
    text-align: left;
    line-height: 1.3;
    p{
        font-weight: 500;
        font-size: 18px;
    }
`

const Wapper = styled.section`
    overflow: scroll;
    z-index: 2;
    background-color: white;
    width: 100%;
    margin-top: 50px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    display: flex;
    justify-content: center;
    padding-top: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`
const UnderTitle =styled.div`
    width: ${props => props.theme.mainWidth};
    max-width:580px;
    position: relative;
    margin-top: 40px;
`

const EndBtn = styled.button`
    cursor: pointer;
    z-index: 4;
    position: absolute;
    top : 10px;
    font-size: 20px;
    font-weight: 600;
    padding: 20px 0px;
    width: 100%;
    border: none;
    background-color: #B3EDE1;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    transition: all 0.15s;
    &:active{
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
        transition: all 0.15s;
    }
`

const BigBox = styled(motion.div)`
    width: 90%;
    max-width: 450px;
    height: 90vh;
    background-color: white;
    border-radius: 20px;
    position: relative;
`
const Overlay = styled(motion.div)`
    width: 100%;
    height: 100%;
    position: fixed;   // 다른것들보다 가장 위에 있게 함
    top:0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 200;
    background-color: rgba(0, 0, 0, 0.7);
`;

function ChatRoom () {
    const [clicked, setClicked] = useState(false)
    const isAtom = useRecoilValue(isChatId)
    const {register, handleSubmit, setValue} = useForm();
    const [info, setInfo] = useState([])
    

    const reGetChat = async() => {
        try{
            const chatData = await LogAPI.get(`chat/room/${localStorage.getItem("chat_key")}/`)
            setInfo(chatData.data)
        }catch(error){
            console.log(error)
        }
    }

    const onValid = async(data) => {
        const chat = {
            "content" : data.toDo
        }
        localStorage.setItem("insure_chat_key", localStorage.getItem("chat_key"))
        await LogAPI.post(`chat/room/${localStorage.getItem("chat_key")}/`, chat)
        reGetChat()
        setValue("toDo", "")
    }
    const getChat = async() => {
        var key = ""
        if ( localStorage.getItem("chat_key")){
            key = localStorage.getItem("chat_key")
        } else {
            key = localStorage.getItem("insure_chat_key")
        }
        try{
            const chatData = await LogAPI.get(`chat/room/${key}/`)
            setInfo(chatData.data)
        }catch(error){
            console.log(error)
        }
    }
    console.log(localStorage.getItem("chat_key"))
    useEffect(()=>{
        if(isAtom === ""){
            localStorage.setItem("chat_key", localStorage.getItem("insure_chat_key"))
        }else{
            localStorage.setItem("chat_key", isAtom)
            localStorage.setItem("insure_chat_key", localStorage.getItem("chat_key"))
        }
        getChat()
    },[isAtom])
    console.log(isAtom)
    console.log(info)

    const endChat = () => {
        setClicked(true)
    }


    return (
        <ToCenter>
            <Background>
                <Title>
                    <h1>{info?.topic} </h1>
                    <p>(으)로부터 시작된 채팅입니다</p>
                </Title>
                <UnderTitle>
                    <EndBtn onClick={endChat}>채팅종료</EndBtn>
                    <Wapper>
                    <Container>
            <ChatList>
                {info.chat_list && info.chat_list.map(i => (
                    i.is_user === 1 ? 
                    <MyChatItem key={i.chat.id}>
                        <span>{i.chat.created_at.slice(11,16)}</span>
                        <MyItem>
                            <p>
                            {i.chat.content}
                            </p>
                        </MyItem>
                    </MyChatItem> 
                    : 
                    <YouChatItem key={i.chat.id}>
                        <YouItem>
                            <p>
                            {i.chat.content}
                            </p>
                        </YouItem>
                        <span>{i.chat.created_at.slice(11,16)}</span>
                    </YouChatItem>
                ))}
            </ChatList>
            <ChatForm onSubmit={handleSubmit(onValid)}>
                <Chatinput {...register("toDo", {required : true})} />
                <ChatBtn>전송</ChatBtn>
            </ChatForm>
        </Container>
                    </Wapper>
                </UnderTitle>
            </Background>

            <AnimatePresence>{clicked ? 
                        <Overlay 
                            initial={{ opacity : 0}}
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                        >
                            <BigBox>
                                <ByeBox props={info}/>
                            </BigBox>
                        </Overlay> : null}
            </AnimatePresence>
        </ToCenter>
    );
}

export default ChatRoom;