import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <header style={{ padding: '20px', background: '#eee' }}>
        <h1>Platzi</h1>
      </header>

      <main style={{ padding: '20px' }}>
        <Outlet />
      </main>

      <footer style={{ marginTop: 'auto', padding: '20px', background: '#333', color: '#fff' }}>
        <p>Footer qismi</p>
      </footer>
    </div>
  );
};

export default MainLayout;