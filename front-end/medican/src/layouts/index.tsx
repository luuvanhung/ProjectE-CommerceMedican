import { default as React, ReactNode } from "react";
import FooterLayout from "./footer";
import HeaderLayout from "./header";
import "./style.scss";

export function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div style={{ position: "relative", minHeight: "100%F", top: "0" }}>
            <div id="sticky-layout">
                <HeaderLayout />
                <div className="stripe shadow">
                    <div className="row">{children}</div>
                </div>
            </div>
            <FooterLayout />
        </div>
    );
}
