import * as React from "react";
import {ResponsiveNavCodes} from "./ResponsiveNavCodes";

export type HeaderProps = {
    // onToggle handles any calls made in this component that will trigger
    // navigation toggling. The logic for handling the toggle is within the
    // parent object, and will have an effect on the navList property.
    onToggle: (controlCode: string, navLevel: number) => void;

    // onCloseAll handles a call made to close all in this component. The logic
    // for handling the closeAll action is within the parent object, and will
    // have an effect on navList property.
    onCloseAll: () => void;

    // navList contains a list of numbers representing the active navigation
    // levels.
    navList: number[];
};

type navStates = {
    isNavLevel1OnPage: boolean;
    isNavLevel2OnPage: boolean;
};

export default class Header extends React.PureComponent<HeaderProps> {
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
        const {NAV_LEVEL_1, NAV_LEVEL_2} = ResponsiveNavCodes;
        let isNavLevel1OnPage = false,
            isNavLevel2OnPage = false;
        if (props.navList.length > 2) {
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

    handleToggle(navLevel: number) {
        const {NAV_TOGGLE} = ResponsiveNavCodes;
        this.props.onToggle(NAV_TOGGLE, navLevel);
    }

    render() {
        const {onCloseAll, onToggle} = this.props;
        const {NAV_LEVEL_1, NAV_LEVEL_2} = ResponsiveNavCodes;
        const {isNavLevel1OnPage, isNavLevel2OnPage} = this.state;

        return (
            <header className="header">
                {isNavLevel1OnPage && (
                    <button className="header-hamburger-trigger" type="button" onClick={this.handleToggle.bind(this, NAV_LEVEL_1)}>
                        <span />
                    </button>
                )}
                {this.props.children}
                {isNavLevel2OnPage && (
                    <button className="header-overflow-trigger" type="button" onClick={this.handleToggle.bind(this, NAV_LEVEL_2)}>
                        <span />
                    </button>
                )}
                <div className="header-backdrop" onClick={onCloseAll} />
            </header>
        );
    }
}
