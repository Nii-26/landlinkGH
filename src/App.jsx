import ArcGISMap from './components/ArcGISMap';

const highlights = [
  'Interactive map view centered on Ghana',
  'React component-driven architecture',
  'Modern styling and responsive layout'
];

function App() {
  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">ArcGIS • React • Modern UI</p>
          <h1>Explore Ghana with an interactive ArcGIS map.</h1>
          <p className="hero-copy">
            This app demonstrates a clean React implementation of the ArcGIS Maps SDK for JavaScript with a Ghana-centered view and component-based structure.
          </p>
        </div>
        <ul className="feature-list">
          {highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </header>

      <main className="content-grid">
        <section className="map-card">
          <ArcGISMap />
        </section>
        <aside className="info-card">
          <h2>Project overview</h2>
          <p>
            The map is built with reusable React components, a dedicated ArcGIS map component, and a simple, maintainable layout for future enhancements.
          </p>
          <div className="info-pill-group">
            <span className="info-pill">Responsive</span>
            <span className="info-pill">Reusable</span>
            <span className="info-pill">ArcGIS-ready</span>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
