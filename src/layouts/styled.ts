import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  padding: 20px 100px;
  box-sizing: border-box;
`;

export const Header = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
  margin-bottom: 50px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  border: 1px solid rgba(0, 37, 105, 0.585);
  background-color: rgba(0, 30, 85, 0.335);
`;

export const SmallCell = styled.div<{ color?: 'empty' | 'low' | 'full' }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  ${({ color }) => {
    if (!color) return;
    const tempColor =
      color === 'empty'
        ? 'rgba(255, 0, 0, 0.5)	'
        : color === 'low'
        ? 'rgba(255, 166, 0, 0.5)	'
        : 'rgba(50, 205, 50, 0.5)';
    return `background-color: ${tempColor}`;
  }};
`;
export const NameCell = styled(SmallCell)`
  flex: 2;
`;
