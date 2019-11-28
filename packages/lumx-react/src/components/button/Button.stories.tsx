import React from 'react';

import { Button } from '@lumx/react';

import { decorators } from '@lumx/react/story-block';

export default { title: 'Button', decorators };

export const simpleButton = ({ theme }) => <Button theme={theme}>Simple button</Button>;