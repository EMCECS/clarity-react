import * as React from "react";
import * as utils from '../../utils';
import {ResponsiveNavCodes} from "./ResponsiveNavCodes";

export type NavLevelProps = {
    // The level of navigation invoked.
    navLevel: number;

    // The navigation type (header, sub side).
    navType: string;
};

export class NavLevel extends React.Component<NavLevelProps> {
    render() {
        const classList: (string | undefined)[] = [
            (this.props.navType === ResponsiveNavCodes.NAV_TYPE_HEADER ?
                "header-nav" : undefined),
            (this.props.navType === ResponsiveNavCodes.NAV_TYPE_SIDE ?
                "sidenav" : undefined),
            (this.props.navType === ResponsiveNavCodes.NAV_TYPE_SUB ?
                "subnav" : undefined),
            "clr-nav-level-" + this.props.navLevel
        ];
        return (
            <nav className={utils.classNames(classList)}>
                {this.props.children}
            </nav>
        );
    }
}
