import * as React from "react";
import MainContainer from "./layout/main-container/MainContainer";

import "@clr/icons/clr-icons.min.css";
import "@webcomponents/custom-elements/custom-elements.min.js";
import "@clr/icons/clr-icons-lite.min.js";
import "@clr/icons/shapes/technology-shapes.js";
import "@dell/clarity-ui//shapes/dell-shapes.js";
import "@dell/clarity-ui/dell-clarity-ui.min.css";

class App extends React.Component {
    render() {
        return <MainContainer />;
    }
}

export default App;
