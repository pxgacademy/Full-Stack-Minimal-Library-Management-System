import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex justify-center mt-24 py-20">
      <Loader2 size={64} className="animate-spin" />
    </div>
  );
};

export default Loading;
