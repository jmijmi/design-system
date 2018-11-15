(function IIFE() {
    'use strict';

    /////////////////////////////

    lxDialogCloseDirective.$inject = ['LxDialogService'];

    function lxDialogCloseDirective(LxDialogService) {
        function link(scope, el) {
            el.on('click', function onClick() {
                LxDialogService.close(el.parents('.lx-dialog').attr('id'), true);
            });
        }

        return {
            link: link,
            restrict: 'A',
        };
    }

    /////////////////////////////

    angular.module('lumx.dialog').directive('lxDialogClose', lxDialogCloseDirective);
})();
