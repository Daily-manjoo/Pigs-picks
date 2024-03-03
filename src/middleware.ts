export {default} from "next-auth/middleware";

export const config = {
    matcher: ["/users/mypage", "/stores/new", "/stores/:id/edit", "/stores/likes"] //로그인 인증 필요한 게시판
};