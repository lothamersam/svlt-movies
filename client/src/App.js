import React from 'react';
import {test} from "./socket/clientEventHandler";

function App() {
    test(test => console.log(test));

    return (
      <div>test</div>
    );
}

export default App;
