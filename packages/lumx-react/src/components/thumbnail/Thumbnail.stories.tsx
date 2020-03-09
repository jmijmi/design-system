import { Alignment, AspectRatio, Size, Theme, Thumbnail, ThumbnailVariant } from '@lumx/react';
import { number, select, text } from '@storybook/addon-knobs';
import React from 'react';

export default { title: 'Thumbnail' };

const numberKnobOtions = {
    max: 1,
    min: -1,
    range: true,
    step: 0.1,
};

/**
 * Thumbnail story
 * @return simple Thumbnail.
 */
export const DefaultThumbnail = ({ theme }: { theme: Theme }) => {
    return (
        <Thumbnail
            align={select<Alignment>('Alignment', Alignment, Alignment.left, 'Options')}
            aspectRatio={select<AspectRatio>('Aspect ratio', AspectRatio, AspectRatio.square, 'Options')}
            focusPoint={{
                x: number('focusX', 0, numberKnobOtions, 'Options'),
                y: number('focusY', 0, numberKnobOtions, 'Options'),
            }}
            image={text('Url image', 'https://i.picsum.photos/id/1001/2400/1400.jpg', 'Options')}
            size={select(
                'Size',
                {
                    XXS: Size.xxs,
                    XS: Size.xs,
                    S: Size.s,
                    M: Size.m,
                    L: Size.l,
                    XL: Size.xl,
                    XXL: Size.xxl,
                },
                Size.xxl,
                'Options',
            )}
            theme={theme}
            variant={select<ThumbnailVariant>('Variant', ThumbnailVariant, ThumbnailVariant.squared, 'Options')}
        />
    );
};
