import * as S from "./ProductListStyles";
import { useMoveToPage } from "../../../commons/hooks/useMoveToPage";
import { MouseEvent } from "react";
import { gql, useQuery } from "@apollo/client";
interface IPropsProductListUI {
  data: any;
  MoveProduct: (event: MouseEvent<HTMLImageElement>) => void;
}
const FETCH_USER_LOGIN = gql`
  query fetchLoginUser {
    fetchLoginUser {
      id
      name
      email
      phone
      isAdmin
    }
  }
`;

export default function ProductListUI(props: IPropsProductListUI) {
  const { moveToPage } = useMoveToPage();
  const { data } = useQuery(FETCH_USER_LOGIN);
  return (
    <>
      <S.Wrapper>
        <S.Banner />
        {/* <S.Title>
          <S.Title1>Jelly Shop</S.Title1>
          <S.Title2>GOODS</S.Title2>
        </S.Title> */}
        <S.Contents>
          {props.data?.fetchProducts.map((el) => (
            <S.ProductWrapper key={el.id}>
              <S.ProductImage
                onClick={props.MoveProduct}
                id={el.id}
                src={`https://storage.googleapis.com/${el.productImage[0]?.imageUrl}`}
              />
              <S.ProductName>{el.name}</S.ProductName>
              <>
                <S.ProductPrice>{el.price}젤리</S.ProductPrice>
                <S.ProductRealPrice>
                  {(el.price / 10) * 9}젤리
                </S.ProductRealPrice>
              </>
            </S.ProductWrapper>
          ))}
        </S.Contents>
        {data?.fetchLoginUser.isAdmin ? (
          <S.Button onClick={moveToPage("/products/new")}>상품등록</S.Button>
        ) : (
          <></>
        )}
      </S.Wrapper>
    </>
  );
}
