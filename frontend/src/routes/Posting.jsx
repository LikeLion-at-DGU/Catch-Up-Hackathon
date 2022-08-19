import styled from 'styled-components';
import {useForm} from "react-hook-form";
import PostingHash from '../components/posting/PostingHash';
import { useRecoilValue } from 'recoil';
import { isTag } from '../atoms';
import { LogAPI } from '../axios';
import { useNavigate } from 'react-router-dom';

const ToCenter = styled.div`
width:100vw;
display: flex;
justify-content: center;
`

const Background = styled.section`
    background-color: ${props => props.theme.mainBackColor};
    max-width: 700px;
    width : 100%; 
    margin-top: 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Title = styled.h1`
    margin-top:40px;
    margin-bottom: 30px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 700;
    font-size: 30px;
    width: ${props => props.theme.boardWidth};
    max-width:${props => props.theme.boardMaxWidth};
    text-align: left;
    color : rgb(24,62,78);
`

const Form = styled.form`
    display: flex;
    width: ${props => props.theme.boardWidth};
    max-width:${props => props.theme.boardMaxWidth};
    flex-direction: column;
    align-items: center;
`

const FormSection = styled.div`
    width: 100%;
    margin-bottom: 25px;
`

const SubTitle = styled.h3`
    font-size: 18px;
    color : rgb(24,62,78);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 700;
    margin-bottom: 7px;
`

const TitleInput = styled.input`
    width: 100%;
    border-radius: 10px;
    border: none;
    margin-top: 3px;
    background-color: #F5F5F5;
    padding: 8px 10px;
`

const TextInput = styled.textarea`
    width: 100%;
    padding: 12px 12px;
    border-radius: 10px;
    border: none;
    margin-top: 3px;
    background-color: #F5F5F5;
    resize: none;
    height: 25em;
`

const ChurInput  = styled.input`
    width: 60%;
    border: none;
    margin-top: 3px;
    border-radius: 10px;
    background-color: #F5F5F5;
    padding: 8px 10px;
    margin-bottom: 20px;
`

const TagSection = styled.div`
    position: absolute;
    top : 620px;
    width: ${props => props.theme.boardWidth};
    max-width:${props => props.theme.boardMaxWidth};
`

const FormBtn = styled.button`
    width : 30%;
    margin-bottom: 80px;
    padding: 10px;
    border: none;
    background-color: rgba(104,220,196);
    color : rgb(24,62,78);
    border-radius: 10px;
    font-size: 22px;
    font-weight: 800;
    cursor: pointer;
`



function Posting(){
    const isAtom = useRecoilValue(isTag);
    const {register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onValid = async(data) => {
        const newData = {...data, isAtom}
        const sendData = {
            "title" : newData.title,
            "content" : newData.content,
            "tag" : newData.isAtom,
            "coin" : newData.chur
        }
        try{
            await LogAPI.post('/posts/', sendData)
            navigate("/board")
        } catch(error){
            console.log(error)
        }
    }

    return(
        <ToCenter>
            <Background>
                <Title>정보 공유하기</Title>
                <Form onSubmit={handleSubmit(onValid)}>
                    <FormSection>
                        <SubTitle>제목</SubTitle>
                        <TitleInput {...register("title", {required:true})} placeholder="제목을 입력해주세요."></TitleInput>
                    </FormSection>
                    <FormSection>
                        <SubTitle>내용</SubTitle>
                        <TextInput {...register("content", {required:true})} placeholder="다른이들에게 공유하고 싶은 자신만의 이야기를 써보세요!"></TextInput>
                    </FormSection>
                    <FormSection style={{marginTop: "170px"}}>
                        <SubTitle>츄르 (1~50개)</SubTitle>
                        <ChurInput type ={'number'} {...register("chur", {required:true, min:"1", max:"50"})} placeholder="원하는 츄르 갯수를 입력해주세요!"></ChurInput>
                    </FormSection>
                    <FormBtn>전송</FormBtn>
                </Form>
                <TagSection>
                        <SubTitle>태그</SubTitle>
                        <PostingHash />
                </TagSection>
            </Background>
        </ToCenter>
    )
}

export default Posting;