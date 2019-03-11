import * as React from "react";
import MainContainer from "./layout/main-container/MainContainer";

import "@clr/icons/clr-icons.min.css";
import "@webcomponents/custom-elements/custom-elements.min.js";
import "@clr/icons/clr-icons-lite.min.js";
import "@clr/icons/shapes/technology-shapes.js";
import "@dell/clarity-ui//shapes/dell-shapes.js";
import "@dell/clarity-ui/dell-clarity-ui.min.css";
import {ResponsiveNavCodes} from "./layout/nav/ResponsiveNavCodes";
import NavLevel from "./layout/nav/NavLevel";
import VerticalNav from "./layout/vertical-nav/VerticalNav";
import VerticalNavGroup from "./layout/vertical-nav/VerticalNavGroup";
import VerticalNavGroupChildren from "./layout/vertical-nav/VerticalNavGroupChildren";
import Icon from "./icon/Icon";

const {
    NAV_TYPE_HEADER,
    NAV_LEVEL_1,
    NAV_TYPE_SUB,
    NAV_LEVEL_2,
} = ResponsiveNavCodes;

function renderPrimaryNav() {
    return (
        <NavLevel navType={NAV_TYPE_HEADER} navLevel={NAV_LEVEL_1}>
            <a href="javascript://" className="nav-link">
                <Icon className="nav-icon" shape="home" />
                <span className="nav-text">home</span>
            </a>
            <a href="javascript://" className="nav-link">
                <span className="nav-text">about</span>
            </a>
        </NavLevel>
    );
}

function renderSecondaryNav() {
    return (
        <NavLevel navType={NAV_TYPE_SUB} navLevel={NAV_LEVEL_2}>
            <ul className="nav">
                <li className="nav-item">
                    <a className="nav-link active" href="javascript://">
                        Dashboard
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="javascript://">
                        Management
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="javascript://">
                        Cloud
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="javascript://">
                        Tenants
                    </a>
                </li>
            </ul>
        </NavLevel>
    );
}

class App extends React.Component {
    render() {
        return (
            <MainContainer
                primaryNav={renderPrimaryNav()}
                secondaryNav={renderSecondaryNav()}
            >
                <main className="content-area">test main</main>
                <VerticalNav isCollapsible={true} collapseButtonOnBottom={true}>
                    <VerticalNavGroup groupName="Normal" iconShape="user">
                        <VerticalNavGroupChildren />
                    </VerticalNavGroup>
                </VerticalNav>
            </MainContainer>
        );
    }
}

export default App;
