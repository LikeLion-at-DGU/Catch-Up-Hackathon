import styled from 'styled-components';
import Img1 from '../components/about/aboutOne.png'
import Img2 from '../components/about/aboutTwo.png'
import Img3 from '../components/about/aboutThree.png'
import Img4 from '../components/about/aboutFourth.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from 'react-router-dom';



const Cricle1 = styled.div`
    width: 140px;
    height: 140px;
    border-radius: 140px;
    transform: rotate(-127.34deg);
    background: linear-gradient(88.94deg, rgba(187, 244, 143, 0) 24.15%, #BBF48F 99.09%);
    position: absolute;
    top: 30px;
    left : 20px;
`

const Cricle2 = styled.div`
    width: 300px;
    height: 300px;
    border-radius: 300px;
    background: linear-gradient(90deg, #68DCC4 19.27%, #BBF48F 100%);
    transform: rotate(-176.88deg);
    position: absolute;
    top: 350px;
    right : -90px;
`

const Cricle3 = styled.div`
    width: 500px;
    z-index: 0;
    height: 500px;
    border-radius: 500px;
    background: linear-gradient(90deg, #68DCC4 19.27%, #BBF48F 100%);
    transform: rotate(-43.76deg);
    position: absolute;
    top: 900px;
    left : -90px;
`

const Cricle4 = styled.div`
    width: 100px;
    z-index: 0;
    height: 100px;
    border-radius: 100px;
    background: linear-gradient(90deg, #68DCC4 19.27%, #BBF48F 100%);
    transform: rotate(200.76deg);
    position: absolute;
    top: 1450px;
    right : 70px;
`

const Cricle5 = styled.div`
    width: 300px;
    z-index: 0;
    height: 300px;
    border-radius: 300px;
    background: linear-gradient(90deg, #68DCC4 19.27%, #BBF48F 100%);
    transform: rotate(200.76deg);
    position: absolute;
    top: 1750px;
    left : 70px;
`


const ToCenter = styled.div`
    width:100vw;
    display: flex;
    justify-content: center;
    color:rgb(24,62,78);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`

const Background = styled.section`
    position: relative;
    overflow: hidden;
    background-color: ${props => props.theme.mainBackColor};
    max-width: 700px;
    width : 100%; 
    margin-top: 2.22px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const First = styled.section`
    z-index: 0;
    width: 100%;
    background: linear-gradient(51.83deg, #68DCC4 0%, #99EDFF 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
`
const FirstItem1 = styled.div`
    z-index: 10;
    margin-top: 80px;
    width: 80%;
    text-align: left;
    font-size: 26px;
    font-weight: 700;
    line-height: 1.55;
`
const FirstItem2 = styled.div`
    margin-top: 40px;
    width: 80%;
    text-align: right;
    font-size: 26px;
    font-weight: 700;
    line-height: 1.55;
`
const FirstItem3 = styled.div`
    margin-top: 50px;
    width: 80%;
    text-align: left;
    font-size: 20px;
    font-weight: 500;
    line-height: 1.55;
    margin-bottom: 100px;
`

const Second = styled.section`
    margin-top: 60px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

const SecondItem1 = styled.h1`
    width: 80%;
    text-align: left;
    font-size: 25px;
    font-weight: 700;
`

const SecondItem2 = styled.div`
    width: 80%;
    text-align: left;
    margin-top: 30px;
    font-size: 16px;
    line-height: 1.4;
    font-weight: 500;
    span{
        font-weight: 700;
    }
`

const SecondItem3 = styled.div`
    margin-bottom: 130px;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const SItemLeft = styled.div`
    width: 50%;
    text-align: left;
`
const SItemLeft2 = styled.div`
    width: 50%;
    text-align: right;
`


const SItemTitle = styled.div`
    font-size: 22px;
    font-weight: 800;
    margin-bottom: 20px;
`

const SItemSub = styled.div`
`

const SItemRight = styled.img`
    height: 200px;
    width: 50%;
`

const Thrid = styled.section`
    width: 100%;
    background: linear-gradient(90deg, #8FD3F4 0%, #84FAB0 100%);
    display: flex;
    justify-content: center;
    height: 120px;
    align-items: center;
`

const ThridContent = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    span:first-child{
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 20px;
    }
    span:last-child{
        font-size: 22px;
        font-weight: 800;
    }
`

const ThridContents = styled(Link)`
    width: 80%;
    font-size: 24px;
        font-weight: 700;

`

const Fourth = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const FourthTitle = styled.h1`
    margin-top: 50px;
    width: 80%;
    font-size: 25px;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 60px;
`

const FourthSlider = styled.div`
    width: 80%;
    margin-bottom: 100px;
`

const Box = styled.div`
margin-left: 15px;
margin-bottom: 25px;
box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    position: relative;
    height: 400px;
    width: 93%;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const BoxHead = styled.div`
    margin-top: 30px;
    width: 80%;
    align-items: center;
    display: flex;

`

const BoxStar = styled.div`
    margin-top: 25px;
    width: 80%;
`
const BoxBody = styled.div`
    margin-top: 20px;
    word-break: keep-all;
    line-height: 1.2;
    font-size: 18px;
    color:#3F3F3F;
    font-weight: 500;
    width: 80%;
`
const BoxWho = styled.div`
    position: absolute;
    bottom:30px;
    right: 10%;
    font-weight: 700;

`
const BoxImg = styled.img`
    width: 73px;
    height: 73px;
    border-radius: 50%;
`
const BoxTitle = styled.h1`
    margin-left: 10px;
    word-break: keep-all;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.1;
    
`
const Star = styled(FontAwesomeIcon)`
    font-size: 20px;
`
const Last = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 130px;
`
const LastHead = styled.h1`
    width: 80%;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 35px;
`
const LastList = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;

`
const LastItem = styled.div`
    margin-top: 30px;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-bottom: 2.2px solid rgba(24,62,78,0.4);
`
const ItemQ = styled.div`
    font-size: 22px;
    font-weight: 700;
    span{
        margin-right: 5px;
        font-size: 26px;
        font-weight: 700;
    }
    margin-bottom: 12px;
`
const ItemA = styled.div`
    font-size: 18px;
    display: flex;
    align-items: flex-start;
    margin-bottom: 30px;
    span{
        font-size: 26px;
        font-weight: 700;
        margin-right: 10px;
    }
    p{
        line-height: 1.4;
    }
`

function About(){
    return(
        <ToCenter>
            <Background>
                <First>
                    <FirstItem1>
                        인맥의 제한을 넘어,<br></br>
                        누구나 필요한 정보에<br></br>
                        접근할 수 있도록.<br></br>
                    </FirstItem1>
                    <FirstItem2>
                        누구나 자신만의 정보를<br></br>
                        공유할 수 있도록.
                    </FirstItem2>
                    <FirstItem3>
                        1:1 채팅 매칭 서비스<br></br>
                        CATCHUP이 함께합니다.
                    </FirstItem3>
                </First>
                <Second>
                    <SecondItem1>
                        CATCHUP이란?
                    </SecondItem1>
                    <SecondItem2>
                        CATCHUP은 청년들이 취업정보를 쉽게 접하고,<br></br>
                        누구나 정보를 공유할 수 있는 <span>진로 정보 플랫폼</span>입니다.
                    </SecondItem2>
                    <SecondItem2 style={{marginBottom:"150px"}}>
                        자신의 경험을 공유하고 싶은 사람과 정보를 얻고 싶은 사람은 <br></br>
                        <span>1:1 채팅</span>을 통해 시공간의 제약없이 자유롭게 대화할 수 있습니다.
                    </SecondItem2>
                    <SecondItem3>
                        <SItemLeft>
                            <SItemTitle>
                                누구나.
                            </SItemTitle>
                            <SItemSub>
                                경력이나 분야에 제약없이
                            </SItemSub>
                        </SItemLeft>
                        <SItemRight src={Img1}>
                        </SItemRight>
                    </SecondItem3>
                    <SecondItem3>
                        <SItemRight src={Img2}>
                        </SItemRight>
                        <SItemLeft2>
                            <SItemTitle>
                                원하는 정보를.
                            </SItemTitle>
                            <SItemSub>
                            관심있는 게시글을 읽어본 후
                            </SItemSub>
                        </SItemLeft2>
                    </SecondItem3>
                    <SecondItem3>
                        <SItemLeft>
                            <SItemTitle>
                                1대1로.
                            </SItemTitle>
                            <SItemSub>
                                자신만의 상황을 솔직하게
                            </SItemSub>
                        </SItemLeft>
                        <SItemRight src={Img3}>
                        </SItemRight>
                    </SecondItem3>
                    <SecondItem3>
                        <SItemRight src={Img4}>
                        </SItemRight>
                        <SItemLeft2>
                            <SItemTitle>
                                채팅을 통해서.
                            </SItemTitle>
                            <SItemSub>
                                서로의 시간에 구애받지 않고
                            </SItemSub>
                        </SItemLeft2>
                    </SecondItem3>
                </Second>
                <Thrid>
                    <ThridContent>
                        <span>CATCHUP 신규가입자에게는 누구나</span>
                        <span>최소 2번의 채팅기회 무료!</span>
                    </ThridContent>
                </Thrid>
                <Fourth>
                    <FourthTitle>
                        <h1>언제든 어디서나 채팅으로.<br></br>
                        CATCHUP 이용후기</h1>
                    </FourthTitle>
                    <FourthSlider>
                    <Swiper 
                        slidesPerView={1.5}
                        scrollbar={{ draggable: true }} 
                        className="mySwiper"
                        mousewheel={true}
                        keyboard={true}
                        grabCursor={true}
                    >
                        <SwiperSlide >
                            <Box style={{backgroundColor:"rgba(104,220,196)"}}>
                                <BoxHead>
                                    <BoxImg src = {"https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"}></BoxImg>
                                    <BoxTitle>3.03의 NAVER 클라우드 보안 직무 최종합격 후기</BoxTitle>
                                </BoxHead>
                                <BoxStar>
                                    <Star icon={faStar}/>
                                    <Star icon={faStar}/>
                                    <Star icon={faStar}/>
                                    <Star icon={faStar}/>
                                    <Star icon={faStar}/>
                                </BoxStar>
                                <BoxBody>
                                글을 보고 궁금한 점이 많았었는데 알고싶은 부분에 대해 상세하고 쉽게 설명해 주셔서 감사합니다. 향후 생각해보아야 할 점도 많이 얻고 갑니다.
                                </BoxBody>
                                <BoxWho>
                                    네카라쿠데타
                                </BoxWho>
                            </Box>
                        </SwiperSlide>
                        <SwiperSlide >
                            <Box>
                            <BoxHead>
                                    <BoxImg src = {"https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"}></BoxImg>
                                    <BoxTitle>금융공기업 A부터 Z 까지 <br></br>- 한국은행편</BoxTitle>
                                </BoxHead>
                                <BoxStar>
                                <Star icon={faStar}/>
                                    <Star icon={faStar}/>
                                    <Star icon={faStar}/>
                                    <Star icon={faStar}/>
                                    <Star icon={faStar} style={{color:"#A5B0B4"}}/>
                                </BoxStar>
                                <BoxBody>
                                친절하게 답변을 잘 해주셨습니다! 제가 궁금했던 부분에 대해서 자세하게 답변해주셔서 궁금증이 많이 해소 되었습니다! 감사합니다
                                </BoxBody>
                                <BoxWho>
                                    종이의 집
                                </BoxWho>
                            </Box>
                        </SwiperSlide>
                        <SwiperSlide >
                            <Box style={{backgroundColor:"rgba(104,220,196)"}}>
                            <BoxHead>
                                    <BoxImg src = {"https://images.unsplash.com/photo-1640951613773-54706e06851d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"}></BoxImg>
                                    <BoxTitle>대학원 진학 전 반드시 체크해야할 5가지</BoxTitle>
                                </BoxHead>
                                <BoxStar>
                                <Star icon={faStar}/>
                                    <Star icon={faStar}/>
                                    <Star icon={faStar}/>
                                    <Star icon={faStar}/>
                                    <Star icon={faStar}/>
                                </BoxStar>
                                <BoxBody>
                                대학원 정보를 알아보는 것이 막막하게만 느껴졌는데, 정보글도 물론 도움이 되었고, 이후에 채팅까지 하고 나니 어떤 부분을 준비해야할지 조금 보이기 시작한 것 같아요!! 감사합니다!
                                </BoxBody>
                                <BoxWho>
                                    나는야 교수님
                                </BoxWho>
                            </Box>
                        </SwiperSlide>
                        <SwiperSlide >
                            <Box>
                            <BoxHead>
                                    <BoxImg src = {"https://images.unsplash.com/photo-1623582854588-d60de57fa33f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"}></BoxImg>
                                    <BoxTitle>한컴재직자가 보는 메타버스</BoxTitle>
                                </BoxHead>
                                <BoxStar>
                                <Star icon={faStar}/>
                                    <Star icon={faStar}/>
                                    <Star icon={faStar}/>
                                    <Star icon={faStar}/>
                                    <Star icon={faStar}/>
                                </BoxStar>
                                <BoxBody>
                                궁금했던 내부 현황들을 시원시원하게 말씀해주시는 덕분이 외부시각에서의 갈증이 상당히 많이 해소 되었고, 개인적인 질문들도 흔쾌히 응해주셔서 감사합니다. 준비하며 업데이트 있을 시 질문드려도 되겠지요? 평온 저녁 되세요 
                                </BoxBody>
                                <BoxWho>
                                    MC메타
                                </BoxWho>
                            </Box>
                        </SwiperSlide>
                    </Swiper>
                    </FourthSlider>
                </Fourth>
                <Thrid>
                    <ThridContents to="/how">
                        CATCHUP 이용방법 알아보러 가기 &rarr;
                    </ThridContents>
                </Thrid>
                <Last>
                    <LastHead>
                    CATCHUP 자주묻는 질문
                    </LastHead>
                    <LastList>
                        <LastItem>
                            <ItemQ><span>Q</span> 채팅은 어떻게 이루어지나요?</ItemQ>
                            <ItemA><span>A</span> <p>정보글 하단에 있는 ‘채팅하기’ 버튼을 누르면 주의사항과 함께 채팅이 시작됩니다. 채팅창에 궁금한 점을 먼저 질문해보세요!</p>  </ItemA>
                        </LastItem>
                        <LastItem>
                            <ItemQ><span>Q</span> 츄르가 무엇인가요?</ItemQ>
                            <ItemA><span>A</span> <p>츄르는 채팅을 이용할 수 있는 가상의 화폐입니다. 채팅이 시작되면 글쓴이가 정해놓은 츄르개수만큼 결제됩니다. 신규가입자에게는 츄르 100개가 무료로 증정됩니다.</p>  </ItemA>
                        </LastItem>
                        <LastItem>
                            <ItemQ><span>Q</span> 츄르는 어떻게 얻을 수 있나요?</ItemQ>
                            <ItemA><span>A</span> <p>1. 츄르충전소에서 원하는 만큼의 츄르를 유료결제할 수 있습니다.<br></br>
2. 자신의 경험을 담은 게시글을 츄르 개수와 함께 공유하면 채팅 종료 후 해당 개수의 츄르를 받을 수 있습니다.</p>  </ItemA>
                        </LastItem>
                        <LastItem>
                            <ItemQ><span>Q</span> 채팅을 종료하고 싶어요.</ItemQ>
                            <ItemA><span>A</span> <p>채팅은 신청자가 ‘채팅종료'버튼을 누를 때 종료됩니다.  글쓴이는 임의로 채팅을 종료 할 수 없습니다.</p>  </ItemA>
                        </LastItem>
                        <LastItem style={{border : "none"}}>
                            <ItemQ><span>Q</span> 채팅시 주의할점이 있나요?</ItemQ>
                            <ItemA><span>A</span> <p>CATCHUP채팅에서는 개인정보 보호를 위해 전화번호나 이메일 교환이 제한되고 있습니다. 채팅창에 전화번호 혹은 이메일이 입력될 경우 경고창이 뜨니 이 점 유의하시기 바랍니다.</p>  </ItemA>
                        </LastItem>
                    </LastList>
                    
                </Last>

                <Cricle1/>
                <Cricle2/>
                <Cricle3/>
                <Cricle4/>
                <Cricle5/>
            </Background>
        </ToCenter>
    )   
}
export default About;