import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import StarRatingComponent from 'react-star-rating-component';

const Wapper = styled.section`
    height: 600px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    z-index: 2;
`

const Header = styled.div`
    margin-top: 40px;
    color : ${props => props.theme.mainColor};
    display: flex;
    width: ${props => props.theme.mainWidth};
    max-width:${props => props.theme.mainMaxWidth};
    justify-content: space-between;
    align-items: center;
`

const Title = styled.h2`
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 700;
    font-size: 24px;
`

const MoreInfo = styled(FontAwesomeIcon)`
`

const reviewArray = [
    {
        title : "컴공 2점대 Naver 서버개발자 취업 후기",
        body : "궁금했던 점과 고민들이 시원하게 해결됐습니다. 캣취업하기를 정말 잘한 거 같아요!! 다음에 또 신청하겠습니다!! 감사합니다.",
        rate : 4,
        who: "안경잡이",
        img : "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        id : 1
    },
    {
        title : "대학원 간 썰",
        body : "늦은 시간 생산적인 조언 많이 해주셔서 감사합니다! 잘 참고해서 성공적인 연협하겠습니다 :) 편안한 밤 보내시길 바라요",
        rate : 5,
        who: "대학원의 노예",
        img : "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=798&q=80",
        id : 2
    },
    {
        title : "지방대에서 구글 본사 가기까지",
        body : "현실적인 조언을 주셔서 감사합니다. 제 포트폴리오의 가장 큰 문제점이 무엇인지에 대해서 알 수 있었고, 현재 시점에서 어떤 회사에 입사했을 때 가장 성장할 수 있을지에 대란 조언도 아낌없이 해주셨습니다. ",
        rate : 4,
        who: "개발 잘하고 싶어요",
        img : "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80",
        id : 3
    },
]

const Review = styled.section`
    width: ${props => props.theme.mainWidth};
    max-width:${props => props.theme.mainMaxWidth};
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`

const Box = styled.div`
    font-family: 'Inter', sans-serif;
    width: 100%;
    height: 150px;
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
    background-color: white;
    border-radius: 18px;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color:${props => props.theme.mainColor};
`

const Star = styled(StarRatingComponent)`
    font-size: 20px;
`

const BoxHeader = styled.section`
    margin-top: 2%;
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const BoxTitle = styled.p`
    font-size: 13px;
`

const BoxMiddle = styled.section`
    display: flex;
    margin-top: 3%;
    width: 90%;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
`

const BoxImg = styled.img`
    width : 60px;
    height : 60px;
    border-radius: 50%;

`
const BoxBody = styled.p`
    font-size: 15px;
    width : 80%;
`

const BoxFooter = styled.div`
    width: 90%;
    margin-top: 2%;
    font-size: 14px;
    text-align: right;
`


function MainReview() {
    return (
        <Wapper>
            <Header>
                <Title>CATCHUP한 사람들의 생생한 후기</Title>
                <MoreInfo icon={faCirclePlus} size="2x"/>
            </Header>
            <Review>
                {reviewArray.map(prev => (
                    <Box key={prev.id}>
                        <BoxHeader>
                            <BoxTitle>
                                {prev.title}
                            </BoxTitle>
                            <Star
                                name={`rate${prev.id}`}
                                starCount={5}
                                value={prev.rate}
                                starColor={"#3A2217"}
                                emptyStarColor={"rgba(0,0,0,0.5)"}/>
                        </BoxHeader>
                        <BoxMiddle>
                            <BoxImg src={prev.img} />
                            <BoxBody>
                                {prev.body}
                            </BoxBody>
                        </BoxMiddle>
                        <BoxFooter>
                            {prev.who}
                        </BoxFooter>
                    </Box>
                ))}
            </Review>
        </Wapper>
    )
}

export default MainReview;