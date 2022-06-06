/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import {ICON_HEIGHT} from "../../icon";
import {FilterPosition} from "../DataGridFilter";
import {getXPositionValue} from "../DataGridUtils";

describe("Datagrid utils", () => {
    describe("getXPositionValue", () => {
        const getLeftPosition = (rawPosition: number): number => rawPosition + ICON_HEIGHT;
        const getCenterPosition = (rawPosition: number): number => rawPosition + ICON_HEIGHT * 2;
        it("should return 0 when position or childWidth is undefined", () => {
            // @ts-ignore
            expect(getXPositionValue()).toEqual(0);
            // @ts-ignore
            expect(getXPositionValue(FilterPosition.CENTER)).toEqual(0);
        });

        it("should return icon width as x value for position 'right'", () => {
            expect(getXPositionValue(FilterPosition.RIGHT, 10)).toEqual(ICON_HEIGHT);
            expect(getXPositionValue(FilterPosition.RIGHT, 100)).toEqual(ICON_HEIGHT);
            expect(getXPositionValue(FilterPosition.RIGHT, 150)).toEqual(ICON_HEIGHT);
        });

        it("should return child width as x value for position 'left'", () => {
            expect(getXPositionValue(FilterPosition.LEFT, getLeftPosition(100))).toEqual(-100);
            expect(getXPositionValue(FilterPosition.LEFT, getLeftPosition(12))).toEqual(-12);
            expect(getXPositionValue(FilterPosition.LEFT, getLeftPosition(150))).toEqual(-150);
        });

        it("should return half of child width as x value for position 'center'", () => {
            expect(getXPositionValue(FilterPosition.CENTER, getCenterPosition(12))).toEqual(-6);
            expect(getXPositionValue(FilterPosition.CENTER, getCenterPosition(100))).toEqual(-50);
            expect(getXPositionValue(FilterPosition.CENTER, getCenterPosition(150))).toEqual(-75);
        });
    });
});
