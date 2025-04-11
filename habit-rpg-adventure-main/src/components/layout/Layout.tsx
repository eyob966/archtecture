
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ListChecks, 
  BarChartBig, 
  User, 
  Plus, 
  Settings,
  Moon,
  LogOut,
  Menu
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  }, [location.pathname, isMobile]);

  const links = [
    { 
      path: '/', 
      label: 'Dashboard', 
      icon: <LayoutDashboard className="w-5 h-5" />,
      color: 'text-solo-blue'
    },
    { 
      path: '/habits', 
      label: 'Habits', 
      icon: <ListChecks className="w-5 h-5" />,
      color: 'text-emerald-500'
    },
    { 
      path: '/quests', 
      label: 'Quests', 
      icon: <ListChecks className="w-5 h-5" />,
      color: 'text-amber-500'
    },
    { 
      path: '/stats', 
      label: 'Stats', 
      icon: <BarChartBig className="w-5 h-5" />,
      color: 'text-violet-500'
    },
    { 
      path: '/profile', 
      label: 'Profile', 
      icon: <User className="w-5 h-5" />,
      color: 'text-rose-500'
    }
  ];

  const navVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col bg-solo-dark">
      {/* Header */}
      <header className="relative z-10 glass-panel border-none bg-solo-darker/90 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {isMobile && (
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="p-1 text-solo-blue"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-solo-blue flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-glow">Level Up</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            className="w-8 h-8 rounded-full flex items-center justify-center border border-solo-gray hover:border-solo-blue transition-colors"
            onClick={() => toast({
              title: "Coming Soon!",
              description: "More features will be added in future updates.",
            })}
          >
            <Settings className="w-4 h-4 text-solo-blue-light" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-solo-blue to-solo-accent flex items-center justify-center">
            <span className="text-xs font-bold text-white">10</span>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for desktop */}
        {!isMobile && (
          <motion.nav
            className="glass-panel border-r border-solo-gray/30 w-64 p-4 hidden md:block"
            initial="hidden"
            animate="visible"
            variants={navVariants}
          >
            <div className="space-y-1">
              {links.map((link) => (
                <motion.div key={link.path} variants={itemVariants}>
                  <Link
                    to={link.path}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-md transition-all",
                      location.pathname === link.path 
                        ? "bg-solo-blue/10 border-glow"
                        : "hover:bg-solo-darker hover:text-solo-blue-light"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      location.pathname === link.path 
                        ? "bg-solo-blue/20" 
                        : "bg-solo-gray/20"
                    )}>
                      {React.cloneElement(link.icon, { 
                        className: cn(
                          "w-4 h-4",
                          location.pathname === link.path 
                            ? "text-solo-blue" 
                            : "text-muted-foreground"
                        )
                      })}
                    </div>
                    <span className={cn(
                      "font-medium",
                      location.pathname === link.path && "text-solo-blue-light"
                    )}>
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8">
              <button 
                className="w-full solo-button flex items-center justify-center space-x-2"
                onClick={() => toast({
                  title: "New habit",
                  description: "Create a new habit feature coming soon!",
                })}
              >
                <Plus className="w-4 h-4" />
                <span>Add Habit</span>
              </button>
            </div>
            
            <div className="absolute bottom-4 left-4 right-4 space-y-2">
              <div className="glass-panel p-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-solo-blue/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-solo-blue" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">User</div>
                    <div className="text-xs text-muted-foreground">Level 10</div>
                  </div>
                </div>
                <button className="text-solo-blue hover:text-solo-blue-light">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.nav>
        )}
        
        {/* Mobile menu */}
        {isMobile && (
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: -280 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -280 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed inset-0 z-50"
              >
                <div className="absolute inset-0 bg-black/60" onClick={() => setMobileMenuOpen(false)} />
                <motion.nav
                  className="glass-panel absolute top-0 left-0 bottom-0 w-64 py-4 overflow-y-auto"
                  variants={navVariants}
                >
                  <div className="px-4 pb-4 mb-4 border-b border-solo-gray/30">
                    <Link to="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                      <div className="w-8 h-8 rounded-full bg-solo-blue flex items-center justify-center">
                        <LayoutDashboard className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xl font-semibold text-glow">Level Up</span>
                    </Link>
                  </div>
                  
                  <div className="px-2 space-y-1">
                    {links.map((link) => (
                      <motion.div key={link.path} variants={itemVariants}>
                        <Link
                          to={link.path}
                          className={cn(
                            "flex items-center space-x-3 px-3 py-2 rounded-md transition-all",
                            location.pathname === link.path 
                              ? "bg-solo-blue/10 border-glow"
                              : "hover:bg-solo-darker hover:text-solo-blue-light"
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center",
                            location.pathname === link.path 
                              ? "bg-solo-blue/20" 
                              : "bg-solo-gray/20"
                          )}>
                            {React.cloneElement(link.icon, { 
                              className: cn(
                                "w-4 h-4",
                                location.pathname === link.path 
                                  ? "text-solo-blue" 
                                  : "text-muted-foreground"
                              )
                            })}
                          </div>
                          <span className={cn(
                            "font-medium",
                            location.pathname === link.path && "text-solo-blue-light"
                          )}>
                            {link.label}
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="px-4 mt-6">
                    <button 
                      className="w-full solo-button flex items-center justify-center space-x-2"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        toast({
                          title: "New habit",
                          description: "Create a new habit feature coming soon!",
                        });
                      }}
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Habit</span>
                    </button>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4 px-2">
                    <div className="glass-panel p-3 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-solo-blue/20 flex items-center justify-center">
                          <User className="w-4 h-4 text-solo-blue" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">User</div>
                          <div className="text-xs text-muted-foreground">Level 10</div>
                        </div>
                      </div>
                      <button className="text-solo-blue hover:text-solo-blue-light">
                        <LogOut className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.nav>
              </motion.div>
            )}
          </AnimatePresence>
        )}
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <motion.div
            className="page-transition-wrapper"
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
      
      {/* Mobile navigation */}
      {isMobile && (
        <motion.div 
          className="glass-panel fixed bottom-0 left-0 right-0 py-2 px-4 flex justify-around items-center z-10"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex flex-col items-center justify-center p-2",
                location.pathname === link.path && "text-solo-blue"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                location.pathname === link.path 
                  ? "bg-solo-blue/10 border border-solo-blue/30" 
                  : ""
              )}>
                {React.cloneElement(link.icon, { className: "w-5 h-5" })}
              </div>
              <span className="text-xs mt-1">{link.label}</span>
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Layout;
