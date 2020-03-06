import React from 'react';

import classNames from 'classnames';

import { COMPONENT_PREFIX } from '@lumx/react/constants';
import { GenericProps, getRootClassName, handleBasicClasses } from '@lumx/react/utils';

/**
 * Defines the props of the component.
 */
export type ListDividerProps = GenericProps;

/**
 * The display name of the component.
 */
const COMPONENT_NAME = `${COMPONENT_PREFIX}ListDivider`;

/**
 * The default class name and classes prefix for this component.
 */
export const CLASSNAME = getRootClassName(COMPONENT_NAME);

/**
 * The default value of props.
 */
export const DEFAULT_PROPS: Partial<ListDividerProps> = {};

/**
 * Renders a thin line that will acts as a divider in List
 *
 * @return The component.
 */
export const ListDivider: React.FC<ListDividerProps> = ({ className, ...props }) => (
    <li className={classNames(className, handleBasicClasses({ prefix: CLASSNAME }))} {...props} />
);
ListDivider.displayName = COMPONENT_NAME;
