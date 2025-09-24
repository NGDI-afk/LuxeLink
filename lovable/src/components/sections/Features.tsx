const Features = () => {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 animate-fade-up">
          <h2 className="text-5xl font-bold text-foreground mb-6 gradient-text">
            Características Principales
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Descubre las herramientas avanzadas que transformarán tu gestión de contenido en una experiencia eficiente y poderosa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="bg-card rounded-2xl p-8 shadow-elegant hover-lift hover-glow group animate-fade-in border border-border/50">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-card-foreground mb-4 group-hover:text-primary transition-colors">
              Subida Inteligente
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Algoritmos de IA que organizan automáticamente tu contenido según el tipo, tema y relevancia con precisión excepcional.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-card rounded-2xl p-8 shadow-elegant hover-lift hover-glow group animate-fade-in border border-border/50" style={{animationDelay: '0.1s'}}>
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-card-foreground mb-4 group-hover:text-primary transition-colors">
              Búsqueda Avanzada
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Encuentra cualquier archivo en segundos con búsqueda por contenido, metadatos y reconocimiento visual powered by AI.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-card rounded-2xl p-8 shadow-elegant hover-lift hover-glow group animate-fade-in border border-border/50" style={{animationDelay: '0.2s'}}>
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-card-foreground mb-4 group-hover:text-primary transition-colors">
              Seguridad Avanzada
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Protección de nivel empresarial con cifrado de extremo a extremo y control de acceso granular para máxima tranquilidad.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-card rounded-2xl p-8 shadow-elegant hover-lift hover-glow group animate-fade-in border border-border/50" style={{animationDelay: '0.3s'}}>
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-card-foreground mb-4 group-hover:text-primary transition-colors">
              Colaboración
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Trabaja en equipo con herramientas de colaboración en tiempo real y flujos de trabajo personalizados para máxima productividad.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-card rounded-2xl p-8 shadow-elegant hover-lift hover-glow group animate-fade-in border border-border/50" style={{animationDelay: '0.4s'}}>
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-card-foreground mb-4 group-hover:text-primary transition-colors">
              Analytics
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Insights detallados sobre el uso de contenido y rendimiento con dashboards interactivos y reportes en tiempo real.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-card rounded-2xl p-8 shadow-elegant hover-lift hover-glow group animate-fade-in border border-border/50" style={{animationDelay: '0.5s'}}>
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-card-foreground mb-4 group-hover:text-primary transition-colors">
              Automatización
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Flujos de trabajo automatizados que procesan y distribuyen contenido según reglas personalizadas con inteligencia artificial.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;