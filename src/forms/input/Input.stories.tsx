import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Input} from "./index";

storiesOf('Input', module)
    .add('a simple input box', () => (
        <Input name="somevalue" onChange={action('changed')}/>
    ))
    .add('with a label', () => (
        <Input name="somevalue"
               label="somevalue"
               onChange={action('changed')}/>
    ))
    .add('with placeholder text', () => (
        <Input name="somevalue"
               placeholder="stuff goes here"
               onChange={action('changed')}/>
    ))
    .add('with helper text', () => (
        <Input name="somevalue"
               helperText="this should help you figure it out"
               onChange={action('changed')}/>
    ))
    .add('when disabled', () => (
        <Input name="somevalue"
               disabled={true}
               onChange={action('changed')}/>
    ))
;
