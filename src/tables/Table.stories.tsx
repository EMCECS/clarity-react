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
import {Table} from "./Table";

storiesOf("Table", module)
    .add("Basic Table", () => (
        <div style={{width: "50%", paddingLeft: "20px"}}>
            <Table>
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
        </div>
    ))
    .add("Left-Aligned Table Cells", () => (
        <div style={{width: "50%", paddingLeft: "20px"}}>
            <Table>
                <thead>
                    <tr>
                        <th className="left">Wizard</th>
                        <th>Allegiance</th>
                        <th>Triwizard Champion?</th>
                        <th>Can Cast Fireball</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="left">Harry</td>
                        <td>Gryffindor</td>
                        <td>Yes</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td className="left">Gandalf</td>
                        <td>Hobbits</td>
                        <td>Maybe?</td>
                        <td>I don&apos;t think so...</td>
                    </tr>
                    <tr>
                        <td className="left">Obi-Wan Kenobi</td>
                        <td>Republic/Rebellion</td>
                        <td>No</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td className="left">Merlin</td>
                        <td>King Arthur</td>
                        <td>Probably invented the tournament</td>
                        <td>Solid maybe</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    ))
    .add("Multiline Table Cells", () => (
        <div style={{width: "50%", paddingLeft: "20px"}}>
            <Table>
                <thead>
                    <tr>
                        <th className="left">Name</th>
                        <th>A/B</th>
                        <th className="left">Comment</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="left">Beetlejuice</td>
                        <td>B</td>
                        <td className="left">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </td>
                    </tr>
                    <tr>
                        <td className="left">Mytzlplk</td>
                        <td>A</td>
                        <td className="left">Excepteur sint occaecat cupidatat non proident.</td>
                    </tr>
                    <tr>
                        <td className="left">Q</td>
                        <td>A</td>
                        <td className="left">
                            Ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    ))
    .add("Non-Bordered Tables", () => (
        <div style={{width: "50%", paddingLeft: "20px"}}>
            <Table isNonBordered={true}>
                <thead>
                    <tr>
                        <th className="left">Monster</th>
                        <th>Home</th>
                        <th>Likes Cookies</th>
                        <th className="left">Fun to Play With</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="left">Wolfman</td>
                        <td>Nondisclosed countryside</td>
                        <td>Sometimes</td>
                        <td className="left">Not really</td>
                    </tr>
                    <tr>
                        <td className="left">Mothra</td>
                        <td>Tropical island</td>
                        <td>No</td>
                        <td className="left">Only if you have a flashlight</td>
                    </tr>
                    <tr>
                        <td className="left">Oscar the Grouch</td>
                        <td>Sesame Street</td>
                        <td>No</td>
                        <td className="left">No</td>
                    </tr>
                    <tr>
                        <td className="left">Cookie Monster</td>
                        <td>Sesame Street</td>
                        <td>Definitely yes</td>
                        <td className="left">Only if you have no cookies</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    ))
    .add("Compact Tables", () => (
        <div style={{width: "50%", paddingLeft: "20px"}}>
            <Table isCompact={true}>
                <thead>
                    <tr>
                        <th className="left">Monster</th>
                        <th>Home</th>
                        <th>Likes Cookies</th>
                        <th className="left">Fun to Play With</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="left">Wolfman</td>
                        <td>Nondisclosed countryside</td>
                        <td>Sometimes</td>
                        <td className="left">Not really</td>
                    </tr>
                    <tr>
                        <td className="left">Mothra</td>
                        <td>Tropical island</td>
                        <td>No</td>
                        <td className="left">Only if you have a flashlight</td>
                    </tr>
                    <tr>
                        <td className="left">Oscar the Grouch</td>
                        <td>Sesame Street</td>
                        <td>No</td>
                        <td className="left">No</td>
                    </tr>
                    <tr>
                        <td className="left">Cookie Monster</td>
                        <td>Sesame Street</td>
                        <td>Definitely yes</td>
                        <td className="left">Only if you have no cookies</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    ))
    .add("Compact, Non-Bordered Tables", () => (
        <div style={{width: "50%", paddingLeft: "20px"}}>
            <Table isCompact={true} isNonBordered={true}>
                <thead>
                    <tr>
                        <th className="left">Monster</th>
                        <th>Home</th>
                        <th>Likes Cookies</th>
                        <th className="left">Fun to Play With</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="left">Wolfman</td>
                        <td>Nondisclosed countryside</td>
                        <td>Sometimes</td>
                        <td className="left">Not really</td>
                    </tr>
                    <tr>
                        <td className="left">Mothra</td>
                        <td>Tropical island</td>
                        <td>No</td>
                        <td className="left">Only if you have a flashlight</td>
                    </tr>
                    <tr>
                        <td className="left">Oscar the Grouch</td>
                        <td>Sesame Street</td>
                        <td>No</td>
                        <td className="left">No</td>
                    </tr>
                    <tr>
                        <td className="left">Cookie Monster</td>
                        <td>Sesame Street</td>
                        <td>Definitely yes</td>
                        <td className="left">Only if you have no cookies</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    ))
    .add("Vertical Tables", () => (
        <div style={{width: "50%", paddingLeft: "20px"}}>
            <Table isVertical={true}>
                <tbody>
                    <tr>
                        <th>Basic table</th>
                        <td>.table</td>
                        <td>The classname used to apply general styling of Clarity tables to an HTML table.</td>
                    </tr>
                    <tr>
                        <th>Left-aligned table cells</th>
                        <td>.left</td>
                        <td>
                            Use this classname on a <code className="clr-code">td</code> to align its contents to the
                            left edge of the table data cell. This is not necessary for vertical tables.
                        </td>
                    </tr>
                    <tr>
                        <th>Tables without borders</th>
                        <td>.table-noborder</td>
                        <td>
                            This classname will remove borders between table rows as well as the border around the edge
                            of the table. Also removes the background so that the table will be transparent over the
                            background its container has.
                        </td>
                    </tr>
                    <tr>
                        <th>Compact tables</th>
                        <td>.table-compact</td>
                        <td>This classname changes is the height of the table rows from 36px to 24px.</td>
                    </tr>
                    <tr>
                        <th>Vertical tables</th>
                        <td>.table-vertical</td>
                        <td>
                            This classname removes the table header and applies table header styles to the left-most
                            column.
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    ))
    .add("Vertical, Compact, Non-bordered Tables", () => (
        <div style={{width: "50%", paddingLeft: "20px"}}>
            <Table isVertical={true} isCompact={true} isNonBordered={true}>
                <tbody>
                    <tr>
                        <th>Basic table</th>
                        <td>.table</td>
                        <td>The classname used to apply general styling of Clarity tables to an HTML table.</td>
                    </tr>
                    <tr>
                        <th>Left-aligned table cells</th>
                        <td>.left</td>
                        <td>
                            Use this classname on a <code className="clr-code">td</code> to align its contents to the
                            left edge of the table data cell. This is not necessary for vertical tables.
                        </td>
                    </tr>
                    <tr>
                        <th>Tables without borders</th>
                        <td>.table-noborder</td>
                        <td>
                            This classname will remove borders between table rows as well as the border around the edge
                            of the table. Also removes the background so that the table will be transparent over the
                            background its container has.
                        </td>
                    </tr>
                    <tr>
                        <th>Compact tables</th>
                        <td>.table-compact</td>
                        <td>This classname changes is the height of the table rows from 36px to 24px.</td>
                    </tr>
                    <tr>
                        <th>Vertical tables</th>
                        <td>.table-vertical</td>
                        <td>
                            This classname removes the table header and applies table header styles to the left-most
                            column.
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    ))
    .add("Table Container Widths", () => (
        <div className="clr-row">
            <div className="clr-col-12 clr-col-lg-6 clr-col-xl-4">
                <Table className="table">
                    <thead>
                        <tr>
                            <th className="left">Language</th>
                            <th>Foo</th>
                            <th>Bar</th>
                            <th>Baz</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="left">Pig Latin</td>
                            <td>Oofay</td>
                            <td>Arbay</td>
                            <td>Azbay</td>
                        </tr>
                        <tr>
                            <td className="left">Bizarro</td>
                            <td>Bar</td>
                            <td>Foo</td>
                            <td>Bang</td>
                        </tr>
                        <tr>
                            <td className="left">Hodor</td>
                            <td>Hodor</td>
                            <td>Hodor</td>
                            <td>Hodor</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div className="clr-col-12 clr-col-lg-6 clr-col-xl-4">
                <Table className="table">
                    <thead>
                        <tr>
                            <th className="left">Color</th>
                            <th>R</th>
                            <th>G</th>
                            <th>B</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="left">Black</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td className="left">New Black</td>
                            <td>255</td>
                            <td>165</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td className="left">Pantone 292</td>
                            <td>98</td>
                            <td>168</td>
                            <td>229</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div className="clr-col-12 clr-col-lg-6 clr-col-xl-4">
                <Table className="table">
                    <thead>
                        <tr>
                            <th className="left">Name</th>
                            <th className="left">Weakness</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="left">Frankenstein</td>
                            <td className="left">Fire</td>
                        </tr>
                        <tr>
                            <td className="left">Dracula</td>
                            <td className="left">Garlic</td>
                        </tr>
                        <tr>
                            <td className="left">Wolfman</td>
                            <td className="left">Squirrels</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    ));
