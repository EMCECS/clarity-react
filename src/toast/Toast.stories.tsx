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
import {State, Store} from "@sambego/storybook-state";
import {Button} from "../forms/button";
import {Toast, Direction, MessageType} from "./Toast";

const storeBottomLeftToast = new Store({
    showToast: false,
});

const storeBottomRightToast = new Store({
    showToast: false,
});

const storeTopRightToast = new Store({
    showToast: false,
});

const storeTopLeftToast = new Store({
    showToast: false,
});

const DURATION = 4000;

storiesOf("Toasts", module).add("Show toasts", () => (
    <div className="clr-row">
        <div className="clr-col-12">
            <State store={storeBottomLeftToast}>
                <Toast
                    text={"Toast created at bottom left corner"}
                    icon={"warning-standard"}
                    position={Direction.BOTTOM_LEFT}
                    type={MessageType.WARNING}
                    style={{marginBottom: "15px", marginLeft: "15px", color: "white", backgroundColor: "#f2af00"}}
                    onClose={() => storeBottomLeftToast.set({showToast: false})}
                />
                <Button onClick={() => storeBottomLeftToast.set({showToast: true})}>Bottom Left</Button>
            </State>

            <State store={storeBottomRightToast}>
                <Toast
                    text={"Toast created at bottom right corner"}
                    icon={"error-standard"}
                    position={Direction.BOTTOM_RIGHT}
                    duration={DURATION}
                    type={MessageType.DANGER}
                    style={{marginBottom: "15px", marginRight: "15px", color: "white", backgroundColor: "#ce1126"}}
                    onClose={() => storeBottomRightToast.set({showToast: false})}
                />
                <Button onClick={() => storeBottomRightToast.set({showToast: true})}>Bottom Right</Button>
            </State>

            <State store={storeTopRightToast}>
                <Toast
                    text={"Toast created at top right corner"}
                    style={{marginTop: "15px", marginRight: "15px", color: "white", backgroundColor: "#6ea204"}}
                    onClose={() => storeTopRightToast.set({showToast: false})}
                />
                <Button onClick={() => storeTopRightToast.set({showToast: true})}>Top Right</Button>
            </State>

            <State store={storeTopLeftToast}>
                <Toast
                    text={"Toast created at top left corner"}
                    icon={"info-standard"}
                    position={Direction.TOP_LEFT}
                    type={MessageType.INFO}
                    style={{marginTop: "15px", marginLeft: "15px", color: "white", backgroundColor: "#007db8"}}
                    onClose={() => storeTopLeftToast.set({showToast: false})}
                />
                <Button onClick={() => storeTopLeftToast.set({showToast: true})}>Top Left</Button>
            </State>
        </div>
    </div>
));
