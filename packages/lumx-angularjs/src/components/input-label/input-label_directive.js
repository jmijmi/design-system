import { CSS_PREFIX } from '@lumx/core/js/constants';

import template from './input-label.html';

/////////////////////////////

function InputLabelController() {
    'ngInject';

    const lx = this;

    /////////////////////////////
    //                         //
    //    Private attributes   //
    //                         //
    /////////////////////////////

    /**
     * The default props.
     *
     * @type {Object}
     * @constant
     * @readonly
     */
    const _DEFAULT_PROPS = {
        theme: 'light',
    };

    /////////////////////////////
    //                         //
    //     Public functions    //
    //                         //
    /////////////////////////////

    /**
     * Get input helper classes.
     *
     * @return {Array} The list of input helper classes.
     */
    function getClasses() {
        const classes = [];

        const theme = lx.theme ? lx.theme : _DEFAULT_PROPS.theme;
        classes.push(`${CSS_PREFIX}-input-label--theme-${theme}`);

        if (lx.isRequired) {
            classes.push(`${CSS_PREFIX}-input-label--is-required`);
        }

        return classes;
    }

    /////////////////////////////

    lx.getClasses = getClasses;
}

/////////////////////////////

function InputLabelDirective() {
    'ngInject';

    return {
        bindToController: true,
        controller: InputLabelController,
        controllerAs: 'lx',
        replace: true,
        restrict: 'E',
        scope: {
            isRequired: '=?lxIsRequired',
            theme: '@?lxTheme',
        },
        template,
        transclude: true,
    };
}

/////////////////////////////

angular.module('lumx.input-label').directive('lxInputLabel', InputLabelDirective);

/////////////////////////////

export { InputLabelDirective };
