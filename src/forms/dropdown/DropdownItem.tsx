import * as React from "react";
import * as ReactDOM from "react-dom";
import {ClassNames} from "./ClassNames";
import {classNames, isInTreeDOM} from "../../utils";

export type DropdownItemProps = {
    menuItemType: MenuItemType;
    value?: string;
    isDisabled?: boolean;
    isExpandable?: boolean;
    isHeaderChild?: boolean;
    closeOnBackdrop?: boolean;
    menuIsOpen?: boolean;
    itemClicked?: () => void;
};

export enum MenuItemType {
    HEADER,
    DIVIDER,
    ITEM,
}

const initialState = {
    isActive: false,
};

type DropdownItemState = Readonly<typeof initialState>;

export class DropdownItem extends React.PureComponent<DropdownItemProps, DropdownItemState> {
    readonly state: DropdownItemState = initialState;

    static defaultProps = {
        isDisabled: false,
        isExpandable: false,
        isHeaderChild: false,
        closeOnBackdrop: true,
        menuIsOpen: false,
        menuItemType: MenuItemType.ITEM,
    };

    getClassList(): (string | undefined)[] {
        const {menuItemType, isExpandable, isHeaderChild} = this.props;
        const {isActive} = this.state;
        let result: string[] = [];
        switch (menuItemType) {
            case MenuItemType.HEADER:
                if (isHeaderChild) {
                    result.push(ClassNames.DROPDOWN_ITEM);
                    result.push(ClassNames.DROPDOWN_HEADER_CHILD);
                } else {
                    result.push(ClassNames.DROPDOWN_HEADER);
                }
                break;
            case MenuItemType.ITEM:
                result.push(ClassNames.DROPDOWN_ITEM);
                isExpandable && result.push(ClassNames.EXPANDABLE);
                isActive && result.push("active");
                break;
            case MenuItemType.DIVIDER:
                result.push(ClassNames.DROPDOWN_DIVIDER);
                break;
        }
        return result;
    }

    get isOpen() {
        return this.props.menuIsOpen !== undefined ? this.props.menuIsOpen : this.state.isActive;
    }

    toggle(isActive = !this.state.isActive) {
        this.setState({isActive}, this.afterToggle);
        if (this.props.itemClicked) this.props.itemClicked();
    }

    afterToggle = () => {
        if (this.state.isActive) this.subscribeDocumentClick();
        else this.unsubscribeDocumentClick();
    };

    subscribeDocumentClick = () => {
        window.addEventListener("click", this.handleDocumentClick as any, true);
    };

    unsubscribeDocumentClick = () => {
        window.removeEventListener("click", this.handleDocumentClick as any, true);
    };

    handleDocumentClick = (evt: React.MouseEvent<HTMLElement>) => {
        if (!this.state.isActive || !this.props.closeOnBackdrop) return;
        const target = (evt.target as any) as HTMLElement;
        const el = ReactDOM.findDOMNode(this);
        if (!el || typeof el === "string") {
            console.warn("wrong element type");
            return;
        }
        if (!isInTreeDOM(el, target)) {
            this.toggle(false);
        }
    };

    render() {
        const {menuItemType, isDisabled, children} = this.props;
        const classList = this.getClassList();
        switch (menuItemType) {
            case MenuItemType.HEADER:
                return <label className={classNames(classList)}>{children}</label>;
            case MenuItemType.DIVIDER:
                return <div className={classNames(classList)} />;
            case MenuItemType.ITEM:
                return (
                    <button
                        className={classNames(classList)}
                        disabled={isDisabled}
                        onClick={this.toggle.bind(this, undefined)}
                    >
                        {children}
                    </button>
                );
        }
    }
}
