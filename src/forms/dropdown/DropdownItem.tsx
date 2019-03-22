import * as React from "react";
import {ClassNames} from "./ClassNames";
import * as utils from "../../utils";

export type DropdownItemProps = {
    menuItemType: MenuItemType;
    value?: string;
    isDisabled?: boolean;
    isExpandable?: boolean;
    isHeaderChild?: boolean;
};

export enum MenuItemType {
    HEADER,
    DIVIDER,
    ITEM,
}

export class DropdownItem extends React.PureComponent<DropdownItemProps> {
    static defaultProps = {
        isDisabled: false,
        isExpandable: false,
        isHeaderChild: false,
        menuItemType: MenuItemType.ITEM,
    };

    getClassList(): (string | undefined)[] {
        const {menuItemType, isExpandable, isHeaderChild} = this.props;
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
                break;
            case MenuItemType.DIVIDER:
                result.push(ClassNames.DROPDOWN_DIVIDER);
                break;
        }
        return result;
    }

    render() {
        const {menuItemType, isDisabled, children} = this.props;
        const classList = this.getClassList();
        switch (menuItemType) {
            case MenuItemType.HEADER:
                return <label className={utils.classNames(classList)}>{children}</label>;
            case MenuItemType.DIVIDER:
                return <div className={utils.classNames(classList)} />;
            case MenuItemType.ITEM:
                return (
                    <button className={utils.classNames(classList)} disabled={isDisabled}>
                        {children}
                    </button>
                );
        }
    }
}
