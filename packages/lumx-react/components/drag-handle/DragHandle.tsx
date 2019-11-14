import React, { ReactElement } from 'react';

import classNames from 'classnames';

import { COMPONENT_PREFIX } from '@lumx/core/react/constants';

import { ColorPalette, Icon, Size, Theme } from 'LumX';
import { IGenericProps, getRootClassName } from '@lumx/core/react/utils';
import { handleBasicClasses } from '@lumx/core/utils';
import { mdiDragVertical } from '@lumx/icons';

/////////////////////////////

/**
 * Defines the props of the component.
 */
interface IDragHandleProps extends IGenericProps {
    theme?: Theme;
}
type DragHandleProps = IDragHandleProps;

/////////////////////////////

/**
 * The display name of the component.
 */
const COMPONENT_NAME = `${COMPONENT_PREFIX}DragHandle`;

/**
 * The default class name and classes prefix for this component.
 */
const CLASSNAME = getRootClassName(COMPONENT_NAME);

/////////////////////////////

const DragHandle: React.FC<DragHandleProps> = (props: DragHandleProps): ReactElement => {
    const { className, theme, ...otherProps } = props;

    return (
        <div className={classNames(className, handleBasicClasses({ prefix: CLASSNAME, theme }))} {...otherProps}>
            <Icon icon={mdiDragVertical} color={theme === Theme.dark ? ColorPalette.light : undefined} size={Size.xs} />
        </div>
    );
};
DragHandle.displayName = COMPONENT_NAME;

/////////////////////////////

export { CLASSNAME, DragHandle, DragHandleProps };