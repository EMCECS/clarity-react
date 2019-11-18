/**
 * Copyright (c) 2018 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import * as React from "react";
import {classNames} from "../utils";

type SpinnerProps = {
    type?: SpinnerType;
    size?: SpinnerSize;
    dataqa?: string;
};

export enum SpinnerType {
    INLINE = "inline",
    INVERSE = "inverse",
}

export enum SpinnerSize {
    SMALL = "sm",
    MEDIUM = "md",
    LARGE = "lg",
}

export const Spinner: React.FunctionComponent<SpinnerProps> = ({type, size, children, dataqa}) => {
    return (
        <span>
            <span
                className={classNames([
                    "spinner", //prettier
                    type && "spinner-" + type,
                    size && "spinner-" + size,
                ])}
                data-qa={dataqa}
            />
            <span> {children}</span>
        </span>
    );
};
