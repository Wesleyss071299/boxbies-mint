import styled from "styled-components";

const MenuItem = styled.a`
  color: white;
  font-size: 20px;
  text-decoration: none;
  margin-bottom: 20px;
  :hover {
    cursor: pointer;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  min-width: 300px;
  width: 40vw;
  margin: 5vh auto 0 auto;
`;

const Menu = () => {
  return (
    <MenuContainer>
      <MenuItem>Open Sea</MenuItem>
      <MenuItem>Magic Eden</MenuItem>
      <MenuItem target="_blank" href="https://boxbies.gitbook.io/">Litepaper</MenuItem>
      <MenuItem target="_blank" href="https://twitter.com/boxbies">Twitter</MenuItem>
      <MenuItem target="_blank" href="https://discord.gg/boxbies">Discord</MenuItem>
    </MenuContainer>
  );
};

export default Menu;
