import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-20 bg-gradient-hero flex items-center justify-center text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-glow/20 rounded-full blur-3xl animate-bounce-gentle" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl animate-pulse" />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 animate-fade-up">
        <h1 className="text-6xl md:text-8xl font-bold mb-8 text-white drop-shadow-lg leading-tight">
          Gestión de Contenido
          <span className="block bg-gradient-to-r from-white via-primary-foreground to-white bg-clip-text text-transparent">
            Inteligente
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed font-medium">
          Centraliza, organiza y distribuye tu contenido digital con la potencia de la inteligencia artificial. 
          Una plataforma completa para empresas modernas.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Button variant="premium" size="lg" className="text-lg px-10 py-4 hover-lift">
            Comenzar Gratis
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Button>
          <Button variant="glass" size="lg" className="text-lg px-10 py-4 hover-lift">
            Ver Demostración
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="glass rounded-xl p-8 border border-white/20 hover-lift animate-fade-in">
            <div className="text-4xl font-bold gradient-text mb-2">10M+</div>
            <div className="text-white/80 font-medium">Archivos Gestionados</div>
            <div className="text-sm text-white/60 mt-1">Procesados diariamente</div>
          </div>
          <div className="glass rounded-xl p-8 border border-white/20 hover-lift animate-fade-in" style={{animationDelay: '0.1s'}}>
            <div className="text-4xl font-bold gradient-text mb-2">99.9%</div>
            <div className="text-white/80 font-medium">Tiempo de Actividad</div>
            <div className="text-sm text-white/60 mt-1">Disponibilidad garantizada</div>
          </div>
          <div className="glass rounded-xl p-8 border border-white/20 hover-lift animate-fade-in" style={{animationDelay: '0.2s'}}>
            <div className="text-4xl font-bold gradient-text mb-2">50K+</div>
            <div className="text-white/80 font-medium">Usuarios Activos</div>
            <div className="text-sm text-white/60 mt-1">En todo el mundo</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;