import React, { ReactNode, RefObject, SyntheticEvent } from 'react';

import classNames from 'classnames';

import { mdiAlertCircle, mdiCheckCircle, mdiClose, mdiCloseCircle, mdiMenuDown } from '@lumx/icons';

import { Emphasis, Size } from '@lumx/react/components';
import { IconButton } from '@lumx/react/components/button/IconButton';
import { Chip } from '@lumx/react/components/chip/Chip';
import { ChipGroup } from '@lumx/react/components/chip/ChipGroup';
import { Icon } from '@lumx/react/components/icon/Icon';
import { InputLabel } from '@lumx/react/components/input-label/InputLabel';

import { COMPONENT_PREFIX } from '@lumx/react/constants';

import { getRootClassName, handleBasicClasses } from '@lumx/react/utils';

import { withSelectContext } from './WithSelectContext';
import { ICoreSelectProps, SelectVariant } from './constants';

/////////////////////////////

/**
 * Defines the props of the component.
 */
interface ISelectMultipleProps extends ICoreSelectProps {
    /** The list of selected values. */
    value: string[];

    /** The function called to render a selected value when `isMultiple` is true. Default: Renders the value inside of a Chip */
    selectedChipRender?(
        choice: string,
        index: number,
        onClear?: (event: SyntheticEvent, choice: string) => void,
        isDisabled?: boolean,
    ): ReactNode | string;
}
type SelectMultipleProps = ISelectMultipleProps;

/////////////////////////////

/**
 * Define the types of the default props.
 */
interface IDefaultPropsType extends Partial<SelectMultipleProps> {}

/////////////////////////////
//                         //
//    Public attributes    //
//                         //
/////////////////////////////

/**
 * The display name of the component.
 */
const COMPONENT_NAME = `${COMPONENT_PREFIX}Select`;

/**
 * The default class name and classes prefix for this component.
 */
const CLASSNAME: string = getRootClassName(COMPONENT_NAME);

/**
 * The default value of props.
 */
const DEFAULT_PROPS: IDefaultPropsType = {
    hasError: false,
    isMultiple: false,
    isOpen: false,
    isValid: false,
    selectedChipRender(choice, index, onClear, isDisabled?) {
        const onClick = (event: React.MouseEvent) => onClear && onClear(event, choice);
        return (
            <Chip
                key={index}
                after={onClear && <Icon icon={mdiClose} size={Size.xxs} />}
                isDisabled={isDisabled}
                size={Size.s}
                onAfterClick={onClick}
                onClick={onClick}
            >
                {choice}
            </Chip>
        );
    },
    selectedValueRender: (choice) => choice,
};
/////////////////////////////

const stopPropagation = (evt: Event) => evt.stopPropagation();

/**
 * Select Multiple component.
 *
 * @return The component.
 */
const SelectMultiple: React.FC<any> = ({
    variant,
    label,
    value,
    isEmpty,
    isValid,
    hasError,
    onClear,
    onInputClick,
    theme,
    placeholder,
    handleKeyboardNav,
    targetUuid,
    anchorRef,
    isRequired,
    isDisabled,
    hasInputClear,
    selectedChipRender = DEFAULT_PROPS.selectedChipRender,
    selectedValueRender = DEFAULT_PROPS.selectedValueRender,
}): React.ReactElement => {
    return (
        <>
            {variant === SelectVariant.input && (
                <>
                    {label && (
                        <div className={`${CLASSNAME}__header`}>
                            <InputLabel
                                htmlFor={targetUuid}
                                className={`${CLASSNAME}__label`}
                                isRequired={isRequired}
                                theme={theme}
                            >
                                {label}
                            </InputLabel>
                        </div>
                    )}

                    <div
                        ref={anchorRef as RefObject<HTMLDivElement>}
                        id={targetUuid}
                        className={`${CLASSNAME}__wrapper`}
                        onClick={onInputClick}
                        onKeyDown={handleKeyboardNav}
                        tabIndex={0}
                    >
                        <div className={`${CLASSNAME}__chips`}>
                            {!isEmpty && (
                                <ChipGroup>
                                    {value.map((val: string, index: number) =>
                                        selectedChipRender!(val, index, onClear, isDisabled),
                                    )}
                                </ChipGroup>
                            )}
                        </div>

                        {isEmpty && placeholder && (
                            <div
                                className={classNames([
                                    `${CLASSNAME}__input-native`,
                                    `${CLASSNAME}__input-native--placeholder`,
                                ])}
                            >
                                <span>{placeholder}</span>
                            </div>
                        )}

                        {(isValid || hasError) && (
                            <div className={`${CLASSNAME}__input-validity`}>
                                <Icon icon={isValid ? mdiCheckCircle : mdiAlertCircle} size={Size.xxs} />
                            </div>
                        )}

                        {hasInputClear && (
                            <IconButton
                                className={`${CLASSNAME}__input-clear`}
                                icon={mdiCloseCircle}
                                emphasis={Emphasis.low}
                                size={Size.s}
                                theme={theme}
                                onClick={onClear}
                                onKeyDown={stopPropagation}
                            />
                        )}

                        <div className={`${CLASSNAME}__input-indicator`}>
                            <Icon icon={mdiMenuDown} size={Size.s} />
                        </div>
                    </div>
                </>
            )}

            {variant === SelectVariant.chip && (
                <Chip
                    id={targetUuid}
                    isSelected={!isEmpty}
                    after={<Icon icon={isEmpty ? mdiMenuDown : mdiCloseCircle} />}
                    onAfterClick={isEmpty ? onInputClick : onClear}
                    onClick={onInputClick}
                    chipRef={anchorRef as RefObject<HTMLAnchorElement>}
                    theme={theme}
                >
                    {isEmpty && <span>{label}</span>}

                    {!isEmpty && (
                        <span>
                            <span>{selectedValueRender!(value[0])}</span>

                            {value.length > 1 && <span>&nbsp;+{value.length - 1}</span>}
                        </span>
                    )}
                </Chip>
            )}
        </>
    );
};
SelectMultiple.displayName = COMPONENT_NAME;

/////////////////////////////

const selectMultipleWithContext = (props) =>
    withSelectContext(SelectMultiple, {
        ...props,
        className: classNames(
            props.className,
            handleBasicClasses({
                hasMultiple: !props.isEmpty,
                hasUnique: false,
                prefix: CLASSNAME,
            }),
        ),
    });

export { CLASSNAME, DEFAULT_PROPS, selectMultipleWithContext as SelectMultiple, SelectMultipleProps, SelectVariant };
