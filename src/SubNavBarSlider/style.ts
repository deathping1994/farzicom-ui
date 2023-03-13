import styled from "styled-components";

export const NavbarContainerWrapper = styled.div`
  width: 100%;
  display: block;
  overflow: auto hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 720px) {
    display: none;
  }
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
`;
export const SubNavOrderList = styled.ul<{repeat:number}>`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(${props=>props?.repeat || "auto-fill"},25%);
`;
export const SubNavlist = styled.li`
  display: flex;
  min-width:80px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  & img{
    border-radius:50%;
  }

  & p{
  font-size: 10px;
  font-weight: normal;
  }
`;