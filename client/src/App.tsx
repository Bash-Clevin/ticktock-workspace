import AuthModal from './components/AuthModal';
import EditProfileModal from './components/EditProfileModal';
import { useGeneralStore } from './store/generalStore';

function App() {
  const isLoginOpen = useGeneralStore((state) => state.isLoginOpen);
  const isEditProfileModalOpen = useGeneralStore(
    (state) => state.isEditProfileModalOpen,
  );
  return (
    <div>
      {isLoginOpen && <AuthModal />}
      {isEditProfileModalOpen && <EditProfileModal />}
    </div>
  );
}

export default App;
