/**
 * Copyright (c) 2018 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import {SignPostDirection} from ".";

export function calculateAxisPosition(
    pHeight: number,
    pWidth: number,
    cHeight: number,
    cWidth: number,
    direction: SignPostDirection,
) {
    let axisTransform = "";
    let buff = 12;
    switch (direction) {
        case SignPostDirection.TOP_LEFT: {
            let x = -cWidth + pWidth / 2;
            let y = -cHeight - buff;
            axisTransform = "translateX(" + x + "px) " + "translateY(" + y + "px)";
            break;
        }
        case SignPostDirection.TOP_MIDDLE: {
            let x = (pWidth - cWidth) / 2;
            let y = -cHeight - buff;
            axisTransform = "translateX(" + x + "px) " + "translateY(" + y + "px)";
            break;
        }
        case SignPostDirection.TOP_RIGHT:
            let x = pWidth / 2;
            let y = -cHeight - buff;
            axisTransform = "translateX(" + x + "px) " + "translateY(" + y + "px)";
            break;
        case SignPostDirection.RIGHT_TOP: {
            let x = pWidth + buff;
            let y = -cHeight + pHeight / 2;
            axisTransform = "translateX(" + x + "px) " + "translateY(" + y + "px)";
            break;
        }
        case SignPostDirection.RIGHT_MIDDLE: {
            let x = pWidth + buff;
            let y = (pHeight - cHeight + buff) / 2;
            axisTransform = "translateX(" + x + "px) " + "translateY(" + y + "px)";
            break;
        }
        case SignPostDirection.RIGHT_BOTTOM: {
            let x = pWidth + buff;
            let y = pHeight / 2;
            axisTransform = "translateX(" + x + "px) " + "translateY(" + y + "px)";
            break;
        }
        case SignPostDirection.BOTTOM_LEFT: {
            let x = -cWidth + pWidth / 2;
            let y = pHeight + buff;
            axisTransform = "translateX(" + x + "px) " + "translateY(" + y + "px)";
            break;
        }
        case SignPostDirection.BOTTOM_MIDDLE: {
            let x = (pWidth - cWidth) / 2 + buff;
            let y = pHeight + buff;
            axisTransform = "translateX(" + x + "px) " + "translateY(" + y + "px)";
            break;
        }
        case SignPostDirection.BOTTOM_RIGHT: {
            let x = pWidth / 2;
            let y = pHeight + buff;
            axisTransform = "translateX(" + x + "px) " + "translateY(" + y + "px)";
            break;
        }
        case SignPostDirection.LEFT_TOP: {
            let x = -cWidth - buff;
            let y = -cHeight + pHeight / 2;
            axisTransform = "translateX(" + x + "px) " + "translateY(" + y + "px)";
            break;
        }
        case SignPostDirection.LEFT_MIDDLE: {
            let x = -cWidth - buff;
            let y = (pHeight - cHeight + buff) / 2;
            axisTransform = "translateX(" + x + "px) " + "translateY(" + y + "px)";
            break;
        }
        case SignPostDirection.LEFT_BOTTOM: {
            let x = -cWidth - buff;
            let y = pHeight / 2;
            axisTransform = "translateX(" + x + "px) " + "translateY(" + y + "px)";
            break;
        }
        // TOP_MIDDLE as default position
        default: {
            let x = (pWidth - cWidth) / 2;
            let y = -cHeight - buff;
            axisTransform = "translateX(" + x + "px) " + "translateY(" + y + "px)";
            break;
        }
    }
    return axisTransform;
}
