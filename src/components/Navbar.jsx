
function Navbar({ user, onLogin, onLogout }) {
  return (
    <nav className="bg-white shadow-sm px-6 py-5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#205C45]">
          MtaaConnect
        </h1>

        <div className="hidden md:flex gap-8">
          <a href="#home">Home</a>
          <a href="#categories">Categories</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
        </div>

        {user ? (
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-gray-600">
              {user.displayName || user.email}
            </span>

            <button
              onClick={onLogout}
              className="bg-[#205C45] text-white px-5 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={onLogin}
            className="bg-[#205C45] text-white px-5 py-2 rounded-lg"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
