import * as React from "react";
import Icon, {Direction} from "../../icon/Icon";

export interface VerticalNavGroupProps {
    groupName?: string;
    iconShape?: string;
    closeGroup?: () => void;
}

interface VerticalNavGroupState {
    isExpanded: boolean;
}

export default class VerticalNavGroup extends React.PureComponent<
    VerticalNavGroupProps,
    VerticalNavGroupState
> {
    constructor(props: VerticalNavGroupProps) {
        super(props);
        this.state = {
            isExpanded: false,
        };
    }

    toggleExpand() {
        const {isExpanded} = this.state;
        this.setState({isExpanded: !isExpanded});
    }

    render() {
        const {isExpanded} = this.state;
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
                            dir={isExpanded ? Direction.RIGHT : Direction.DOWN}
                        />
                    </button>
                </div>
                {isExpanded && (
                    <div className="nav-group-children">
                        {this.props.children}
                    </div>
                )}
            </div>
        );
    }
}
