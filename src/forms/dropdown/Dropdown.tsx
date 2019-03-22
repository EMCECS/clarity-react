import * as React from "react";
import * as utils from "../../utils";
import {Icon} from "../../icon";
import {ClassNames} from "./ClassNames";
import {DropdownItem, MenuItemType} from "./DropdownItem";
import "@dell/clarity-ui/dell-clarity-ui.min.css";

export type DropdownProps = {
    label: string;
    dropdownItem?: any;
    isNested?: boolean;
};

const initialState = {
    isOpen: false,
};

type DropdownState = Readonly<typeof initialState>;

export class Dropdown extends React.PureComponent<DropdownProps> {
    readonly state: DropdownState = initialState;

    toggleClick() {
        const {isOpen} = this.state;
        this.setState({isOpen: !isOpen});
    }

    getClassListMain(): (string | undefined)[] {
        const {isOpen} = this.state;
        return [ClassNames.DROPDOWN, isOpen ? ClassNames.OPEN : undefined];
    }

    getClassListButton(): (string | undefined)[] {
        const {isOpen} = this.state;
        return [ClassNames.BUTTON, ClassNames.BUTTON_OUTLINE_PRIMARY, isOpen ? ClassNames.ACTIVE : undefined];
    }

    static defaultProps = {
        isNested: false,
    };

    render() {
        const {label, children, isNested} = this.props;

        return (
            <div className={utils.classNames(this.getClassListMain())} style={{position: "static"}}>
                {isNested ? (
                    <DropdownItem isExpandable={true}>Lorem ipsum.</DropdownItem>
                ) : (
                    <button
                        className={utils.classNames(this.getClassListButton())}
                        type="button"
                        onClick={this.toggleClick.bind(this)}
                    >
                        {label}
                        <Icon shape="caret" />
                    </button>
                )}
                {children}
            </div>
        );
    }
}
