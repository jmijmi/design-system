import { useCallback, useEffect, useRef } from 'react';

import { FocusedImage, LumHTMLImageElement } from './FocusedImage';
import { FocusPoint } from './FocusedImageOptions';

const useFocusedImage = (focus: FocusPoint) => {
    const focusRef = useRef<FocusedImage>();

    useEffect(
        () => {
            focusRef.current?.setFocus(focus);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [focusRef.current, focus.x, focus.y],
    );

    return useCallback(
        (f: HTMLImageElement) => {
            if (focusRef.current) {
                return;
            }
            focusRef.current = new FocusedImage(f as LumHTMLImageElement, {
                debounceTime: 17,
                focus,
                updateOnWindowResize: true,
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );
};

export default useFocusedImage;
