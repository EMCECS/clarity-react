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

const {NAV_TYPE_HEADER, NAV_LEVEL_1, NAV_TYPE_SUB, NAV_LEVEL_2} = ResponsiveNavCodes;

function renderPrimaryNav() {
    return (
        <NavLevel navType={NAV_TYPE_HEADER} navLevel={NAV_LEVEL_1}>
            <a href="https://www.google.com" className="nav-link">
                <span className="nav-text">home</span>
            </a>
            <a href="https://www.google.com" className="nav-link">
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
                    <a className="nav-link active" href="#">
                        Dashboard
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        Management
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        Cloud
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        Tenants
                    </a>
                </li>
            </ul>
        </NavLevel>
    );
}

class App extends React.Component {

    render() {
        const {NAV_TYPE_HEADER, NAV_LEVEL_1} = ResponsiveNavCodes;
        return (
            <MainContainer
                primaryNav={renderPrimaryNav()}
                secondaryNav={renderSecondaryNav()}
            >
                <main className="content-area">test main</main>
            </MainContainer>
        );
    }
}

export default App;
