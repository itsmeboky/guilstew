import Home from './pages/Home';
import YourProfile from './pages/YourProfile';
import Play from './pages/Play';
import CharacterLibrary from './pages/CharacterLibrary';
import Campaigns from './pages/Campaigns';
import Workshop from './pages/Workshop';
import TheTavern from './pages/TheTavern';
import Friends from './pages/Friends';
import PIEChart from './pages/PIEChart';
import Settings from './pages/Settings';
import Achievements from './pages/Achievements';
import CharacterAnalytics from './pages/CharacterAnalytics';
import CreateCampaign from './pages/CreateCampaign';
import CampaignView from './pages/CampaignView';
import Landing from './pages/Landing';
import SetupFriends from './pages/SetupFriends';
import UserProfile from './pages/UserProfile';
import WatchLive from './pages/WatchLive';
import CharacterCreator from './pages/CharacterCreator';
import CampaignManagement from './pages/CampaignManagement';
import CampaignNPCs from './pages/CampaignNPCs';
import CampaignItems from './pages/CampaignItems';
import CampaignMaps from './pages/CampaignMaps';
import CampaignWorldLore from './pages/CampaignWorldLore';
import CampaignHomebrew from './pages/CampaignHomebrew';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "YourProfile": YourProfile,
    "Play": Play,
    "CharacterLibrary": CharacterLibrary,
    "Campaigns": Campaigns,
    "Workshop": Workshop,
    "TheTavern": TheTavern,
    "Friends": Friends,
    "PIEChart": PIEChart,
    "Settings": Settings,
    "Achievements": Achievements,
    "CharacterAnalytics": CharacterAnalytics,
    "CreateCampaign": CreateCampaign,
    "CampaignView": CampaignView,
    "Landing": Landing,
    "SetupFriends": SetupFriends,
    "UserProfile": UserProfile,
    "WatchLive": WatchLive,
    "CharacterCreator": CharacterCreator,
    "CampaignManagement": CampaignManagement,
    "CampaignNPCs": CampaignNPCs,
    "CampaignItems": CampaignItems,
    "CampaignMaps": CampaignMaps,
    "CampaignWorldLore": CampaignWorldLore,
    "CampaignHomebrew": CampaignHomebrew,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};