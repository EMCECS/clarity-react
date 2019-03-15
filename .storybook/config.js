import {addDecorator, configure} from '@storybook/react';
import "@clr/ui/clr-ui.min.css"
import {withInfo} from "@storybook/addon-info";

const req = require.context('../src', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
addDecorator(withInfo);
