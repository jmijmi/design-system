import React from 'react';

import classNames from 'classnames';

import { Theme } from '@lumx/react';

import { COMPONENT_PREFIX, CSS_PREFIX } from '@lumx/react/constants';
import { GenericProps, getRootClassName, handleBasicClasses } from '@lumx/react/utils';

/**
 * Authorized variants.
 */
export enum ProgressVariant {
    linear = 'linear',
    circular = 'circular',
}

/**
 * Defines the props of the component.
 */
export interface ProgressProps extends GenericProps {
    /** The theme to apply to the component. Can be either 'light' or 'dark'. */
    theme?: Theme;
    /** Whether custom colors are applied to this component. */
    useCustomColors?: boolean;
    /* Type of progress */
    variant?: ProgressVariant;
}

/**
 * The display name of the component.
 */
const COMPONENT_NAME = `${COMPONENT_PREFIX}Progress`;

/**
 * The default class name and classes prefix for this component.
 */
export const CLASSNAME = getRootClassName(COMPONENT_NAME);

/**
 * The default value of props.
 */
export const DEFAULT_PROPS: Partial<ProgressProps> = {
    theme: Theme.light,
    variant: ProgressVariant.circular,
};

/**
 * Simple Progress component that can be displayed as a linear or circular element
 *
 * @return The component.
 */
export const Progress: React.FC<ProgressProps> = ({
    className,
    theme = DEFAULT_PROPS.theme,
    useCustomColors,
    variant = DEFAULT_PROPS.variant,
    ...props
}) => {
    return (
        <div
            className={classNames(className, handleBasicClasses({ prefix: CLASSNAME, theme, variant }), {
                [`${CSS_PREFIX}-custom-colors`]: useCustomColors,
            })}
            {...props}
        >
            <div className={classNames(`${CLASSNAME}-${variant}`)}>
                {variant === ProgressVariant.circular && (
                    <>
                        <div className="lumx-progress-circular__double-bounce1" />
                        <div className="lumx-progress-circular__double-bounce2" />

                        <svg className="lumx-progress-circular__svg" viewBox="25 25 50 50">
                            <circle
                                className="lumx-progress-circular__path"
                                cx="50"
                                cy="50"
                                r="20"
                                fill="none"
                                strokeWidth="5"
                            />
                        </svg>
                    </>
                )}
                {variant === ProgressVariant.linear && (
                    <>
                        <div className="lumx-progress-linear__line1" />
                        <div className="lumx-progress-linear__line2" />
                    </>
                )}
            </div>
        </div>
    );
};
Progress.displayName = COMPONENT_NAME;
