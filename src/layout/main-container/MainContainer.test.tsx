import {MainContainer, MainContainerProps} from "./MainContainer";
import {shallow, mount, ShallowWrapper} from "enzyme";
import * as React from "react";
import {NavLink} from "../nav";

let wrapper: ShallowWrapper<MainContainerProps>;

describe("<MainContainer /> rendering", () => {
    beforeAll(() => {
        wrapper = shallow(
            <MainContainer
                title="test"
                actions={<NavLink/>}
                headerNav={<div className="head">header nav</div>}
                sideNav={<div className="side">side nav</div>}
                subNav={<div className="sub">sub nav</div>}
            />,
        );
    });
    it("renders correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });
    it("should render the title", () => {
        expect(wrapper.find(".title").text()).toEqual("test");
    });
    it("should render one <Header />", () => {
        expect(wrapper.find("Header")).toHaveLength(1);
    });
    it("should render one Header actions", () => {
        expect(wrapper.find(".header.nav-link")).toHaveLength(1);
    });
    it("should render header nav correctly", () => {
        expect(wrapper.find(".head")).toHaveLength(1);
    });
    it("should render side nav correctly", () => {
        expect(wrapper.find(".side")).toHaveLength(1);
    });
    it("should render sub nav correctly", () => {
        expect(wrapper.find(".sub")).toHaveLength(1);
    });
    it("should have hamburger class when state is toggled", () => {
        (wrapper.instance() as MainContainer).handleHamburgerToggle();
        expect(wrapper.find(".open-hamburger-menu")).toHaveLength(1);
    });
    it("should have overflow class when state is toggled", () => {
        (wrapper.instance() as MainContainer).handleRightSideToggle();
        expect(wrapper.find(".open-overflow-menu")).toHaveLength(1);
    });
    it("should not have overflow or hamburger class when close state is toggled", () => {
        (wrapper.instance() as MainContainer).closeAll();
        expect(wrapper.find(".open-hamburger-menu")).toHaveLength(0);
        expect(wrapper.find(".open-overflow-menu")).toHaveLength(0);
    });
});
