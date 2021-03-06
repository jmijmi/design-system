import React, { ReactElement, RefObject } from 'react';

import { ReactWrapper, ShallowWrapper, mount, shallow } from 'enzyme';
import 'jest-enzyme';

import { Kind, Theme } from '@lumx/react/components';
import { Chip } from '@lumx/react/components/chip/Chip';
import { Icon } from '@lumx/react/components/icon/Icon';

import { CommonSetup, Wrapper, commonTestsSuite } from '@lumx/react/testing/utils';
import { getBasicClass } from '@lumx/react/utils';

import { mdiCloseCircle, mdiMenuDown } from '@lumx/icons';
import { Dropdown } from '@lumx/react/components/dropdown/Dropdown';
import { CLASSNAME, Select, SelectProps, SelectVariant } from './Select';
import { DEFAULT_PROPS } from './WithSelectContext';

/** Define the overriding properties waited by the `setup` function. */
type SetupProps = Partial<SelectProps>;

/** Defines what the `setup` function will return. */
interface Setup extends CommonSetup {
    props: SetupProps;

    /**
     * [Enter the description of this wrapper].
     * [You should also probably change the name of the wrapper to something more meaningful].
     */
    input: Wrapper;
    dropdown: Wrapper;
    helper: Wrapper;
    error: Wrapper;
    container: Wrapper;
}

/**
 * Mounts the component and returns common DOM elements / data needed in multiple tests further down.
 *
 * @param  props  The props to use to override the default props of the component.
 * @param  [shallowRendering=true] Indicates if we want to do a shallow or a full rendering.
 * @return An object with the props, the component wrapper and some shortcut to some element inside of the component.
 */
const setup = ({ ...propsOverrides }: SetupProps = {}, shallowRendering: boolean = true): Setup => {
    const props: SelectProps = {
        children: <span>Select Component</span>,
        value: '',
        ...propsOverrides,
    };

    const renderer: (el: ReactElement) => Wrapper = shallowRendering ? shallow : mount;
    const wrapper: ShallowWrapper | ReactWrapper = renderer(<Select {...props} />);

    return {
        container: wrapper.find('div').first(),
        dropdown: wrapper.find(Dropdown),
        error: wrapper
            .findWhere(
                (n: ShallowWrapper | ReactWrapper) => n.name() === 'InputHelper' && n.prop('kind') === Kind.error,
            )
            .first(),
        helper: wrapper.findWhere(
            (n: ShallowWrapper | ReactWrapper) => n.name() === 'InputHelper' && n.prop('kind') === undefined,
        ),
        input: wrapper.find('#uuid').first(),
        props,
        wrapper,
    };
};

describe(`<${Select.displayName}>`, () => {
    // 1. Test render via snapshot (default states of component).
    describe('Snapshots and structure', () => {
        it('should render correctly', () => {
            const { container, wrapper } = setup();
            expect(wrapper).toMatchSnapshot();

            expect(container).toExist();
            expect(container).toHaveClassName(CLASSNAME);
        });
    });

    // 2. Test defaultProps value and important props custom values.
    describe('Props', () => {
        it('should have default classNames', () => {
            const { wrapper, container }: Setup = setup();
            wrapper.update();

            expect(container).toHaveClassName(CLASSNAME);
            expect(container).toHaveClassName(
                getBasicClass({ prefix: CLASSNAME, type: 'theme', value: DEFAULT_PROPS.theme }),
            );
            expect(container).toHaveClassName(getBasicClass({ prefix: CLASSNAME, type: 'isEmpty', value: true }));
        });

        it('should use the given `theme`', () => {
            const testedProp = 'theme';
            const modifiedProps: SetupProps = {
                [testedProp]: Theme.dark,
            };

            const { container } = setup(modifiedProps);

            expect(container).toHaveClassName(
                getBasicClass({ prefix: CLASSNAME, type: testedProp, value: modifiedProps[testedProp] }),
            );
            expect(container).not.toHaveClassName(
                getBasicClass({ prefix: CLASSNAME, type: testedProp, value: DEFAULT_PROPS.theme }),
            );
        });

        it('should use the given `isValid`', () => {
            const testedProp = 'isValid';
            const modifiedProps: SetupProps = {
                [testedProp]: true,
            };

            const { container } = setup(modifiedProps);

            expect(container).toHaveClassName(
                getBasicClass({ prefix: CLASSNAME, type: testedProp, value: modifiedProps[testedProp] }),
            );
        });

        it('should use the given `hasError`', () => {
            const testedProp = 'hasError';
            const modifiedProps: SetupProps = {
                [testedProp]: true,
            };

            const { container } = setup(modifiedProps);

            expect(container).toHaveClassName(
                getBasicClass({ prefix: CLASSNAME, type: testedProp, value: modifiedProps[testedProp] }),
            );
        });

        it('should display the given `error`', () => {
            const { container, error } = setup({
                error: 'You are not bold!',
                hasError: true,
            });

            expect(error).toExist();
            expect(container).toHaveClassName(getBasicClass({ prefix: CLASSNAME, type: 'hasError', value: true }));
        });

        it('should NOT display the given `error`', () => {
            const { container, error } = setup({
                error: 'You are not bold!',
                hasError: false,
            });

            expect(error).not.toExist();
            expect(container).not.toHaveClassName(getBasicClass({ prefix: CLASSNAME, type: 'hasError', value: true }));
        });

        it('should use the given `value`', () => {
            const testedProp = 'value';
            const modifiedProps: SetupProps = {
                [testedProp]: 'val1',
            };

            const { container } = setup(modifiedProps);

            expect(container).toHaveClassName(getBasicClass({ prefix: CLASSNAME, type: 'hasUnique', value: true }));
            expect(container).toHaveClassName(getBasicClass({ prefix: CLASSNAME, type: 'hasValue', value: true }));
            expect(container).not.toHaveClassName(getBasicClass({ prefix: CLASSNAME, type: 'isEmpty', value: true }));
        });

        it('should trigger the given `onDropdownClose` on dropdown close', () => {
            const onDropdownClose = jest.fn();
            const { dropdown } = setup({ onDropdownClose });

            const props: any = dropdown.props();

            props.onClose();

            expect(onDropdownClose).toHaveBeenCalled();
        });

        it('should pass the given `isOpen` to the dropdown', () => {
            const isOpen = true;
            const { dropdown } = setup({ isOpen });

            expect(dropdown).toHaveProp('showDropdown', isOpen);
        });

        it('should display the given `helper`', () => {
            const { helper } = setup({
                helper: 'Be bold',
            });

            expect(helper).toExist();
        });

        it('should display the given `helper` and `error`', () => {
            const { error, helper } = setup({
                error: 'You are not bold!',
                hasError: true,
                helper: 'Be bold',
            });

            expect(error).toExist();
            expect(helper).toExist();
        });
    });

    // 3. Test events.
    describe('Events', () => {
        const onClick: jest.Mock = jest.fn();

        beforeEach(() => {
            onClick.mockClear();
        });

        describe('should trigger `onInputClick` when the select button is clicked', () => {
            it('with input variant', () => {
                const { input } = setup({ onInputClick: onClick, variant: SelectVariant.input }, false);

                input.simulate('click');

                expect(onClick).toHaveBeenCalled();
            });

            it('with chip variant', () => {
                const { input } = setup({ onInputClick: onClick, variant: SelectVariant.chip }, false);

                input.simulate('click');

                expect(onClick).toHaveBeenCalled();
            });
        });

        it('should call onClear when clear icon is clicked in select input', () => {
            const value = 'Value';
            const onClear: jest.Mock = jest.fn();
            const { input } = setup({ value, onClear }, false);

            input
                .find(`.${CLASSNAME}__input-clear`)
                .first()
                .simulate('click');
            expect(onClear).toHaveBeenCalled();
        });
    });

    // 4. Test conditions (i.e. things that display or not in the UI based on props).
    describe('Conditions', () => {
        describe('Input variant', () => {
            it('should render a div as the select input', () => {
                const { dropdown, input } = setup({}, false);
                const dropdownRef: RefObject<HTMLDivElement> = dropdown.prop('anchorRef');
                expect(input.type()).toBe('div');
                // Impossible to get the ref passed to a div so we check if ref.current is matching the input html.
                expect(input.html()).toEqual(dropdownRef && dropdownRef.current && dropdownRef.current.outerHTML);
            });

            describe('Has value', () => {
                const value = 'Value';
                const hasValueProps: Partial<SetupProps> = {
                    value,
                    variant: SelectVariant.input,
                };

                it('should render the value selected if not multiple ', () => {
                    const { input } = setup({ ...hasValueProps }, false);

                    expect(
                        input
                            .find(`.${CLASSNAME}__input-native span`)
                            .first()
                            .text(),
                    ).toBe(value);
                });
            });

            describe('No value', () => {
                const placeholder = 'My placeholder';
                const hasNoValueProps: Partial<SetupProps> = {
                    placeholder,
                    value: '',
                    variant: SelectVariant.input,
                };

                it('should render the placeholder when empty', () => {
                    const { input } = setup({ ...hasNoValueProps }, false);

                    expect(
                        input
                            .find(`.${CLASSNAME}__input-native--placeholder span`)
                            .first()
                            .text(),
                    ).toBe(placeholder);
                });
            });
        });

        describe('Chip variant', () => {
            it('should render a Chip as the select input', () => {
                const { dropdown, input } = setup({ variant: SelectVariant.chip }, false);

                expect(input.type()).toEqual(Chip);
                expect(input.prop('chipRef')).toBe(dropdown.prop('anchorRef'));
            });

            describe('Has value', () => {
                const value = 'Value';
                const hasValueProps: Partial<SetupProps> = {
                    value,
                    variant: SelectVariant.chip,
                };

                it('should render the value', () => {
                    const label = 'The label';
                    const { input } = setup(
                        {
                            ...hasValueProps,
                            label,
                        },
                        false,
                    );

                    expect(input.find('.lumx-chip__label').text()).toEqual(value);
                });

                it('should render a close icon if there is a value', () => {
                    const { input } = setup({ ...hasValueProps }, false);

                    expect(
                        input
                            .find(Icon)
                            .first()
                            .prop('icon'),
                    ).toBe(mdiCloseCircle);
                });
            });

            describe('No value', () => {
                const hasNoValue: Partial<SetupProps> = {
                    value: '',
                    variant: SelectVariant.chip,
                };

                it('should render the label', () => {
                    const label = 'The label';
                    const { input } = setup({ ...hasNoValue, label }, false);

                    expect(input.find('.lumx-chip__label').text()).toEqual(label);
                });

                it('should render a MenuDown icon', () => {
                    const { input } = setup({ ...hasNoValue }, false);

                    expect(
                        input
                            .find(Icon)
                            .first()
                            .prop('icon'),
                    ).toBe(mdiMenuDown);
                });
            });
        });
    });

    // 5. Test state.
    describe('State', () => {
        // Nothing to do here.
    });

    // Common tests suite.
    commonTestsSuite(setup, { className: 'wrapper' }, { className: CLASSNAME });
});
