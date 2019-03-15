import {Header} from "../src/layout/nav";
import {shallow} from "enzyme";
import * as React from "react";

let wrapper: any;

beforeEach(() => {
    wrapper = shallow(
        <Header
            navList={[]}
            onCloseAll={() => {}}
            onHamburgerToggle={() => {}}
            onRightSideToggle={() => {}}
        />,
    );
});

describe("<MainContainer /> rendering", () => {
    it("renders correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });
    it("should not have any buttons", () => {
        expect(wrapper.find("button")).toHaveLength(0);
    });
    // it("should have one button for hamburger", () => {
    //     wrapper.setProps({navList: [1, 0]});
    //     expect(wrapper.find("button")).toHaveLength(1);
    // });
    // it("should have one button for overflow", () => {
    //     wrapper.setProps({navList: [0, 2]});
    //     expect(wrapper.find("button")).toHaveLength(1);
    // });
    it("should have two buttons for hamburger and overflow", () => {
        const test = shallow(
            <Header
                navList={[1, 2]}
                onCloseAll={() => {}}
                onHamburgerToggle={() => {}}
                onRightSideToggle={() => {}}
            />,
        );
        //test.setProps({navList: [1, 2]});
        expect(test.find("button")).toHaveLength(2);
    });
});
