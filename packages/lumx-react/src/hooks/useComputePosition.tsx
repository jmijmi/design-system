import React, { useCallback, useEffect, useState } from 'react';

import { ElementPosition, Offset, Placement } from '@lumx/react/components/popover/Popover';

import { calculatePopoverPlacement } from '@lumx/react/utils/calculatePopoverPlacement';
import { isInViewPort } from '@lumx/react/utils/isInViewPort';

export type useComputePositionType = (
    placement: Placement,
    anchorRef: React.RefObject<HTMLElement>,
    popoverRef: React.RefObject<HTMLDivElement>,
    isVisible: boolean,
    offset?: Offset,
    staysOpenOnHover?: boolean,
    hasParentWidth?: boolean,
    hasParentHeight?: boolean,
    dependencies?: any[],
    callback?: (position: ElementPosition) => void,
) => {
    computedPosition: ElementPosition;
    isVisible: boolean;
};

/**
 * Calculate the position of the popover relative to the anchor element.
 *
 * @param placement Placement of tooltip.
 * @param anchorRef Ref of anchor element.
 * @param popoverRef Ref of tooltip.
 * @param isVisible Popover is visible.
 * @param [offset] Offset between the anchor and the popover.
 * @param [staysOpenOnHover] Whether the popover has to be displayed when hovered.
 * @param [hasParentWidth] Whether component has to match parent width.
 * @param [hasParentHeight] Whether component has to match parent height.
 * @param [dependencies] Dependencies of hook.
 * @param [callback] Callback called with the updated position.
 * @return Position of the popover relative to the anchor element.
 */
export const useComputePosition: useComputePositionType = (
    placement,
    anchorRef,
    popoverRef,
    isVisible,
    offset = { horizontal: 0, vertical: 0 },
    staysOpenOnHover = true,
    hasParentWidth?,
    hasParentHeight?,
    dependencies = [placement, anchorRef, popoverRef],
    callback?,
) => {
    const WINDOW_BOUNDING_OFFSET = 16;
    const MIN_SPACE_BELOW = 150;
    const MATCHING_PLACEMENT = Placement && {
        [Placement.AUTO]: {
            bottom: Placement.BOTTOM,
            top: Placement.TOP,
        },
        [Placement.AUTO_START]: {
            bottom: Placement.BOTTOM_START,
            top: Placement.TOP_START,
        },
        [Placement.AUTO_END]: {
            bottom: Placement.BOTTOM_END,
            top: Placement.TOP_END,
        },
    };
    // Handle mouse over the popover to prevent it from closing from outside (infinite mouse event bug).
    const [isMouseEntered, setIsMouseEntered] = useState<boolean>(false);
    const [isAnchorInViewport, setIsAnchorInViewport] = useState(false);
    const defaultPosition = {
        x: 0,
        y: 0,
    };

    const [computedPosition, setComputedPosition] = useState(defaultPosition);

    const computePosition = () => {
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const newIsAnchorInViewPort = !!(
            anchorRef &&
            anchorRef.current &&
            isInViewPort(anchorRef.current.getBoundingClientRect(), 'partial')
        );
        setIsAnchorInViewport(newIsAnchorInViewPort);

        if (!anchorRef || !anchorRef.current || !popoverRef || !popoverRef.current) {
            setComputedPosition(defaultPosition);
            return;
        }

        const boundingAnchor = anchorRef.current.getBoundingClientRect();
        const boundingPopover = popoverRef.current.getBoundingClientRect();
        const { horizontal = 0, vertical = 0 } = offset;
        let newPosition: ElementPosition = {
            anchorHeight: hasParentHeight ? boundingAnchor.height : 0,
            anchorWidth: hasParentWidth ? boundingAnchor.width : 0,
            height: boundingPopover.height,
            width: boundingPopover.width,
            x: horizontal,
            y: vertical,
        };

        if (placement === Placement.AUTO || placement === Placement.AUTO_END || placement === Placement.AUTO_START) {
            // Try BOTTOM placement.
            const { x: bottomX, y: bottomY } = calculatePopoverPlacement(
                MATCHING_PLACEMENT[placement].bottom,
                boundingAnchor,
                boundingPopover,
            );

            const bottomPosition = {
                ...newPosition,
                bottom: vertical + bottomY + Number(newPosition.height),
                left: newPosition.x + bottomX,
                maxHeight: windowHeight - (vertical + bottomY) - WINDOW_BOUNDING_OFFSET,
                right: newPosition.x + bottomX + Number(newPosition.width),
                top: vertical + bottomY,
                x: newPosition.x + bottomX,
                y: vertical + bottomY,
            };

            const canBeBottom = isInViewPort(
                {
                    ...boundingPopover,
                    ...bottomPosition,
                    bottom: boundingPopover.height + bottomY + WINDOW_BOUNDING_OFFSET + vertical,
                },
                'full',
            );
            const availableHeightBelow = windowHeight - (newPosition.y + bottomY) - WINDOW_BOUNDING_OFFSET;

            // Priority to bottom placement if possible, if not take the most available place;
            if (
                availableHeightBelow >= MIN_SPACE_BELOW ||
                canBeBottom ||
                boundingAnchor.top <= windowHeight - boundingAnchor.bottom
            ) {
                newPosition = {
                    ...bottomPosition,
                    maxHeight: availableHeightBelow,
                };
            } else {
                const { x: topX, y: topY } = calculatePopoverPlacement(
                    MATCHING_PLACEMENT[placement].top,
                    boundingAnchor,
                    boundingPopover,
                );

                const y = Math.max(WINDOW_BOUNDING_OFFSET, topY - newPosition.y);

                const topPosition = {
                    ...newPosition,
                    maxHeight: boundingAnchor.top - vertical - WINDOW_BOUNDING_OFFSET,
                    x: newPosition.x + topX,
                    y,
                };

                newPosition = topPosition;
            }
        } else {
            const { x, y } = calculatePopoverPlacement(placement, boundingAnchor, boundingPopover);
            const newY =
                newPosition.y + y > 0 ? Math.max(WINDOW_BOUNDING_OFFSET, newPosition.y + y) : newPosition.y + y;
            const maxHeight =
                placement === Placement.TOP || placement === Placement.TOP_END || placement === Placement.TOP_START
                    ? boundingAnchor.top + vertical
                    : windowHeight - newY - WINDOW_BOUNDING_OFFSET;
            newPosition = {
                ...newPosition,
                maxHeight,
                x: newPosition.x + x,
                y: newY,
            };
        }

        newPosition.width = hasParentWidth ? boundingAnchor.width : 0;
        newPosition.height = hasParentHeight ? boundingAnchor.height : 0;

        callback?.(newPosition);

        setComputedPosition(newPosition);
    };

    /**
     * Handle mouse entering the popover.
     */
    const handleMouseEnter = useCallback(() => {
        setIsMouseEntered(true);
    }, []);

    /**
     * Handle mouse leaving the popover.
     */
    const handleMouseLeave = useCallback(() => {
        setIsMouseEntered(false);
    }, []);

    useEffect(() => {
        const popover = popoverRef.current;
        if (!(popover && (isVisible || isMouseEntered))) {
            return undefined;
        }
        popover.addEventListener('mouseenter', handleMouseEnter);
        popover.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            popover.removeEventListener('mouseenter', handleMouseEnter);
            popover.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isAnchorInViewport, isVisible, isMouseEntered, handleMouseEnter, handleMouseLeave, popoverRef]);

    useEffect(() => {
        window.addEventListener('scroll', computePosition, true);
        window.addEventListener('resize', computePosition);

        computePosition();

        return () => {
            window.removeEventListener('scroll', computePosition, true);
            window.removeEventListener('resize', computePosition);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...dependencies, isAnchorInViewport, isVisible]);

    return { computedPosition, isVisible: isVisible || (staysOpenOnHover && isMouseEntered) };
};
