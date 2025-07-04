import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  img: string;
  sectionTitle: string;
}

const SectionContainer = ({ children, img, sectionTitle }: Props) => {
  return (
    <section>
      <div className="w-full max-h-96 overflow-hidden relative flex items-center justify-center mt-12">
        <img src={img} alt="banner" className="w-full h-full object-cover" />
        <div className="text-4xl text-white font-bold absolute bg-black/20 p-2 rounded backdrop-blur-sm uppercase">
          <h2>{sectionTitle}</h2>
        </div>
      </div>

      <div className="px-4 mt-8">
        <div className="container mx-auto">{children}</div>
      </div>
    </section>
  );
};

export default SectionContainer;
