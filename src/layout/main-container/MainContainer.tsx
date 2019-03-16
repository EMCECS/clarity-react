import * as React from 'react';
import * as utils from "../../utils";
import {Header} from "../nav";

type MainContainerProps = {
    primaryNav?: React.ReactNode;
    secondaryNav?: React.ReactNode;
};

type MainContainerState = {
    leftNavOpen: boolean;
    rightNavOpen: boolean;
    isNavLevel1OnPage: boolean
    isNavLevel2OnPage: boolean
};

export class MainContainer extends React.PureComponent<MainContainerProps> {
    readonly state: MainContainerState;

    constructor(props: MainContainerProps) {
        super(props);
        let isNavLevel1OnPage = false;
        let isNavLevel2OnPage = false;
        if (typeof props.primaryNav !== "undefined" && props.primaryNav !== null) {
            isNavLevel1OnPage = true;
        }
        if (typeof props.secondaryNav !== "undefined" && props.secondaryNav !== null) {
            isNavLevel2OnPage = true;
        }
        this.state = {
            leftNavOpen: false,
            rightNavOpen: false,
            isNavLevel1OnPage,
            isNavLevel2OnPage
        };
    }

    handleHamburgerToggle = () => {
        const {leftNavOpen} = this.state;
        this.setState({leftNavOpen: !leftNavOpen});
    };

    handleRightSideToggle = () => {
        const {rightNavOpen} = this.state;
        this.setState({rightNavOpen: !rightNavOpen});
    };

    closeAll = () => {
        this.setState({leftNavOpen: false, rightNavOpen: false});
    };

    getClassList(): (string | undefined)[] {
        const {leftNavOpen, rightNavOpen} = this.state;
        return [
            "main-container",
            (leftNavOpen  ? "open-hamburger-menu" : undefined),
            (rightNavOpen ? "open-overflow-menu" : undefined)
        ];
    }

    render() {
        const {isNavLevel1OnPage, isNavLevel2OnPage} = this.state;
        const {primaryNav, secondaryNav} = this.props;
        return (
            <div className={utils.classNames(this.getClassList())}>
                <Header
                    isNavLevel1OnPage={isNavLevel1OnPage}
                    isNavLevel2OnPage={isNavLevel2OnPage}
                    onHamburgerToggle={this.handleHamburgerToggle}
                    onRightSideToggle={this.handleRightSideToggle}
                    onCloseAll={this.closeAll}>
                    <div className="branding">
                        <a href="#" className="nav-link">
                            <span className="logo dell-emc-logo"/>
                            <span className="title">ECS Flex</span>
                        </a>
                    </div>
                    {primaryNav}
                    <div className="header-actions"/>
                </Header>
                {secondaryNav}
                <div className="content-container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
