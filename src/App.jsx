import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <div className="main">
        <Navbar />
      </div>
      <section className="lower-section">
        <div className="info-section">
          <Sidebar />
          <section className="lower-section-items">
            <div className="items-div">
              <ul className="items-ul">
                <li>Dashboard</li>
                <li>Content</li>
                <li>Analytics</li>
                <li>Subtitles</li>
                <li>Copyright</li>
              </ul>
            </div>
          </section>
        </div>
        <div className="right-info-section">
          <Dashboard />
        </div>
      </section>
    </>
  );
}

export default App;
