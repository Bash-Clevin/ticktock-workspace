import AuthModal from './components/AuthModal';
import { useGeneralStore } from './store/generalStore';

function App() {
  const isLoginOpen = useGeneralStore((state) => state.isLoginOpen);
  return <div>{isLoginOpen && <AuthModal />}</div>;
}

export default App;
