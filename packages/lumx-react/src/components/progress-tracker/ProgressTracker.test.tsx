import { ProgressTrackerStep } from '@lumx/react';
import { CommonSetup, commonTestsSuite, Wrapper } from '@lumx/react/testing/utils';

import { mount, shallow } from 'enzyme';
import 'jest-enzyme';
import noop from 'lodash/noop';
import React, { ReactElement } from 'react';
import { CLASSNAME, ProgressTracker, ProgressTrackerProps } from './ProgressTracker';

/**
 * Define the overriding properties waited by the `setup` function.
 */
type SetupProps = Partial<ProgressTrackerProps>;

/**
 * Defines what the `setup` function will return.
 */
interface Setup extends CommonSetup {
    props: SetupProps;

    /**
     * The <div> element that wraps radio button and children elements.
     */
    wrapper: Wrapper;

    steps: Wrapper;
}

/**
 * Mounts the component and returns common DOM elements / data needed in multiple tests further down.
 *
 * @param   propsOverrides          The props to use to override the default props of the component.
 * @param   [shallowRendering=true] Indicates if we want to do a shallow or a full rendering.
 * @return An object with the props, the component wrapper and some shortcut to some element inside of the component.
 */
const setup = (propsOverrides: SetupProps = {}, shallowRendering = true): Setup => {
    const props: ProgressTrackerProps = {
        ...propsOverrides,
    };
    const renderer: (el: ReactElement) => Wrapper = shallowRendering ? shallow : mount;
    const children = props.children ?? <ProgressTrackerStep onClick={noop} label="Step label" />;
    const wrapper = renderer(<ProgressTracker {...props}>{children}</ProgressTracker>);

    return {
        props,
        steps: wrapper.find('ProgressTrackerStep'),
        wrapper,
    };
};

describe(`<${ProgressTracker.displayName}>`, () => {
    // 1. Test render via snapshot (default states of component).
    describe('Snapshots and structure', () => {
        it('should render defaults', () => {
            const { wrapper } = setup();
            expect(wrapper).toMatchSnapshot();

            expect(wrapper).toExist();
            expect(wrapper).toHaveClassName(CLASSNAME);
        });
    });

    // 2. Test defaultProps value and important props custom values.
    describe('Props', () => {
        // Nothing to do here.
    });

    // 3. Test events.
    describe('Events', () => {
        // Nothing to do here
    });

    // 4. Test conditions (i.e. things that display or not in the UI based on props).
    describe('Conditions', () => {
        // Nothing to do here.
    });

    // 5. Test state.
    describe('State', () => {
        // Nothing to do here.
    });

    // Common tests suite.
    commonTestsSuite(setup, { prop: 'wrapper', className: 'wrapper' }, { className: CLASSNAME });
});
