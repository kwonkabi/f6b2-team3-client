import styled from "@emotion/styled";
import { breakPoints } from "../../../commons/styles/Media";
import { IQuery } from "../../../commons/types/generated/types";
import { useMoveToPage } from "../hooks/useMoveToPage/index";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const RowHead = styled.div`
  height: 40px;
  display: flex;
  font-weight: 800;
  border-bottom: 1px solid #000000;

  @media ${breakPoints.tablet} {
    height: 40px;
  }

  @media ${breakPoints.mobile} {
    height: 30px;
    font-size: 10px;
  }
`;

const ColumnHead = styled.div`
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${breakPoints.tablet} {
    font-size: 13px;
  }

  @media ${breakPoints.mobile} {
    font-size: 10px;
  }
`;

const Row = styled.div`
  height: 40px;
  display: flex;
  border-bottom: 1px solid #e3e3e3;

  @media ${breakPoints.tablet} {
    height: 40px;
  }

  @media ${breakPoints.mobile} {
    height: 30px;
    font-size: 10px;
  }
`;

const Column = styled.div`
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${breakPoints.tablet} {
    font-size: 13px;
  }

  @media ${breakPoints.mobile} {
    font-size: 10px;
  }
`;

const ColumnHover = styled.div`
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    color: #0085cb;
    cursor: pointer;
  }

  @media ${breakPoints.tablet} {
    font-size: 13px;
  }

  @media ${breakPoints.mobile} {
    font-size: 10px;
  }
`;

interface IPropsBoardRecords {
  BoardUserData? : Pick<IQuery,"fetchBoardsOfUser">
}

export default function BoardRecords(props:IPropsBoardRecords) {
  const { moveToPage } = useMoveToPage();

  return (
    <Wrapper>
      <RowHead>
        <ColumnHead style={{ width: "7%" }}>no.</ColumnHead>
        <ColumnHead style={{ width: "68%" }}>제목</ColumnHead>
        <ColumnHead style={{ width: "25%" }}>작성 날짜</ColumnHead>
      </RowHead>
        {props.BoardUserData?.fetchBoardsOfUser.map((el, index) => (
          <Row key={index}>
            <Column style={{ width: "7%" }}>{index + 1}</Column>
            <ColumnHover
              style={{ width: "68%" }}
              onClick={moveToPage(`/boards/${el.id}`)}
            >
              {el.title}
            </ColumnHover>
            <Column style={{ width: "25%" }}>
              {el.createdAt.slice(0, 10)}
            </Column>
          </Row>
        ))}
    </Wrapper>
  );
}
