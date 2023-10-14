import { css } from '@emotion/css'
import Header from './components/Header';
import ContactList from './components/ContactList';
import FavoriteList from './components/FavoriteList';

function App() {
  return (
    <div 
      className={css`
      padding: 1.5rem;
      @media screen and (min-width: 640px) {
        margin: auto;
        width: 640px;
      }
      @media screen and (min-width: 1024px) {
        margin: auto;
        width: 1024px;
      }
    `}>
      <Header />
      <FavoriteList />
      <ContactList />
    </div>
  );
}

export default App;
