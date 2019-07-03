import React, { ReactElement } from 'react';

import { Chip, ChipSizes, ChipTheme, Colors, Icon } from 'LumX';
import { mdiClose, mdiEmail } from 'LumX/icons';

/////////////////////////////

interface IProps {
    /**
     * The theme to use to display this demo.
     */
    theme: ChipTheme;
}

/////////////////////////////

/**
 * The demo for the default <Chip>s.
 *
 * @return The demo component.
 */
const DemoComponent: React.FC<IProps> = ({ theme }: IProps): ReactElement => (
    <>
        <Chip theme={theme} LabelComponent="Medium">
            Label
        </Chip>
        <Chip color={Colors.red} theme={theme} size={ChipSizes.s} LabelComponent="Small">
            Label
        </Chip>
        <Chip
            before={<Icon icon={mdiEmail} />}
            theme={theme}
            LabelComponent="Clickable"
            onClick={(): void => console.log('Chip component triggered.')}
        >
            Label
        </Chip>
        <Chip
            after={<Icon icon={mdiClose} />}
            before={<Icon icon={mdiEmail} />}
            color={Colors.green}
            theme={theme}
            LabelComponent="Rich"
            onAfterClick={(): void => console.log('After component triggered.')}
            onBeforeClick={(): void => console.log('Before component triggered.')}
            onClick={(): void => console.log('Chip component triggered.')}
        >
            Rich
        </Chip>
        <Chip
            isSelected
            after={<Icon icon={mdiClose} />}
            before={<Icon icon={mdiEmail} />}
            theme={theme}
            LabelComponent="Rich"
            onAfterClick={(): void => console.log('After component triggered.')}
            onBeforeClick={(): void => console.log('Before component triggered.')}
            onClick={(): void => console.log('Chip component triggered.')}
        >
            Label
        </Chip>
    </>
);

/////////////////////////////

export default {
    view: DemoComponent,
};
