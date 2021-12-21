import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.4);
`;

const ModalBody = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  padding: 40px;

  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 35, 38, 0.15);

  transform: translateX(-50%) translateY(-50%);
`;

const Modal = ({ children }) => {
  return (
    <Container>
      <ModalBody>{children}</ModalBody>
    </Container>
  );
};

export default Modal;

// export default function UserModal({ username }) {
//   return (
//     <div className="user-modal">
//       {username}님, 가입을 축하합니다.
//       <button className="btn-usermodal">
//         <Link to="/mypage">확인</Link>
//       </button>
//     </div>
//   );
// }
