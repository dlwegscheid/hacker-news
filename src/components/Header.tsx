import React from 'react';
import styled from 'styled-components';

const HeaderNav = styled.nav`
  text-align: center;
  background-color: #C0C7CB;
  padding: 1rem 0;
  border-bottom: 2px solid #3F82EF;
`;

const HomeLink = styled.a`
  text-decoration: none;
  color: #2E3940;
`;

export default function Header() {
  return <HeaderNav>
    <h1>
      <HomeLink href="/">
        David's HackerNews
      </HomeLink>
    </h1>
  </HeaderNav>;
}