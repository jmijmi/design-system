import { CSS_PREFIX } from '@lumx/core/js/constants';

import template from './tabs.html';

/////////////////////////////

function TabsController() {
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
        layout: 'fixed',
        position: 'left',
        theme: 'light',
    };

    /////////////////////////////
    //                         //
    //    Public attributes    //
    //                         //
    /////////////////////////////

    /**
     * The lactive tab index.
     *
     * @type {number}
     */
    lx.activeTab = angular.isDefined(lx.activeTab) ? lx.activeTab : 0;

    /**
     * The list of tabs.
     *
     * @type {Array}
     */
    lx.tabs = [];

    /////////////////////////////
    //                         //
    //     Public functions    //
    //                         //
    /////////////////////////////

    /**
     * Add a tab to the list of tabs.
     *
     * @param {Object} tabToAdd The tab to add.
     */
    function addTab(tabToAdd) {
        lx.tabs.push(tabToAdd);
    }

    /**
     * Get tabs classes.
     *
     * @return {Array} The list of tabs classes.
     */
    function getClasses() {
        const classes = [];

        const layout = lx.layout ? lx.layout : _DEFAULT_PROPS.layout;
        const position = lx.position ? lx.position : _DEFAULT_PROPS.position;
        const theme = lx.theme ? lx.theme : _DEFAULT_PROPS.theme;

        classes.push(`${CSS_PREFIX}-tabs--layout-${layout}`);
        classes.push(`${CSS_PREFIX}-tabs--position-${position}`);
        classes.push(`${CSS_PREFIX}-tabs--theme-${theme}`);

        if (lx.customColors) {
            classes.push(`${CSS_PREFIX}-custom-colors`);
        }

        return classes;
    }

    /**
     * Check if a given tab is active.
     *
     * @param  {number}  tabIndex The tab index.
     * @return {boolean} Whether the given tab is active or not.
     */
    function isTabActive(tabIndex) {
        return lx.activeTab === tabIndex;
    }

    /**
     * Remove the given tab.
     *
     * @param {Object} tabToRemove The tab to remove.
     */
    function removeTab(tabToRemove) {
        lx.tabs.splice(tabToRemove.index, 1);

        angular.forEach(lx.tabs, (tab, index) => {
            tab.index = index;
        });

        if (lx.tabs.length > 0) {
            lx.setActiveTab(lx.tabs[0]);
        }
    }

    /**
     * Set the given tab as active.
     *
     * @param {Object} tab The tab.
     */
    function setActiveTab(tab) {
        if (tab.isDisabled) {
            return;
        }

        lx.activeTab = tab.index;
    }

    /**
     * Update the given tab.
     *
     * @param {Object} updatedTab The tab to update.
     */
    function updateTab(updatedTab) {
        angular.forEach(lx.tabs, (tab) => {
            if (tab.uuid === updatedTab.uuid) {
                tab = updatedTab;
            }
        });
    }

    /////////////////////////////

    lx.addTab = addTab;
    lx.getClasses = getClasses;
    lx.isTabActive = isTabActive;
    lx.removeTab = removeTab;
    lx.setActiveTab = setActiveTab;
    lx.updateTab = updateTab;
}

/////////////////////////////

function TabsDirective() {
    'ngInject';

    return {
        bindToController: true,
        controller: TabsController,
        controllerAs: 'lx',
        replace: true,
        restrict: 'E',
        scope: {
            activeTab: '=?lxActiveTab',
            customColors: '=?lxCustomColors',
            layout: '@?lxLayout',
            position: '@?lxPosition',
            theme: '@?lxTheme',
        },
        template,
        transclude: true,
    };
}

/////////////////////////////

angular.module('lumx.tabs').directive('lxTabs', TabsDirective);

/////////////////////////////

export { TabsDirective };
