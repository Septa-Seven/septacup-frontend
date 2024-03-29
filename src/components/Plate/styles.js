import styled from "styled-components";

export const Container = styled.div`
  box-shadow: 0 10px 40px 0 rgb(165 178 193 / 40%),
    0 2px 9px 0 rgb(195 195 210 / 50%);
  border-radius: 10px;
  margin-bottom: 20px;
  background: #fff;
  display: ${(props) => (props.inline ? "inline-block" : "block")};
  padding: ${(props) => (props.noPadding ? "0" : "20px 30px")};
`;
