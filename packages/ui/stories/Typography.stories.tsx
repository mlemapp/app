import { Meta, StoryObj } from '@storybook/react';

import { Typography as UITypography, typographyVariants } from '../src/';
import tks from '../src/tokens';

const meta: Meta = {};

export default meta;

export const Typography: StoryObj = {
    render: () => (
        <div css={{ display: 'flex', flexDirection: 'column', gap: tks.spaces[100] }}>
            {typographyVariants.map((variant) => (
                <UITypography variant={variant} key={variant}>
                    {variant}
                </UITypography>
            ))}
        </div>
    ),
};
