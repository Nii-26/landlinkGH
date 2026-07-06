import ArcGISMap from './components/ArcGISMap';

const logoLetters = 'LANDLINKGH'.split('');

function App() {
  return (
    <div className="mobile-map-shell">
      <ArcGISMap />

      <div className="map-overlay">
        <header className="overlay-top">
          <button className="hud-btn" aria-label="Open menu" type="button">
            <span className="icon-menu" />
          </button>

          <div className="landlink-logo" aria-label="LandlinkGH logo">
            {logoLetters.map((letter, index) => (
              <span key={`${letter}-${index}`} className="logo-tile">
                {letter}
              </span>
            ))}
          </div>

          <button className="hud-btn" aria-label="Search" type="button">
            <span className="icon-search" />
          </button>
        </header>

        <div className="location-pill" role="status" aria-live="polite">
          <span className="location-dot">i</span>
          <span>Accra, Ghana</span>
        </div>

        <button className="info-fab" aria-label="Map information" type="button">
          i
        </button>
      </div>
    </div>
  );
}

export default App;
