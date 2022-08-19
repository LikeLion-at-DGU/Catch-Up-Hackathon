import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { LogAPI } from '../../axios';
import { useEffect, useState } from 'react';

const Container = styled.form`
    width: ${props => props.theme.mainWidth};
    max-width:${props => props.theme.mainMaxWidth};
    display: flex;
    flex-direction: column;
    align-items: flex-end;
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
const FixBtn = styled.button`
    cursor: pointer;
    width: 75px;
    height: 40px;
    border: none;
    border-radius: 10px;
    background-color: ${props => props.theme.mainSecondBackColor};
    font-size: 18px;
    font-weight: 600;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`
const BtnCon = styled.div`
    display: flex;
`
const ProfilePoto= styled.div`
    display:flex ;
    flex-direction: column ;
    align-items:center ;
    margin-top: 20px;
    margin-bottom: 30px;
    position: relative;
`
const Poto = styled.input`
    display: none;
`
const Prepoto = styled.img`
    margin-top: 15px;
    width : 150px;
    height: 150px;
    border-radius: 150px;
`

const FixItem = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
`
const FixTitle = styled.span`
    font-size: 20px;
    font-weight: 600;
`
const FixInput = styled.input`
    border-radius : 10px;
    margin-top: 10px;
    padding: 5px 12px;
    border: none;
    background-color: #F5F5F5;
`
const TextInput = styled.textarea`
    padding: 12px 12px;
    border-radius: 10px;
    border: none;
    margin-top: 10px;
    background-color: #F5F5F5;
    resize: none;
    height: 7em;
`
const Icon = styled(FontAwesomeIcon)`
    font-size: 35px;
    cursor: pointer;
    position: absolute;
    bottom:1px;
    right:1px;
    
`


function FixProfileBox () {
    const navigate = useNavigate()
    const {register,  handleSubmit} = useForm();
    const [poto , setPoto] = useState()
    const [nick, setNick] = useState();
    const [intr, setIntr] = useState()
    const getProfile = async() => {
        try{
            const data = await LogAPI.get("/users/myprofile/")
            setPoto(data.data.profile.image)
            setNick(data.data.profile.nickname)
            setIntr(data.data.profile.introduction)
        }catch(error){
            console.log(error)
        }
    }
    useEffect(() => {
        getProfile()
    },[])

    function previewFile() {
        var preview = document.querySelector('img');
        var file = document.querySelector('input[type=file]').files[0];
        var reader = new FileReader();
        reader.addEventListener(
          'load',
          function () {
            preview.src = reader.result;
            setPoto(reader.result);
          },
          false
        );
        if (file) {
          reader.readAsDataURL(file);
        }
      }

    const onNick = (event) => {
        setNick(event.target.value)
    }

    const onIntr = (event) => {
        setIntr(event.target.value)
    }
    console.log(poto);
    
    const onValid = async (data) => {
        const newData = {
            "nickname" : nick,
            "introduction" : intr,
            "image" : poto ? poto : `https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927`,
        }
        try{
            await LogAPI.patch('/users/myprofile_update/', newData)
            navigate("/mypage")
        } catch(error){
            console.log(error)
        }
    } 
    return(
        <Container onSubmit={handleSubmit(onValid)}>
            <Box>
                {/* API 연동이후 작업하기!! */}
                <ProfilePoto>
                    <Prepoto src={poto ? poto : `https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927`}/>
                    <label for="file">
                        <Icon icon={faCirclePlus}/>
                    </label>
                    <Poto id="file" {...register("img")} onChange={previewFile} type="file"/>
                </ProfilePoto>
                <FixItem>
                    <FixTitle>닉네임</FixTitle>
                    <FixInput {...register("nickname" )} placeholder="닉네임을 입력하세요!" value={nick ? nick : ""} onChange={onNick} />
                </FixItem>
                <FixItem>
                    <FixTitle>한줄소개</FixTitle>
                    <TextInput 
                    {...register("intro" )} placeholder="자신을 소개해주세요!" value={intr ? intr : ""} 
                    onChange={onIntr}/>
                </FixItem>
            </Box>
            <BtnCon>
                <FixBtn as="div" style={{marginRight : "20px"}} onClick={()=>navigate("/mypage")}>취소</FixBtn>
                <FixBtn>수정</FixBtn>
            </BtnCon>
        </Container>
    )
}
export default FixProfileBox;