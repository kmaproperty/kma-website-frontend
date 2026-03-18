import { getAboutusData } from "@/store/homeHeaderSlice";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Social() {
  const aboutusData = useSelector(getAboutusData)
  const { instagramLink, fbLink, twitterLink } = aboutusData || {};
  return (
    <div
      className="absolute top-1/2 left-1 lg:left-10 -translate-y-1/2 flex flex-row items-center text-xs gap-4 tracking-widest text-white"
      style={{ writingMode: "sideways-lr" }}
    >
      {fbLink && (
        <a
          href={fbLink}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer flex items-center gap-1 px-2 py-1 rounded-md transition-all duration-200 hover:bg-blue hover:text-white"
        >
          <FaFacebookF style={{ transform: "rotate(266deg)" }} />
          Facebook
        </a>
      )}

      {instagramLink && (
        <a
          href={instagramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer flex items-center gap-1 px-2 py-1 rounded-md transition-all duration-200 hover:bg-blue hover:text-white"
        >
          <FaInstagram style={{ transform: "rotate(266deg)" }} />
          Instagram
        </a>
      )}

      {twitterLink && (
        <a
          href={twitterLink}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer flex items-center gap-1 px-2 py-1 rounded-md transition-all duration-200 hover:bg-blue hover:text-white"
        >
          <FaTwitter style={{ transform: "rotate(266deg)" }} />
          Twitter
        </a>
      )}
    </div>
  );
}
