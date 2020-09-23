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
import {Modal, ModalSize, ModalBody, ModalFooter} from "./Modal";
import {Button} from "../forms/button";

const storeSmall = new Store({
    isOpen: false,
    closable: true,
});

const storeMedium = new Store({
    isOpen: false,
    closable: true,
});

const storeLarge = new Store({
    isOpen: false,
    closable: true,
});

const storeExtraLarge = new Store({
    isOpen: false,
    closable: true,
});

const storeCustom = new Store({
    isOpen: false,
    closable: true,
});

storiesOf("Modals", module).add("Modal Sizes", () => (
    <div className="clr-row">
        <div className="clr-col-12">
            <State store={storeSmall}>
                <Modal size={ModalSize.SMALL} onClose={() => storeSmall.set({isOpen: false})} title="Small modal">
                    <ModalBody>
                        <p>I'm a small modal</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => storeSmall.set({isOpen: false})}>cancel</Button>
                        <Button onClick={() => storeSmall.set({isOpen: false})} primary={true}>
                            ok
                        </Button>
                    </ModalFooter>
                </Modal>
                <Button onClick={() => storeSmall.set({isOpen: true})}>small</Button>
            </State>
            <State store={storeMedium}>
                <Modal onClose={() => storeMedium.set({isOpen: false})} title="Medium modal">
                    <ModalBody>
                        <p>I'm a medium modal</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => storeMedium.set({isOpen: false})}>cancel</Button>
                        <Button onClick={() => storeMedium.set({isOpen: false})} primary={true}>
                            ok
                        </Button>
                    </ModalFooter>
                </Modal>
                <Button onClick={() => storeMedium.set({isOpen: !storeMedium.get("isOpen")})}>medium</Button>
            </State>
            <State store={storeLarge}>
                <Modal size={ModalSize.LARGE} onClose={() => storeLarge.set({isOpen: false})} title="Large modal">
                    <ModalBody>
                        <p>I'm a large modal</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => storeLarge.set({isOpen: false})}>cancel</Button>
                        <Button onClick={() => storeLarge.set({isOpen: false})} primary={true}>
                            ok
                        </Button>
                    </ModalFooter>
                </Modal>
                <Button onClick={() => storeLarge.set({isOpen: !storeLarge.get("isOpen")})}>large</Button>
            </State>
            <State store={storeExtraLarge}>
                <Modal
                    size={ModalSize.XLARGE}
                    onClose={() => storeExtraLarge.set({isOpen: false})}
                    title="Extra large modal"
                >
                    <ModalBody>
                        <p>I'm an extra large modal</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => storeExtraLarge.set({isOpen: false})}>cancel</Button>
                        <Button onClick={() => storeExtraLarge.set({isOpen: false})} primary={true}>
                            ok
                        </Button>
                    </ModalFooter>
                </Modal>
                <Button onClick={() => storeExtraLarge.set({isOpen: !storeExtraLarge.get("isOpen")})}>x-large</Button>
            </State>
            <State store={storeCustom}>
                <Modal
                    size={ModalSize.CUSTOM}
                    onClose={() => storeCustom.set({isOpen: false})}
                    title="Custom modal"
                    width={500}
                    height={300}
                    className="custom-class"
                >
                    <ModalBody>
                        <p>I'm a Custom sized modal with 500 X 300</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => storeCustom.set({isOpen: false})}>cancel</Button>
                        <Button onClick={() => storeCustom.set({isOpen: false})} primary={true}>
                            ok
                        </Button>
                    </ModalFooter>
                </Modal>
                <Button onClick={() => storeCustom.set({isOpen: !storeCustom.get("isOpen")})}>Custom</Button>
            </State>
        </div>
    </div>
));
