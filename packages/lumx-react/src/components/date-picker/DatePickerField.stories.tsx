import React from 'react';

import { DatePickerField, DatePickerProps } from '@lumx/react';

export default { title: 'DatePickerField' };

export const simpleDatePickerField = ({ theme }: any) => {
    const [value, setValue] = React.useState<DatePickerProps['value']>();

    return (
        <DatePickerField
            locale="fr"
            label="Start date"
            placeholder="Pick a date"
            theme={theme}
            onChange={setValue}
            value={value}
        />
    );
};