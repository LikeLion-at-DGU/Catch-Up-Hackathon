import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.section`
    margin-top: 20px;
    width: ${props => props.theme.mainWidth};
    max-width:${props => props.theme.mainMaxWidth};
    display: flex;
    flex-direction: column;
`

const List = styled.div`
    color: rgb(24,62,78);
    width: 100%;
    background-color: white;
    height: 60px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    font-size: 20px;
    font-weight: 600;
    margin-top: 25px;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`

const CList = styled.div`
    color: rgb(24,62,78);
    width: 100%;
    background-color: #68DCC4;
    height: 60px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    font-size: 20px;
    font-weight: 600;
    margin-top: 25px;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`

function ProfileList () {
    const navigate = useNavigate()
    return (
        <Container>
            <List onClick={() => navigate("/mypage/like")}>
                내가 좋아요 누른 글 &rarr;
            </List>
            <List onClick={() => navigate("/mypage/preview")}>
                나에게 도착한 후기들 &rarr;
            </List>
            <CList onClick={() => navigate("/mypage/chur")}>
                Chur 충전하러가기 &rarr;
            </CList>
        </Container>
    );
}
export default ProfileList;