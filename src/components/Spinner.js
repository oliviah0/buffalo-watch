import React from 'react';
import { css } from '@emotion/core';
import SyncLoader from 'react-spinners/SyncLoader';

const override = css`
    display: block;
    text-align: center;
    margin-top: 100px;
`;

const Spinner = () => {
  return (
    <SyncLoader
      css={override}
      sizeUnit={"px"}
      size={15}
      color={'#8FCF3E'}
      loading={true}/>
  );
};

export default Spinner;