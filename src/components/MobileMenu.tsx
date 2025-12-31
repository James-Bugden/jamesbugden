import { useState, useEffect } from "react";
import { Menu, X, Linkedin } from "lucide-react";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import LanguageToggle from "@/components/LanguageToggle";

interface MobileMenuProps {
  links: { href: string; label: string }[];
}

const MobileMenu = ({ links }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-cream-70 hover:text-cream transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-nav-green z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-cream-70 hover:text-cream transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="text-lg text-cream-90 hover:text-cream transition-colors py-2 border-b border-cream/10"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t border-cream/10">
            <div className="mb-6">
              <LanguageToggle variant="mobile" />
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://www.linkedin.com/in/james-bugden/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-70 hover:text-cream transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/james.careers/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-70 hover:text-cream transition-colors"
              >
                <InstagramIcon className="w-6 h-6" />
              </a>
              <a
                href="https://www.threads.com/@james.careers"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-70 hover:text-cream transition-colors"
              >
                <ThreadsIcon className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;