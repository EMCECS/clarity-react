import {Header, NavHeaderProps} from "../src/layout/nav";
import {shallow, mount, ShallowWrapper} from "enzyme";
import * as React from "react";

let wrapper: ShallowWrapper<NavHeaderProps>;
const clickFn = jest.fn();

describe("<MainContainer /> with primary and secondary rendering", () => {
    beforeAll(() => {
        wrapper = shallow<Header>(
            <Header
                primaryShown={true}
                secondaryShown={true}
                onCloseAll={clickFn}
                onHamburgerToggle={clickFn}
                onRightSideToggle={clickFn}
            />,
        );
    });

    it("renders correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("should have two buttons for hamburger and overflow", () => {
        expect(wrapper.find(".header-hamburger-trigger")).toHaveLength(1);
        expect(wrapper.find(".header-overflow-trigger")).toHaveLength(1);
        expect(wrapper.find("button")).toHaveLength(2);
    });
});

describe("<MainContainer /> without primary and secondary rendering", () => {
    beforeAll(() => {
        wrapper = shallow<Header>(
            <Header
                primaryShown={false}
                secondaryShown={false}
                onCloseAll={clickFn}
                onHamburgerToggle={clickFn}
                onRightSideToggle={clickFn}
            />,
        );
    });
    it("should not have any buttons", () => {
        expect(wrapper.find(".header-hamburger-trigger")).toHaveLength(0);
        expect(wrapper.find(".header-overflow-trigger")).toHaveLength(0);
        expect(wrapper.find("button")).toHaveLength(0);
    });
});

describe("<MainContainer /> with only primary rendering", () => {
    beforeAll(() => {
        wrapper = shallow<Header>(
            <Header
                primaryShown={true}
                secondaryShown={false}
                onCloseAll={clickFn}
                onHamburgerToggle={clickFn}
                onRightSideToggle={clickFn}
            />,
        );
    });
    it("should have one button only for hamburger", () => {
        expect(wrapper.find(".header-hamburger-trigger")).toHaveLength(1);
        expect(wrapper.find(".header-overflow-trigger")).toHaveLength(0);
        expect(wrapper.find("button")).toHaveLength(1);
    });

    it("should toggle hamburger menu", () => {
        wrapper.find("button.header-hamburger-trigger").simulate("click");
        expect(clickFn).toHaveBeenCalled();
    });
});

describe("<MainContainer /> with only secondary rendering", () => {
    beforeAll(() => {
        wrapper = shallow<Header>(
            <Header
                primaryShown={false}
                secondaryShown={true}
                onCloseAll={clickFn}
                onHamburgerToggle={clickFn}
                onRightSideToggle={clickFn}
            />,
        );
    });
    it("should have one button only for overflow", () => {
        expect(wrapper.find(".header-hamburger-trigger")).toHaveLength(0);
        expect(wrapper.find(".header-overflow-trigger")).toHaveLength(1);
        expect(wrapper.find("button")).toHaveLength(1);
    });

    it("should toggle overflow menu", () => {
        wrapper.find("button.header-overflow-trigger").simulate("click");
        expect(clickFn).toHaveBeenCalled();
    });
});
