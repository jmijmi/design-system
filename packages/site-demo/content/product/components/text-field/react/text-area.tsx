import React, { useState } from 'react';

import { TextField } from '@lumx/react';

const App = ({ theme }) => {
    const [value, setValue] = useState('');

    return <TextField label="Text area label" value={value} onChange={setValue} theme={theme} multiline />;
};

export default App;
