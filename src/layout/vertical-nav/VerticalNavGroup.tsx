import * as React from "react";
import Icon, {Direction} from "../../icon/Icon";

export interface VerticalNavGroupProps {
    // groupName is the clickable text that toggles display of grouped child
    // navigation items
    groupName: string;

    // iconShape can be used to display an icon next to the groupName and is
    // also what remains visible when VerticalNav component is collapsed
    iconShape?: string;

    // verticalIsCollapsed is used to pass the state of parent compenent
    // indicating if groups should be auto-collapsed
    verticalIsCollapsed?: boolean;

    // openVerticalNav will trigger the state of parent component VerticalNav
    // to be opened so that the expanded group can become visible.
    openVerticalNav?: () => void;
}

interface VerticalNavGroupState {
    groupIsExpanded: boolean;
}

export class VerticalNavGroup extends React.PureComponent<
    VerticalNavGroupProps,
    VerticalNavGroupState
> {
    constructor(props: VerticalNavGroupProps) {
        super(props);
        this.state = {
            groupIsExpanded: false,
        };
    }

    private handleClick() {
        const {groupIsExpanded} = this.state;
        const {openVerticalNav, verticalIsCollapsed} = this.props;
        if (verticalIsCollapsed) {
            if (openVerticalNav) openVerticalNav();
            this.setState({groupIsExpanded: true});
        } else {
            this.setState({groupIsExpanded: !groupIsExpanded});
        }
    }

    render() {
        const {groupIsExpanded} = this.state;
        const {iconShape, verticalIsCollapsed} = this.props;
        const expandClass: string = groupIsExpanded
            ? "nav-group is-expanded"
            : "nav-group";
        return (
            <div className={expandClass}>
                <div className="nav-group-content">
                    <button
                        className="nav-group-trigger"
                        type="button"
                        onClick={this.handleClick.bind(this)}
                    >
                        {iconShape && (
                            <Icon className="nav-icon" shape={iconShape} />
                        )}

                        <div className="nav-group-text">
                            {this.props.groupName}
                        </div>
                        <Icon
                            shape="caret"
                            className="nav-group-trigger-icon"
                            dir={
                                groupIsExpanded
                                    ? Direction.RIGHT
                                    : Direction.DOWN
                            }
                        />
                    </button>
                </div>
                {groupIsExpanded && verticalIsCollapsed === false && (
                    <div className="nav-group-children">
                        {this.props.children}
                    </div>
                )}
            </div>
        );
    }
}
