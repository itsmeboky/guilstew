import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Play, Users, Trophy, PieChart, Settings, Beer, LogOut, Plus, Radio, UserPlus, Search, ChevronDown, ChevronRight, CreditCard, Palette, MessageSquare, FileText, HelpCircle, Upload, ShoppingBag, DollarSign, AlertCircle } from "lucide-react";
import ChatPanel from "@/components/chat/ChatPanel";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "sonner";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    account: false,
    creator: false,
    community: false,
    support: false
  });

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me(),
    initialData: null
  });

  const isCreator = user?.email === 'itsmeboky@aetherianstudios.com';

  const topNavItems = [
    { name: "YOUR PROFILE", path: createPageUrl("YourProfile") },
    { name: "CAMPAIGNS", path: createPageUrl("Campaigns") },
    { name: "CHARACTER LIBRARY", path: createPageUrl("CharacterLibrary") },
    { name: "WORKSHOP", path: createPageUrl("Workshop") }
  ];

  const isPlayMode = currentPageName === "Play" || currentPageName === "WatchLive";
  const isHomePage = currentPageName === "Home";

  const playSidebarItems = [
    { name: "Create New", icon: Plus, path: createPageUrl("CreateCampaign") },
    { name: "Watch Live", icon: Radio, path: createPageUrl("WatchLive"), hasIndicator: true },
    { name: "Join Campaign", icon: UserPlus, path: createPageUrl("JoinCampaign") },
    { name: "Search Campaign", icon: Search, path: createPageUrl("SearchCampaign") }
  ];

  const defaultSidebarItems = [
    { name: "Friends", icon: Users, path: createPageUrl("Friends") },
    { name: "Achievements", icon: Trophy, path: createPageUrl("Achievements") },
    { name: "P.I.E. Chart", icon: PieChart, path: createPageUrl("PIEChart") }
  ];

  const homeSidebarSections = [
    {
      id: 'account',
      title: 'Account',
      icon: CreditCard,
      items: [
        { name: 'Subscription', path: createPageUrl('Subscription') },
        { name: 'Guild Management', path: createPageUrl('GuildManagement') },
        { name: 'Billing & Payment', path: createPageUrl('Billing') },
        { name: 'Purchase History', path: createPageUrl('PurchaseHistory') },
        { name: 'Cancel Subscription', path: createPageUrl('CancelSubscription') }
      ]
    },
    ...(isCreator ? [{
      id: 'creator',
      title: 'Creator Dashboard',
      icon: Palette,
      items: [
        { name: 'Upload New', icon: Upload, path: createPageUrl('CreatorUpload') },
        { name: 'Products', icon: ShoppingBag, path: createPageUrl('CreatorProducts') },
        { name: 'Sales', icon: DollarSign, path: createPageUrl('CreatorSales') },
        { name: 'Analytics', icon: PieChart, path: createPageUrl('CreatorAnalytics') }
      ]
    }] : []),
    {
      id: 'community',
      title: 'Community',
      icon: Users,
      items: [
        { name: 'Join our Discord', path: 'https://discord.gg/939YBhYTk9', external: true },
        { name: 'Forum', path: createPageUrl('Forum') }
      ]
    },
    {
      id: 'support',
      title: 'Support',
      icon: HelpCircle,
      items: [
        { name: 'Documentation', path: createPageUrl('Documentation') },
        { name: 'FAQ', path: createPageUrl('FAQ') },
        { name: 'Report a Problem', path: createPageUrl('ReportProblem') }
      ]
    }
  ];

  const sidebarItems = isPlayMode ? playSidebarItems : defaultSidebarItems;

  const isActivePath = (path) => location.pathname === path;

  const handleLogout = () => {
    base44.auth.logout();
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const useDyslexicFont = user?.accessibility_dyslexic_font || false;
  const isDarkMode = user?.accessibility_dark_mode !== false;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#1E2430] text-white' : 'bg-gray-50 text-gray-900'}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=OpenDyslexic&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
        
        @font-face {
          font-family: 'Cream';
          src: url('FONT_URL_HERE') format('opentype');
          font-weight: 600;
          font-style: normal;
        }
        
        body, p, span, div, input, select, textarea, button {
          font-family: ${useDyslexicFont ? "'OpenDyslexic', 'Comic Sans MS', sans-serif" : "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"};
          font-weight: 400;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: ${useDyslexicFont ? "'OpenDyslexic', 'Comic Sans MS', sans-serif" : "'Cream', 'Inter', sans-serif"};
          font-weight: 600;
        }
      `}</style>

      <Toaster position="top-right" expand={false} richColors />

      <header className={`${isDarkMode ? 'bg-[#FF5722]' : 'bg-[#FF5722]'} h-16 flex items-center justify-between px-6 relative z-20`}>
        <Link to={createPageUrl("Home")} className="flex items-center gap-3">
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6917dd35b600199681c5b960/d93253ec3_image.png" 
            alt="Guildstew" 
            className="h-10 w-auto"
          />
        </Link>

        <nav className="flex items-center gap-8">
          {topNavItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`font-bold text-sm tracking-wide transition-colors ${
                isActivePath(item.path) ? "text-white" : "text-white/80 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
          
          <Link
            to={createPageUrl("TheTavern")}
            className="bg-white text-[#FF5722] px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-white/90 transition-colors"
          >
            <Beer className="w-4 h-4" />
            THE TAVERN
          </Link>
        </nav>
      </header>

      <div className="flex">
        <aside className={`w-[240px] ${isDarkMode ? 'bg-[#2A3441]' : 'bg-white border-r border-gray-200'} min-h-[calc(100vh-4rem)] flex flex-col`}>
          <Link
            to={createPageUrl("Play")}
            className="bg-[#37F2D1] text-[#1E2430] font-bold text-lg px-6 py-4 flex items-center gap-3 hover:bg-[#2dd9bd] transition-colors"
          >
            <Play className="w-5 h-5 fill-current" />
            PLAY
          </Link>

          <nav className="flex-1 pt-6 px-3 space-y-1 overflow-y-auto">
            {isHomePage ? (
              homeSidebarSections.map((section) => (
                <div key={section.id} className="mb-2">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      isDarkMode ? 'text-white hover:bg-[#1E2430]/50' : 'text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <section.icon className="w-4 h-4" />
                      <span className="text-sm font-semibold">{section.title}</span>
                    </div>
                    {expandedSections[section.id] ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  
                  {expandedSections[section.id] && (
                    <div className="mt-1 ml-7 space-y-1">
                      {section.items.map((item, idx) => {
                        if (item.external) {
                          return (
                            <a
                              key={idx}
                              href={item.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                                isDarkMode ? 'text-gray-300 hover:bg-[#1E2430]/50' : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              {item.icon && <item.icon className="w-3 h-3" />}
                              {item.name}
                            </a>
                          );
                        }
                        return (
                          <Link
                            key={idx}
                            to={item.path}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                              isActivePath(item.path)
                                ? 'bg-[#37F2D1]/20 text-[#37F2D1]'
                                : isDarkMode ? 'text-gray-300 hover:bg-[#1E2430]/50' : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {item.icon && <item.icon className="w-3 h-3" />}
                            {item.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))
            ) : (
              sidebarItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActivePath(item.path)
                      ? "bg-[#37F2D1]/20 text-[#37F2D1]"
                      : isDarkMode ? "text-gray-300 hover:bg-[#1E2430]/50" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.name}</span>
                  {item.hasIndicator && (
                    <span className="w-2 h-2 bg-red-500 rounded-full ml-auto animate-pulse" />
                  )}
                </Link>
              ))
            )}
          </nav>

          <div className="px-4 pb-6 space-y-2 border-t border-gray-700/50 pt-4">
            <Link
              to={createPageUrl("Settings")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActivePath(createPageUrl("Settings"))
                  ? "bg-[#37F2D1]/20 text-[#37F2D1]"
                  : isDarkMode ? "text-gray-300 hover:bg-[#1E2430]/50" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm">Settings</span>
            </Link>
            <button
              onClick={handleLogout}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isDarkMode ? 'text-gray-300 hover:bg-red-500/20 hover:text-red-400' : 'text-gray-700 hover:bg-red-50 hover:text-red-600'} w-full`}
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </aside>

        <main className="flex-1 relative">
          {children}
        </main>
      </div>

      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#FF5722] rounded-full flex items-center justify-center shadow-lg hover:bg-[#FF6B3D] transition-colors z-30"
      >
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
      </button>

      <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}