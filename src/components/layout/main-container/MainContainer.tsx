import * as React from "react";
import {ResponsiveNavCodes} from "../nav/ResponsiveNavCodes";
import Header from "../nav/Header";

export type MainContainerProps = {
    primaryNav?: React.ReactNode;
    secondaryNav?: React.ReactNode;
};

type mainContainerState = {
    navList: number[];
    leftNavOpen: boolean;
    rightNavOpen: boolean;
};

export default class MainContainer extends React.PureComponent<
    MainContainerProps
> {
    state: mainContainerState;

    constructor(props: any) {
        super(props);
        let navList: number[] = [];
        if (props.primaryNav) {
            navList.push(ResponsiveNavCodes.NAV_LEVEL_1);
        }
        if (props.secondaryNav) {
            navList.push(ResponsiveNavCodes.NAV_LEVEL_2);
        }
        this.state = {
            navList: navList,
            leftNavOpen: false,
            rightNavOpen: false,
        };
    }

    handleHamburgerToggle() {
        const {leftNavOpen} = this.state;
        this.setState({leftNavOpen: !leftNavOpen});
    }

    handleRightSideToggle() {
        const {rightNavOpen} = this.state;
        this.setState({rightNavOpen: !rightNavOpen});
    }

    closeAll() {
        this.setState({leftNavOpen: false, rightNavOpen: false});
    }

    getClassList() {
        let classList: string[] = [ResponsiveNavCodes.MAIN_CONTAINER_CLASS];
        const {leftNavOpen, rightNavOpen} = this.state;
        if (leftNavOpen) {
            classList.push(ResponsiveNavCodes.NAV_CLASS_HAMBURGER_MENU);
        }
        if (rightNavOpen) {
            classList.push(ResponsiveNavCodes.NAV_CLASS_OVERFLOW_MENU);
        }
        return classList;
    }

    render() {
        const {navList} = this.state;
        const {primaryNav, secondaryNav} = this.props;
        return (
            <div className={this.getClassList().join(" ")}>
                <Header
                    navList={navList}
                    onHamburgerToggle={this.handleHamburgerToggle.bind(this)}
                    onRightSideToggle={this.handleRightSideToggle.bind(this)}
                    onCloseAll={this.closeAll.bind(this)}
                >
                    <div className="branding">
                        <a href="#" className="nav-link">
                            <span className="logo dell-emc-logo" />
                            <span className="title">ECS Flex</span>
                        </a>
                    </div>
                    {primaryNav}
                    <div className="header-actions" />
                </Header>
                {secondaryNav}
                <div className="content-container">{this.props.children}</div>
            </div>
        );
    }
}
