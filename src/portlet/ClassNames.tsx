/**
 * Copyright (c) 2018 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

export class Styles {
    public static ICON_STYLE = {transition: "all .3s ease-in 0s", color: "#007DB8"};
    public static MAIN_DIV: any = {
        borderRadius: ".125rem",
        border: "1px solid #d7d7d7",
        display: "block",
        backgroundColor: "#fff",
        width: "100%",
        marginTop: "1rem",
        position: "relative",
    };
    public static HEADER_DIV: any = {
        cursor: "pointer",
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        margin: "0",
        padding: "12px 10px",
        position: "relative",
        overflow: "hidden",
        justifyContent: "space-between",
    };
    public static CONTENT_DIV = {padding: "0 10px 5px"};
}
