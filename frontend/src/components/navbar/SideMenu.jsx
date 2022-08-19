import  styled  from 'styled-components';
import { motion  ,AnimatePresence} from "framer-motion";
import { useRecoilState } from "recoil";
import { isMenu } from '../../atoms';
import { Link, useNavigate } from 'react-router-dom';

const Container = styled.div`
    width:100%;
    display: flex;
    justify-content: center;

`

const Wapper = styled(motion.div)`
    background: white;
    max-width: 800px;
    width : 100%; 
    height: 2600px; // 나중에 높이에 따라서 바꿔야 하는 설정!!
    position: absolute;
    top: 52.2px;
    z-index: 100;
    display: flex;
    justify-content: center;
`

const sideMenuVars = {
	//initial부분
	start : {
        opactiy: 0,
        translateX :500,
    },
	// animate + transition부분
	end : {opactiy : 1, translateX:0, transition: {type : "tween"}},
}

const MList = styled.section`
    margin-top: 50px;
    width : 80%; 
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 600;
    color:rgb(24,62,78);
`

const Item = styled.div`
    font-size: 24px;
    font-weight: 800;
    margin-bottom : 30px;
    opacity : 0.8;
    cursor: pointer;
`

const Log = styled.div`
    font-size: 32px;
    font-weight: 800;
    margin-bottom : 60px;
    opacity : 1;
`

const LogOut = styled.div`
    font-size: 32px;
    font-weight: 800;
    margin-bottom : 60px;
    opacity : 1;
`

function SideMenu(){
    const [isMenuClick ,setisMenuClick] = useRecoilState(isMenu);
    const navigate = useNavigate();
    const onLog = () => {
        setisMenuClick(prev => !prev);
    }
    const onLogout = () => {
        localStorage.clear()
        setisMenuClick(prev => !prev);
        navigate("/")
        window.location.reload();
    }
    const onClick = () => {
        setisMenuClick(prev => !prev);
    }
    const onBoard= () => {
        setisMenuClick(prev => !prev);
        navigate("/board")
        window.location.reload();
    }
    const onChat = () => {
        setisMenuClick(prev => !prev);
        if (localStorage.getItem("user")){
            navigate("/chat");
            window.location.reload();
        }else{
            alert("로그인 이후 사용가능하십니다!")
            navigate("/login")
        }
    }
    const onMypage = () => {
        setisMenuClick(prev => !prev);
        if (localStorage.getItem("user")){
            navigate("/mypage")
            window.location.reload();
        }else{
            alert("로그인 이후 사용가능하십니다!")
            navigate("/login")
        }

    }

    return(
        <Container>
            <AnimatePresence>
                {isMenuClick && (<Wapper variants={sideMenuVars} initial="start" animate="end" exit={{ scale: 0 }}>
                    <MList>
                        {
                            localStorage.getItem("user") ? <Link to="/">
                                <LogOut onClick={onLogout}>로그아웃</LogOut> 
                            </Link>: <Link to="/login">
                            <Log onClick={onLog}>
                                로그인
                            </Log>
                        </Link>
                        }
                        <Link to="/about">
                            <Item onClick={onClick}>
                                CATUP 소개
                            </Item>
                        </Link>
                        <Link to="/how">
                            <Item onClick={onClick}>
                                CATUP 사용방법
                            </Item>
                        </Link>
                            <Item onClick={onBoard}>
                                멘토들의 이야기
                            </Item>
                        <Item onClick={onChat}>
                            채팅하기
                        </Item>
                        <Item onClick={onMypage}>
                            마이페이지
                        </Item>
                    </MList>
                </Wapper>)}
                </AnimatePresence>
        </Container>
    );
}

export default SideMenu;


// 사라지는 효과 수정하기