import * as React from "react";
import {ResponsiveNavCodes} from "../nav/ResponsiveNavCodes";
import Header from "../nav/Header";
import NavLevel from "../nav/NavLevel";

export type MainContainerProps = {
    // bubble to where header component will be able to access???
    toggle: () => void;
};

type mainStates = {
    containerClass: string;
};

export default class MainContainer extends React.PureComponent {
    classList: string[] = ["main-container"];
    state: mainStates = {
        containerClass: "main-container",
    };

    constructor(props: any) {
        super(props);
        this.state = {
            containerClass: this.classList.join(" "),
        };
    }

    toggleNav(controlCode: string, navLevel: number) {
        let navClass: string = ResponsiveNavCodes.NAV_CLASS_HAMBURGER_MENU;
        if (controlCode === ResponsiveNavCodes.NAV_CLOSE_ALL) {
            this.unRegisterClass(ResponsiveNavCodes.NAV_CLASS_HAMBURGER_MENU);
            this.unRegisterClass(ResponsiveNavCodes.NAV_CLASS_OVERFLOW_MENU);
        } else if (navLevel === ResponsiveNavCodes.NAV_LEVEL_1) {
            this.controlNav(controlCode, navClass);
        } else if (navLevel === ResponsiveNavCodes.NAV_LEVEL_2) {
            navClass = ResponsiveNavCodes.NAV_CLASS_OVERFLOW_MENU;
            this.controlNav(controlCode, navClass);
        }

        this.setState((prevState, props) => {
            return {containerClass: this.classList.join(" ")};
        });
    }

    unRegisterClass(className: string) {
        const index = this.classList.indexOf(className);
        if (index > -1) {
            this.classList.splice(index, 1);
        }
    }

    registerClass(className: string) {
        if (!className || this.isClassRegistered(className)) {
            return;
        }
        this.classList.push(className);
    }

    isClassRegistered(className: string): boolean {
        if (this.classList.indexOf(className) > -1) {
            console.error("Multiple class " + className + " attributes found. Please make sure that only one exists");
            return true;
        }
        return false;
    }

    controlNav(controlCode: string, navClass: string): void {
        if (controlCode === ResponsiveNavCodes.NAV_OPEN) {
            this.registerClass(navClass);
        } else if (controlCode === ResponsiveNavCodes.NAV_CLOSE) {
            this.unRegisterClass(navClass);
        } else if (controlCode === ResponsiveNavCodes.NAV_TOGGLE) {
            if (this.classList.indexOf(navClass) > -1) {
                this.unRegisterClass(navClass);
            } else {
                this.registerClass(navClass);
            }
        }
    }

    closeAll() {
        this.toggleNav(ResponsiveNavCodes.NAV_CLOSE_ALL, -1);
    }

    render() {
        const navList: number[] = [2, 1];
        const {containerClass} = this.state;
        const {NAV_TYPE_HEADER, NAV_TYPE_SUB, NAV_LEVEL_1, NAV_LEVEL_2} = ResponsiveNavCodes;
        return (
            <div className={containerClass}>
                <Header navList={navList} onToggle={this.toggleNav.bind(this)} onCloseAll={this.closeAll.bind(this)}>
                    <div className="branding">
                        <a href="#" className="nav-link">
                            <span className="logo dell-emc-logo" />
                            <span className="title">ECS Flex</span>
                        </a>
                    </div>
                    <NavLevel navType={NAV_TYPE_HEADER} navLevel={NAV_LEVEL_1}>
                        <a href="www.google.com" className="nav-link">
                            <span className="nav-text">home</span>
                        </a>
                        <a href="www.google.com" className="nav-link">
                            <span className="nav-text">about</span>
                        </a>
                    </NavLevel>
                    <div className="header-actions" />
                </Header>
                <NavLevel navType={NAV_TYPE_SUB} navLevel={NAV_LEVEL_2}>
                    <ul className="nav">
                        <li className="nav-item">
                            <a className="nav-link active" href="#">
                                Dashboard
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Management
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Cloud
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Tenants
                            </a>
                        </li>
                    </ul>
                </NavLevel>
                <div className="content-container">
                    <main className="content-area">test main</main>
                    {/* <div className="sidenav clr-nav-level-2">
                        <div className="sidenav-content">
                            <a href="#" className="nav-link active">
                                Nav Element 1
                            </a>
                            <a href="#" className="nav-link">
                                Nav Element 2
                            </a>
                        </div>
                    </div> */}
                </div>
            </div>
        );
    }
}
