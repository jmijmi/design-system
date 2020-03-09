import { CSS_PREFIX } from '@lumx/core/js/constants';

import template from './radio-button.html';

/////////////////////////////

function RadioButtonController(LxUtilsService) {
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

    /**
     * The model controller.
     *
     * @type {Object}
     */
    let _modelController;

    /////////////////////////////
    //                         //
    //    Public attributes    //
    //                         //
    /////////////////////////////

    /**
     * The radio button id.
     *
     * @type {string}
     */
    lx.radioButtonId = LxUtilsService.generateUUID();

    /**
     * Whether the directive has helper slot filled or not.
     *
     * @type {boolean}
     */
    lx.hasHelper = false;

    /**
     * Whether the directive has label slot filled or not.
     *
     * @type {boolean}
     */
    lx.hasLabel = false;

    /**
     * Whether the directive has transcluded content if no transclude slot.
     *
     * @type {boolean}
     */
    lx.hasTranscluded = false;

    /**
     * The radio button value.
     *
     * @type {string}
     */
    lx.radioButtonValue = undefined;

    /**
     * The model view value.
     *
     * @type {string}
     */
    lx.viewValue = undefined;

    /////////////////////////////
    //                         //
    //     Public functions    //
    //                         //
    /////////////////////////////

    /**
     * Get radio button classes.
     *
     * @return {Array} The list of radio button classes.
     */
    function getClasses() {
        const classes = [];

        const state = lx.viewValue === lx.radioButtonValue ? 'checked' : 'unchecked';
        const theme = lx.theme ? lx.theme : _DEFAULT_PROPS.theme;

        classes.push(`${CSS_PREFIX}-radio-button--is-${state}`);
        classes.push(`${CSS_PREFIX}-radio-button--theme-${theme}`);

        if (lx.customColors) {
            classes.push(`${CSS_PREFIX}-custom-colors`);
        }

        return classes;
    }

    /**
     * Set the model controller.
     *
     * @param {Object} modelController The model controller.
     */
    function setModelController(modelController) {
        _modelController = modelController;

        _modelController.$render = function onModelRender() {
            lx.viewValue = _modelController.$viewValue;
        };
    }

    /**
     * Update model controller view value on radio button click.
     */
    function updateViewValue() {
        if (angular.isUndefined(_modelController)) {
            return;
        }

        _modelController.$setViewValue(lx.radioButtonValue);
        _modelController.$render();
    }

    /////////////////////////////

    lx.getClasses = getClasses;
    lx.setModelController = setModelController;
    lx.updateViewValue = updateViewValue;
}

/////////////////////////////

function RadioButtonDirective() {
    'ngInject';

    function link(scope, el, attrs, ctrls, transclude) {
        if (ctrls[1]) {
            ctrls[0].setModelController(ctrls[1]);
        }

        if (transclude.isSlotFilled('label')) {
            ctrls[0].hasLabel = true;
        }

        if (transclude.isSlotFilled('helper')) {
            ctrls[0].hasHelper = true;
        }

        if (!ctrls[0].hasLabel && !ctrls[0].hasHelper) {
            transclude((clone) => {
                if (clone.length > 0) {
                    ctrls[0].hasTranscluded = true;
                }
            });
        }

        attrs.$observe('disabled', (isDisabled) => {
            el.find('input').attr('disabled', isDisabled);

            if (isDisabled) {
                el.addClass(`${CSS_PREFIX}-radio-button--is-disabled`);
            } else {
                el.removeClass(`${CSS_PREFIX}-radio-button--is-disabled`);
            }
        });

        attrs.$observe('name', (newName) => {
            el.find('input').attr('name', newName);
        });

        attrs.$observe('value', (newValue) => {
            el.find('input').attr('value', newValue);

            ctrls[0].radioButtonValue = newValue;
        });
    }

    return {
        bindToController: true,
        controller: RadioButtonController,
        controllerAs: 'lx',
        link,
        replace: true,
        require: ['lxRadioButton', '?ngModel'],
        restrict: 'E',
        scope: {
            customColors: '=?lxCustomColors',
            theme: '@?lxTheme',
        },
        template,
        transclude: {
            helper: '?lxRadioButtonHelper',
            label: '?lxRadioButtonLabel',
        },
    };
}

/////////////////////////////

angular.module('lumx.radio-button').directive('lxRadioButton', RadioButtonDirective);

/////////////////////////////

export { RadioButtonDirective };
