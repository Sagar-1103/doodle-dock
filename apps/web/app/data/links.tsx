import { Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export const links = [
  {
    icon: <svg className="mix-blend-normal w-6 h-6" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256">
    <g fill="#ffffff" fillRule="nonzero" stroke="none" 
    strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter"
     strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none"
      fontWeight="none" fontSize="none" textAnchor="none"><g transform="scale(8.53333,8.53333)"><path d="M26.37,26l-8.795,-12.822l0.015,0.012l7.93,-9.19h-2.65l-6.46,7.48l-5.13,-7.48h-6.95l8.211,11.971l-0.001,-0.001l-8.66,10.03h2.65l7.182,-8.322l5.708,8.322zM10.23,6l12.34,18h-2.1l-12.35,-18z"></path></g></g>
    </svg>,
    name: "X",
    href: "https://x.com/_sagar1103_",
  },
  {
    icon: <FaGithub className="w-5 h-5" />,
    name: "Github",
    href: "https://github.com/Sagar-1103",
  },
  {
    icon: <FaLinkedinIn className="w-5 h-5" />,
    name: "Linkedin",
    href: "https://www.linkedin.com/in/sagar-shirgaonkar-ba0859270/",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    name: "Email",
    href: "mailto:sagarshirgaonkar59511@gmail.com",
  },
];
