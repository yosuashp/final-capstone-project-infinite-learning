import { Link } from "react-router-dom";
import useStore from "../store";
import Spinner from "./Spinner";

const Header = () => {
  const store = useStore();
  const user = store.authUser;

  const handleLogout = () => {
    window.location.href = 'http://localhost:3030';
    
  };

  return (
    <>
      <header className="bg-white h-20">
        <nav className="h-full flex justify-between container items-center">
          <div>
            <Link to="/" className="text-ct-dark-600 text-2xl font-semibold">
              Belanja Website Sederhana
            </Link>
          </div>
          <ul className="flex items-center gap-4">
            <li>
              <Link to="/" className="text-ct-dark-600">
                Beranda
              </Link>
            </li>
            {!user && (
              <>
                <li>
                  <Link to="/register" className="text-ct-dark-600">
                    Register
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="text-ct-dark-600">
                    Masuk
                  </Link>
                </li>
              </>
            )}
            {user && (
              <>
                <li>
                  <Link to="/profile" className="text-ct-dark-600">
                    Profile
                  </Link>
                </li>
                <li className="cursor-pointer" onClick={handleLogout}>
                  Logout
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <div className="pt-4 pl-2 bg-ct-yellow-600 fixed">
        {store.requestLoading && <Spinner color="text-ct-yellow-600" />}
      </div>
    </>
  );
};

export default Header;
