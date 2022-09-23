/**
 * Copyright (c) 2018 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import {ProgressBar, ProgressBarProps, ProgressBarType, ProgressBarStatus, ProgressBarAnimation} from ".";
import {shallow, ShallowWrapper} from "enzyme";
import * as React from "react";

let wrapper: ShallowWrapper<ProgressBarProps>;

const STYLE = {width: "50%"};
const VALUE = 10;
const VALUE_FORTY = 40;
const VALUE_HUNDRED = 100;
const VAL_TWO_HUNDRED = 200;
describe("<ProgressBar /> rendering", () => {
    beforeAll(() => {
        wrapper = shallow<ProgressBar>(<ProgressBar value={VALUE} max={VALUE_HUNDRED} style={STYLE} />);
    });

    it("ProgressBar renders correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe("<ProgressBar /> rendering with label", () => {
    beforeAll(() => {
        wrapper = shallow<ProgressBar>(<ProgressBar value={VALUE} max={VALUE_HUNDRED} labeled={true} style={STYLE} />);
    });

    it("ProgressBar renders correctly with label", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("should render the correct value in  label", () => {
        expect(wrapper.find("span").text()).toEqual(" 10% ");
    });
});

describe("<ProgressBar /> rendering with static progress", () => {
    beforeAll(() => {
        wrapper = shallow<ProgressBar>(
            <ProgressBar value={VALUE} max={VALUE_HUNDRED} type={ProgressBarType.STATIC} style={STYLE} />,
        );
    });

    it("ProgressBar renders correctly with static progress", () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe("<ProgressBar /> rendering with Labeled, Static Progress Bar", () => {
    beforeAll(() => {
        wrapper = shallow<ProgressBar>(
            <ProgressBar
                value={VALUE_FORTY}
                max={VALUE_HUNDRED}
                type={ProgressBarType.STATIC}
                labeled={true}
                style={STYLE}
            />,
        );
    });

    it("ProgressBar renders correctly with Labeled, Static Progress Bar", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("should render the correct value in  label", () => {
        expect(wrapper.find("span").text()).toEqual(" 40% ");
    });
});

describe("<ProgressBar /> rendering with Indeterminate (Looping)", () => {
    beforeAll(() => {
        wrapper = shallow<ProgressBar>(
            <ProgressBar
                value={VALUE_HUNDRED}
                max={VALUE_HUNDRED}
                className={ProgressBarAnimation.LOOP}
                style={STYLE}
            />,
        );
    });

    it("ProgressBar renders correctly with Indeterminate (Looping)", () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe("<ProgressBar /> rendering with animation for flash then fade", () => {
    beforeAll(() => {
        wrapper = shallow<ProgressBar>(
            <ProgressBar
                value={VALUE_HUNDRED}
                max={VALUE_HUNDRED}
                className={`${ProgressBarAnimation.FADE_OUT}  ${ProgressBarAnimation.FLASH}`}
                style={STYLE}
            />,
        );
    });

    it("ProgressBar renders correctly with animation for flash then fade", () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe("<ProgressBar /> rendering with animation for red flash and no fade", () => {
    beforeAll(() => {
        wrapper = shallow<ProgressBar>(
            <ProgressBar
                value={VALUE_HUNDRED}
                max={VALUE_HUNDRED}
                className={ProgressBarAnimation.FLASH_DANGER}
                style={STYLE}
            />,
        );
    });

    it("ProgressBar renders correctly with animation for red flash and no fade", () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe("<ProgressBar /> rendering with Labeled With SUCCESS Flash And Fade", () => {
    beforeAll(() => {
        wrapper = shallow<ProgressBar>(
            <ProgressBar
                value={VALUE_HUNDRED}
                max={VALUE_HUNDRED}
                className={`${ProgressBarAnimation.FADE_OUT}  ${ProgressBarAnimation.FLASH}`}
                labeled={true}
                style={STYLE}
            />,
        );
    });

    it("ProgressBar renders correctly with Labeled With SUCCESS Flash And Fade", () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe("<ProgressBar /> rendering with fade out animation", () => {
    beforeAll(() => {
        wrapper = shallow<ProgressBar>(
            <ProgressBar
                value={VALUE_HUNDRED}
                max={VALUE_HUNDRED}
                className={ProgressBarAnimation.FADE_OUT}
                style={STYLE}
            />,
        );
    });

    it("ProgressBar renders correctly with fade out animation", () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe("<ProgressBar /> rendering with color for success", () => {
    beforeAll(() => {
        wrapper = shallow<ProgressBar>(
            <ProgressBar value={VALUE_FORTY} max={VALUE_HUNDRED} status={ProgressBarStatus.SUCCESS} style={STYLE} />,
        );
    });

    it("ProgressBar renders correctly with color for success", () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe("<ProgressBar /> rendering with color for danger", () => {
    beforeAll(() => {
        wrapper = shallow<ProgressBar>(
            <ProgressBar value={VALUE_FORTY} max={VALUE_HUNDRED} status={ProgressBarStatus.DANGER} style={STYLE} />,
        );
    });

    it("ProgressBar renders correctly with color for danger", () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe("<ProgressBar /> rendering with Indeterminate (Looping)", () => {
    beforeAll(() => {
        wrapper = shallow<ProgressBar>(
            <ProgressBar
                value={VALUE_HUNDRED}
                max={VAL_TWO_HUNDRED}
                className={ProgressBarAnimation.LOOP}
                style={STYLE}
            />,
        );
    });

    it("ProgressBar renders correctly with Indeterminate (Looping)", () => {
        expect(wrapper).toMatchSnapshot();
    });
});
