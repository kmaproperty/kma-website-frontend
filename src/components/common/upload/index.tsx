import Image from "next/image";
import { useRef } from "react";

export default function ImageUpload({ onUpload, label, accept }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) onUpload(file);
  };

  return (
    <div
      onClick={() => fileInputRef.current.click()}
      className="flex-1 border-1 border-dashed border-[#A9A9DB] bg-[#E7E6FF66] rounded-lg flex flex-col items-center justify-center h-38 w-full cursor-pointer transition-all"
    >
      <Image alt='upload' src='/assets/upload.svg' width={40} height={40} className="text-3xl text-secondary mb-2" />
      <p className="text-text-black text-sm font-medium">Drag and drop file here</p>
      <p className="text-text-gray text-sm">PDF, JPEG or PNG Less than 5 MB</p>
      <input
        type="file"
        accept={accept}
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
