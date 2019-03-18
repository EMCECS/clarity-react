import * as React from "react";
import * as utils from '../../utils';

export type NavProps = {
    // The level of navigation invoked.
    navLevel: NavLevel;

    // The navigation type (header, sub side).
    navType: NavType;
};

export enum NavLevel {
    PRIMARY = "1",
    SECONDARY = "2"
}

export enum NavType {
    HEADER = "NAV_TYPE_HEADER",
    SIDE = "NAV_TYPE_SIDE",
    SUB = "NAV_TYPE_SUB"
}

export class Nav extends React.PureComponent<NavProps> {
    private static classForNavType(navType: NavType): string {
        switch (navType) {
            case NavType.HEADER:
                return "header-nav";
            case NavType.SIDE:
                return "sidenav";
            case NavType.SUB:
                return "subnav";
            default:
                return "header-nav";
        }
    }

    private static classForNavLevel(navLevel: NavLevel): string {
        return "clr-nav-level=" + navLevel;
    }

    render() {
        const {children, navLevel, navType} = this.props;
        const classList: string[] = [
            Nav.classForNavType(navType),
            Nav.classForNavLevel(navLevel)
        ];
        return (
            <nav className={utils.classNames(classList)}>
                {children}
            </nav>
        );
    }
}
