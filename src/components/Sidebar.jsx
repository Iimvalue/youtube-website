
import {
  User,
  Home,
  PlaySquare,
  History,
  TrendingUp,
  Music,
  Radio,
  Gamepad2,
  Trophy,
  UserPlus,
} from "lucide-react";

export default function Sidebar({ isCollapsed }) {
  const mainNavItems = [
    { icon: Home, label: "Home", active: true },
    { icon: PlaySquare, label: "Shorts" },
    { icon: User, label: "Subscriptions" },
  ];

  const youNavItems = [
    { icon: User, label: "You" },
    { icon: History, label: "History" },
  ];

  const exploreItems = !isCollapsed ? [
    { icon: TrendingUp, label: "Trending" },
    { icon: Music, label: "Music" },
    { icon: Radio, label: "Live" },
    { icon: Gamepad2, label: "Gaming" },
    { icon: Trophy, label: "Sports" },
  ]: [];

  const moreFromYouTube = !isCollapsed ?[
    { icon: PlaySquare, label: "YouTube Premium", hasRedIcon: true },
    { icon: Music, label: "YouTube Music", hasRedIcon: true },
  ]: [];

  const NavItem = ({
    icon: Icon,
    label,
    active = false,
    hasRedIcon = false,
  }) => (
    <div
      className={`flex items-center ${
        isCollapsed ? "justify-center px-2" : "px-3"
      } py-2 rounded-lg cursor-pointer transition-colors ${
        active
          ? "bg-neutral-800 text-white"
          : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
      }`}
    >
      <div
        className={`flex items-center ${
          isCollapsed ? "flex-col space-y-1" : "min-w-0 flex-1"
        }`}
      >
        {hasRedIcon ? (
          <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mr-6">
            <Icon size={14} className="text-white" />
          </div>
        ) : (
          <Icon
            size={20}
            className={`${isCollapsed ? "mr-0" : "mr-6"} flex-shrink-0`}
          />
        )}
        {!isCollapsed && (
          <span className="text-sm font-normal truncate">{label}</span>
        )}
        {isCollapsed && (
          <span className="text-xs font-normal text-center leading-none">
            {label}
          </span>
        )}
      </div>
    </div>
  );

  const SectionTitle = ({ children }) =>
    !isCollapsed && (
      <h3 className="text-white text-base font-medium px-3 py-2">{children}</h3>
    );

  const Divider = () =>
    !isCollapsed && <div className="border-t border-neutral-700 my-3"></div>;



  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-60"
      } h-screen bg-neutral-900 text-neutral-300 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent transition-all duration-300`}
    >
      <div className="p-3">
        <nav className={`${isCollapsed ? "space-y-2" : "space-y-1"}`}>
          {mainNavItems.map((item, index) => (
            <NavItem key={index} {...item} />
          ))}
        </nav>

        <Divider />

        {!isCollapsed && <h3 className="text-white text-base font-medium px-3 py-2">You</h3>}
        <nav className={`${isCollapsed ? "space-y-2" : "space-y-1"}`}>
          {youNavItems.map((item, index) => (
            <NavItem key={index} {...item} />
          ))}
        </nav>


        <Divider />

        {!isCollapsed && <h3 className="text-white text-base font-medium px-3 py-2">Explore</h3>}
        <nav className={`${isCollapsed ? "space-y-2" : "space-y-1"}`}>
          {exploreItems.map((item, index) => (
            <NavItem key={index} {...item} />
          ))}
        </nav>

        <Divider />

        {!isCollapsed && <h3 className="text-white text-base font-medium px-3 py-2">More From Youtube</h3>}
        <nav className={`${isCollapsed ? "space-y-2" : "space-y-1"}`}>
          {moreFromYouTube.map((item, index) => (
            <NavItem key={index} {...item} />
          ))}
        </nav>
      </div>
    </div>
  );
}


