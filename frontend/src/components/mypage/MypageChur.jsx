import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from 'react';
import { LogAPI } from '../../axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';


const ToCenter = styled.div`
width:100vw;
display: flex;
justify-content: center;
`

const Background = styled.section`
background-color: #68DCC4;
max-width: 700px;
width : 100%; 
min-height: 100vh;
margin-top: 2.22px;
display: flex;
flex-direction: column;
align-items: center;
`

const Title = styled.h1`
    color: rgb(24,62,78);
    margin-top:40px;
    margin-bottom: 15px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 700;
    font-size: 36px;
    width: ${props => props.theme.mainWidth};
    max-width:${props => props.theme.mainMaxWidth};
    text-align: left;
`

const SubTitle = styled.h4`
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 18px;
    font-weight: 600;
    width: ${props => props.theme.mainWidth};
    max-width:${props => props.theme.mainMaxWidth};
    text-align: left;
    color: rgb(24,62,78);
    opacity: 0.6;
    margin-bottom: 55px;
`

const Box = styled.div`
    color: rgb(24,62,78);
    width: ${props => props.theme.mainWidth};
    max-width:${props => props.theme.mainMaxWidth};
    background-color: white;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Head = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

`
const Arrow = styled(FontAwesomeIcon)`
    font-size: 70px;
    margin-top : 40px;
`
const Footer = styled.div`
    margin-top: 40px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 50px;
`
const HeadTitle = styled.h6`
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
`
const HeadForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`
const Input = styled.input`
    background-color: #F5F5F5;
    padding: 5px 3px;
    border: none;
    width: 40%;
    margin-bottom: 10px;
    border-radius: 5px;
`
const Btn = styled.button`
    border: none;
    background-color: #68DCC4;
    color: rgb(24,62,78);
    font-size: 20px;
    border-radius: 5px;
    font-weight: 600;
    padding: 7px 15px;
    cursor: pointer;
`
const FooterTitle = styled.h6`
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
`
const FooterNum = styled.span`
    font-size : 60px;
    font-weight: 800;
    text-align: center;
`


function MypageChur () {
    const [chur, setChur] = useState()
    const navigate = useNavigate()
    const {register, handleSubmit, setValue} = useForm();

    const getChur = async() => {
        try{
            const data = await LogAPI.get("/users/churu_charge/")
            setChur(data.data)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getChur()
    },[])

    const onValid = async(data) => {
        const newData = {
            "churu_charging" : data.churuNum
        }
        try{
            await LogAPI.patch('/users/churu_charge/', newData)
            navigate("/mypage")
        } catch(error){
            console.log(error)
        }
        setValue("churuNum", "");
    }

    return(
        <ToCenter>
            <Background>
                <Title>Chur충전소</Title>
                <SubTitle>채팅에 필요한 Chur를 충전하세요!</SubTitle>
                <Box>
                    <Head>
                        <HeadTitle>Chur 충전하기</HeadTitle>
                        <HeadForm onSubmit={handleSubmit(onValid)}>
                            <Input {...register("churuNum" , {required : true}) } placeholder="원하는 Chur를 입력해주세요!" />
                            <Btn type="submit">확인</Btn>
                        </HeadForm>
                    </Head>
                    <Arrow icon={faCloudArrowDown}></Arrow>
                    <Footer>
                        <FooterTitle>현재보유 Chur</FooterTitle>
                        <FooterNum>{`${chur?.churu}`}</FooterNum>
                    </Footer>
                </Box>
            </Background>
        </ToCenter>
    );

}
export default MypageChur;