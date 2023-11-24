import { ProductItem } from "@/features/renderProps";
import { Product } from "@/utils";

type ProductListProps = {
  items: Product[];
};

export const ProductList = ({ items }: ProductListProps) => (
  <ul className="list">
    {items.map((product) => (
      <ProductItem key={product.productName} product={product} />
    ))}
  </ul>
);
