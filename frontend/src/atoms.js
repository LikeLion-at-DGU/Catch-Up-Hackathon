import { atom } from "recoil";

// navbar에서 메뉴버튼 눌렀을 때 나오는 사이드메뉴
export const isMenu = atom({
    key: "isMenu",
    default: false,
});

// posting에서 tag들을 다루는 atom
export const isTag = atom({
    key:"isTag",
    default: [],
})

export const isUser = atom({
    key:"isUser",
    default : ""
})

export const isBox = atom({
    key:"isBox",
    default: false,
})

// atom함수에 인자들
// 1. 첫번째 인자 : key --> 이름인데 유일해야 함
// 2. 두번째 인자 : default --> key값의 기본인자