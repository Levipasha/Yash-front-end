import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const TABS = [
  { name: "Home", path: "/" },
  { name: "Courses", path: "/courses" },
  { name: "Blogs", path: "/blog" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" }
];

export const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Find which tab matches current path
  const currentTabIndex = TABS.findIndex(tab => 
    tab.path === "/" ? location.pathname === "/" : location.pathname.startsWith(tab.path)
  );
  
  const initialIndex = currentTabIndex >= 0 ? currentTabIndex : 0;
  const [selected, setSelected] = useState(initialIndex);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(initialIndex);
  
  const tabsRef = useRef<(HTMLLIElement | null)[]>([]);

  // Update selected if route changes externally
  useEffect(() => {
    if (currentTabIndex >= 0 && currentTabIndex !== selected) {
      setSelected(currentTabIndex);
      setHoveredIndex(currentTabIndex);
    }
  }, [location.pathname, currentTabIndex, selected]);

  useEffect(() => {
    // When selected changes and we aren't hovering anything else, update cursor
    if (hoveredIndex === selected) {
      const selectedTab = tabsRef.current[selected];
      if (selectedTab) {
        const { width } = selectedTab.getBoundingClientRect();
        setPosition({
          left: selectedTab.offsetLeft,
          width,
          opacity: 1,
        });
      }
    }
  }, [selected, hoveredIndex, tabsRef]);

  return (
    <ul
      onMouseLeave={() => {
        setHoveredIndex(selected);
        const selectedTab = tabsRef.current[selected];
        if (selectedTab) {
            const { width } = selectedTab.getBoundingClientRect();
            setPosition({
                left: selectedTab.offsetLeft,
                width,
                opacity: 1,
            });
        }
      }}
      className="relative mx-auto flex w-fit rounded-full bg-white p-1"
    >
      {TABS.map((tab, i) => (
         <Tab
            key={tab.name}
            ref={(el) => { tabsRef.current[i] = el; }}
            setPosition={setPosition}
            onClick={() => {
              setSelected(i);
              setHoveredIndex(i);
              navigate(tab.path);
            }}
            onHover={() => setHoveredIndex(i)}
            isActive={hoveredIndex === i}
          >
            {tab.name}
        </Tab>
      ))}

      <Cursor position={position} />
    </ul>
  );
};

interface TabProps {
  children: React.ReactNode;
  setPosition: (position: { left: number; width: number; opacity: number }) => void;
  onClick: () => void;
  onHover: () => void;
  isActive: boolean;
}

const Tab = React.forwardRef<HTMLLIElement, TabProps>(({ children, setPosition, onClick, onHover, isActive }, ref) => {
  return (
    <li
      ref={ref}
      onClick={onClick}
      onMouseEnter={(e) => {
        onHover();
        const node = e.currentTarget;
        if (!node) return;
        const { width } = node.getBoundingClientRect();
        setPosition({
          left: node.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className={`relative z-10 block cursor-pointer px-3 py-1.5 text-sm font-semibold transition-colors duration-300 md:px-5 md:py-2 ${
        isActive ? "text-white" : "text-gray-600 hover:text-gray-900"
      }`}
    >
      <span>{children}</span>
    </li>
  );
});

const Cursor = ({ position }: { position: { left: number; width: number; opacity: number } }) => {
  return (
    <motion.li
      animate={{
        left: position.left,
        width: position.width,
        opacity: position.opacity
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="absolute z-0 h-9 md:h-9 top-1 rounded-full bg-[var(--color-primary)] shadow-sm"
    />
  );
};
