export type Customer = {
  id: string;
  name: string;
  email: string;
  address: string;
  tel: string;
};

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
}

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type ReadonlyType<T> = {
  readonly [P in keyof T]: T[K];
};

type Nullable<T> = { [K in keyof T]: T[K] } | null;

//other utilty type
type PartialCustomer = Partial<Customer>;
type ReadonlyCustomer = Readonly<Customer>;
type NameAndEmail = Pick<Customer, 'name' | 'email'>;
type WithoutEmail = Omit<Customer, 'email'>;

type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; sideLength: number }
  | { kind: 'triangle'; sideLength: number }
  | { kind: 'rectangle'; width: number; height: number };

type Circle = Exclude<Shape, 'square' | 'triangle', 'rectangle'>;
