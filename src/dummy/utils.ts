import { StoreTypeRef } from "../constants/referrence";
import { Product, Store } from "../models";
import { getRandomInt } from "../utils";
import {
  listAddress,
  listCategories,
  listDescriptions,
  listNameProducts,
  listNameStore,
  listPrices,
  listProductOptions,
  numLogo,
  numProduct,
  numStoreBanner,
} from "./constants";

const getImgUrl = (filename: string) =>
  `https://stc-zmp.zadn.vn/zmp-ecommerce/img/${filename}.png`;

export const createProductDummy = ({ id }: { id: number }): Product => {
  const randomPrice = listPrices[getRandomInt(listPrices.length) - 1];
  const product: Product = {
    id,
    imgProduct: "/images/bo_xoi.jpg",
    nameProduct: listNameProducts[getRandomInt(listNameProducts.length) - 1],
    salePrice: randomPrice.salePrice,
    retailPrice: randomPrice.retailPrice,
    category: 2,
    description: listDescriptions[getRandomInt(listDescriptions.length) - 1],
    options: getRandomInt(1, 0) === 0 ? [] : listProductOptions,
  };
  return product;
};

export const createDummyProductCategories = () => {
  const dummyProducts: Product[] = [];
  const num = 10;
  for (let x = 0; x < num; x += 1) {
    dummyProducts.push(createProductDummy({ id: dummyProducts.length }));
  }

  const randomPrice = listPrices[getRandomInt(listPrices.length) - 1];
  dummyProducts.push({
    id: dummyProducts.length,
    imgProduct: "/images/bo_xoi.jpg",
    nameProduct: listNameProducts[getRandomInt(listNameProducts.length) - 1],
    salePrice: randomPrice.salePrice,
    retailPrice: randomPrice.retailPrice,
    category: 1,
    description: listDescriptions[getRandomInt(listDescriptions.length) - 1],
    options: getRandomInt(1, 0) === 0 ? [] : listProductOptions,
  });

  return dummyProducts;
};

export const createDummyStore = (): Store => {
  const storeId = +new Date();
  const listDummyProducts = createDummyProductCategories();
  const listType = Object.keys(StoreTypeRef) as (keyof typeof StoreTypeRef)[];
  const dummyStore = {
    id: storeId,
    logoStore: "/images/logo.png",
    bannerStore: getImgUrl(`store-banner-${getRandomInt(numStoreBanner)}`),
    nameStore: "Hueponics Rau sạch thủy canh Huế",
    followers: 4532,
    address: "Thừa Thiên Huế",
    type: listType[getRandomInt(listType.length) - 1],
    listProducts: listDummyProducts,
    categories: listCategories,
  };
  return dummyStore;
};
