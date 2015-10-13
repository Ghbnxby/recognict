import React from 'react';
import Recognict from "./components/Recognict.jsx"

function renderRecognict(element, props){

  return React.render(<Recognict {...props}/>, element);
}

export default {
  renderRecognict: renderRecognict
}