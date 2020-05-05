import styled from '@emotion/styled';

export const StyledSocialLinks = styled.div`
  display: flex;
  

  & > div {
    cursor: pointer;
  }

  & svg {
    height: 36px;
    width: 36px;
    margin: 0px 2px;
    transition: all .2s ease-in-out; 
  }
  
  & svg:hover{
    transform: scale(1.3); 
   }

`;
