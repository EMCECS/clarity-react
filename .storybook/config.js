import {addDecorator, configure} from '@storybook/react';
import "@clr/icons/clr-icons.min.css";
import "@clr/icons/clr-icons-lite.min.js";
import "@clr/ui/clr-ui.min.css"
import "@clr/icons/clr-icons.min";
import "@clr/icons/shapes/technology-shapes.js";
import {withInfo} from "@storybook/addon-info";

const req = require.context('../src', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
addDecorator(withInfo);
