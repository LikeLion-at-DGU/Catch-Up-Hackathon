import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdBadge, faLock, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { isUser } from '../../atoms';
import { API } from '../../axios';

const Wapper = styled.div`
    width: 100%;
    height: 100%;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    margin-top: 30px;
`
const FormSection = styled.div`
    position: relative;
    margin-top: 20px;
    margin-bottom: 10px;
`

const IDInput = styled.input`
    border : none;
    font-size: 18px;
    background-color: #F5F5F5;
    padding: 8px 0px 8px 38px;
    border-radius: 10px;
    width: 260px;
`

const PWInput = styled.input`
    border : none;
    font-size: 18px;
    background-color: #F5F5F5;
    padding: 7px 0px 7px 38px;
    border-radius: 10px;
    width: 260px;
`

const Icon = styled(FontAwesomeIcon)`
    position: absolute;
    left : 10px;
    top:6px;
    font-size: 22px;
`

const TCheckRe = styled.div`
    display: flex;
    text-align: left;
    width: 260px;
    color: rgb(24,62,78);
    align-items: center;
    margin-top: 2px;
    opacity: 1;
`

const TCheckCricle = styled.div`
    width:20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid rgb(24,62,78);
    margin-left: 3px;
    margin-right: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`
const TCheckIcon = styled(FontAwesomeIcon)`
    color: rgb(24,62,78);
`

const CheckRe = styled.div`
    display: flex;
    text-align: left;
    width: 260px;
    color: rgb(24,62,78);
    align-items: center;
    margin-top: 2px;
    opacity: 0.5;
`

const CheckCricle = styled.div`
    width:20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid rgb(24,62,78);
    margin-left: 3px;
    margin-right: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`
const CheckIcon = styled(FontAwesomeIcon)`
    color: rgb(24,62,78);
`
const SubBtn = styled.button`
    width : 260px;
    height: 45px;
    border-radius: 10px;
    border: none;
    margin-top: 30px;
    cursor: pointer;
    background-color: rgba(104,220,196);
    color: white;
    font-size: 24px;
    font-weight: 600;
`


function Log() {
    const {register, handleSubmit,formState} = useForm();
    const [isRe, setIsRe] = useState(false);
    const navigate = useNavigate();
    const setAtom = useSetRecoilState(isUser);

    const onValid = async(data) => {
        const result = {
            "username": data.id,
            "password": data.pw,
        };
        try{
            await API.post('/login/', result).then(
                response => {
                    localStorage.setItem("user", response.data.access_token,);
                    setAtom(response.data.access_token);
                }
            )
            navigate("/")
            window.location.reload();
        } catch(error){
            console.log(error)
        }
    }

    const onFaile = () => {
        window.alert(Object.values(formState.errors)[0].message)
    }
    
    return(
        <Wapper>
            <Form onSubmit={handleSubmit(onValid, onFaile)}>
                <FormSection>
                    <Icon icon={faIdBadge} />
                    <IDInput {...register("id" , {required:true})} placeholder="아이디"></IDInput>
                </FormSection>
                <FormSection>
                    <Icon icon={faLock} />
                    <PWInput {...register("pw" , {required:true})} placeholder="비밀번호" type="password"></PWInput>
                </FormSection>
                {isRe ? <TCheckRe>
                    <TCheckCricle onClick={() => setIsRe(prev => !prev)}>
                        <TCheckIcon icon={faCheck} />
                    </TCheckCricle>
                    <p>로그인 상태 유지</p>
                </TCheckRe> : <CheckRe>
                    <CheckCricle onClick={() => setIsRe(prev => !prev)}>
                        <CheckIcon icon={faCheck} />
                    </CheckCricle>
                    <p>로그인 상태 유지</p>
                </CheckRe>}
                <SubBtn>
                    <p>로그인</p>
                </SubBtn>
            </Form>
        </Wapper>
    );
}

export default Log;