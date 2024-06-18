// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;

export type OverrideProps<OwnProps, ElementType extends React.ElementType> = OwnProps &
    DistributiveOmit<React.ComponentPropsWithRef<ElementType>, keyof OwnProps>;

export type PolymorphicProps<OwnProps, ElementType extends React.ElementType = React.ElementType> = OverrideProps<
    OwnProps & { as?: ElementType },
    ElementType
>;

export type PolymorphicComponent<DefaultElementType extends React.ElementType, OwnProps> = <
    ElementType extends React.ElementType = DefaultElementType,
>(
    props: PolymorphicProps<OwnProps, ElementType>,
) => React.ReactNode;
