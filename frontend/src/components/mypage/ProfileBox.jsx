import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
import { LogAPI } from '../../axios';

const Container = styled.section`
    width: ${props => props.theme.mainWidth};
    max-width:${props => props.theme.mainMaxWidth};
    display: flex;
    flex-direction: column;
`
const Box = styled.div`
    width: 100%;
    background-color : white;
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: rgb(24,62,78);
    border-radius: 25px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`

const ImgBox = styled.div`
    width : 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

`
const Prepoto = styled.img`
    margin-top: 15px;
    width : 80px;
    height: 80px;
    border-radius: 80px;
`
const Name = styled.div`
    margin-top: 10px;
    font-size: 24px;
    font-weight: 600;
`
const NickName = styled.div`
    font-size: 14px;
    opacity: 0.6;
    margin-top: 10px;
`

const InfoBox = styled.div`
    margin-top: 30px;
    width : 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const InfoItem = styled.div`
    display: flex;
    flex-direction: column;
`
const ItemTitle = styled.span`
    font-size: 24px;
    font-weight: 600;
`
const ItemBody = styled.span`
    margin-top: 10px;
    font-size: 18px;
    text-align: center;
`

const IntroBox = styled.div`
    margin-top: 30px;
    width : 80%;
    margin-bottom: 25px;
    
`
const IntroTitle = styled.span`
    font-size: 24px;
    font-weight: 600;
`
const IntroBody = styled.p`
    margin-top: 10px;
    word-break: keep-all;
    line-height: 1.2;
`
const FixBtn = styled.button`
    cursor: pointer;
    width: 75px;
    height: 40px;
    border: none;
    border-radius: 10px;
    background-color: ${props => props.theme.mainSecondBackColor};
    align-self: flex-end;
    font-size: 18px;
    font-weight: 600;
    margin-top: 20px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`



function ProfileBox () {
    const [info, setInfo] = useState()
    const navigate = useNavigate()
    const getProfile = async() => {
        try{
            const data = await LogAPI.get("/users/myprofile/")
            setInfo(data.data)
        }catch(error){
            console.log(error)
        }
    }
    console.log(info)
    useEffect(() => {
        getProfile()
    },[])

    return (
        <Container>
        <Box>
            <ImgBox>
                <Prepoto src={info?.profile.image ? info?.profile.image : `https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927`}/>
                <Name>{info?.profile.nickname}</Name>
                <NickName>Basic</NickName>
            </ImgBox>
            <InfoBox>
                <InfoItem>
                    <ItemTitle>
                        Chur
                    </ItemTitle>
                    <ItemBody>
                        {info?.profile.churu}
                    </ItemBody>
                </InfoItem>
                <InfoItem>
                    <ItemTitle>
                        Star
                    </ItemTitle>
                    <ItemBody>
                        {info?.rate}/5
                    </ItemBody>
                </InfoItem>
                <InfoItem>
                    <ItemTitle>
                        Chat
                    </ItemTitle>
                    <ItemBody>
                        {info?.room_count}
                    </ItemBody>
                </InfoItem>
            </InfoBox>
            <IntroBox>
                <IntroTitle>
                    한줄 소개
                </IntroTitle>
                <IntroBody>
                    {info?.profile.introduction}
                </IntroBody>
            </IntroBox>
        </Box>
        <FixBtn onClick={()=>navigate("/mypage/fix")}>수정</FixBtn>
        </Container>
    );
}

export default ProfileBox;