import { Color, ColorPalette } from '@lumx/react';
import { COMPONENT_PREFIX } from '@lumx/react/constants';
import { GenericProps, getRootClassName, handleBasicClasses } from '@lumx/react/utils';
import classNames from 'classnames';
import React, { ReactNode } from 'react';

/**
 * Defines the props of the component.
 */
interface BadgeProps extends GenericProps {
    /**
     * Badge content.
     */
    children?: ReactNode;

    /**
     * The badge color.
     */
    color?: Color;
}

/**
 * The display name of the component.
 */
const COMPONENT_NAME = `${COMPONENT_PREFIX}Badge`;

/**
 * The default class name and classes prefix for this component.
 */
const CLASSNAME: string = getRootClassName(COMPONENT_NAME);

/**
 * The default value of props.
 */
const DEFAULT_PROPS: BadgeProps = {
    color: ColorPalette.light,
};

const Badge: React.FC<BadgeProps> = ({ color = DEFAULT_PROPS.color, className, ...props }) => {
    return (
        <div className={classNames(className, handleBasicClasses({ prefix: CLASSNAME, color }))} {...props}>
            {props.children}
        </div>
    );
};

Badge.displayName = COMPONENT_NAME;

export { CLASSNAME, DEFAULT_PROPS, Badge, BadgeProps };
