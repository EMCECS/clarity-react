import * as React from 'react';
import * as utils from "../../utils";
import {Header, ClassNames as NavClassNames} from "../nav";
import {ClassNames} from ".";

export type MainContainerProps = {
    title: string;
    primaryNav?: React.ReactNode;
    secondaryNav?: React.ReactNode;
};

const initialState = {
    leftNavOpen: false,
    rightNavOpen: false,
};

type MainContainerState = Readonly<typeof initialState>;

export class MainContainer extends React.PureComponent<MainContainerProps> {
    readonly state: MainContainerState = initialState;

    private static propIsSet(prop: any): boolean {
        return (typeof prop !== "undefined" && prop !== null);
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
            ClassNames.CONTAINER_CLASS,
            (leftNavOpen ? NavClassNames.HAMBURGER_MENU : undefined),
            (rightNavOpen ? NavClassNames.OVERFLOW_MENU : undefined)
        ];
    }

    render() {
        const {children, primaryNav, secondaryNav, title} = this.props;
        return (
            <div className={utils.classNames(this.getClassList())}>
                <Header
                    isNavLevel1OnPage={MainContainer.propIsSet(primaryNav)}
                    isNavLevel2OnPage={MainContainer.propIsSet(secondaryNav)}
                    onHamburgerToggle={this.handleHamburgerToggle}
                    onRightSideToggle={this.handleRightSideToggle}
                    onCloseAll={this.closeAll}
                >
                    <div className="branding">
                        <a href="#" className="nav-link">
                            <span className="logo dell-emc-logo"/>
                            <span className="title">
                                {title}
                            </span>
                        </a>
                    </div>
                    {primaryNav}
                    <div className="header-actions"/>
                </Header>
                {secondaryNav}
                <div className="content-container">
                    {children}
                </div>
            </div>
        );
    }
}
