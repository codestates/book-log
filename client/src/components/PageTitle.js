import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
  font-size: 1.7rem;
  font-weight: 700;
  padding-left: 1.2rem;
`;

const PageTitle = ({ children }) => {
  return <Title>{children}</Title>;
};

export default PageTitle;
