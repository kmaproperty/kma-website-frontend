import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

export default function Social() {
  return (
    <div
      className="absolute top-1/2 left-1 lg:left-10 -translate-y-1/2 flex flex-row items-center text-xs gap-4 tracking-widest text-white"
      style={{ writingMode: "sideways-lr" }}
    >
      <div className="cursor-pointer flex items-center gap-1"><FaFacebookF style={{ transform: "rotate(266deg)" }} /> Facebook{"  "}</div>
      <div className="cursor-pointer flex items-center gap-1"><FaInstagram style={{ transform: "rotate(266deg)" }} /> Instagram{"  "}</div>
      <div className="cursor-pointer flex items-center gap-1"><FaTwitter style={{ transform: "rotate(266deg)" }} /> Twitter</div>
    </div>
  );
}
