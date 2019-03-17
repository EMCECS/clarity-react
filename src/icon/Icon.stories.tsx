import * as React from 'react';
import {storiesOf} from '@storybook/react';
import Icon, {Direction} from "./Icon";

storiesOf('Icon', module)
    .add('a simple icon', () =>
        <Icon shape="home"/>
    )
    .add('with direction "right"', () =>
        <Icon shape="home" dir={Direction.RIGHT}/>
    )
;
