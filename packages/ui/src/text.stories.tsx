import { Meta, StoryObj } from '@storybook/react';

import { Text, textVariants } from './text';

const meta: Meta = {};

export default meta;

export const All: StoryObj = {
    render: () => (
        <div className="flex flex-col gap-2">
            {textVariants.map((variant) => (
                <Text variant={variant} key={variant}>
                    {variant}
                </Text>
            ))}
        </div>
    ),
};
