import * as React from "react";
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Button, ButtonSize, ButtonState} from "./index";
import Icon from "../../icon/Icon";

storiesOf('Button', module)
    .add('A bunch of simple buttons', () => (
        <div>
            <div>
                <Button key="basic" onClick={action("basic click")}>
                    BASIC
                </Button>
                <Button key="primary" primary onClick={action("primary click")}>
                    PRIMARY
                </Button>
                <Button key="disabled" disabled onClick={action("primary click")}>
                    DISABLED
                </Button>
            </div>
            <div>
                <Button key="link" link onClick={action("link click")}>
                    LINK
                </Button>
                <Button key="flat" flat onClick={action("flat click")}>
                    FLAT
                </Button>
                <Button key="block" block onClick={action("block click")}>
                    BLOCK
                </Button>
                <Button key="inverse"
                        inverse
                        onClick={action("inverse click")}>
                    INVERSE
                </Button>
            </div>
            <div>
                <Button key="small"
                        size={ButtonSize.SMALL}
                        onClick={action("small click")}>
                    SMALL
                </Button>
            </div>
            <div>
                <Button key="info"
                        state={ButtonState.INFO}
                        onClick={action("info click")}>
                    INFO
                </Button>
                <Button key="success"
                        state={ButtonState.SUCCESS}
                        onClick={action("success click")}>
                    SUCCESS
                </Button>
                <Button key="warning"
                        state={ButtonState.WARNING}
                        onClick={action("warning click")}>
                    WARNING
                </Button>
                <Button key="danger"
                        state={ButtonState.DANGER}
                        onClick={action("danger click")}>
                    DANGER
                </Button>
            </div>
            <div>
                <Button key="home"
                        onClick={action("home click")}>
                    <Icon shape="home"/>
                </Button>
                <Button key="cog"
                        onClick={action("cog click")}>
                    <Icon shape="cog"/>
                </Button>
            </div>
        </div>
    ))
;
