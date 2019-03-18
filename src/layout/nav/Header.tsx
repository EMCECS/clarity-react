import * as React from "react";
import {ClassNames} from "."

export type NavHeaderProps = {
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

    isNavLevel1OnPage: boolean

    isNavLevel2OnPage: boolean
};

export class Header extends React.PureComponent<NavHeaderProps> {
    render() {
        const {
            isNavLevel1OnPage,
            isNavLevel2OnPage,
            onCloseAll,
            onHamburgerToggle,
            onRightSideToggle
        } = this.props;
        return (
            <header className="header">
                {isNavLevel1OnPage &&
                <button className={ClassNames.HAMBURGER_TRIGGER}
                        type="button"
                        onClick={onHamburgerToggle}>
                  <span/>
                </button>
                }
                {this.props.children}
                {isNavLevel2OnPage &&
                <button
                  className={ClassNames.OVERFLOW_TRIGGER}
                  type="button"
                  onClick={onRightSideToggle}
                >
                  <span/>
                </button>
                }
                <div className="header-backdrop" onClick={onCloseAll}/>
            </header>
        );
    }
}
