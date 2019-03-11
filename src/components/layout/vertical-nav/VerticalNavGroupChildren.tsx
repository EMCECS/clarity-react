import * as React from "react";

export default class VerticalNavGroupChildren extends React.PureComponent {
    render() {
        const styles = {
            height: "0px",
            overflow: "hidden",
        };

        return (
            <div className="nav-group-children">
                <a href="#" className="nav-link">
                    <div className="nav-text">Pidgey</div>
                </a>
                <a href="#" className="nav-link">
                    <div className="nav-text">Snorlax</div>
                </a>
            </div>
        );
    }
}
