import * as React from "react";
import {ResponsiveNavCodes} from "./ResponsiveNavCodes";

export type HeaderProps = {
    // navList is a list of numbers representing the navigation components enabled
    // in the pane
    navList?: number[];

    // onHamburgerToggle handles toggle actions for the left side navigation
    // "hamburger" icon"
    onHamburgerToggle?: () => void;

    // onRightSideToggle handles toggle actions for the left side navigation
    // vertical ellipsis icon
    onRightSideToggle?: () => void;

    // onCloseAll handles a call made to close all in this component. The logic
    // for handling the closeAll action is within the parent object, and will
    // have an effect on navList property.
    onCloseAll?: () => void;
};

type navStates = {
    isNavLevel1OnPage: boolean;
    isNavLevel2OnPage: boolean;
};

export class Header extends React.PureComponent<HeaderProps> {
    state: navStates = {
        isNavLevel1OnPage: false,
        isNavLevel2OnPage: false,
    };

    constructor(props: HeaderProps) {
        super(props);
        this.state = this.initializeNavTriggers(props);
    }

    // initializeNavTriggers sets the navigation state for this component based
    // on whether each navLevel is contained within the navList
    private initializeNavTriggers(props: HeaderProps): navStates {
        if (!props.navList)
            return {isNavLevel1OnPage: false, isNavLevel2OnPage: false};
        const {NAV_LEVEL_1, NAV_LEVEL_2} = ResponsiveNavCodes;
        let isNavLevel1OnPage = false,
            isNavLevel2OnPage = false;
        if (props.navList && props.navList.length > 2) {
            console.error("More than 2 Nav Levels detected.");
            return {isNavLevel1OnPage, isNavLevel2OnPage};
        }
        props.navList.forEach(navLevel => {
            if (navLevel === NAV_LEVEL_1) {
                isNavLevel1OnPage = true;
            } else if (navLevel === NAV_LEVEL_2) {
                isNavLevel2OnPage = true;
            }
        });
        return {isNavLevel1OnPage, isNavLevel2OnPage};
    }

    render() {
        const {onCloseAll, onHamburgerToggle, onRightSideToggle} = this.props;
        const {isNavLevel1OnPage, isNavLevel2OnPage} = this.state;

        return (
            <header className="header">
                {isNavLevel1OnPage && (
                    <button
                        className="header-hamburger-trigger"
                        type="button"
                        onClick={onHamburgerToggle}
                    >
                        <span />
                    </button>
                )}
                {this.props.children}
                {isNavLevel2OnPage && (
                    <button
                        className="header-overflow-trigger"
                        type="button"
                        onClick={onRightSideToggle}
                    >
                        <span />
                    </button>
                )}
                <div className="header-backdrop" onClick={onCloseAll} />
            </header>
        );
    }
}
