import { type ComponentPropsWithRef, type ElementType } from 'react';

export type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>['ref'];

export type PolymorphicProps<
  C extends ElementType,
  Props = object
> = Props & { as?: C } & Omit<ComponentPropsWithRef<C>, keyof Props | 'as'>;
