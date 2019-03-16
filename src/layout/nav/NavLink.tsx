import * as React from "react";

interface NavLinkProps {}

export class NavLink extends React.PureComponent<NavLinkProps> {
    render() {
        return (
            <a href="#" className="nav-link">
                <div className="nav-text">
                    {this.props.children}
                </div>
            </a>
        );
    }
}
