import {MainContainer} from "../src/layout/main-container/MainContainer";
import {shallow} from "enzyme";
import * as React from "react";

describe("<MainContainer /> rendering", () => {
    it("renders correctly", () => {
        const wrapper = shallow(<MainContainer title="test" />);
        expect(wrapper).toMatchSnapshot();
    });

    it("should render one <Header />", () => {
        const wrapper = shallow(<MainContainer title="test" />);
        expect(wrapper.find("Header")).toHaveLength(1);
    });
});
