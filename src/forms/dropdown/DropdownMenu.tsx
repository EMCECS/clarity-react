import * as React from "react";

export enum MenuPosition {
    BOTTOM_LEFT = "bottom-left",
    BOTTOM_RIGHT = "bottom-right",
    TOP_LEFT = "top-left",
    TOP_RIGHT = "top-right",
    LEFT_BOTTOM = "left-bottom",
    LEFT_TOP = "left-top",
    RIGHT_BOTTOM = "right-bottom",
    RIGHT_TOP = "right-top",
}

export type DropDownMenuProps = {
    position: MenuPosition;
};

export class DropdownMenu extends React.PureComponent {
    constructor(props: DropDownMenuProps) {
        super(props);

        switch (props.position) {
            case MenuPosition.BOTTOM_LEFT:
                break;
        }
    }

    render() {
        const {children} = this.props;
        return <div className="dropdown-menu">{children}</div>;
    }
}
