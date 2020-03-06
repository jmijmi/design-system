import React, { AnchorHTMLAttributes } from 'react';

import { COMPONENT_PREFIX } from '@lumx/react/constants';
import classNames from 'classnames';

import { Color, ColorVariant } from '@lumx/react';
import { getRootClassName, handleBasicClasses } from '@lumx/react/utils';

/**
 * Defines the props of the component.
 */
interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    /** The icon color. */
    color?: Color;

    /** The icon color variant. */
    colorVariant?: ColorVariant;
}

/**
 * The display name of the component.
 */
const COMPONENT_NAME = `${COMPONENT_PREFIX}Link`;

/**
 * The default class name and classes prefix for this component.
 */
const CLASSNAME: string = getRootClassName(COMPONENT_NAME);

/**
 * Link component.
 *
 * @return The component.
 */
const Link: React.FC<LinkProps> = ({ children, className, color, colorVariant, ...props }) => {
    return (
        <a className={classNames(className, handleBasicClasses({ prefix: CLASSNAME, color, colorVariant }))} {...props}>
            {children}
        </a>
    );
};
Link.displayName = COMPONENT_NAME;

export { CLASSNAME, COMPONENT_NAME, Link, LinkProps };