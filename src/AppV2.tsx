import { faker } from "@faker-js/faker";
import {
  CompanyItem,
  List,
  ProductItem,
  ProductList,
  WithToggles,
} from "@/features/renderProps";
import { Company, Product } from "@/utils";
import "@/stylesV2.css";

const products = Array.from({ length: 20 }, () => ({
  productName: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.commerce.price(),
}));

const companies = Array.from({ length: 15 }, () => ({
  companyName: faker.company.name(),
  phrase: faker.company.catchPhrase(),
}));

export const AppV2 = () => {
  const ProductListWithToggles = WithToggles(ProductList);

  return (
    <div>
      <h1>Render Props Demo</h1>
      <div className="col-2">
        <List
          title="Products"
          items={products}
          render={(product: Product) => (
            <ProductItem key={product.productName} product={product} />
          )}
        />
        <List
          title="Companies"
          items={companies}
          render={(company: Company) => (
            <CompanyItem
              company={company}
              defaultVisibility={true}
              key={company.companyName}
            />
          )}
        />
      </div>
      <div className="col-2">
        <ProductListWithToggles title="Products HOC" items={products} />
      </div>
    </div>
  );
};
