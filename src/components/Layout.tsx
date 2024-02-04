import { ReactNode } from "react";
import NavBar from "./Navbar";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({children}: LayoutProps){ //App페이지에 적용될 수 있도록
    return(
        <div className="layout">
            <NavBar />
            {children}
        </div>
    )
}