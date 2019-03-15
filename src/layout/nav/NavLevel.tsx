import * as React from "react";
import {ResponsiveNavCodes} from "./ResponsiveNavCodes";

export type NavLevelProps = {
    // The level of navigation invoked.
    navLevel: number;

    // The navigation type (header, sub side).
    navType: string;
};

export class NavLevel extends React.Component<NavLevelProps> {
    render() {
        let navClass: string[] = [];
        if (this.props.navType === ResponsiveNavCodes.NAV_TYPE_HEADER) {
            navClass = ["header-nav"];
        } else if (this.props.navType === ResponsiveNavCodes.NAV_TYPE_SIDE) {
            navClass = ["sidenav"];
        } else if (this.props.navType === ResponsiveNavCodes.NAV_TYPE_SUB) {
            navClass = ["subnav"];
        }
        navClass.push("clr-nav-level-" + this.props.navLevel);

        return <nav className={navClass.join(" ")}>{this.props.children}</nav>;
    }
}
