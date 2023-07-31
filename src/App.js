import { useState } from "react";
import Search from './components/Search/Search';
import List from './components/List/List';

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [reposCount, setReposCount] = useState({});
  const [sortedUsers, setSortedUsers] = useState([]);

  return (
    <div className="app">
      <div className="search-container"><p>Узнай информацию о профиле Github!</p></div>
      <Search users={users} setSortedUsers={setSortedUsers} reposCount={reposCount} setUsers={setUsers} setIsLoading={setIsLoading} setErrorMessage={setErrorMessage} />
      <List sortedUsers={sortedUsers} reposCount={reposCount} setReposCount={setReposCount} users={users} isLoading={isLoading} errorMessage={errorMessage} />
    </div>
  );
}

export default App;
