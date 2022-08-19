import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleXmark  } from "@fortawesome/free-solid-svg-icons";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { useState, useEffect } from 'react';

import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import BoardBox from '../board/BoardBox';
import { LogAPI, API } from '../../axios';

const Background = styled.section`
    height: 370px;
    width: 100%;
    background-color : #F5F5F5;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`
const Header = styled.div`
    margin-top: 40px;
    color : rgb(24,62,78);
    display: flex;
    width: ${props => props.theme.mainWidth};
    max-width:${props => props.theme.mainMaxWidth};
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`

const Title = styled.h2`
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 700;
    font-size: 24px;
`

const MoreInfo = styled(FontAwesomeIcon)`
    cursor: pointer;
`

const Insight = styled.section`
    width: ${props => props.theme.mainWidth};
    max-width:${props => props.theme.mainMaxWidth};
    color : ${props => props.theme.mainColor};
    display: flex;
    justify-content: center;
`

const Box = styled(motion.div)`
    margin-top: 15px;
    width: 96%;
    height: 200px;
    margin-bottom: 10px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    background-color: white;
    border-radius: 20px;
    display: grid;
    grid-template-rows: 0.9fr 2.3fr 1fr;
`

const BoxCategory = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    color : #9B9B9B;
    font-size: 14px;
    p{
        width : 90%
     }
    
`

const BoxTitle = styled.p`
    display: flex;
    color : rgb(24,62,78);
    justify-content: center;
     width: 100%;
     font-family: 'Inter', sans-serif;
     font-size : 19px;
     font-weight: 600;
     line-height: 1.3;
     p{
        width : 90%
     }
`

const BoxChatInfo = styled.div`
    width: 90%;
    display: flex;
    justify-content: flex-end;
    div{
        display: flex;
        flex-direction: column;
        p{
            text-align: right;
            color : #9B9B9B;
        }
        p:first-child{
            font-size: 14px;
            margin-bottom: 4px;
        }
        p:last-child{
            font-size: 20px;
            font-weight: 600;
        }
    }

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
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.7);
`;

const BigBox = styled(motion.div)`
    width: 90%;
    max-width: 450px;
    height: 90vh;
    background-color: white;
    border-radius: 20px;
    position: relative;
`

const XMark = styled(FontAwesomeIcon)`
    font-size: 32px;
    position: absolute;
    top:15px;
    right: 15px;
    cursor: pointer;
`



function MainInsight(){
    const [clicked, setClicked] = useState(false);
    const [clickedInfo, setClickedInfo] = useState([]);
    const [info, setInfo] = useState([])
    const navigate = useNavigate();

    const onBoxClick = (i) => {
        setClicked(prev => !prev);
        setClickedInfo(i)
    }

    const onBoard = () => {
        navigate("/board")
        window.location.reload();
    }

    const onOverlayClick = () =>{
        setClicked(prev => !prev);
        setClickedInfo([]);
    }

    const getList = async() => {
        try{
            if(localStorage.getItem("user")){
                const data = await LogAPI.get("/posts/mainpage/")
                setInfo(data.data.posts)
            }else{
                const data = await API.get("/posts/mainpage/")
                setInfo(data.data.posts)
            }
        }catch(error){
            console.log(error)
        }
    }
    console.log(info)

    useEffect(() => {
        getList()
    },[clicked])

    return (
        <Background>
            <Header>
                <Title>CATCHUP 들여다보기</Title>
                <MoreInfo onClick={onBoard} icon={faCirclePlus} size="2x"/>
            </Header>
            <Insight>
                <Swiper slidesPerView={2.2}
                        scrollbar={{ draggable: true }} 
                        className="mySwiper"
                        mousewheel={true}
                        keyboard={true}
                        grabCursor={true}
                >
                    {info?.map(i => (
                        <SwiperSlide key={i.post.id} >
                            <Box layoutId={i.post.id+""} onClick={() => onBoxClick(i)}>
                                <BoxCategory><p>{i.tag[0]} {i.tag[1]}</p></BoxCategory>
                                <BoxTitle>
                                    <p>{i.post.title}</p>
                                </BoxTitle>
                                <BoxChatInfo>
                                    <div>
                                        <p>관심있는 사람 수</p>
                                        <p>{i.post.like_users.length}</p>
                                    </div>
                                </BoxChatInfo>
                            </Box>
                        </SwiperSlide>
                    ))}
                    
                    {/* 모달창 */}
                    <AnimatePresence>{clicked ? 
                        <Overlay
                            initial={{ opacity : 0}}
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                        >
                            <BigBox layoutId={clickedInfo?.id+""} >
                                <BoardBox props={clickedInfo}/>
                                <XMark onClick = {onOverlayClick} icon={faCircleXmark} />
                            </BigBox>
                        </Overlay> : null}
                    </AnimatePresence>

                </Swiper>
            </Insight>
        </Background>
    )
}

export default MainInsight;