import Link from "next/link";
import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, status } = useSession();

  return (
    <>
      <div className="navbar">
        <a className="navbar__logo" href="/">
          pig is picks
        </a>
        <div className="navbar__list">
          <Link
            href="/stores"
            className="navbar__list--item"
            onClick={() => setIsOpen(false)}
          >
            맛집 목록
          </Link>
          <Link
            href="/stores/new"
            className="navbar__list--item"
            onClick={() => setIsOpen(false)}
          >
            맛집 등록
          </Link>
          <Link
            href="/users/likes"
            className="navbar__list--item"
            onClick={() => setIsOpen(false)}
          >
            찜한 가게
          </Link>
          <Link
            href="/users/mypage"
            className="navbar__list--item"
            onClick={() => setIsOpen(false)}
          >
            마이페이지
          </Link>
          {status === "authenticated" ? (
            <button type="button" onClick={() => signOut()}>
              로그아웃
            </button>
          ) : (
            <Link
              href="/api/auth/signin"
              className="navbar__list--item"
              onClick={() => setIsOpen(false)}
            >
              로그인
            </Link>
          )}
        </div>
        {/*Mobile button */}
        <div
          role="presentation"
          className="navbar__button"
          onClick={() => setIsOpen((val) => !val)}
        >
          {isOpen ? <AiOutlineClose /> : <BiMenu />}
        </div>
      </div>
      {/*Mobile navbar */}
      {isOpen && (
        <div className="navbar--mobile">
          <div className="navbar__list--mobile">
            <Link
              href="/stores"
              className="navbar__list--item--mobile"
              onClick={() => setIsOpen(false)}
            >
              맛집 목록
            </Link>
            <Link
              href="/stores/new"
              className="navbar__list--item--mobile"
              onClick={() => setIsOpen(false)}
            >
              맛집 등록
            </Link>
            <Link
              href="/users/likes"
              className="navbar__list--item--mobile"
              onClick={() => setIsOpen(false)}
            >
              찜한 가게
            </Link>
            <Link
              href="/users/mypage"
              className="navbar__list--item--mobile"
              onClick={() => setIsOpen(false)}
            >
              마이페이지
            </Link>
            <Link
              href="/api/auth/signin"
              className="navbar__list--item--mobile"
            >
              로그인
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
