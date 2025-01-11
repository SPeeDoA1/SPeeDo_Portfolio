"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Code, Mail } from 'lucide-react';
import Image from 'next/image';

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

interface WindowProps {
  title: string;
  isActive: boolean;
  onClose: () => void;
  children: React.ReactNode;
  onMinimize: () => void;
  onMaximize: () => void;
  position: Position;
  onPositionChange: (position: Position) => void;
  isMaximized: boolean;
  icon: string;
  defaultSize?: Size;
}

interface Icon {
  id: string;
  title: string;
  iconSrc: string;
  content: React.ReactNode;
}

interface WindowPositions {
  [key: string]: Position;
}

interface IsMaximizedState {
  [key: string]: boolean;
}

const WinXPWindow: React.FC<WindowProps> = ({ 
  title, 
  isActive, 
  onClose, 
  children, 
  onMinimize, 
  onMaximize,
  position,
  onPositionChange,
  isMaximized,
  icon,
  defaultSize = { width: 600, height: 400 }
}) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [size, setSize] = useState<Size>(defaultSize);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);
  const [lastClickTime, setLastClickTime] = useState<number>(0);

  const handleTitleBarClick = () => {
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime < 300) {
      onMaximize();
    }
    setLastClickTime(currentTime);
  };

  const startDrag = (e: React.MouseEvent) => {
    if (isMaximized) return;
    if (e.target instanceof Element && e.target.closest('.window-controls')) return;
    
    setIsDragging(true);
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const onDrag = useCallback((e: MouseEvent) => {
    if (!isDragging || isMaximized) return;
    
    const newX = Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - size.width));
    const newY = Math.max(0, Math.min(e.clientY - dragOffset.y, window.innerHeight - size.height - 40));
    
    onPositionChange({ x: newX, y: newY });
  }, [isDragging, isMaximized, dragOffset.x, dragOffset.y, size.width, size.height, onPositionChange]);
  
  const onResize = useCallback((e: MouseEvent) => {
    if (!isResizing || isMaximized || !windowRef.current) return;
    
    const rect = windowRef.current.getBoundingClientRect();
    let newWidth = size.width;
    let newHeight = size.height;
  
    if (resizeDirection?.includes('e')) {
      newWidth = Math.max(300, Math.min(e.clientX - rect.left, window.innerWidth - rect.left));
    }
    if (resizeDirection?.includes('s')) {
      newHeight = Math.max(200, Math.min(e.clientY - rect.top, window.innerHeight - rect.top - 40));
    }
  
    setSize({
      width: newWidth,
      height: newHeight
    });
  }, [isResizing, isMaximized, resizeDirection, size.width, size.height]);

  const stopResize = useCallback(() => {
    setIsResizing(false);
    setResizeDirection(null);
  }, []);
  const stopDrag = useCallback(() => {
    setIsDragging(false);
  }, []);

  const startResize = useCallback((e: React.MouseEvent, direction: string) => {
    if (isMaximized) return;
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
  }, [isMaximized]);
useEffect(() => {
  if (isDragging || isResizing) {
    const handleMouseMove = isDragging ? onDrag : onResize;
    const handleMouseUp = isDragging ? stopDrag : stopResize;

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }
}, [isDragging, isResizing, onDrag, onResize, stopDrag, stopResize]);

  const handleMinimize = () => {
    const element = windowRef.current;
    if (!element) return;
    
    element.classList.add('minimize-window');
    setTimeout(() => {
      onMinimize();
      element.classList.remove('minimize-window');
    }, 200);
  };

  return (
    <div 
      ref={windowRef}
      className={`
        absolute animate-window-open window-border
        ${isMaximized ? 'inset-0' : ''}
        ${isDragging ? 'cursor-grabbing' : ''}
        ${isActive ? '' : 'opacity-90'}
        transition-opacity duration-200
      `}
      style={isMaximized ? {} : {
        width: size.width,
        height: size.height,
        left: position.x,
        top: position.y
      }}
    >
      {/* Title Bar */}
      <div 
        className={`
          h-8 px-2 flex items-center justify-between cursor-grab
          ${isActive 
            ? 'bg-gradient-to-r from-[#1E5799] via-[#2989D8] to-[#1E5799]' 
            : 'bg-gradient-to-r from-[#969696] via-[#ADADAD] to-[#969696]'}
          rounded-t-lg select-none
        `}
        onMouseDown={startDrag}
        onClick={handleTitleBarClick}
      >
        <div className="flex items-center gap-2">
          <Image src={icon} alt={`${title} icon`} width={16} height={16} className="pixelated" />
          <span className="text-white text-sm font-bold">{title}</span>
        </div>
        <div className="flex gap-[1px] window-controls">
          <button 
            onClick={handleMinimize}
            className="w-[22px] h-[22px] flex items-center justify-center bg-[#D1D1D1] hover:bg-[#E5E5E5] active:bg-[#CCCCCC] border border-[#FFFFFF99] rounded-sm"
          >
            <Image src="/icons/Minimize.png" alt="Minimize" width={22} height={22} className="w-full h-full" draggable={false} />
          </button>
          <button 
            onClick={onMaximize}
            className="w-[22px] h-[22px] flex items-center justify-center bg-[#D1D1D1] hover:bg-[#E5E5E5] active:bg-[#CCCCCC] border border-[#FFFFFF99] rounded-sm"
          >
            <Image src="/icons/Maximize.png" alt="Maximize" width={22} height={22} className="w-full h-full" draggable={false} />
          </button>
          <button 
            onClick={onClose}
            className="w-[22px] h-[22px] flex items-center justify-center bg-[#E81123] hover:bg-[#F65B69] active:bg-[#C13033] border border-[#FFFFFF99] rounded-sm"
          >
            <Image src="/icons/Exit.png" alt="Close" width={22} height={22} className="w-full h-full" draggable={false} />
          </button>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="h-6 bg-[#ECE9D8] border-b border-[#ACA899] px-2 flex items-center select-none">
        <span className="text-sm text-[#444444] hover:underline cursor-default px-2">File</span>
        <span className="text-sm text-[#444444] hover:underline cursor-default px-2">Edit</span>
        <span className="text-sm text-[#444444] hover:underline cursor-default px-2">View</span>
        <span className="text-sm text-[#444444] hover:underline cursor-default px-2">Help</span>
      </div>

      {/* Content */}
      <div className="bg-[#FFFFFF] flex-1 overflow-auto win-select">
        {children}
      </div>

      {/* Resize Handles */}
      {!isMaximized && (
        <>
          <div 
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
            onMouseDown={(e) => startResize(e, 'se')}
          />
          <div 
            className="absolute bottom-0 left-0 right-0 h-1 cursor-s-resize"
            onMouseDown={(e) => startResize(e, 's')}
          />
          <div 
            className="absolute top-0 bottom-0 right-0 w-1 cursor-e-resize"
            onMouseDown={(e) => startResize(e, 'e')}
          />
        </>
      )}
    </div>
  );
};

const WinXPPortfolio: React.FC = () => {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [showStartMenu, setShowStartMenu] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [windowPositions, setWindowPositions] = useState<WindowPositions>({});
  const [isMaximized, setIsMaximized] = useState<IsMaximizedState>({});
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (showStartMenu && 
          !target.closest('.start-button') && 
          !target.closest('.start-menu')) {
        setShowStartMenu(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [showStartMenu]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const defaultIcons: Icon[] = [
    {
      id: 'about_me',
      title: 'About Me',
      iconSrc: '/icons/notepad.png',
      content: (
        <div className="p-6 space-y-4">
          <h2 className="text-lg font-bold">Ali Saad</h2>
          <h3 className="text-md">Web Developer & Cybersecurity Enthusiast</h3>
          <p className="text-sm">
          Hi, I’m Ali Saad, a 19-year-old cybersecurity student from Duhok, Iraq, currently studying at Northern Technical University (NTU). I am passionate about cybersecurity, web development, and creative arts, and I strive to expand my skills and knowledge in these areas.

In cybersecurity, I am an active CTF player on TryHackMe, proudly ranking among the Top 5 in Iraq and the Top 1% globally. I have also reached the finals of the prestigious Iraqi Minister of Cybersecurity Exam, demonstrating my expertise and dedication to the field.

Beyond cybersecurity, I am skilled in video editing and graphic designing, with hands-on experience in tools like Adobe Premiere, Photoshop, and After Effects. My creativity shines through the engaging and high-quality content I produce.

I am also diving into the world of web development and have already created projects using Next.js, React, PHP, and other technologies. This journey allows me to blend my technical skills with my creative talents, building functional and visually appealing websites.

With a combination of technical expertise, creative flair, and a passion for continuous learning, I am eager to showcase my work and make a meaningful impact in both cybersecurity and the tech industry.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span className="text-sm">ali2005saad12@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              <span className="text-sm"><p> It takes 20 years to build a reputation and five minutes to ruin it. </p></span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'my_projects',
      title: 'My Projects',
      iconSrc: '/icons/projects.png',
      content: (
        <div className="p-4 grid gap-4">
          {[
            { 
              title: 'Rubber Duckey V5',
              desc: '16 Ready-to-Use HID Scripts Built with Arduino',
              tech: ['Arduino', 'C++', 'Python','Bash']
            },
            { 
              title: 'NTU Exam System',
              desc: 'Elevating Exam and Homework Management for NTU Students',
              tech: ['PHP', 'MySQL', 'JavaScript']
            },
            {
              title: 'BreachTracker',
              desc: 'Detect Breaches, Secure Credentials, Take Control',
              tech: ['PHP', 'MySQL', 'JavaScript']
            },
            { 
              title: 'SunWay KinderGarten',
              desc: 'Smart Childcare, Attendance, and Financial Management',
              tech: ['React', 'NextJS', 'MySQL']
            },
            
          ].map((project) => (
            <div key={project.title} className="border rounded p-4 hover:bg-blue-50 transition-colors">
              <h3 className="font-bold">{project.title}</h3>
              <p className="text-sm text-gray-600">{project.desc}</p>
              <div className="flex gap-2 mt-2">
                {project.tech.map(tech => (
                  <span key={tech} className="text-xs bg-blue-100 px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'my_skills',
      title: 'Skills',
      iconSrc: '/icons/skills.png',
      content: (
        <div className="p-6 space-y-6">
          {[
            { category: 'CyberSecurity', skills: ['CTF', 'SOC Analysis', 'PenTester', 'Digital Forensics'] },
            { category: 'Web', skills: ['React', 'Next.js', 'PHP', 'MySQL','MongoDB'] },
            { category: 'Programming Language', skills: ['C++', 'Python', 'Bash'] },
          ].map((group) => (
            <div key={group.category}>
              <h3 className="font-bold mb-2">{group.category}</h3>
              <div className="grid grid-cols-2 gap-2">
                {group.skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-blue-500 rounded-full" />
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'contact',
      title: 'Contact',
      iconSrc: '/icons/Phone.png',
      content: (
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <a 
              href="https://github.com/SPeeDoA1" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 border rounded hover:bg-blue-50 transition-colors"
            >
              <Image 
                src="/icons/github.png"
                alt="Start"
                width={60}
                height={60}
                className="pixelated"
                draggable={false}
              />
              <span className="text-sm text-blue-600">GitHub Profile</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/speedoa1/" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 border rounded hover:bg-blue-50 transition-colors"
            >
              <Image 
                src="/icons/linkedin.png"
                alt="Start"
                width={60}
                height={60}
                className="pixelated"
                draggable={false}
              />
              <span className="text-sm text-blue-600">LinkedIn Profile</span>
            </a>
          </div>
          <div className="mt-6">
            <h3 className="font-bold mb-2">Contact Information</h3>
            <div className="space-y-2 text-sm">
              <p>📧 ali2005saad12@gmail.com</p>
              <p>📱 +964 770 161 3172</p>
              <p>📍 Iraq, Duhok</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
const calculateInitialPosition = (id: string): Position => {
    const cascade = openWindows.length * 30;
    return {
      x: 50 + cascade,
      y: 50 + cascade
    };
  };

  const handleWindowOpen = (id: string): void => {
    if (!openWindows.includes(id)) {
      setOpenWindows([...openWindows, id]);
      setWindowPositions({
        ...windowPositions,
        [id]: calculateInitialPosition(id)
      });
    }
    setActiveWindow(id);
    setMinimizedWindows(minimizedWindows.filter(w => w !== id));
    setShowStartMenu(false);
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Desktop Background */}
      <Image 
        src="/bg.jpg" 
        alt="Windows XP Background" 
        fill
        className="object-cover"
        priority
        quality={100}
        draggable={false}
        unoptimized // Add this if you want to skip Next.js image optimization
      />
      {/* Desktop Icons Container */}
      <div className="absolute inset-0 z-10">
        <div className="grid grid-cols-1 auto-rows-min gap-6 p-6">
          {defaultIcons.map((icon) => (
            <button
              key={icon.id}
              className="flex flex-col items-center gap-2 p-3 rounded-lg 
                       hover:bg-white/10 active:bg-blue-500/30 group transition-colors
                       w-24"
              onClick={() => handleWindowOpen(icon.id)}
              onDoubleClick={() => {
                handleWindowOpen(icon.id);
                setIsMaximized({ ...isMaximized, [icon.id]: true });
              }}
            >
              <Image 
  src={icon.iconSrc} 
  alt={icon.title}
  width={48}
  height={48}
  className="w-12 h-12 pixelated group-hover:scale-105 transition-transform"
  draggable={false}
/>
              <span className="text-white text-sm font-semibold text-shadow text-center">
                {icon.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Windows Container */}
<div className="absolute inset-0 z-20 pointer-events-none">
  {openWindows.map((id) => {
    const icon = defaultIcons.find(i => i.id === id);
    if (!icon || minimizedWindows.includes(id)) return null;

    return (
      <div key={id} className="pointer-events-auto">
        <WinXPWindow
          title={icon.title}
          icon={icon.iconSrc}
          isActive={activeWindow === id}
          position={windowPositions[id] || { x: 0, y: 0 }}
          onPositionChange={(newPos) => {
            setWindowPositions({
              ...windowPositions,
              [id]: newPos
            });
          }}
          isMaximized={isMaximized[id]}
          onClose={() => {
            setOpenWindows(openWindows.filter(w => w !== id));
            if (activeWindow === id) setActiveWindow(null);
          }}
          onMinimize={() => {
            setMinimizedWindows([...minimizedWindows, id]);
            if (activeWindow === id) setActiveWindow(null);
          }}
          onMaximize={() => {
            setIsMaximized({
              ...isMaximized,
              [id]: !isMaximized[id]
            });
          }}
        >
          {icon.content}
        </WinXPWindow>
      </div>
    );
  })}
</div>

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-10 bg-gradient-to-r from-[#1E5799] to-[#2989D8] 
                    border-t-[3px] border-[#2573BC] flex items-center px-1">
        {/* Start Button */}
        <button
          className={`start-button h-8 flex items-center gap-2 px-2 rounded-sm
            ${showStartMenu ? 'bg-[#2573BC]' : 'hover:bg-[#3C8ADB]'}
            transition-colors
          `}
          onClick={(e) => {
            e.stopPropagation();
            setShowStartMenu(!showStartMenu);
          }}
        >
          <Image 
        src="/icons/start.png"
        alt="Start"
        width={24}
        height={24}
        className="pixelated"
        draggable={false}
      />
          <span className="text-white font-bold">Start</span>
        </button>

        {/* Quick Launch */}
        <div className="border-l border-[#2573BC] mx-2 h-full" />

        {/* Open Windows */}
<div className="flex-1 flex gap-1 overflow-x-auto">
  {openWindows.map((id) => {
    const icon = defaultIcons.find(i => i.id === id);
    if (!icon) return null;

    return (
      <button
        key={id}
        className={`
          flex-shrink-0 px-2 h-8 flex items-center gap-2 rounded-sm
          min-w-[120px] max-w-[200px]
          ${activeWindow === id ? 'bg-[#2573BC]' : 'hover:bg-[#3C8ADB]'}
          ${minimizedWindows.includes(id) ? 'opacity-70' : ''}
          transition-all duration-100
        `}
        onClick={() => {
          if (minimizedWindows.includes(id)) {
            setMinimizedWindows(minimizedWindows.filter(w => w !== id));
          }
          setActiveWindow(id);
        }}
      >
        <Image 
          src={icon.iconSrc} 
          alt={icon.title}
          width={16}
          height={16}
          className="w-4 h-4 pixelated"
          draggable={false}
        />
        <span className="text-white text-sm truncate">{icon.title}</span>
      </button>
    );
  })}
</div>

        {/* System Tray */}
        <div className="flex items-center h-full bg-gradient-to-r from-[#0F256E] to-[#0F256E] px-2">
        <Image 
        src="/icons/volume.png"
        alt="Start"
        width={24}
        height={24}
        className="pixelated"
        draggable={false}
      />
          <span className="text-white text-sm">{currentTime}</span>
        </div>
      </div>

      {/* Start Menu */}
{showStartMenu && (
  <div className="absolute bottom-10 left-0 z-50 w-80 bg-white rounded-t-lg 
                shadow-2xl start-menu origin-bottom"
       onClick={(e: React.MouseEvent) => e.stopPropagation()}>
    {/* User Profile Section */}
    <div className="h-20 bg-gradient-to-r from-[#1E5799] to-[#2989D8] p-4 
                   rounded-t-lg flex items-center gap-4">
      <Image 
        src="/icons/user.png"
        alt="Start"
        width={60}
        height={60}
        className="pixelated rounded-full"
        draggable={false}
      />
      <span className="text-white font-bold">Ali Saad (SPeeDo)</span>
    </div>
    {/* Programs Section */}
    <div className="flex h-[400px]">
      {/* Left Column - Main Programs */}
      <div className="w-3/5 p-2 space-y-1 bg-white">
        {defaultIcons.map((icon) => (
          <button
            key={icon.id}
            className="w-full flex items-center gap-3 p-2 rounded hover:bg-[#2989D8] 
                     hover:text-white transition-colors"
            onClick={() => {
              handleWindowOpen(icon.id);
              setShowStartMenu(false);
            }}
          >
            <Image 
              src={icon.iconSrc} 
              alt={icon.title}
              width={24}
              height={24}
              className="w-6 h-6 pixelated"
              draggable={false}
            />
            <span className="text-sm text-left">{icon.title}</span>
          </button>
        ))}
      </div>

      {/* Right Column - Recent Programs */}
      <div className="w-2/5 bg-[#EFF3F7] p-2 space-y-1">
        <div className="text-sm font-bold text-gray-600 mb-2 px-2">Recent</div>
        <div className="space-y-1">
          <button className="w-full text-left text-sm p-2 hover:bg-[#2989D8] hover:text-white rounded">
            <div className="flex items-center gap-2">
            <Image 
        src="/icons/recent.png"
        alt="Start"
        width={24}
        height={24}
        className="pixelated"
        draggable={false}
      />
              <span>Recent Projects</span>
            </div>
          </button>
          <button className="w-full text-left text-sm p-2 hover:bg-[#2989D8] hover:text-white rounded">
            <div className="flex items-center gap-2">
            <Image 
        src="/icons/documents.png"
        alt="Start"
        width={24}
        height={24}
        className="pixelated"
        draggable={false}
      />
              <span>My Documents</span>
            </div>
          </button>
          <button className="w-full text-left text-sm p-2 hover:bg-[#2989D8] hover:text-white rounded">
            <div className="flex items-center gap-2">
            <Image 
        src="/icons/pictures.png"
        alt="Start"
        width={24}
        height={24}
        className="pixelated"
        draggable={false}
      />
              <span>My Pictures</span>
            </div>
          </button>
        </div>
      </div>
    </div>

    {/* Bottom Section */}
    <div className="border-t border-gray-300 bg-[#EFF3F7] p-2">
      <div className="flex justify-between">
        <button className="flex items-center gap-2 p-2 hover:bg-[#2989D8] hover:text-white rounded">
        <Image 
        src="/icons/logoff.png"
        alt="Start"
        width={24}
        height={24}
        className="pixelated"
        draggable={false}
      />
          <span className="text-sm">Log Off</span>
        </button>
        <button className="flex items-center gap-2 p-2 hover:bg-[#2989D8] hover:text-white rounded">
        <Image 
        src="/icons/shutdown.png"
        alt="Start"
        width={24}
        height={24}
        className="pixelated"
        draggable={false}
      />
          <span className="text-sm">Shut Down</span>
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default WinXPPortfolio;