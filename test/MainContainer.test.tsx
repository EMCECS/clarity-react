import {MainContainer} from "../src/layout/main-container/MainContainer";
import {shallow} from "enzyme";
import * as React from "react";

describe("<MainContainer /> rendering", () => {
    it("renders correctly", () => {
        const wrapper = shallow(<MainContainer />);
        expect(wrapper).toMatchSnapshot();
    });

    it("should render one <Header6 />", () => {
        const wrapper = shallow(<MainContainer />);
        expect(wrapper.find("Header6")).toHaveLength(1);
    });
});
