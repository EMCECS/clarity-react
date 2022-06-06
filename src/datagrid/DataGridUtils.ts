/**
 * Copyright (c) 2018 - 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import {ICON_HEIGHT} from "../icon";
import {FilterPosition} from "./DataGridFilter";

/**
 * Get X axis position value for supplied object
 * @param position - Position prop, Accepted values right, left, center
 * @param childWidth - Width of child element in pixels, for center and left alignment
 * @returns X axis position relative to parent element
 * */

export const getXPositionValue = (position: string, childWidth: number): number => {
    if (!position || childWidth === undefined) return 0;

    const {CENTER, LEFT, RIGHT} = FilterPosition;
    switch (position) {
        case RIGHT: {
            return ICON_HEIGHT;
        }
        case LEFT: {
            return ICON_HEIGHT - childWidth;
        }
        case CENTER: {
            return ICON_HEIGHT - childWidth / 2;
        }
        default: {
            return 0;
        }
    }
};
