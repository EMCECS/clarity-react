import * as React from "react";
import * as ReactDOM from "react-dom";
import Header from "./Header";

it("renders without crashing", () => {
    const div = document.createElement("div");
    //ReactDOM.render(<Header onToggle={void} onCloseAll={void} />, div);
    ReactDOM.unmountComponentAtNode(div);
});
