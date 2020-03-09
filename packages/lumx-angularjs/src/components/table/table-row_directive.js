import template from './table-row.html';

/////////////////////////////

function TableRowController() {
    'ngInject';

    const lx = this;

    /////////////////////////////
    //                         //
    //    Public attributes    //
    //                         //
    /////////////////////////////

    /**
     * The parent controller (table).
     *
     * @type {Object}
     */
    lx.parentController = undefined;
}

/////////////////////////////

function TableRowDirective() {
    'ngInject';

    function link(scope, el, attrs, ctrls) {
        if (angular.isDefined(ctrls[2]) && ctrls[2]) {
            ctrls[0].parentController = ctrls[1];
        }
    }

    return {
        bindToController: true,
        controller: TableRowController,
        controllerAs: 'lx',
        link,
        replace: true,
        require: ['lxTableRow', '^lxTable', '?^lxTableBody'],
        restrict: 'E',
        scope: {
            isClickable: '=?lxIsClickable',
            isDisabled: '=?lxIsDisabled',
            isSelected: '=?lxIsSelected',
        },
        template,
        transclude: true,
    };
}

/////////////////////////////

angular.module('lumx.table').directive('lxTableRow', TableRowDirective);

/////////////////////////////

export { TableRowDirective };
