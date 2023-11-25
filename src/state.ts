import { atom, selector } from "recoil";

import { filter } from "./constants/referrence";
import { createDummyStore } from "./dummy/utils";
import {
  Address,
  HeaderType,
  Product,
  ProductInfoPicked,
  Store,
  StoreOrder,
} from "./models";
import { getRandomInt } from "./utils";

export const storeState = selector<Store>({
  key: "store",
  get: () => {
    return createDummyStore();
  },
});

export const productState = selector<Product[]>({
  key: "product",
  get: ({ get }) => {
    const store = get(storeState);
    return store.listProducts;
  },
});

export const cartState = atom<StoreOrder>({
  key: "cart",
  default: {
    status: "pending",
    listOrder: [],
    date: new Date(),
  },
});

export const cartTotalPriceState = selector<number>({
  key: "cartTotalPrice",
  get: ({ get }) => {
    const cart = get(cartState);
    const products = get(productState);
    const result = cart.listOrder.reduce(
      (total, item) =>
        total +
        Number(item.order.quantity) *
          Number(products.find((product) => product.id === item.id)?.salePrice),
      0
    );
    return result;
  },
});

export const headerState = atom<HeaderType>({
  key: "header",
  default: {},
});

export const searchProductState = atom<string>({
  key: "searchProduct",
  default: "",
});

export const activeCateState = atom<number>({
  key: "activeCate",
  default: 0,
});

export const activeFilterState = atom<string>({
  key: "activeFilter",
  default: filter[0].key,
});

export const storeProductResultState = selector<Product[]>({
  key: "storeProductResult",
  get: ({ get }) => {
    const activeCategory = get(activeCateState);
    get(searchProductState);

    const store = get(storeState);
    if (activeCategory == 0) return [...store.listProducts];

    const filteredProducts = store.listProducts.filter(
      (product) => product.category === activeCategory
    );
    return [...filteredProducts];
  },
});

export const addressState = atom<Address>({
  key: "address",
  default: {
    city: "",
    district: "",
    ward: "",
    detail: "",
  },
});

export const openProductPickerState = atom<boolean>({
  key: "openProductPicker",
  default: false,
});

export const initialProductInfoPickedState = {
  productId: -1,
  isUpdate: false,
};

export const productInfoPickedState = atom<ProductInfoPicked>({
  key: "productInfoPicked",
  default: initialProductInfoPickedState,
});
