import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';
import { Sheet } from './sheet';
import { Text } from './text';

const meta: Meta = {};

export default meta;

export const BasicSheet: StoryObj = {
    render: () => {
        const [open, setOpen] = React.useState(false);
        const titleId = React.useId();
        const descriptionId = React.useId();

        return (
            <React.Fragment>
                <Button variant="prominent" label="Open sheet" onClick={() => setOpen(true)} />
                <Sheet open={open} titleId={titleId} descriptionId={descriptionId} onClose={() => setOpen(false)}>
                    <div className="flex flex-col">
                        <Text variant="h1" as="h1" id={titleId} className="mb-6">
                            Sheet title
                        </Text>
                        <Text variant="h4" id={descriptionId} className="mb-2">
                            Discover New Tastes
                        </Text>
                        <Text>
                            Explore a world of flavors with our extensive collection of recipes sourced from passionate
                            chefs and home cooks. Whether you're a culinary enthusiast or a novice in the kitchen, find
                            inspiration for every occasion. Discover vibrant salads, comforting soups, decadent
                            desserts, and more. With our user-friendly interface, browsing recipes and discovering new
                            tastes has never been easier.
                        </Text>
                    </div>
                </Sheet>
            </React.Fragment>
        );
    },
};

export const OverflowSheet: StoryObj = {
    render: () => {
        const [open, setOpen] = React.useState(false);
        const titleId = React.useId();

        return (
            <React.Fragment>
                <Button variant="prominent" label="Open sheet" onClick={() => setOpen(true)} />
                <Sheet open={open} titleId={titleId} onClose={() => setOpen(false)}>
                    <div className="flex flex-col">
                        <Text variant="h1" as="h1" id={titleId} className="mb-6">
                            Sheet title
                        </Text>

                        <Text variant="h4" className="mb-2">
                            Discover New Tastes
                        </Text>

                        <Text className="mb-4">
                            Explore a world of flavors with our extensive collection of recipes sourced from passionate
                            chefs and home cooks. Whether you're a culinary enthusiast or a novice in the kitchen, find
                            inspiration for every occasion. Discover vibrant salads, comforting soups, decadent
                            desserts, and more. With our user-friendly interface, browsing recipes and discovering new
                            tastes has never been easier.
                        </Text>

                        <Text variant="h4" className="mb-2">
                            Personalized Recommendations
                        </Text>

                        <Text className="mb-4">
                            Let us cater to your culinary preferences! Our platform learns your taste preferences over
                            time to provide personalized recipe recommendations. Whether you're vegan, gluten-free, or
                            simply looking for quick meal ideas, we'll suggest recipes tailored to your needs. Save your
                            favorite recipes, and we'll keep you updated with new creations you're sure to love.
                        </Text>

                        <Text variant="h4" className="mb-2">
                            Cook with Confidence
                        </Text>

                        <Text className="mb-4">
                            No more guesswork in the kitchen! Each recipe on our platform comes with detailed
                            step-by-step instructions, complete with photos and videos. From mastering basic techniques
                            to exploring advanced cooking methods, empower yourself with the skills to cook with
                            confidence. Whether you're preparing a family dinner or hosting a dinner party, we've got
                            you covered.
                        </Text>

                        <Text variant="h4" className="mb-2">
                            Join a Culinary Community
                        </Text>

                        <Text>
                            Connect with fellow food enthusiasts and share your culinary adventures! Join forums,
                            participate in discussions, and exchange tips with like-minded individuals. Whether you're
                            seeking advice on ingredient substitutions or showcasing your latest culinary masterpiece,
                            our community is here to support and inspire you.
                        </Text>
                    </div>
                </Sheet>
            </React.Fragment>
        );
    },
};
