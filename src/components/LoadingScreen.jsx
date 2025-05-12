const LoadingScreen = () => {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
          <p className="text-white text-xl font-semibold">Carregando...</p>
        </div>
      </div>
    );
  };
  
  export default LoadingScreen;