const TopAdBanner = () => (
  <div className="w-full bg-black bg-opacity-50 p-1 text-center">
    <div className="max-w-[728px] mx-auto h-[60px] bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center">
      <span className="text-gray-400 text-sm">Espacio publicitario</span>
    </div>
  </div>
);

const BottomAdBanner = () => (
  <div className="w-full max-w-[728px] mx-auto h-[60px] bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center my-4">
    <span className="text-gray-400 text-sm">Espacio publicitario</span>
  </div>
);

export { TopAdBanner, BottomAdBanner };
