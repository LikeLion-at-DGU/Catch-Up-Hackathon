import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart, faEye, faCircleXmark , faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardBox from './BoardBox';
import { LogAPI, API } from '../../axios';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { isBox } from '../../atoms';

const SearchWapper = styled.section`
    width: ${props => props.theme.mainWidth};
    max-width:${props => props.theme.mainMaxWidth};
`

const SearchSession = styled.section`
    width:100%;
    margin-bottom: 40px;
`

const SearchForm = styled.form`
    width:100%;
    position: relative;
`

const SearchInput = styled.input`
    width:100%;
    height: 45px;
    font-size: 22px;
    padding-left: 42px;
    border : none;
    border-radius: 15px;
    background-color: #F5F5F5;
`

const SearchInputIcon = styled(FontAwesomeIcon)`
    position: absolute;
    bottom : 9px;
    left: 8px;
    font-size: 27px;
`



const Wapper = styled.section`
    max-width: 700px;
    width : 100%; 
    color: rgb(24,62,78);
`
const List = styled.section`
    margin-top: 50px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 60px 0;
    background-color: rgba(104,220,196);
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 60vh;
`

const BoxWapper = styled(motion.div)`
    width: ${props => props.theme.mainWidth};
    max-width:${props => props.theme.mainMaxWidth};
`

const Box = styled(motion.div)`
    margin-bottom: 40px;
    background-color: white;
    display: flex;
    padding: 20px 15px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.5s;
    &:hover{
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
        transition: all 0.5s;
    }
`

const BoxProfile = styled.section`
    width : 15%;
    margin-right: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const BoxInfo = styled.section`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const Img = styled.img`
    width : 60px;
    height : 60px;
    border-radius: 50%;
    margin-bottom: 10px;
`

const Name = styled.p`
    font-size: 13px;
    opacity: 0.7;
    font-weight: 600;
    text-align: center;
`
const Title = styled.p`
    font-size: 22px;
    font-weight: 700;
    line-height: 1.2;
`

const BoxChatInfo = styled.section`
    display: flex;
    margin-top: 15px;
    color : rgba(0,0,0,0.4);
    font-size: 14px;
    margin-bottom: 7px;
`

const Icon = styled(FontAwesomeIcon)`
    
`

const Rate = styled.div`
    display: flex;
    p{
        position: relative;
        top: 1px;
        margin-left: 5px;
    }
`

const ChatNum = styled.div`
    margin-left: 15px;
    display: flex;
    p{
        position: relative;
        top: 1px;
        margin-left: 5px;
    }
`

const Tags = styled.div`
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    line-height: 1.2;
    p{
        margin-right: 5px;
    }
    
`

const Like = styled.div`
    margin-left: 15px;
    display: flex;
    p{
        position: relative;
        top: 1px;
        margin-left: 5px;
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
    background-color: #B3EDE1;
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

const BoardDivider = styled.div`
    max-width: 700px;
    width : 100%; 
    height: 3px;
    border-radius: 4px;
    background-color: black;
`

function BoardList(){
    const [clicked, setClicked] = useRecoilState(isBox);
    const [clickedInfo, setClickedInfo] = useState([]);
    const [info, setInfo] = useState([])
    const navigator = useNavigate();
    const {register, handleSubmit} = useForm();

    const getList = async() => {
        try{
            if(localStorage.getItem("user")){
                const data = await LogAPI.get("/posts/")
                setInfo(data.data)
            }else{
                const data = await API.get("/posts/")
                setInfo(data.data)
            }
        }catch(error){
            console.log(error)
        }
    }

    const onBoxClick = (i) => {
        setClicked(prev => !prev);
        setClickedInfo(i)
    }

    const onOverlayClick = () =>{
        setClicked(prev => !prev);
    }

    const onValid = async(data) => {
        try{
            navigator(`/board/search/${data.search}`)
        } catch(error){
            console.log(error)
        }
    }
    console.log(info)
    useEffect(() => {
        getList()
    },[clicked])

    return(
        <>
        <SearchWapper>
            <SearchSession>
                <SearchForm onSubmit={handleSubmit(onValid)}>
                    <SearchInputIcon icon={faMagnifyingGlass}/>
                    <SearchInput 
                        {...register("search", {required : true} )}
                        placeholder = "제목, 내용, 해시태그 검색" >
                    </SearchInput>
                </SearchForm>
            </SearchSession>
        </SearchWapper>
        <BoardDivider />
        <Wapper>
            <List>
                {info?.map(prev => (
                    <BoxWapper layoutId={prev.post.id+""} onClick={() => onBoxClick(prev)} key={prev.post.id}>
                        <Box >
                        <BoxProfile>
                            <Img src={prev.writer.image ? prev.writer.image : `https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927`} />
                            <Name>{prev.writer.nickname}</Name>
                        </BoxProfile>
                        <BoxInfo>
                            <Title>{prev.post.title}</Title>
                            <Tags>{prev.tag.map(i => <p>{i}</p>)}</Tags>
                            <BoxChatInfo>
                                <Rate>
                                    <Icon icon={faStar} />
                                    <p>{prev.rate}</p>
                                </Rate>
                                <Like>
                                    <Icon icon={faHeart} />
                                    <p>{prev.post.like_users.length}</p>
                                </Like>
                                <ChatNum>
                                    <Icon icon={faEye} />
                                    <p>{prev.post.view_users}</p>
                                </ChatNum>
                            </BoxChatInfo>
                        </BoxInfo>
                    </Box>
                    </BoxWapper>
                ))}
            </List>

            {/* 모달창 */}
            <AnimatePresence>{clicked ? 
                        <Overlay 
                            initial={{ opacity : 0}}
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                        >
                            <BigBox layoutId={clickedInfo?.post.id+""} >
                                <BoardBox props={clickedInfo}/>
                                <XMark onClick = {onOverlayClick} icon={faCircleXmark} />
                            </BigBox>
                        </Overlay> : null}
            </AnimatePresence>
        </Wapper></>
    );
}

export default BoardList;