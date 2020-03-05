import { mdiAlertCircle, mdiCheckCircle, mdiClose, mdiCloseCircle, mdiMagnify, mdiMenuDown } from '@lumx/icons';

import { CSS_PREFIX, DOWN_KEY_CODE, ENTER_KEY_CODE } from '@lumx/core/js/constants';

import template from './select.html';

/////////////////////////////

function SelectController($document, $interpolate, $sce, $scope, $timeout, LxDropdownService, LxUtilsService) {
    'ngInject';

    // eslint-disable-next-line consistent-this
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
     * The choice template.
     *
     * @type {string}
     */
    let _choiceTemplate;

    /**
     * The model controller.
     *
     * @type {Object}
     */
    // eslint-disable-next-line one-var
    let _modelController;

    /**
     * The selected template.
     *
     * @type {string}
     */
    // eslint-disable-next-line one-var
    let _selectedTemplate;

    /////////////////////////////
    //                         //
    //    Public attributes    //
    //                         //
    /////////////////////////////

    /**
     * Whether the select is focus or not.
     *
     * @type {boolean}
     */
    lx.isFocus = false;

    /**
     * Whether the dropdown is open or not.
     *
     * @type {boolean}
     */
    lx.isOpen = false;

    /**
     * The dropdown unique identifier.
     *
     * @type {string}
     */
    lx.dropdownUuid = LxUtilsService.generateUUID();

    /**
     * The filter model.
     *
     * @type {string}
     */
    lx.filterModel = undefined;

    /**
     * The select icons.
     *
     * @type {Object}
     */
    lx.icons = {
        mdiAlertCircle,
        mdiCheckCircle,
        mdiClose,
        mdiCloseCircle,
        mdiMagnify,
        mdiMenuDown,
    };

    /**
     * The dropdown target unique identifier.
     *
     * @type {string}
     */
    lx.targetUuid = LxUtilsService.generateUUID();

    /**
     * The model view value.
     *
     * @type {string}
     */
    lx.viewValue = undefined;

    /////////////////////////////
    //                         //
    //    Private functions    //
    //                         //
    /////////////////////////////

    /**
     * Check if two objects are equals according to their id in priority.
     *
     * @param  {Object} obj1 The first object to compare.
     * @param  {Object} obj2 The second object to compare.
     * @return {boolean} Whether obj1 is equal to obj2.
     */
    function _isEqual(obj1, obj2) {
        if (angular.isUndefined(obj1) || angular.isUndefined(obj2)) {
            return false;
        }

        if (angular.isDefined(obj1.id) && angular.isDefined(obj2.id)) {
            return obj1.id === obj2.id;
        } else if (angular.isDefined(obj1.uid) && angular.isDefined(obj2.uid)) {
            return obj1.uid === obj2.uid;
        } else if (angular.isDefined(obj1.uuid) && angular.isDefined(obj2.uuid)) {
            return obj1.uuid === obj2.uuid;
        }

        return angular.equals(obj1, obj2);
    }

    /**
     * Returns the object index in an array.
     *
     * @param  {Array}  arr The array to check in.
     * @param  {Object} obj The object to check.
     * @return {number} The object index.
     */
    function _arrayObjectIndexOf(arr, obj) {
        for (let i = 0, len = arr.length; i < len; i++) {
            if (_isEqual(obj, arr[i])) {
                return i;
            }
        }

        return -1;
    }

    /**
     * Init view value.
     */
    function _initViewValue() {
        if (lx.multiple && angular.isUndefined(_modelController.$viewValue)) {
            _modelController.$setViewValue([]);
        }

        if (angular.isDefined(lx.modelToSelection)) {
            if (lx.multiple) {
                lx.viewValue = [];

                angular.forEach(_modelController.$viewValue, (item) => {
                    lx.modelToSelection({
                        // eslint-disable-next-line id-blacklist
                        callback(response) {
                            if (angular.isUndefined(response) || !response) {
                                return;
                            }

                            lx.viewValue.push(response);
                        },
                        // eslint-disable-next-line id-blacklist
                        data: item,
                    });
                });
            } else {
                lx.modelToSelection({
                    // eslint-disable-next-line id-blacklist
                    callback(response) {
                        if (angular.isUndefined(response) || !response) {
                            return;
                        }

                        lx.viewValue = response;
                    },
                    // eslint-disable-next-line id-blacklist
                    data: _modelController.$viewValue,
                });
            }
        } else {
            lx.viewValue = _modelController.$viewValue;
        }
    }

    /**
     * Select item synchronously (no selectiontoModel).
     *
     * @param {Object} choice The choice object.
     */
    function _updateModel(choice) {
        let updatedModel;

        if (lx.multiple) {
            updatedModel = angular.copy(_modelController.$viewValue);

            const choiceIndex = _arrayObjectIndexOf(_modelController.$viewValue, choice);

            if (choiceIndex === -1) {
                updatedModel.push(choice);
            } else {
                updatedModel.splice(choiceIndex, 1);
            }
        } else {
            updatedModel = choice;
        }

        _modelController.$setViewValue(updatedModel);
    }

    /**
     * Update view value on select.
     *
     * @param {Object} choice The choice object.
     */
    function _updateViewValue(choice) {
        if (lx.multiple) {
            const choiceIndex = _arrayObjectIndexOf(lx.viewValue, choice);

            if (choiceIndex === -1) {
                lx.viewValue.push(choice);
            } else {
                lx.viewValue.splice(choiceIndex, 1);
            }
        } else {
            lx.viewValue = choice;
        }
    }

    /**
     * Open the dropdown menu.
     *
     * @param {Event} evt The click/key event.
     */
    function _openDropdown(evt) {
        if (angular.isDefined(evt)) {
            evt.stopPropagation();
        }

        LxDropdownService.open(lx.dropdownUuid, { target: `#${lx.targetUuid}` });
    }

    /**
     * Close the dropdown menu.
     *
     * @param {Event} evt The click/key event.
     */
    function _closeDropdown(evt) {
        if (angular.isDefined(evt)) {
            evt.stopPropagation();
        }

        LxDropdownService.close(lx.dropdownUuid);
    }

    /**
     * Handle key events on input wrapper focus.
     *
     * @param {Event} evt The key event.
     */
    function _onKeyDown(evt) {
        if ((evt.keyCode === DOWN_KEY_CODE || evt.keyCode === ENTER_KEY_CODE) && !lx.isOpen) {
            _openDropdown(evt);

            evt.preventDefault();
            evt.stopPropagation();
        }
    }

    /////////////////////////////
    //                         //
    //     Public functions    //
    //                         //
    /////////////////////////////

    /**
     * Clear the model on clear button click.
     *
     * @param {Event} [evt] The event that triggered the function.
     */
    function clearModel(evt) {
        if (angular.isDefined(evt)) {
            evt.stopPropagation();
        }

        if (lx.multiple) {
            _modelController.$setViewValue([]);
            lx.viewValue.length = 0;
        } else {
            _modelController.$setViewValue(undefined);
            lx.viewValue = undefined;
        }
    }

    /**
     * Disable key events on input wrapper blur.
     */
    function disableKeyEvents() {
        lx.isFocus = false;
        $document.off('keydown', _onKeyDown);
    }

    /**
     * Display the choice according to the choice template.
     *
     * @param  {Object} choice The choice object.
     * @return {string} The choice label.
     */
    function displayChoice(choice) {
        const choiceScope = {
            $choice: choice,
        };

        const interpolatedChoice = $interpolate(_choiceTemplate)(choiceScope);

        return $sce.trustAsHtml(interpolatedChoice);
    }

    /**
     * Display the selected item according to the selected template.
     *
     * @param  {Object} [selected] The selected object.
     * @return {string} The selected label.
     */
    function displaySelected(selected) {
        const selectedScope = {};

        if (!angular.isArray(lx.choices)) {
            Object.entries(lx.choices).forEach(([subheader, choices]) => {
                if (_arrayObjectIndexOf(choices, selected) !== -1) {
                    selectedScope.$selectedSubheader = subheader;
                }
            });
        }

        selectedScope.$selected = angular.isDefined(selected) ? selected : lx.viewValue;

        const interpolatedSelected = $interpolate(_selectedTemplate)(selectedScope);

        return $sce.trustAsHtml(interpolatedSelected);
    }

    /**
     * Display the choice subheader.
     *
     * @param  {string} subheader The raw choice subheader.
     * @return {string} The trusted choice subheader.
     */
    function displaySubheader(subheader) {
        return $sce.trustAsHtml(subheader);
    }

    /**
     * Enable key events on input wrapper focus.
     */
    function enableKeyEvents() {
        lx.isFocus = true;
        $document.on('keydown', _onKeyDown);
    }

    /**
     * Get select classes.
     *
     * @return {Array} The list of select classes.
     */
    function getClasses() {
        const classes = [];

        const mode = lx.multiple ? 'multiple' : 'unique';
        const theme = lx.theme ? lx.theme : _DEFAULT_PROPS.theme;
        const value = lx.isModelEmpty() ? 'is-empty' : 'has-value';

        classes.push(`${CSS_PREFIX}-select--${mode}`);
        classes.push(`${CSS_PREFIX}-select--theme-${theme}`);
        classes.push(`${CSS_PREFIX}-select--${value}`);

        if (lx.hasError) {
            classes.push(`${CSS_PREFIX}-select--has-error`);
        }

        if (lx.isClearable && !lx.multiple && !lx.isModelEmpty()) {
            classes.push(`${CSS_PREFIX}-select--has-input-clear`);
        }

        if (lx.label) {
            classes.push(`${CSS_PREFIX}-select--has-label`);
        }

        if (lx.placeholder) {
            classes.push(`${CSS_PREFIX}-select--has-placeholder`);
        }

        if (lx.isDisabled) {
            classes.push(`${CSS_PREFIX}-select--is-disabled`);
        }

        if (lx.isFocus) {
            classes.push(`${CSS_PREFIX}-select--is-focus`);
        }

        if (lx.isOpen) {
            classes.push(`${CSS_PREFIX}-select--is-open`);
        }

        if (lx.isValid) {
            classes.push(`${CSS_PREFIX}-select--is-valid`);
        }

        if (lx.customColors) {
            classes.push(`${CSS_PREFIX}-custom-colors`);
        }

        return classes;
    }

    /**
     * Check if choices are empty or not.
     *
     * @return {boolean} Whether choices aare empty or not.
     */
    function hasChoices() {
        if (!lx.isChoicesArray()) {
            return angular.isDefined(lx.choices);
        }

        return lx.choices.length > 0;
    }

    /**
     * Check if choices are in array format.
     *
     * @return {boolean} Whether choices are in array format or not.
     */
    function isChoicesArray() {
        return angular.isArray(lx.choices);
    }

    /**
     * Check if the model is empty.
     *
     * @return {boolean} Whether the model is empty or not.
     */
    function isModelEmpty() {
        if (lx.multiple) {
            return _modelController.$viewValue.length === 0;
        }

        return angular.isUndefined(_modelController.$viewValue);
    }

    /**
     * Check if a choice is selected.
     *
     * @param  {Object}  choice The choice object.
     * @return {boolean} Whether the choice is selected or not.
     */
    function isSelected(choice) {
        if (lx.multiple) {
            return _arrayObjectIndexOf(lx.viewValue, choice) !== -1;
        }

        return _isEqual(choice, lx.viewValue);
    }

    /**
     * Register the choice template.
     *
     * @param {string} choiceTemplate The choice template.
     */
    function registerChoiceTemplate(choiceTemplate) {
        _choiceTemplate = choiceTemplate;
    }

    /**
     * Select the selected template.
     *
     * @param {string} selectedTemplate The choice template.
     */
    function registerSelectedTemplate(selectedTemplate) {
        _selectedTemplate = selectedTemplate;
    }

    /**
     * Select a choice.
     *
     * @param {Object} choice The choice object.
     * @param {Event}  [evt]  The event that triggered the function.
     */
    function select(choice, evt) {
        if (angular.isDefined(evt) && lx.multiple) {
            evt.stopPropagation();
        }

        if (
            lx.multiple &&
            !lx.isSelected(choice) &&
            angular.isDefined(lx.max) &&
            _modelController.$viewValue.length >= parseInt(lx.max, 10)
        ) {
            return;
        }

        if (angular.isDefined(lx.selectionToModel)) {
            lx.selectionToModel({
                // eslint-disable-next-line id-blacklist
                callback(response) {
                    if (angular.isUndefined(response) || !response) {
                        return;
                    }

                    _updateModel(response);
                    _updateViewValue(choice);
                },
                // eslint-disable-next-line id-blacklist
                data: choice,
            });
        } else {
            _updateModel(choice);
            _updateViewValue(choice);
        }

        if (lx.multiple) {
            $timeout(() => {
                LxDropdownService.updateActiveDropdownPosition();
            });
        }
    }

    /**
     * Set the model controller.
     *
     * @param {Object} modelController The model controller.
     */
    function setModelController(modelController) {
        _modelController = modelController;

        _modelController.$render = _initViewValue;
    }

    /**
     * Toggle the dropdown menu on input wrapper click.
     *
     * @param {Event} evt The click event.
     */
    function toggleDropdown(evt) {
        if (lx.isOpen) {
            _closeDropdown(evt);
        } else {
            _openDropdown(evt);
        }
    }

    /**
     * Update choices list according to filter model.
     */
    function updateFilter() {
        if (angular.isDefined(lx.filter)) {
            lx.filter({
                newValue: lx.filterModel,
            });
        }
    }

    /////////////////////////////

    lx.clearModel = clearModel;
    lx.disableKeyEvents = disableKeyEvents;
    lx.displayChoice = displayChoice;
    lx.displaySelected = displaySelected;
    lx.displaySubheader = displaySubheader;
    lx.enableKeyEvents = enableKeyEvents;
    lx.getClasses = getClasses;
    lx.hasChoices = hasChoices;
    lx.isChoicesArray = isChoicesArray;
    lx.isModelEmpty = isModelEmpty;
    lx.isSelected = isSelected;
    lx.registerChoiceTemplate = registerChoiceTemplate;
    lx.registerSelectedTemplate = registerSelectedTemplate;
    lx.select = select;
    lx.setModelController = setModelController;
    lx.toggleDropdown = toggleDropdown;
    lx.updateFilter = updateFilter;

    /////////////////////////////
    //                         //
    //          Events         //
    //                         //
    /////////////////////////////

    /**
     * Add focus class to input wrapper on dropdown open.
     *
     * @param {Event}  evt        The dropdown open event.
     * @param {Object} dropdownId The dropdown identifier.
     */
    $scope.$on('lx-dropdown__open', (evt, dropdownId) => {
        if (dropdownId === lx.dropdownUuid) {
            lx.isOpen = true;
        }
    });

    /**
     * Remove focus class to input wrapper on dropdown close.
     *
     * @param {Event}  evt        The dropdown open event.
     * @param {Object} dropdownId The dropdown identifier.
     */
    $scope.$on('lx-dropdown__close', (evt, dropdownId) => {
        if (dropdownId === lx.dropdownUuid) {
            lx.isOpen = false;
        }
    });

    /**
     * When the end of the dropdown is reached and infinite scroll is specified,
     * fetch new data.
     *
     * @param {Event}  evt        The scroll event.
     * @param {string} dropdownId The id of the dropdown that scrolled to the end.
     */
    $scope.$on('lx-dropdown__scroll-end', (evt, dropdownId) => {
        if (
            dropdownId !== lx.dropdownUuid ||
            !angular.isFunction(lx.infiniteScroll) ||
            lx.isLoading ||
            lx.isInfiniteScrollLoading
        ) {
            return;
        }

        lx.infiniteScroll()().then((newData) => {
            if (newData && newData.length > 0) {
                lx.choices = lx.choices.concat(newData);
            }
        });
    });
}

/////////////////////////////

function SelectDirective() {
    'ngInject';

    function link(scope, el, attrs, ctrls, transclude) {
        ctrls[0].setModelController(ctrls[1]);

        transclude(
            scope,
            (clone) => {
                let choiceTemplate = '';

                for (let i = 0; i < clone.length; i++) {
                    choiceTemplate += clone[i].data || clone[i].outerHTML || '';
                }

                ctrls[0].registerChoiceTemplate(choiceTemplate);
            },
            null,
            'choices',
        );

        transclude(
            scope,
            (clone) => {
                let selectedTemplate = '';

                for (let i = 0; i < clone.length; i++) {
                    selectedTemplate += clone[i].data || clone[i].outerHTML || '';
                }

                ctrls[0].registerSelectedTemplate(selectedTemplate);
            },
            null,
            'selected',
        );
    }

    return {
        bindToController: true,
        controller: SelectController,
        controllerAs: 'lx',
        link,
        replace: true,
        require: ['lxSelect', 'ngModel'],
        restrict: 'E',
        scope: {
            choices: '=lxChoices',
            customColors: '=?lxCustomColors',
            filter: '&?lxFilter',
            hasError: '=?lxError',
            hasFilter: '=?lxDisplayFilter',
            hasHelper: '=?lxHelper',
            helper: '@?lxHelperMessage',
            infiniteScroll: '&?lxInfiniteScroll',
            isClearable: '=?lxAllowClear',
            isDisabled: '=?ngDisabled',
            isInfiniteScrollLoading: '=?lxInfiniteScrollLoading',
            isLoading: '=?lxLoading',
            isValid: '=?lxValid',
            label: '@?lxLabel',
            max: '=?lxMax',
            modelToSelection: '&?lxModelToSelection',
            multiple: '=?lxMultiple',
            placeholder: '@?lxPlaceholder',
            selectionToModel: '&?lxSelectionToModel',
            theme: '@?lxTheme',
            variant: '@?lxVariant',
        },
        template,
        transclude: {
            choices: 'lxSelectChoices',
            selected: 'lxSelectSelected',
        },
    };
}

/////////////////////////////

angular.module('lumx.select').directive('lxSelect', SelectDirective);

/////////////////////////////

export { SelectDirective };
