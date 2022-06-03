/**
 * Copyright (c) 2018 - 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import {ICON_HEIGHT} from "./constants";
import {FilterPosition} from "./DataGridFilter";

/**
 * Get X axis position value for supplied object
 * @param {sting} position - Position prop, Accepted values right, left, center
 * @param {number} childWidth - Width of child element in pixels, for center and left alignment
 * @returns {number} X axis position relative to parent element
 * */

export const getXPositionValue = (position: string, childWidth: number): number => {
    if (!position || childWidth === undefined) return 0;

    const {CENTER, LEFT, RIGHT} = FilterPosition;
    return position === RIGHT
        ? ICON_HEIGHT
        : position === LEFT
        ? ICON_HEIGHT - childWidth
        : position === CENTER
        ? ICON_HEIGHT - childWidth / 2
        : 0;
};
