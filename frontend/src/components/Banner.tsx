const Banner = ({ img, text }: { img: string; text: string }) => {
  return (
    <div className="w-full max-h-96 overflow-hidden relative flex items-center justify-center mt-12">
      <img src={img} alt="banner" className="w-full h-full object-cover" />
      <div className="text-4xl text-white font-bold absolute bg-black/20 p-2 rounded backdrop-blur-sm uppercase">
        <h2>{text}</h2>
      </div>
    </div>
  );
};

export default Banner;
