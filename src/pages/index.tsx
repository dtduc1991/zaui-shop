import React, { useEffect, useMemo, useCallback } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Input, Page } from "zmp-ui";
import ButtonFixed from "../components/button-fixed/button-fixed";
import ButtonPriceFixed from "../components/button-fixed/button-price-fixed";
import CategoriesStore from "../components/categories-store";
import CardProductHorizontal from "../components/custom-card/card-product-horizontal";
import CardShop from "../components/custom-card/card-shop";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Benefits from "../components/Benefits";

import { filter } from "../constants/referrence";
import { Product } from "../models";
import {
  activeCateState,
  activeFilterState,
  cartState,
  cartTotalPriceState,
  searchProductState,
  storeProductResultState,
  storeState,
} from "../state";
import { useNavigate } from "react-router-dom";
import useSetHeader from "../hooks/useSetHeader";
import { changeStatusBarColor } from "../services";
import { getConfig } from "../components/config-provider";

const HomePage: React.FunctionComponent = () => {
  const store = useRecoilValue(storeState);
  const cart = useRecoilValue(cartState);
  const totalPrice = useRecoilValue(cartTotalPriceState);

  const [activeCate, setActiveCate] = useRecoilState<number>(activeCateState);
  const [activeFilter, setActiveFilter] =
    useRecoilState<string>(activeFilterState);
  const storeProductResult = useRecoilValue<Product[]>(storeProductResultState);
  const setSearchProduct = useSetRecoilState(searchProductState);
  const navigate = useNavigate();
  const setHeader = useSetHeader();

  const handleInputSearch = useCallback((text: string) => {
    setSearchProduct(text);
  }, []);

  const searchBar = useMemo(
    () => (
      <Input.Search
        placeholder="Tìm kiếm sản phẩm"
        onSearch={handleInputSearch}
        className="cus-input-search"
      />
    ),
    []
  );

  useEffect(() => {
    setHeader({
      customTitle: getConfig((c) => c.template.searchBar) ? searchBar : "",
      hasLeftIcon: false,
      type: "secondary",
    });
    changeStatusBarColor("secondary");
  }, []);

  return (
    <Page>
      {store && storeProductResult && (
        <>
          <div className="bg-primary">
            <CardShop storeInfo={store} />
            <CategoriesStore
              categories={store.categories!}
              activeCate={activeCate}
              setActiveCate={(index) => setActiveCate(index)}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              filter={filter}
              quantity={storeProductResult.length}
            />
          </div>
          <div className="bg-gray-100 h-3" />
          {activeCate == 0 && (
            <>
              <Carousel autoPlay infiniteLoop autoFocus showThumbs={false}>
                <div>
                  <img src="/assets/1.jpg" />
                </div>
                <div>
                  <img src="/assets/2.png" />
                </div>
                <div>
                  <img src="/assets/3.png" />
                </div>
              </Carousel>
              <Benefits />
            </>
          )}
          <div
            className="bg-white p-3"
            style={{ marginBottom: totalPrice > 0 ? "120px" : "0px" }}
          >
            {storeProductResult.map((product) => (
              <div className=" mb-2 w-full" key={product.id}>
                <CardProductHorizontal
                  pathImg={product.imgProduct}
                  nameProduct={product.nameProduct}
                  salePrice={product.salePrice}
                  retailPrice={product.retailPrice}
                  productId={product.id}
                />
              </div>
            ))}
          </div>
          {totalPrice > 0 && (
            <>
              <ButtonPriceFixed
                quantity={cart.listOrder.length}
                totalPrice={totalPrice}
                handleOnClick={() => {
                  navigate("/finish-order");
                }}
              />
              <ButtonFixed
                listBtn={[
                  {
                    id: 1,
                    content: "Hoàn tất đơn hàng",
                    type: "primary",
                    onClick: () => {
                      navigate("/finish-order");
                    },
                  },
                ]}
                zIndex={99}
              />
            </>
          )}
        </>
      )}
    </Page>
  );
};

export default HomePage;
