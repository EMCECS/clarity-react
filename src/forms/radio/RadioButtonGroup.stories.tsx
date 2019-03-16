import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {RadioButton, RadioButtonGroup} from ".";

storiesOf('RadioButton', module)
    .add('simple with two radio buttons', () => (
        <RadioButtonGroup name="number"
                          onChange={action('changed')}>
            <RadioButton label="One" value="one"/>
            <RadioButton label="Two" value="two"/>
        </RadioButtonGroup>
    ))
    .add('when inline', () => (
        <RadioButtonGroup inline={true} name="number"
                          onChange={action('changed')}>
            <RadioButton label="One" value="one"/>
            <RadioButton label="Two" value="two"/>
        </RadioButtonGroup>
    ))
    .add('with a default value', () => (
        <RadioButtonGroup defaultValue="two" name="number"
                          onChange={action('changed')}>
            <RadioButton label="One" value="one"/>
            <RadioButton label="Two" value="two"/>
        </RadioButtonGroup>
    ))
    .add('with a default value', () => (
        <RadioButtonGroup defaultValue="two" name="number"
                          onChange={action('changed')}>
            <RadioButton label="One" value="one"/>
            <RadioButton label="Two" value="two"/>
        </RadioButtonGroup>
    ))
    .add('when disabled', () => (
        <RadioButtonGroup disabled={true} name="number"
                          onChange={action('changed')}>
            <RadioButton label="One" value="one"/>
            <RadioButton label="Two" value="two"/>
        </RadioButtonGroup>
    ))
    .add('With label', () => (
        <RadioButtonGroup label={"Radio Label"} name="number"
                          onChange={action('changed')}>
            <RadioButton label="One" value="one"/>
            <RadioButton label="Two" value="two"/>
        </RadioButtonGroup>
    ))
    .add('With helper text', () => (
        <RadioButtonGroup helperText={"This text should help you figure things out"}
                          name="number"
                          onChange={action('changed')}>
            <RadioButton label="One" value="one"/>
            <RadioButton label="Two" value="two"/>
        </RadioButtonGroup>
    ))
;
