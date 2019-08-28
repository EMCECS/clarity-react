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
import {storiesOf} from "@storybook/react";
import {Portlet} from ".";
import {Table} from "../tables/Table";

storiesOf("Portlet", module).add("Basic Portlet", () => (
    <div className="clr-row">
        <div className="clr-col-lg-4 clr-col-md-8 clr-col-12">
            <Portlet header="Header- Porlet Component">
                <div>Portlet Component </div>
                <Table className="table">
                    <thead>
                        <th>Decimal</th>
                        <th>Hexadecimal</th>
                        <th>Binary</th>
                        <th>Roman Numeral</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>I</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>5</td>
                            <td>101</td>
                            <td>V</td>
                        </tr>
                        <tr>
                            <td>10</td>
                            <td>A</td>
                            <td>1010</td>
                            <td>X</td>
                        </tr>
                        <tr>
                            <td>15</td>
                            <td>F</td>
                            <td>1111</td>
                            <td>XV</td>
                        </tr>
                    </tbody>
                </Table>
            </Portlet>
        </div>
    </div>
));
