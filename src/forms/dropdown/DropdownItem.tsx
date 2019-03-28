import * as React from "react";
import {ClassNames} from "./ClassNames";
import {classNames} from "../../utils";
import {Button} from "../button";

export type DropdownItemProps = {
    menuItemType: MenuItemType;
    label?: string;
    key?: string;
    isDisabled?: boolean;
    isExpandable?: boolean;
    isHeaderChild?: boolean;
    onClickEvent?: Function;
    onClick?: (evt: React.MouseEvent<HTMLElement>) => void;
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

    render() {
        const {
            menuItemType, // prettier hack
            isDisabled,
            children,
            onClick,
            label,
        } = this.props;
        const classList = this.getClassList();
        switch (menuItemType) {
            case MenuItemType.HEADER:
                return (
                    <label className={classNames(classList)}>
                        {label}
                        {children}
                    </label>
                );
            case MenuItemType.DIVIDER:
                return <div className={classNames(classList)} />;
            case MenuItemType.ITEM:
                return (
                    <Button className={classNames(classList)} disabled={isDisabled} onClick={onClick}>
                        {label}
                        {children}
                    </Button>
                );
        }
    }
}
