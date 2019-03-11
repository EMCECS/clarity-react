import * as React from "react";
import Icon, {Direction} from "../../icon/Icon";
import VerticalNavGroup from "./VerticalNavGroup";

type VerticalNavProps = {
    isCollapsible?: boolean;
    collapseButtonOnBottom?: boolean;
};

type VerticalNavState = {
    isCollapsed: boolean;
    hasNavGroups: boolean;
    hasIcons: boolean;
};

export default class VerticalNav extends React.PureComponent<
    VerticalNavProps,
    VerticalNavState
> {
    constructor(props: VerticalNavProps) {
        super(props);
        const children = this.props.children;
        const result: boolean[] = this.checkChildren(children);
        this.state = {
            hasNavGroups: result[0],
            hasIcons: result[1],
            isCollapsed: false,
        };
    }

    checkChildren(children: React.ReactNode): boolean[] {
        let result: boolean[] = [false, false];
        React.Children.forEach(children, (child: React.ReactNode) => {
            if (React.isValidElement(child)) {
                switch ((child as React.ReactElement<any>).type) {
                    case VerticalNavGroup:
                        result[0] = true;
                        break;
                    case Icon:
                        result[1] = true;
                        break;
                }
            }
            const kid = child as React.ReactElement<any>;
            if (!kid.props) {
                return;
            }
            if (kid.props.children) {
                let recursive_result: boolean[] = this.checkChildren(
                    kid.props.children,
                );
                if (recursive_result[0]) {
                    result[0] = true;
                }
                if (recursive_result[1]) {
                    result[1] = true;
                }
            }
        });
        return result;
    }

    getClassList() {
        let classList: string[] = [];
        const {collapseButtonOnBottom} = this.props;
        const {isCollapsed, hasNavGroups, hasIcons} = this.state;
        if (collapseButtonOnBottom) {
            classList.push(VerticalNavCodes.NAV_TRIGGER_BOTTOM);
        }
        classList.push(VerticalNavCodes.CLR_VERTICAL_NAV);
        if (hasNavGroups) {
            classList.push(VerticalNavCodes.HAS_NAV_GROUPS);
        }
        if (hasIcons) {
            classList.push(VerticalNavCodes.HAS_ICONS);
        }
        if (isCollapsed) {
            classList.push(VerticalNavCodes.IS_COLLAPSED);
        }
        return classList;
    }

    toggleByButton() {
        const {isCollapsed} = this.state;
        this.setState({isCollapsed: !isCollapsed});
    }

    unCollapse() {
        this.setState({isCollapsed: false});
    }

    render() {
        const {isCollapsed} = this.state;
        return (
            <div className={this.getClassList().join(" ")}>
                {this.props.isCollapsible && (
                    <button
                        type="button"
                        className="nav-trigger"
                        onClick={this.toggleByButton.bind(this)}
                    >
                        <Icon
                            shape="angle-double"
                            className="nav-trigger-icon"
                            dir={isCollapsed ? Direction.RIGHT : Direction.LEFT}
                        />
                    </button>
                )}

                <div className="nav-content">
                    {this.props.children}
                    {this.state.isCollapsed && (
                        <button
                            onClick={this.unCollapse.bind(this)}
                            className="nav-btn"
                        />
                    )}
                </div>
            </div>
        );
    }
}

export class VerticalNavCodes {
    public static CLR_VERTICAL_NAV: string = "clr-vertical-nav";
    public static HAS_ICONS: string = "has-icons";
    public static HAS_NAV_GROUPS: string = "has-nav-groups";
    public static IS_COLLAPSED: string = "is-collapsed";
    public static NAV_TRIGGER_BOTTOM: string = "nav-trigger--bottom";
}
