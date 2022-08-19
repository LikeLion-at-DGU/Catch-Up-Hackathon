import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import StarRatingComponent from 'react-star-rating-component';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogAPI } from '../../axios';

const Wapper = styled.div`
    width: 100%;
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    display: flex;
    flex-direction: column; 
    align-items: center;
    color : rgb(24,62,78);
`

const Title = styled.h1`
    font-size: 28px;
    font-weight: 700;
    width: 80%;
    margin-top: 50px;
`

const SubTitle = styled.h5`
    font-size: 20px;
    font-weight: 600;
    width: 80%;
    margin-top: 20px;
    margin-bottom: 20px;
`

const Form = styled.form`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Input = styled.textarea`
    width: 100%;
    padding: 12px 12px;
    border-radius: 10px;
    border: none;
    margin-top: 3px;
    height: 200px;
    background-color: #F5F5F5;
    resize: none;
`
const Star = styled(StarRatingComponent)`
    font-size: 40px;
    cursor: pointer;
    margin-bottom: 30px;
`
const Btn = styled.button`
    border: none;
    background-color: #68DCC4;
    font-size: 20px;
    font-weight: 600;
    padding: 15px 15px;
    margin-top: 20px;
    border-radius: 10px;
    cursor: pointer;
`

function ByeBox({props}) {
    const {register, handleSubmit} = useForm()
    const [star, setStar] = useState(0);
    const nav = useNavigate()

    const onStar = (nextValue, prevValue, name) => {
        setStar(Math.round(nextValue));
    }
    const onValid = async(data) => {
        try{
            const newData = {
                "chatroom_id" : String(props.chat_list[0].chat.chatroom),
                "rate" : star,
                "context" : data.content
            }
            await LogAPI.post("/posts/review/create/" ,newData);
            await LogAPI.delete(`/chat/room/${props.chat_list[0].chat.chatroo}`)
            nav("/chat")
        }catch(error){
            console.log(error)
        }
    }
    return(
        <Wapper>
            <Title>
                후기쓰기
            </Title>
            <SubTitle>
                채팅에 만족하셨나요?
            </SubTitle>
            <Star
                name="rate1" 
                starCount={5}
                value={star}
				starColor={"rgb(24,62,78)"}
                emptyStarColor={"rgba(0,0,0,0.3)"}
                onStarClick={onStar.bind(this)}
            />
            <SubTitle>
            내용을 작성해주세요
            </SubTitle>
            <Form onSubmit={handleSubmit(onValid)}>
            <Input {...register("content", {required:true})} placeholder="다른이들에게 공유하고 싶은 자신만의 이야기를 써보세요!" />
            <Btn>후기등록</Btn>
            </Form>
        </Wapper>
    );
}

export default ByeBox;