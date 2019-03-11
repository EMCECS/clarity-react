import * as React from "react";
import Icon, {Direction} from "../../icon/Icon";

interface VerticalNavGroupProps {
    groupName?: string;
    iconShape?: string;
}

interface VerticalNavGroupState {
    isCollapsed: boolean;
    isExpanded: boolean;
}

export default class VerticalNavGroup extends React.PureComponent<
    VerticalNavGroupProps,
    VerticalNavGroupState
> {
    constructor(props: VerticalNavGroupProps) {
        super(props);
        this.state = {
            isCollapsed: false,
            isExpanded: false,
        };
    }

    toggleExpand() {}

    render() {
        const {isCollapsed} = this.state;
        const {iconShape} = this.props;
        return (
            <div className="nav-group is-expanded">
                <div className="nav-group-content">
                    <button
                        className="nav-group-trigger"
                        type="button"
                        onClick={this.toggleExpand.bind(this)}
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
                            dir={isCollapsed ? Direction.RIGHT : Direction.DOWN}
                        />
                    </button>
                </div>
                {this.props.children}
            </div>
        );
    }
}
