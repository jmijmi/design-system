import { CSS_PREFIX } from '@lumx/core/js/constants';

import template from './side-navigation.html';

/////////////////////////////

function SideNavigationController() {
    'ngInject';

    const lx = this;

    /////////////////////////////
    //                         //
    //     Public functions    //
    //                         //
    /////////////////////////////

    /**
     * Get side navigation classes.
     *
     * @return {Array} The list of side navigation classes.
     */
    function getClasses() {
        const classes = [];

        if (lx.customColors) {
            classes.push(`${CSS_PREFIX}-custom-colors`);
        }

        return classes;
    }

    /////////////////////////////

    lx.getClasses = getClasses;
}

/////////////////////////////

function SideNavigationDirective() {
    'ngInject';

    return {
        bindToController: true,
        controller: SideNavigationController,
        controllerAs: 'lx',
        replace: true,
        restrict: 'E',
        scope: {
            customColors: '=?lxCustomColors',
        },
        template,
        transclude: true,
    };
}

/////////////////////////////

angular.module('lumx.side-navigation').directive('lxSideNavigation', SideNavigationDirective);

/////////////////////////////

export { SideNavigationDirective };
