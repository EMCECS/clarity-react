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
import {classNames} from "../../utils";

type DataListProps = {
    placeHolder?: string;
};
type DataListState = {
    hasFocus: boolean;
};

export class DataList extends React.PureComponent<DataListProps, DataListState> {
    constructor(props: DataListProps) {
        super(props);
        this.state = {
            hasFocus: false,
        };
    }

    handleFocus() {
        this.setState({hasFocus: true});
    }

    handleBlur() {
        this.setState({hasFocus: false});
    }

    render() {
        const {hasFocus} = this.state;
        const {placeHolder} = this.props;
        return (
            <div className="clr-control-container">
                <div className="clr-input-wrapper">
                    <div className={classNames(["clr-input-group", hasFocus && "clr-focus"])}>
                        <input
                            onFocus={this.handleFocus.bind(this)}
                            onBlur={this.handleBlur.bind(this)}
                            placeholder={placeHolder}
                            list="data-list-1"
                            className="clr-input ng-untouched ng-pristine ng-invalid"
                            aria-describedby="clr-form-control-3-helper"
                        />
                        <datalist id="data-list-1">
                            <option value="item1" className="ng-star-inserted" />
                            <option value="item2" className="ng-star-inserted" />
                            <option value="item3" className="ng-star-inserted" />
                        </datalist>
                    </div>
                </div>
            </div>
        );
    }
}
