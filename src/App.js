import Pages from "./pages/Pages";
import Category from "./componenets/Category";
import { BrowserRouter } from "react-router-dom";
import Search from "./componenets/Search";
import Styled from "styled-components";
import { GiKnifeFork } from "react-icons/gi";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter> 
        <Nav>
          <GiKnifeFork />
          <Logo style={{ fontStyle: 'italic', fontWeight:'bold' }} to={"/"}>delicious</Logo>
        </Nav>
        <Search />
        <Category />
        <Pages />
      </BrowserRouter>
    </div>
  );
}

const Logo = Styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
`

const Nav = Styled.div`
  padding: 1rem 0rem;
  display: flex;
  justify-content: flex-start;
  align-item: center;
  font-size: 2rem;
`

export default App;
