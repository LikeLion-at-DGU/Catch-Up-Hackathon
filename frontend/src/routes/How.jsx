import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence,  useScroll } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ToCenter = styled.div`
width:100vw;
display: flex;
justify-content: center;
margin-top: 7px;
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`

const Background = styled.section`
max-width: 700px;
width : 100%; 
display: flex;
flex-direction: column;
align-items: center;
`

const Title = styled.h1`
    margin-top: 60px;
    font-size: 32px;
    font-weight: 800;
    color: rgb(24,62,78);
`
const SubTitle = styled.h4`
    text-align: left;
    color: rgb(24,62,78);
    font-weight: 600;
    opacity: 0.6;
    font-size: 14px;
    margin-top: 10px;
`

const Container = styled.section`
    width: 100%;
    margin-top: 70px;
    display: flex;
    align-items: center;
    flex-direction: column;
`

const Grid = styled.div`
    width: ${props => props.theme.mainWidth};
    max-width:${props => props.theme.mainMaxWidth};
    display: grid;
    grid-template-columns: 9fr 1fr 9fr;
	grid-template-rows: repeat(18, 46px);
`

const One = styled.div`
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    border-radius: 10px;
    grid-row : 1 / span 6;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
`
const Two = styled.div`
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    border-radius: 10px;
    grid-column: 3 / span 1;
    grid-row : 4 / span 6;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
`
const Three = styled.div`
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    border-radius: 10px;
    grid-row : 10 / span 6;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
`
const Four = styled.div`
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    border-radius: 10px;
    grid-column: 3 / span 1;
    grid-row : 13 / span 6;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
`

const BoxTitle = styled.h4`
    width: 80%;
    margin-top: 20px;
    font-size: 22px;
    font-weight: 700;
    color: rgb(24,62,78);
`

const Body = styled.p`
    margin-top: 30px;
    line-height: 1.3;
    word-break: keep-all;
    width: 80%;
    color: rgb(24,62,78);
`
const Circle = styled(motion.div)`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(240deg, #84fab0 0%, #8fd3f4 100%);
    z-index: -1;
`

const Btn = styled(motion.div)`
    margin-top: 120px;
    margin-bottom: 100px;
    background: white;
    font-size: 32px;
    border-radius: 10px;
    font-weight: 700;
    text-align: center;
    height: 70px;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    transition: all 0.3s;
    &:active{
        transition: all 0.3s;
        box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
    }
`

const NewBtn = styled(motion.div)`
    margin-top: 120px;
    margin-bottom: 100px;
    border-radius: 10px;
    cursor: pointer;
    background: linear-gradient(240deg, #84fab0 0%, #8fd3f4 100%);
    height: 70px;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    transition: box-shadow 0.3s;
    &:active{
        transition: box-shadow 0.3s;
        box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
    }
    z-index: 5;
    position: absolute;
    top:0;
    left:0;
`

const BtnWapper = styled.div`
    position: relative;
    width: ${props => props.theme.mainWidth};
    max-width:${props => props.theme.mainMaxWidth};
`
const BtnH = styled.div`
    position: absolute;
    top : 135px;
    left: 0;
    z-index: 100;
    font-size: 32px;
    border-radius: 10px;
    font-weight: 700;
    text-align: center;
    width: 100%;
    cursor: pointer;
`

const Overlay = styled(motion.div)`
    width: 100vw;
    height: 100vh;
    position: fixed;   // 다른것들보다 가장 위에 있게 함
    top:0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 200;
    background: linear-gradient(240deg, #84fab0 0%, #8fd3f4 100%);
`

const Logo = styled.svg`
    path:first-child{
        stroke-width: 2;
        stroke: white;
    }
    path:last-child{
        stroke-width: 1;
        stroke: white;
    }
`

const svg = {
    start: { pathLength: 0, fill: "rgba(255, 255, 255, 0)" },
  end: {
    fill: "rgba(255, 255, 255, 1)",
    pathLength: 1,
  },
}


function How(){
    const [num, setNum] = useState(1)
    const {scrollYProgress} = useScroll();
    const [clicked , setClicked] = useState(false)
    const nav = useNavigate()
    
    useEffect(() => {
        scrollYProgress.onChange(()=>{
            console.log("a")
            if(scrollYProgress.get() < 0.16){
                setNum(1)
            }else if(scrollYProgress.get() < 0.35){
                setNum(2)
            }else if(scrollYProgress.get() < 0.65){
                setNum(3)
            }else if(scrollYProgress.get() < 0.95){
                setNum(4)
            }else if(scrollYProgress.get() >= 0.95){
                setNum(5)   
            }
        })
    },[scrollYProgress])

    const onClick = () => {
        setClicked(true)
        setTimeout(function() {
            nav("/");
        }, 3500);
    }

    return(
        <ToCenter>
            <Background>
                <Title>
                    CATCHUP 이용방법
                </Title>
                <SubTitle>공과 함께 이용방법을 알아보세요!</SubTitle>
                <Container>
                    <Grid>
                        <One onClick={()=>setNum(1)}>
                            <BoxTitle>
                                1.탐색하기
                            </BoxTitle>
                            <Body>
                            해시태그를 이용해 자신이 원하는 분야, 커리어에 관한 글을 찾을 수 있습니다.
                            </Body>
                            {num === 1 && <Circle layoutId = "circle" style={{marginTop :"40px"}}/>}
                        </One>
                        <Two onClick={()=>setNum(2)}>
                            <BoxTitle>
                            2.질문하기
                            </BoxTitle>
                            <Body>
                            글의 내용만으로 부족하다면 글쓴이에게 질문을 담은 채팅을 신청할 수 있습니다.
                            </Body>
                            {num === 2 && <Circle layoutId = "circle" style={{scale : 1.4, marginTop :"35px"}} />}
                        </Two>
                        <Three onClick={()=>setNum(3)}>
                            <BoxTitle>
                            3.채팅하기
                            </BoxTitle>
                            <Body>
                            1:1 채팅을 통해, 본인의 상황과 가장 맞는 살아있는 정보를 얻을 수 있습니다.
                            </Body>
                            {num === 3 && <Circle layoutId = "circle" style={{scale : 1.8, marginTop :"40px"}} />}
                        </Three>
                        <Four onClick={()=>setNum(4)}>
                            <BoxTitle>
                            4.후기작성하기
                            </BoxTitle>
                            <Body>
                            채팅이 끝난 후, 후기작성을 통해 정보를 원하는 다른 사람들에게 도움을 줄 수 있습니다.
                            </Body>
                            {num === 4 && <Circle layoutId = "circle" style={{scale : 2.1, marginTop :"30px", zIndex : "5"}} />}
                        </Four>
                    </Grid>
                    <BtnWapper>
                        {num === 5 && <NewBtn onClick={onClick} layoutId='circle'></NewBtn>}
                        <BtnH onClick={onClick}>CATCHUP 시작하기</BtnH>
                        <Btn isActive={num === 5} ></Btn>
                    </BtnWapper>
                </Container>
            </Background>
            <AnimatePresence>{clicked ? 
                        <Overlay 
                            initial={{ opacity : 0}}
                            animate={{ opacity: 1 }} 
                        >
                            <Logo xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 54 54" fill="none">
                                <motion.path variants={svg} initial="start" animate="end" transition={{
                                    default : {duration : 2.5},
                                    fill : {duration : 1.5, delay:5},
                                }} d="M27 52C40.8071 52 52 40.8071 52 27C52 13.1929 40.8071 2 27 2C13.1929 2 2 13.1929 2 27C2 40.8071 13.1929 52 27 52Z" stroke="#68DCC4"/>
                                <motion.path variants={svg} initial="start" animate="end" transition={{
                                    default : {duration : 2.5},
                                    fill : {duration : 1.5, delay:5},
                                }} d="M36.9629 22.0397C36.6968 21.2707 36.1917 20.6029 35.5187 20.1304C34.8457 19.6578 34.0386 19.4043 33.211 19.4055H30.0331V10.1758L28.6975 10.363C25.6679 10.7877 23.3079 12.2944 21.684 14.8412C20.5131 16.6771 19.9688 18.7022 19.7162 20.2169C17.9723 21.5337 16.4552 23.3467 15.2014 25.6137C14.1448 27.524 13.2701 29.7629 12.6015 32.2685C11.4719 36.502 11.319 40.0136 11.3131 40.161L11.3125 44.225H13.6523V40.2322C13.6815 39.6415 14.4183 26.7151 21.4794 21.793L21.8933 21.5044L21.9613 21.0106C22.3134 18.4538 23.5302 14.231 27.6929 12.933V21.702H33.211C33.5494 21.701 33.8795 21.8041 34.155 21.9969C34.4305 22.1897 34.6374 22.4624 34.7467 22.7766C35.6796 25.479 37.2826 28.8607 39.7808 30.4499L39.0295 33.2149C38.768 34.201 38.1731 35.0707 37.3423 35.6818C36.5114 36.2928 35.4938 36.609 34.456 36.5786C32.3596 36.5168 30.1776 36.7852 27.9703 37.376L27.1079 37.6067V44.225H29.448V39.3785C31.0651 39.0036 32.7246 38.834 34.3857 38.874C35.95 38.9163 37.4831 38.4389 38.7363 37.5191C39.9896 36.5993 40.8895 35.2911 41.2903 33.8066L42.54 29.2078L41.6093 28.8164C39.8689 28.0843 38.2188 25.6777 36.9629 22.0397Z" fill="#68DCC4"/>
                            </Logo>
                        </Overlay> : null}
            </AnimatePresence>
        </ToCenter>
    )   
}
export default How;