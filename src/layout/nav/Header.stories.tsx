import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {Header} from ".";

storiesOf('Header', module)
    .add('Header', () =>
        <Header isNavLevel1OnPage={true} isNavLevel2OnPage={true}/>
    )
;
