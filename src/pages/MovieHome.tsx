import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Play,
  Bookmark,
  Star,
  ChevronRight,
  ChevronLeft,
  Search,
  Menu,
  Info,
  X,
  Zap,
  UserPlus,
  ThumbsUp,
  Heart,
  Share2,
  ArrowDownCircle,
  ArrowUpRight,
  ClipboardList,
  Gift,
  CreditCard,
  Wallet,
  CalendarCheck,
  History,
  ShieldCheck,
  CheckCircle,
  Lock,
  Headphones,
  SlidersHorizontal,
  Flame,
  Film,
  Trophy,
  ExternalLink,
  User,
  MessageSquare,
  FileText,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product, WithdrawalInfo } from '../types';

interface HeroSlide {
  title: string;
  sub: string;
  time: string;
  likes: number;
  loves: number;
  tag?: string;
  poster: string;
  banner: string;
  videoUrl?: string;
  director: string;
  stars: string;
  genre: string[];
  rating: number;
  boxOffice: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    title: "Oppenheimer",
    sub: "Watch the Official 4K Trailer",
    time: "3:06",
    likes: 421,
    loves: 318,
    poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1600&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    director: "Christopher Nolan",
    stars: "Cillian Murphy, Emily Blunt, Matt Damon",
    genre: ["Biography", "Drama", "History"],
    rating: 8.9,
    boxOffice: "$957.8M",
  },
  {
    title: "Dune: Part Two",
    sub: "Watch the IMAX Teaser Trailer",
    time: "2:24",
    likes: 512,
    loves: 460,
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    director: "Denis Villeneuve",
    stars: "Timothée Chalamet, Zendaya, Rebecca Ferguson",
    genre: ["Action", "Adventure", "Sci-Fi"],
    rating: 8.7,
    boxOffice: "$714.4M",
  },
  {
    title: "Interstellar",
    sub: "Relive the Space Odyssey",
    time: "2:32",
    likes: 689,
    loves: 590,
    poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    director: "Christopher Nolan",
    stars: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
    genre: ["Adventure", "Drama", "Sci-Fi"],
    rating: 8.7,
    boxOffice: "$773.9M",
  },
  {
    title: "Inception",
    sub: "Your Mind is the Scene of the Crime",
    time: "2:10",
    likes: 820,
    loves: 710,
    poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    director: "Christopher Nolan",
    stars: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page",
    genre: ["Action", "Adventure", "Sci-Fi"],
    rating: 8.8,
    boxOffice: "$839.0M",
  },
];

const FEATURED_EDITORIALS = [
  {
    badge: "☰ Guide",
    title: "The 25 Most Anticipated Summer Blockbusters of 2026",
    link: "Browse the full editorial guide",
    image: "/img/feature-img.jpg",
    fallback: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=600&auto=format&fit=crop&q=80",
  },
  {
    badge: "📷 Gallery",
    title: "San Diego Comic-Con 2026: Exclusive Red Carpet & Cosplay Photos",
    link: "Explore 120 high-res photos",
    image: "/img/feature-img2.jpg",
    fallback: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=600&auto=format&fit=crop&q=80",
  },
  {
    badge: "☰ Special",
    title: "Oscars 2026 Predictions: Early Frontrunners & Academy Favorites",
    link: "See our expert analysis",
    image: "/img/feature-img3.jpg",
    fallback: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80",
  },
  {
    badge: "🎬 Behind the Scenes",
    title: "Directing Masterclass: How Nolan and Villeneuve Reinvented Sci-Fi",
    link: "Read filmmaker interviews",
    image: "/img/feature-img4.jpg",
    fallback: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&auto=format&fit=crop&q=80",
  },
];

const TRENDING_STARS = [
  { rank: 1, delta: "1,015", dir: "up", name: "Cillian Murphy", role: "J. Robert Oppenheimer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80" },
  { rank: 2, delta: "1", dir: "up", name: "Christopher Nolan", role: "Director & Screenwriter", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80" },
  { rank: 3, delta: "2", dir: "down", name: "Zendaya", role: "Chani / Dune", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80" },
  { rank: 4, delta: "1", dir: "up", name: "Timothée Chalamet", role: "Paul Atreides", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80" },
  { rank: 5, delta: "2", dir: "down", name: "Margot Robbie", role: "Barbie / Producer", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80" },
  { rank: 6, delta: "2", dir: "down", name: "Ryan Gosling", role: "Ken / The Fall Guy", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&auto=format&fit=crop&q=80" },
  { rank: 7, delta: "11,119", dir: "up", name: "Florence Pugh", role: "Jean Tatlock", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&auto=format&fit=crop&q=80" },
];

const BORN_TODAY = [
  { name: "Stanley Kubrick", age: "1928–1999", title: "Legendary Director", image: "/img/person2.jpg", fallback: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80" },
  { name: "Sandra Bullock", age: "61", title: "Academy Award Winner", image: "/img/person.jpg", fallback: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80" },
  { name: "Helen Mirren", age: "80", title: "Oscar-Winning Actress", image: "/img/person4.jpg", fallback: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80" },
  { name: "Jason Statham", age: "58", title: "Action Star", image: "/img/person1.jpg", fallback: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80" },
  { name: "Kate Beckinsale", age: "52", title: "Actress & Producer", image: "/img/person7.jpg", fallback: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&auto=format&fit=crop&q=80" },
  { name: "Taylor Momsen", age: "32", title: "Musician & Actress", image: "/img/person5.jpg", fallback: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80" },
];

const TOP_BOX_OFFICE = [
  { rank: 1, title: "Deadpool & Wolverine", weekend: "$211.4M", gross: "$1.337B", weeks: 10 },
  { rank: 2, title: "Inside Out 2", weekend: "$154.2M", gross: "$1.698B", weeks: 16 },
  { rank: 3, title: "Dune: Part Two", weekend: "$82.5M", gross: "$714.4M", weeks: 14 },
  { rank: 4, title: "Oppenheimer", weekend: "$80.5M", gross: "$957.8M", weeks: 22 },
  { rank: 5, title: "Twisters", weekend: "$81.2M", gross: "$372.3M", weeks: 11 },
];

const TOP_NEWS = [
  {
    title: "Christopher Nolan's Next Epic Confirmed for IMAX Summer 2026 Release",
    snippet: "Universal Pictures has officially announced the global release date for Nolan's undisclosed next project, promising cutting-edge film technology.",
    source: "Variety · Film News",
    time: "2 hours ago",
    image: "/img/top.jpg",
    fallback: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Denis Villeneuve Begins Writing 'Dune: Messiah' with Principal Cast Returning",
    snippet: "Following monumental worldwide critical and box office success, Warner Bros. and Legendary greenlight the concluding chapter of the Arrakis trilogy.",
    source: "The Hollywood Reporter",
    time: "4 hours ago",
    image: "/img/top1.jpg",
    fallback: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Global Box Office Reaches Record High Driven by Premium Large Format Theaters",
    snippet: "Cinema audiences are turning out in unprecedented numbers for IMAX, 70mm, and Dolby Cinema screenings across North America, Europe, and Asia.",
    source: "Deadline · Box Office",
    time: "6 hours ago",
    image: "/img/top3.jpg",
    fallback: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80",
  },
];

const GENRES = [
  "All",
  "Action",
  "Adventure",
  "Sci-Fi",
  "Drama",
  "Biography",
  "Crime",
  "Thriller",
  "Animation",
];

export const MovieHome: React.FC = () => {
  const navigate = useNavigate();
  const {
    user,
    products,
    setCurrentProduct,
    submitCurrentOrder,
    submitWithdrawal,
    rechargeBalance,
    updateWithdrawalAddress,
    setWithdrawPassword,
    claimDailyCheckIn,
    orderRecords,
    transactions,
    showToast,
  } = useApp();

  // Navigation & Carousel states
  const [currentSlide, setCurrentSlide] = useState(0);
  const [likes, setLikes] = useState<number[]>(HERO_SLIDES.map((s) => s.likes));
  const [loves, setLoves] = useState<number[]>(HERO_SLIDES.map((s) => s.loves));
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [categoryMenuExpanded, setCategoryMenuExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"rating" | "year" | "boxOffice" | "title">("rating");

  // Watchlist & User Ratings
  const [watchlist, setWatchlist] = useState<string[]>([
    "plex-mov-001",
    "plex-mov-002",
    "plex-mov-003",
  ]);
  const [userRatings, setUserRatings] = useState<Record<string, number>>({
    "plex-mov-001": 10,
    "plex-mov-002": 9,
  });

  // Modals for ALL Movie Features & Task Operations
  const [activeVideoModal, setActiveVideoModal] = useState<HeroSlide | null>(null);
  const [selectedMovieDetail, setSelectedMovieDetail] = useState<Product | null>(null);
  const [watchlistModalOpen, setWatchlistModalOpen] = useState(false);
  const [ratingModalMovie, setRatingModalMovie] = useState<Product | null>(null);
  const [tempRating, setTempRating] = useState(10);

  // Operations Modals (PLEX operations right inside PLEX!)
  const [actionsExpanded, setActionsExpanded] = useState(true);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [taskSnatchModalOpen, setTaskSnatchModalOpen] = useState(false);
  const [taskReviewModalOpen, setTaskReviewModalOpen] = useState(false);
  const [snatchingMovie, setSnatchingMovie] = useState<Product | null>(null);
  const [bindAccountModalOpen, setBindAccountModalOpen] = useState(false);
  const [setPinModalOpen, setSetPinModalOpen] = useState(false);
  const [dailyCheckInModalOpen, setDailyCheckInModalOpen] = useState(false);
  const [accountHistoryModalOpen, setAccountHistoryModalOpen] = useState(false);
  const [honorScoreModalOpen, setHonorScoreModalOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [navMenuOpen, setNavMenuOpen] = useState(false);

  // Withdrawal form states
  const [withdrawAmount, setWithdrawAmount] = useState<string>('5000');
  const [withdrawMethod, setWithdrawMethod] = useState<'bKash' | 'Nagad' | 'Rocket' | 'Bank' | 'USDT'>('bKash');
  const [withdrawPin, setWithdrawPin] = useState('');
  const [withdrawLoading, setWithdrawLoading] = useState(false);

  // Deposit form states
  const [depositAmount, setDepositAmount] = useState<string>('10000');
  const [depositMethod, setDepositMethod] = useState<'bKash' | 'Nagad' | 'USDT' | 'Bank'>('bKash');
  const [depositLoading, setDepositLoading] = useState(false);

  // Bind Account form states
  const [bindName, setBindName] = useState(user.withdrawalAddressAndMethod?.name || user.name);
  const [bindChannel, setBindChannel] = useState<'bKash' | 'Nagad' | 'Rocket' | 'Bank'>(
    (user.withdrawalAddressAndMethod?.mobileBankingName as any) || 'bKash'
  );
  const [bindAccountNum, setBindAccountNum] = useState(
    user.withdrawalAddressAndMethod?.mobileBankingAccountNumber ||
      user.withdrawalAddressAndMethod?.bankAccountNumber ||
      '01712345678'
  );
  const [bindDistrict, setBindDistrict] = useState(user.withdrawalAddressAndMethod?.mobileUserDistrict || 'Dhaka');

  // PIN setup form state
  const [newPin, setNewPin] = useState('');
  const [confirmNewPin, setConfirmNewPin] = useState('');

  // Refs for smooth scroll
  const featuredRef = useRef<HTMLDivElement>(null);
  const catalogRef = useRef<HTMLDivElement>(null);
  const bornRef = useRef<HTMLDivElement>(null);

  const currentHero = HERO_SLIDES[currentSlide];

  // Filter products by genre & search
  const filteredProducts = products.filter((p) => {
    const matchesGenre = selectedGenre === "All" || p.genre.includes(selectedGenre);
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.stars.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "year") return b.year - a.year;
    if (sortBy === "title") return a.name.localeCompare(b.name);
    return (b.price || 0) - (a.price || 0);
  });

  const toggleWatchlist = (id: string, name: string) => {
    setWatchlist((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast(`Removed "${name}" from Watchlist`);
        return prev.filter((item) => item !== id);
      } else {
        showToast(`Added "${name}" to Watchlist!`);
        return [...prev, id];
      }
    });
  };

  const handleOpenRating = (movie: Product) => {
    setRatingModalMovie(movie);
    setTempRating(userRatings[movie.productId] || 10);
  };

  const handleSaveRating = () => {
    if (ratingModalMovie) {
      setUserRatings((prev) => ({
        ...prev,
        [ratingModalMovie.productId]: tempRating,
      }));
      showToast(`Rated "${ratingModalMovie.name}" ${tempRating}/10 stars!`);
      setRatingModalMovie(null);
    }
  };

  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, offset: number) => {
    if (ref.current) {
      ref.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // --- Task Grabbing & Review operations directly inside PLEX ---
  const handleInitiateTask = (movie: Product) => {
    setSnatchingMovie(movie);
    setCurrentProduct(movie);
    setTaskSnatchModalOpen(true);

    // Simulate real-time matching
    setTimeout(() => {
      setTaskSnatchModalOpen(false);
      setTaskReviewModalOpen(true);
    }, 1800);
  };

  const handleConfirmTaskReview = async () => {
    if (!snatchingMovie) return;
    const res = await submitCurrentOrder();
    setTaskReviewModalOpen(false);
    if (res.success) {
      showToast(`Task for "${snatchingMovie.name}" completed! Profit added to your balance.`);
    }
  };

  // --- Direct Withdrawal operation inside PLEX ---
  const handleExecuteWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountVal = parseFloat(withdrawAmount);
    if (!amountVal || amountVal <= 0) {
      showToast('Please enter a valid withdrawal amount', 'error');
      return;
    }
    if (amountVal > user.userBalance) {
      showToast('Withdrawal amount exceeds your available balance', 'error');
      return;
    }
    if (!user.withdrawalAddressAndMethod) {
      showToast('Please bind your withdrawal account first', 'error');
      setWithdrawModalOpen(false);
      setBindAccountModalOpen(true);
      return;
    }
    if (!withdrawPin) {
      showToast('Please enter your 6-digit withdrawal security PIN', 'error');
      return;
    }

    setWithdrawLoading(true);
    const res = await submitWithdrawal(amountVal, withdrawPin);
    setWithdrawLoading(false);

    if (res.success) {
      setWithdrawModalOpen(false);
      setWithdrawPin('');
    } else {
      showToast(res.message, 'error');
    }
  };

  // --- Direct Deposit operation inside PLEX ---
  const handleExecuteDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountVal = parseFloat(depositAmount);
    if (!amountVal || amountVal <= 0) {
      showToast('Please enter a valid recharge amount', 'error');
      return;
    }
    setDepositLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    await rechargeBalance(amountVal, depositMethod);
    setDepositLoading(false);
    setDepositModalOpen(false);
  };

  // --- Direct Bind Account operation inside PLEX ---
  const handleSaveBindAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bindName.trim() || !bindAccountNum.trim()) {
      showToast('Please fill out account name and number', 'error');
      return;
    }
    const info: WithdrawalInfo = {
      withdrawMethod: 'MobileBanking',
      name: bindName,
      mobileBankingName: bindChannel,
      mobileBankingAccountNumber: bindAccountNum,
      mobileUserDistrict: bindDistrict,
    };
    await updateWithdrawalAddress(info);
    setBindAccountModalOpen(false);
  };

  // --- Direct Security PIN Setup operation inside PLEX ---
  const handleSavePin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length < 6) {
      showToast('Withdrawal PIN must be 6 digits', 'error');
      return;
    }
    if (newPin !== confirmNewPin) {
      showToast('PIN confirmation does not match', 'error');
      return;
    }
    await setWithdrawPassword(newPin);
    setSetPinModalOpen(false);
    setNewPin('');
    setConfirmNewPin('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24 selection:bg-[#f5c518] selection:text-black">
      {/* 1. Official PLEX Header - Matching Screenshot 2 exactly */}
      <header className="sticky top-0 z-40 bg-[#121212] px-3 sm:px-6 py-3 flex items-center justify-between border-b border-[#2c2c2c] shadow-md select-none text-white">
        {/* Left side: Logo & VIP Badge */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="bg-[#f5c518] text-black font-black text-xs sm:text-sm px-2.5 py-1 rounded tracking-tighter hover:bg-amber-400 transition-colors uppercase font-mono"
          >
            PLEX
          </Link>
          <div
            onClick={() => setHonorScoreModalOpen(true)}
            className="bg-amber-500/10 border border-amber-500/30 text-[#f5c518] font-extrabold px-2 py-0.5 rounded text-[10px] sm:text-xs tracking-tight cursor-pointer hover:bg-amber-500/20 transition-colors"
            title="Your Current Tier: VIP 1 (0.5%)"
          >
            VIP 1 (0.5%)
          </div>
        </div>

        {/* Search Input (Hidden on mobile to match Screenshot 2 layout) */}
        <div className="hidden md:flex items-center max-w-xs bg-[#1c1c1c] border border-neutral-800 rounded-full px-3 py-1 flex-1 mx-4">
          <input
            type="text"
            placeholder="Search films..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs text-white placeholder-gray-500 outline-none w-full"
          />
          <Search className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
        </div>

        {/* Right side: Phone/User + Balance Details & Notifications */}
        <div className="flex items-center gap-3 text-xs sm:text-sm">
          {/* Menu button */}
          <button
            onClick={() => setNavMenuOpen(true)}
            className="flex items-center gap-1 hover:bg-neutral-800 border border-neutral-800 px-2 py-1 rounded-md text-gray-300 text-xs transition-colors cursor-pointer"
          >
            <Menu className="w-3.5 h-3.5 text-[#f5c518]" />
            <span className="hidden sm:inline">Menu</span>
          </button>

          {/* Phone Display with wallet icon */}
          <div className="flex items-center gap-1 text-gray-300 font-mono text-[10px] sm:text-xs bg-[#1c1c1c] border border-neutral-800 px-2 py-1.5 rounded-lg shadow-inner">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{user.phoneNumber}</span>
          </div>

          {/* Notifications bell */}
          <div
            className="relative p-1.5 bg-[#1c1c1c] rounded-lg border border-neutral-800 cursor-pointer hover:bg-neutral-800 transition-colors"
            onClick={() => navigate('/event')}
            title="Platform Notifications"
          >
            <span className="absolute top-1 right-1 flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
            </span>
            <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
        </div>
      </header>

      {/* 1.5 Live Daily Announcements & Updates Carousel (Rotating Daily Stats and Milestones) */}
      <section className="bg-[#121212] border-b border-[#2c2c2c] px-3 sm:px-6 py-3.5">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-[#161b22]/30 border border-neutral-800/80 rounded-xl p-4 overflow-hidden backdrop-blur-md shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            
            {/* Auto-sliding local engine wrapper */}
            {(() => {
              const carouselUpdates = [
                {
                  title: "DAILY TRANSACTION VOLUMES",
                  val: "৳45,294,180.00",
                  desc: "Verified platform liquidity cleared successfully across PLEX mobile node gateways.",
                  tag: "LIVE LEDGER",
                  tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                },
                {
                  title: "RECENT WALLET DISBURSEMENT",
                  val: "User_8491028 ➔ ৳18,500.00",
                  desc: "Withdrawal successfully audited, manually released, and confirmed on bKash network.",
                  tag: "VERIFIED PAYOUT",
                  tagColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                },
                {
                  title: "ACTIVE MULTIPLIER ALERT",
                  val: "Oppenheimer (12x FLIPBOX)",
                  desc: "12x continuous profit multiplier has been assigned to the live pool. Snatched orders gain maximum commissions.",
                  tag: "CAMPAIGN ALERT",
                  tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/20"
                },
                {
                  title: "PLATFORM MILESTONE REACHED",
                  val: "18,485 Active Reviewers",
                  desc: "A record-breaking volume of independent media reviewers are active. Platform node latency: 28ms.",
                  tag: "SYSTEM STATUS",
                  tagColor: "bg-purple-500/10 text-purple-400 border-purple-500/20"
                }
              ];

              const [currentIndex, setCurrentIndex] = React.useState(0);

              React.useEffect(() => {
                const interval = setInterval(() => {
                  setCurrentIndex((prev) => (prev + 1) % carouselUpdates.length);
                }, 4000);
                return () => clearInterval(interval);
              }, []);

              const current = carouselUpdates[currentIndex];

              return (
                <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition-all duration-300">
                  {/* Slide Content Left */}
                  <div className="flex-1 space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-black tracking-widest px-2 py-0.5 rounded border ${current.tagColor}`}>
                        {current.tag}
                      </span>
                      <span className="text-[10px] font-bold text-gray-500 tracking-wider font-mono">
                        SLIDE {currentIndex + 1} OF {carouselUpdates.length}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-baseline gap-2">
                      <h3 className="text-xs font-black text-gray-400 tracking-wider uppercase">
                        {current.title}:
                      </h3>
                      <span className="text-sm font-black text-white font-mono tracking-tight glow-sm bg-[#1a2338]/40 border border-blue-500/20 px-2 py-0.5 rounded">
                        {current.val}
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 leading-relaxed max-w-2xl truncate sm:whitespace-normal">
                      {current.desc}
                    </p>
                  </div>

                  {/* Slide Manual Controls Right */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <div className="flex gap-1">
                      {carouselUpdates.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            idx === currentIndex
                              ? 'bg-amber-400 w-4 shadow-sm shadow-amber-400/50'
                              : 'bg-neutral-700 hover:bg-neutral-600'
                          }`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <div className="flex gap-1 border-l border-neutral-800 pl-2">
                      <button
                        onClick={() => setCurrentIndex((prev) => (prev - 1 + carouselUpdates.length) % carouselUpdates.length)}
                        className="p-1 hover:bg-neutral-800 rounded text-gray-400 hover:text-white transition-colors cursor-pointer"
                        title="Previous Update"
                      >
                        ◀
                      </button>
                      <button
                        onClick={() => setCurrentIndex((prev) => (prev + 1) % carouselUpdates.length)}
                        className="p-1 hover:bg-neutral-800 rounded text-gray-400 hover:text-white transition-colors cursor-pointer"
                        title="Next Update"
                      >
                        ▶
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}

          </div>
        </div>
      </section>

      {/* 2. Unified Operations Control Bar (100% Identical to Image 3) */}
      <section className="bg-[#121212] border-b border-[#2c2c2c] px-4 sm:px-6 py-5">
        <div className="max-w-md mx-auto space-y-4">
          
          {/* Dashboard Sub-Header (Matches Top bar in Image 3) */}
          <div className="flex items-center justify-between text-xs text-white">
            <div className="flex items-center gap-2">
              {/* Brand Label */}
              <div className="bg-[#f5c518] text-black font-black px-2.5 py-1 rounded text-xs tracking-tight shadow-sm uppercase">
                PLEX
              </div>
              {/* VIP Indicator */}
              <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 font-extrabold px-2.5 py-0.5 rounded text-[10px] tracking-tight">
                VIP 1 (0.5%)
              </div>
            </div>

            {/* Right side contact & notifications */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-gray-400 font-mono text-[10px] bg-[#1c1c1c] border border-neutral-800 px-2 py-1 rounded-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>+880 1712345678</span>
              </div>
              <div className="relative p-1 bg-[#1c1c1c] rounded-md border border-neutral-800">
                <span className="absolute top-1 right-1 flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                </span>
                <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
            </div>
          </div>

          {/* Main Dark Card (Matches Total Asset Balance Card in Image 3) */}
          <div className="bg-[#1c1c1c] border border-neutral-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="font-bold tracking-wide">Total Asset Balance</span>
              <span className="bg-[#f5c518]/10 text-[#f5c518] border border-[#f5c518]/20 font-bold px-2 py-0.5 rounded-full text-[10px]">
                Daily Quota: {user.completedOrdersCount}/{user.quantityOfOrders}
              </span>
            </div>

            {/* Large Yellow Currency Display */}
            <div className="text-3xl font-black text-[#f5c518] font-mono tracking-tight text-left">
              ৳{user.userBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })} <span className="text-[10px] text-gray-500 font-sans font-bold">BDT</span>
            </div>

            {/* Bottom Row inside Asset Card */}
            <div className="grid grid-cols-2 gap-4 border-t border-neutral-800/80 pt-3 text-left">
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Today Earnings</p>
                <p className="text-sm font-black text-emerald-400 font-mono mt-0.5">+৳{user.dailyProfit.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Commission Rate</p>
                <p className="text-sm font-black text-[#f5c518] mt-0.5">0.5% (VIP 1)</p>
              </div>
            </div>
          </div>

          {/* The 4 Solid Buttons Grid (Matches Deposit, Withdraw, Tasks, Lucky Box in Image 3) */}
          <div className="grid grid-cols-4 gap-2">
            
            {/* 1. Deposit Button */}
            <button
              onClick={() => setDepositModalOpen(true)}
              type="button"
              className="bg-[#f5c518] hover:bg-amber-400 text-black p-2.5 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-md font-bold"
            >
              <CreditCard className="w-5 h-5 text-black" />
              <span className="text-[10px] font-black uppercase tracking-tight">Deposit</span>
            </button>

            {/* 2. Withdraw Button */}
            <button
              onClick={() => setWithdrawModalOpen(true)}
              type="button"
              className="bg-[#242424] hover:bg-[#2c2c2c] text-white p-2.5 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-md border border-neutral-800 font-bold"
            >
              <ArrowUpRight className="w-5 h-5 text-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-tight">Withdraw</span>
            </button>

            {/* 3. Tasks Button */}
            <button
              onClick={() => navigate('/task')}
              type="button"
              className="bg-[#242424] hover:bg-[#2c2c2c] text-white p-2.5 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-md border border-neutral-800 font-bold"
            >
              <ClipboardList className="w-5 h-5 text-cyan-400" />
              <span className="text-[10px] font-black uppercase tracking-tight">Tasks</span>
            </button>

            {/* 4. Lucky Box Button */}
            <button
              onClick={() => setDailyCheckInModalOpen(true)}
              type="button"
              className="bg-[#d84e43] hover:bg-red-500 text-white p-2.5 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-md font-bold"
            >
              <Gift className="w-5 h-5 text-white" />
              <span className="text-[10px] font-black uppercase tracking-tight">Lucky Box</span>
            </button>

          </div>

          {/* Golden scrolling notice banner (Matches bottom bar in Image 3) */}
          <div className="bg-[#fdfaf2] border border-[#f5cc98] rounded-lg p-2.5 flex items-center gap-2 shadow-2xs text-left">
            <span className="w-4 h-4 rounded-full bg-[#f5c518] flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] text-black">✨</span>
            </span>
            <p className="text-[10px] sm:text-xs text-amber-900 font-extrabold leading-snug">
              Rate films to earn daily VIP commission (0.5% per order)!
            </p>
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-10">

        {/* 4. Category & Genre Filter Tabs */}
        <section className="space-y-3" ref={catalogRef}>
          {/* Genre Pills with Sci-Fi Collapsible Control */}
          <div className="border border-neutral-200 bg-white rounded-xl p-3.5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span className="font-extrabold uppercase tracking-widest text-slate-800">PLEX Category Channels</span>
              </div>
              <button
                type="button"
                onClick={() => setCategoryMenuExpanded(!categoryMenuExpanded)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-[#d4af37] text-[10px] font-black uppercase tracking-wider border border-slate-200 cursor-pointer transition-all"
              >
                <span>{categoryMenuExpanded ? 'Collapse Channels [▲]' : 'Expand Channels [▼]'}</span>
              </button>
            </div>

            <div className={`transition-all duration-300 overflow-hidden ${categoryMenuExpanded ? 'max-h-[300px] opacity-100' : 'max-h-[44px] overflow-x-auto no-scrollbar opacity-90'}`}>
              <div className="flex flex-wrap gap-2 text-xs">
                {GENRES.map((genre) => {
                  const isSelected = selectedGenre === genre;
                  if (!categoryMenuExpanded && !isSelected) return null; // Only show active when collapsed
                  return (
                    <button
                      key={genre}
                      onClick={() => setSelectedGenre(genre)}
                      className={`px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer whitespace-nowrap ${
                        isSelected
                          ? 'bg-[#f5c518] text-black font-extrabold shadow-sm'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {genre}
                    </button>
                  );
                })}
                {!categoryMenuExpanded && (
                  <button
                    onClick={() => setCategoryMenuExpanded(true)}
                    className="px-3.5 py-1.5 rounded-full bg-slate-100 text-amber-600 border border-slate-200 font-bold hover:text-slate-900"
                  >
                    + View More Genres
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Recommended Reviews - Vertical List as shown in Screenshot 2 */}
        <section className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#f5c518] rounded-full inline-block" />
              <span>Recommended Reviews</span>
            </h2>
            <button
              onClick={() => showToast(`Showing all ${filteredProducts.length} movies...`)}
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-0.5"
            >
              <span>View all</span>
              <span>›</span>
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredProducts.map((movie, idx) => {
              const isBookmarked = watchlist.includes(movie.productId);
              const userRating = userRatings[movie.productId];

              // Determine review task descriptor based on index
              const taskTypes = [
                'Junior Review Task',
                'Standard Review Task',
                'Intermediate Review Task',
                'Advanced Review Task',
                'Master Review Task'
              ];
              const taskType = taskTypes[idx % taskTypes.length];

              return (
                <div
                  key={movie.productId}
                  className="py-4 flex items-center justify-between gap-3 text-left first:pt-0 last:pb-0"
                >
                  {/* Left: Poster Image */}
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <div className="relative w-16 h-20 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                      <img
                        src={movie.poster}
                        alt={movie.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Middle: Details */}
                    <div className="flex-1 min-w-0">
                      <h3
                        onClick={() => setSelectedMovieDetail(movie)}
                        className="text-sm font-extrabold text-gray-900 truncate hover:text-amber-600 cursor-pointer flex items-center gap-1.5"
                      >
                        <span>#{idx + 1}</span>
                        <span>{movie.name}</span>
                      </h3>
                      
                      <p className="text-[11px] text-gray-400 font-semibold mt-0.5">
                        {taskType} · {movie.year}
                      </p>

                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-xs">
                        <span className="font-bold text-gray-500">Order:</span>
                        <span className="font-mono text-gray-900 font-bold">
                          ৳{movie.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                        <span className="text-gray-300">|</span>
                        <span className="font-mono text-emerald-600 font-bold">
                          +৳{movie.commission.toLocaleString('en-US', { minimumFractionDigits: 2 })} (0.5%)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Action Rate Button */}
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => handleInitiateTask(movie)}
                      className="px-4 py-2 bg-[#f5c518] hover:bg-amber-400 text-black font-extrabold text-xs rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer uppercase tracking-wider"
                    >
                      Rate
                    </button>
                    
                    {userRating && (
                      <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-0.5">
                        ★ {userRating}★
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 6. Featured Editorials & San Diego Comic-Con Spotlight */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#f5c518] rounded-full inline-block" />
              <span>Featured Today</span>
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => scrollContainer(featuredRef, -320)}
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollContainer(featuredRef, 320)}
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={featuredRef}
            className="flex gap-4 overflow-x-auto no-scrollbar pb-2 scroll-smooth"
          >
            {FEATURED_EDITORIALS.map((card, i) => (
              <div
                key={i}
                className="w-72 sm:w-80 flex-shrink-0 bg-[#121212] rounded-xl overflow-hidden border border-neutral-800 group cursor-pointer hover:border-neutral-600 transition-all"
                onClick={() => showToast(`Opening editorial: ${card.title}`)}
              >
                <div className="relative aspect-16/10 overflow-hidden bg-neutral-800">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = card.fallback;
                    }}
                  />
                  <span className="absolute top-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                    {card.badge}
                  </span>
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="text-sm font-bold text-white line-clamp-2 group-hover:text-[#f5c518] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-blue-400 hover:underline">{card.link}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Weekend Box Office Top 5 & Top News Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Top Box Office (5 cols) */}
          <div className="lg:col-span-5 bg-[#121212] border border-neutral-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#f5c518]" />
                <span>Top Box Office</span>
              </h3>
              <span className="text-xs text-neutral-400">Weekend Worldwide</span>
            </div>

            <div className="divide-y divide-neutral-800/80">
              {TOP_BOX_OFFICE.map((item) => (
                <div key={item.rank} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-base font-bold text-neutral-400 w-4">
                      {item.rank}
                    </span>
                    <div>
                      <div className="font-bold text-white text-sm hover:text-[#f5c518] cursor-pointer">
                        {item.title}
                      </div>
                      <div className="text-neutral-500 text-[11px]">
                        Weekend: {item.weekend} · {item.weeks} wks
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-emerald-400 font-mono text-sm">{item.gross}</div>
                    <div className="text-[10px] text-neutral-500">Gross to Date</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Entertainment News (7 cols) */}
          <div className="lg:col-span-7 bg-[#121212] border border-neutral-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-500" />
                <span>Top Entertainment News</span>
              </h3>
              <span className="text-xs text-blue-400 cursor-pointer hover:underline">All News ›</span>
            </div>

            <div className="space-y-4">
              {TOP_NEWS.map((news, i) => (
                <div
                  key={i}
                  className="flex gap-4 group cursor-pointer hover:bg-neutral-800/50 p-2 rounded-lg transition-colors"
                  onClick={() => showToast(`Reading: ${news.title}`)}
                >
                  <div className="w-24 sm:w-28 aspect-16/10 rounded overflow-hidden bg-neutral-800 flex-shrink-0">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = news.fallback;
                      }}
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="text-sm font-bold text-white group-hover:text-[#f5c518] transition-colors leading-snug">
                      {news.title}
                    </h4>
                    <p className="text-xs text-neutral-400 line-clamp-2">{news.snippet}</p>
                    <div className="text-[11px] text-neutral-500 font-mono">
                      {news.source} · {news.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Trending People & Born Today Carousel */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#f5c518] rounded-full inline-block" />
              <span>Trending Stars & Celebrities</span>
            </h2>
            <span className="text-xs text-neutral-400">STARmeter Weekly</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {TRENDING_STARS.map((star) => (
              <div
                key={star.name}
                className="bg-[#121212] border border-neutral-800 rounded-xl p-3 flex flex-col items-center text-center group hover:border-[#f5c518]/50 transition-all cursor-pointer"
                onClick={() => showToast(`Celebrity Profile: ${star.name}`)}
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-2 border-2 border-neutral-700 group-hover:border-[#f5c518] transition-colors">
                  <img src={star.image} alt={star.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-[11px] text-neutral-400 font-mono">
                  #{star.rank}{' '}
                  <span className={star.dir === 'up' ? 'text-green-400' : 'text-red-400'}>
                    {star.dir === 'up' ? '▲' : '▼'} {star.delta}
                  </span>
                </div>
                <div className="text-xs font-bold text-white mt-1 group-hover:text-[#f5c518] transition-colors truncate w-full">
                  {star.name}
                </div>
                <div className="text-[10px] text-neutral-500 truncate w-full">{star.role}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 9. Born Today Carousel */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#f5c518] rounded-full inline-block" />
                <span>Born Today</span>
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">Celebrity birthdays celebrated today</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scrollContainer(bornRef, -240)}
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollContainer(bornRef, 240)}
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={bornRef}
            className="flex gap-4 overflow-x-auto no-scrollbar pb-2 scroll-smooth"
          >
            {BORN_TODAY.map((person) => (
              <div
                key={person.name}
                className="w-36 flex-shrink-0 bg-[#121212] border border-neutral-800 rounded-xl p-3 flex flex-col items-center text-center hover:border-neutral-600 transition-all cursor-pointer group"
                onClick={() => showToast(`${person.name} (${person.age}) details`)}
              >
                <div className="relative w-18 h-18 rounded-full overflow-hidden mb-2 bg-neutral-800 border-2 border-neutral-700 group-hover:border-[#f5c518]">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = person.fallback;
                    }}
                  />
                </div>
                <div className="text-xs font-bold text-white group-hover:text-[#f5c518] transition-colors truncate w-full">
                  {person.name}
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5">{person.age}</div>
                <div className="text-[10px] text-neutral-500 truncate w-full">{person.title}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 10. Financial Operations Callout: Seamless Tasks & Instant Withdrawals */}
        <section className="bg-gradient-to-r from-neutral-900 via-[#161c24] to-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#f5c518] text-black font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            <span>PLEX Verified Operations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Watch Movies, Review Releases, and Withdraw Cash Instantly
          </h2>
          <p className="text-sm text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            All media engagement orders are verified with continuous profit multipliers. Settle commissions directly into your mobile wallet (bKash, Nagad, Rocket) or bank account anytime.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setWithdrawModalOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <ArrowDownCircle className="w-4 h-4" />
              <span>Withdraw Balance (৳{user.userBalance.toLocaleString()})</span>
            </button>
            <button
              onClick={() => handleInitiateTask(products[0])}
              className="bg-[#f5c518] hover:bg-amber-400 text-black font-bold px-6 py-2.5 rounded-xl text-sm transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>Snatch Movie Task</span>
            </button>
            <button
              onClick={() => setDepositModalOpen(true)}
              className="bg-neutral-800 hover:bg-neutral-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all border border-neutral-700 flex items-center gap-1.5 cursor-pointer"
            >
              <CreditCard className="w-4 h-4 text-blue-400" />
              <span>Recharge</span>
            </button>
          </div>
        </section>
      </main>

      {/* 11. Official PLEX Footer */}
      <footer className="border-t border-neutral-800 bg-[#121212] mt-16 py-12 px-4 sm:px-8 text-center text-xs text-neutral-400 space-y-6">
        <div className="flex flex-wrap items-center justify-center gap-8 text-neutral-300 text-sm font-semibold">
          <div className="flex items-center gap-4">
            <span>Follow PLEX:</span>
            <span className="hover:text-[#f5c518] cursor-pointer">TikTok</span>
            <span className="hover:text-[#f5c518] cursor-pointer">Instagram</span>
            <span className="hover:text-[#f5c518] cursor-pointer">Twitter / X</span>
            <span className="hover:text-[#f5c518] cursor-pointer">YouTube</span>
            <span className="hover:text-[#f5c518] cursor-pointer">Facebook</span>
          </div>

          <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>PLEX App Available on Android & iOS</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-neutral-400 max-w-3xl mx-auto">
          <button onClick={() => setSupportModalOpen(true)} className="hover:text-white cursor-pointer">Help Center</button>
          <a href="#" className="hover:text-white">Site Index</a>
          <button onClick={() => setHonorScoreModalOpen(true)} className="hover:text-white cursor-pointer">PLEX Pro</button>
          <a href="#" className="hover:text-white">Box Office Mojo</a>
          <a href="#" className="hover:text-white">License PLEX Data</a>
          <a href="#" className="hover:text-white">Press Room</a>
          <a href="#" className="hover:text-white">Advertising</a>
          <a href="#" className="hover:text-white">Jobs</a>
          <a href="#" className="hover:text-white">Conditions of Use</a>
          <a href="#" className="hover:text-white">Privacy Policy</a>
        </div>

        <div className="text-[11px] text-neutral-500 space-y-1">
          <div>PLEX, an Amazon company</div>
          <div>© 1990–2026 PLEX.com, Inc. All rights reserved.</div>
        </div>
      </footer>

      {/* ================= MODALS SECTION ================= */}

      {/* PLEX NAVIGATION MENU DRAWER - 100% Matching Screenshot */}
      {navMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
          {/* Backdrop click closes menu */}
          <div className="absolute inset-0" onClick={() => setNavMenuOpen(false)} />
          
          {/* Drawer Container */}
          <div className="relative w-full max-w-[360px] sm:max-w-[390px] bg-white h-full shadow-2xl flex flex-col justify-between z-10 overflow-y-auto animate-in slide-in-from-right duration-300 text-slate-800">
            <div>
              {/* Header */}
              <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between">
                <span className="font-extrabold text-xs uppercase tracking-wider text-slate-500 font-sans">
                  PLEX Navigation Menu
                </span>
                <button
                  onClick={() => setNavMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User profile box */}
              <div className="p-5 flex flex-col items-center border-b border-slate-100">
                {/* Avatar Icon */}
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200 shadow-sm mb-3">
                  <User className="w-10 h-10 text-slate-400" />
                </div>

                {/* Name & Phone */}
                <h3 className="font-extrabold text-slate-900 text-base font-sans tracking-tight">
                  User_{user.phoneNumber.slice(-7)}
                </h3>
                
                <span className="text-[10px] text-slate-400 font-bold tracking-wider font-mono uppercase mt-0.5">
                  UID: {user.phoneNumber.slice(-7)}
                </span>

                <div className="mt-2 text-xs font-semibold text-emerald-600 flex items-center gap-1 font-sans">
                  <span>Available:</span>
                  <span className="font-mono font-bold text-sm">৳{user.userBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>

                {/* Recharge Balance Button */}
                <button
                  onClick={() => {
                    setNavMenuOpen(false);
                    setDepositModalOpen(true);
                  }}
                  className="mt-4 w-full py-2.5 bg-[#1b2b54] hover:bg-slate-800 text-white font-extrabold rounded-lg text-xs tracking-wide uppercase transition-colors shadow-xs cursor-pointer"
                >
                  Recharge Balance
                </button>
              </div>

              {/* Quick Actions (Withdraw, Support, Records) */}
              <div className="p-4 grid grid-cols-3 gap-2 border-b border-slate-100 text-center">
                {/* Quick Action: Withdraw */}
                <button
                  onClick={() => {
                    setNavMenuOpen(false);
                    setWithdrawModalOpen(true);
                  }}
                  className="flex flex-col items-center gap-1.5 cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center transition-colors group-hover:bg-slate-50">
                    <ArrowDownCircle className="w-5 h-5 text-emerald-500" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-800 transition-colors">
                    Withdraw
                  </span>
                </button>

                {/* Quick Action: Support */}
                <button
                  onClick={() => {
                    setNavMenuOpen(false);
                    setSupportModalOpen(true);
                  }}
                  className="flex flex-col items-center gap-1.5 cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center transition-colors group-hover:bg-slate-50">
                    <MessageSquare className="w-5 h-5 text-indigo-500" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-800 transition-colors">
                    Support
                  </span>
                </button>

                {/* Quick Action: Records */}
                <button
                  onClick={() => {
                    setNavMenuOpen(false);
                    setAccountHistoryModalOpen(true);
                  }}
                  className="flex flex-col items-center gap-1.5 cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center transition-colors group-hover:bg-slate-50">
                    <FileText className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-800 transition-colors">
                    Records
                  </span>
                </button>
              </div>

              {/* List Items */}
              <div className="p-2 space-y-0.5">
                {/* 1. PLEX Movie Portal */}
                <button
                  onClick={() => {
                    setNavMenuOpen(false);
                    setSelectedGenre("All");
                    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <Film className="w-4 h-4 text-slate-500" />
                    <span className="text-xs font-bold text-slate-700">PLEX Movie Portal</span>
                  </div>
                  <span className="bg-red-500 text-white font-black text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wide">
                    Hot
                  </span>
                </button>

                {/* 2. Snatch Orders & Review */}
                <button
                  onClick={() => {
                    setNavMenuOpen(false);
                    handleInitiateTask(products[0]);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <Zap className="w-4 h-4 text-amber-500 fill-current" />
                    <span className="text-xs font-bold text-slate-700">Snatch Orders & Review</span>
                  </div>
                  <span className="text-slate-300 font-bold text-sm">+</span>
                </button>

                {/* 3. Withdrawal / Cash Out */}
                <button
                  onClick={() => {
                    setNavMenuOpen(false);
                    setWithdrawModalOpen(true);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold text-slate-700">Withdrawal / Cash Out</span>
                  </div>
                  <span className="bg-[#f5c518] text-black font-black text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wide">
                    Instant
                  </span>
                </button>

                {/* 4. Bind Withdrawal Account */}
                <button
                  onClick={() => {
                    setNavMenuOpen(false);
                    setBindAccountModalOpen(true);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-4 h-4 text-sky-500" />
                    <span className="text-xs font-bold text-slate-700">Bind Withdrawal Account</span>
                  </div>
                  <span className="text-slate-300 font-bold text-sm">+</span>
                </button>

                {/* 5. Daily Check-In */}
                <button
                  onClick={() => {
                    setNavMenuOpen(false);
                    setDailyCheckInModalOpen(true);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <CalendarCheck className="w-4 h-4 text-purple-500" />
                    <span className="text-xs font-bold text-slate-700">Daily Check-In</span>
                  </div>
                  <span className="text-slate-300 font-bold text-sm">+</span>
                </button>

                {/* 6. Transaction History */}
                <button
                  onClick={() => {
                    setNavMenuOpen(false);
                    setAccountHistoryModalOpen(true);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <History className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-bold text-slate-700">Transaction History</span>
                  </div>
                  <span className="text-slate-300 font-bold text-sm">+</span>
                </button>

                {/* 7. Security & Password */}
                <button
                  onClick={() => {
                    setNavMenuOpen(false);
                    setSetPinModalOpen(true);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <Lock className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-bold text-slate-700">Security & Password</span>
                  </div>
                  <span className="text-slate-300 font-bold text-sm">+</span>
                </button>

                {/* 8. Help Center & FAQ */}
                <button
                  onClick={() => {
                    setNavMenuOpen(false);
                    setSupportModalOpen(true);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-bold text-slate-700">Help Center & FAQ</span>
                  </div>
                  <span className="text-slate-300 font-bold text-sm">+</span>
                </button>

                {/* 9. About PLEX */}
                <button
                  onClick={() => {
                    setNavMenuOpen(false);
                    showToast('PLEX Movie Platform v1.2.0 - Certified Official Publisher');
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <Info className="w-4 h-4 text-teal-500" />
                    <span className="text-xs font-bold text-slate-700">About PLEX</span>
                  </div>
                  <span className="text-slate-300 font-bold text-sm">+</span>
                </button>
              </div>
            </div>

            {/* Bottom Sign Out Button */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50">
              <button
                onClick={() => {
                  setNavMenuOpen(false);
                  navigate('/login');
                  showToast('Signed out successfully');
                }}
                className="w-full py-2.5 border border-red-500/60 text-red-600 hover:bg-red-50 font-bold rounded-lg text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODALS SECTION ================= */}

      {/* A. WITHDRAWAL MODAL - Fully Integrated within PLEX */}
      {withdrawModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-emerald-950/80 to-[#161b22] border-b border-[#30363d] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowDownCircle className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">Withdraw Cash</h3>
              </div>
              <button
                onClick={() => setWithdrawModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleExecuteWithdrawal} className="p-5 space-y-6 text-left">
              {/* Balance Summary Card */}
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-4">
                <span className="text-xs text-neutral-400 uppercase font-semibold">
                  Withdrawable Balance
                </span>
                <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">
                  ৳{user.userBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-[11px] text-neutral-500 mt-1">
                  VIP Privileged: 0% Handling Fee · Instant Processing
                </div>
              </div>

              {/* Receiving Account Display */}
              <div className="bg-[#0d1117] border border-neutral-800 rounded-xl p-3.5 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-neutral-400 uppercase font-semibold">Receiving Account</div>
                  {user.withdrawalAddressAndMethod ? (
                    <div className="text-xs font-bold text-white mt-0.5">
                      {user.withdrawalAddressAndMethod.mobileBankingName || 'Bank'} :{' '}
                      <span className="font-mono text-emerald-400">
                        {user.withdrawalAddressAndMethod.mobileBankingAccountNumber ||
                          user.withdrawalAddressAndMethod.bankAccountNumber}
                      </span>{' '}
                      ({user.withdrawalAddressAndMethod.name})
                    </div>
                  ) : (
                    <div className="text-xs text-amber-400 mt-0.5">
                      No account bound yet. Please bind an account.
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setWithdrawModalOpen(false);
                    setBindAccountModalOpen(true);
                  }}
                  className="text-xs text-blue-400 hover:underline font-bold"
                >
                  {user.withdrawalAddressAndMethod ? 'Change' : 'Bind Now'}
                </button>
              </div>

              {/* Quick Amount Buttons */}
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase mb-1.5">
                  Select Quick Amount
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1000, 5000, 10000, 20000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setWithdrawAmount(amt.toString())}
                      className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        withdrawAmount === amt.toString()
                          ? 'bg-emerald-600 text-white'
                          : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                      }`}
                    >
                      ৳{amt.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount Input */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-neutral-400 uppercase">
                    Withdrawal Amount (BDT ৳)
                  </label>
                  <button
                    type="button"
                    onClick={() => setWithdrawAmount(user.userBalance.toString())}
                    className="text-xs text-emerald-400 hover:underline font-bold"
                  >
                    Withdraw All
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-neutral-400 font-bold">৳</span>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="Enter amount (e.g. 5000)"
                    className="w-full pl-8 pr-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                    required
                  />
                </div>
              </div>

              {/* 6-Digit Withdrawal PIN */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-neutral-400 uppercase">
                    Withdrawal Security PIN (6 digits)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setWithdrawModalOpen(false);
                      setSetPinModalOpen(true);
                    }}
                    className="text-xs text-blue-400 hover:underline"
                  >
                    Change PIN
                  </button>
                </div>
                <input
                  type="password"
                  maxLength={6}
                  value={withdrawPin}
                  onChange={(e) => setWithdrawPin(e.target.value)}
                  placeholder="Enter 6-digit PIN (Default: 123456)"
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500 font-mono tracking-widest text-center"
                  required
                />
                <p className="text-[11px] text-neutral-500 mt-1">
                  Default demo withdrawal PIN is <b className="text-neutral-300">123456</b>.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={withdrawLoading}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
              >
                {withdrawLoading ? 'Processing Withdrawal...' : 'Confirm Cash Out Request'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* B. RECHARGE / DEPOSIT MODAL */}
      {depositModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 bg-gradient-to-r from-blue-950/80 to-[#161b22] border-b border-[#30363d] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-white text-base">Recharge Balance</h3>
              </div>
              <button
                onClick={() => setDepositModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleExecuteDeposit} className="p-5 space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase mb-2">
                  Select Gateway
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['bKash', 'Nagad', 'USDT', 'Bank'].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setDepositMethod(m as any)}
                      className={`p-2.5 rounded-lg border text-left text-xs font-bold transition-all cursor-pointer ${
                        depositMethod === m
                          ? 'border-blue-500 bg-blue-950/40 text-blue-300'
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      {m} Deposit
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase mb-1.5">
                  Deposit Amount (BDT ৳)
                </label>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={depositLoading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                {depositLoading ? 'Verifying Deposit...' : 'Confirm Recharge'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* C. BIND ACCOUNT MODAL */}
      {bindAccountModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 bg-gradient-to-r from-cyan-950/80 to-[#161b22] border-b border-[#30363d] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-white text-base">Bind Withdrawal Account</h3>
              </div>
              <button
                onClick={() => setBindAccountModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBindAccount} className="p-5 space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase mb-1">
                  Account Holder Real Name
                </label>
                <input
                  type="text"
                  value={bindName}
                  onChange={(e) => setBindName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase mb-1">
                  Payment Gateway
                </label>
                <select
                  value={bindChannel}
                  onChange={(e) => setBindChannel(e.target.value as any)}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value="bKash">bKash (Mobile Wallet)</option>
                  <option value="Nagad">Nagad (Digital Post)</option>
                  <option value="Rocket">Rocket (DBBL Banking)</option>
                  <option value="Bank">Bank Transfer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase mb-1">
                  Account / Wallet Number
                </label>
                <input
                  type="text"
                  value={bindAccountNum}
                  onChange={(e) => setBindAccountNum(e.target.value)}
                  placeholder="e.g. 01712345678"
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase mb-1">
                  District / Region
                </label>
                <input
                  type="text"
                  value={bindDistrict}
                  onChange={(e) => setBindDistrict(e.target.value)}
                  placeholder="e.g. Dhaka"
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Save Account Information
              </button>
            </form>
          </div>
        </div>
      )}

      {/* D. SET / CHANGE PIN MODAL */}
      {setPinModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl max-w-sm w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 bg-[#1e2530] border-b border-[#30363d] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-base">Set Withdrawal PIN</h3>
              </div>
              <button
                onClick={() => setSetPinModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePin} className="p-5 space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase mb-1">
                  New 6-Digit PIN
                </label>
                <input
                  type="password"
                  maxLength={6}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="6 digits"
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500 text-center tracking-widest font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase mb-1">
                  Confirm 6-Digit PIN
                </label>
                <input
                  type="password"
                  maxLength={6}
                  value={confirmNewPin}
                  onChange={(e) => setConfirmNewPin(e.target.value)}
                  placeholder="Repeat 6 digits"
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500 text-center tracking-widest font-mono"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Update PIN
              </button>
            </form>
          </div>
        </div>
      )}

      {/* E. DAILY CHECK-IN MODAL */}
      {dailyCheckInModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 bg-gradient-to-r from-amber-950/80 to-[#161b22] border-b border-[#30363d] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-base">Daily Check-In Rewards</h3>
              </div>
              <button
                onClick={() => setDailyCheckInModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-center">
              <p className="text-xs text-neutral-300">
                Check in daily to receive cash bonuses credited directly to your balance.
              </p>

              <div className="grid grid-cols-4 gap-2 text-xs">
                {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                  const reward = day === 7 ? 500 : 100 + day * 20;
                  const isChecked = day <= user.checkInDays;
                  const isDay7 = day === 7;
                  return (
                    <div
                      key={day}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                        isDay7 ? 'col-span-2 bg-[#2c2214] border-amber-500/40' : ''
                      } ${
                        isChecked
                          ? 'border-emerald-500/60 bg-emerald-950/30 text-emerald-300'
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400'
                      }`}
                    >
                      <span className="font-bold">Day {day}</span>
                      <span className="text-[#f5c518] font-mono text-[11px] font-black">+৳{reward}</span>
                      {isChecked ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <span className="text-[10px] text-neutral-500">Pending</span>
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  claimDailyCheckIn(user.checkInDays + 1, 200);
                  setDailyCheckInModalOpen(false);
                }}
                className="w-full py-3 bg-[#f5c518] hover:bg-amber-400 text-black font-bold text-sm rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Claim Today's Bonus (+৳200)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* F. TASK SNATCHING ANIMATION MODAL */}
      {taskSnatchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 mx-auto rounded-full bg-blue-600/20 border-2 border-blue-500 flex items-center justify-center animate-pulse mb-4">
              <Zap className="w-10 h-10 text-amber-400 animate-spin" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Snatching Media Order...</h3>
            <p className="text-xs text-neutral-400 mb-4">
              Matching authorized box office review task for <b className="text-white">{snatchingMovie?.name}</b>
            </p>
            <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-[#f5c518] h-full w-3/4 animate-pulse" />
            </div>
          </div>
        </div>
      )}

      {/* G. TASK REVIEW & COMMISSION MODAL */}
      {taskReviewModalOpen && snatchingMovie && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-left">
            <div className="p-4 bg-gradient-to-r from-blue-950/80 to-[#161b22] border-b border-[#30363d] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-base">Media Review Optimization</h3>
              </div>
              <button
                onClick={() => setTaskReviewModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex gap-3 bg-neutral-900/90 p-3 rounded-xl border border-neutral-800">
                <img
                  src={snatchingMovie.poster}
                  alt={snatchingMovie.name}
                  className="w-16 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-white text-sm">{snatchingMovie.name} ({snatchingMovie.year})</h4>
                  <p className="text-[11px] text-neutral-400">Dir: {snatchingMovie.director}</p>
                  <div className="mt-2 text-xs font-bold text-emerald-400">
                    Order Price: ৳{snatchingMovie.price.toLocaleString()}
                  </div>
                  <div className="text-xs font-black text-amber-400">
                    Guaranteed Commission: +৳{snatchingMovie.commission.toLocaleString()}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase mb-1">
                  Media Star Rating
                </label>
                <div className="flex gap-1 text-amber-400 text-lg">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-current cursor-pointer" />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase mb-1">
                  Optimized Rating Review
                </label>
                <textarea
                  defaultValue="Exceptional cinematography, compelling direction, and world-class performances. An outstanding media piece that delivers top entertainment value."
                  rows={2}
                  className="w-full p-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-neutral-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                onClick={handleConfirmTaskReview}
                className="w-full py-3 bg-[#f5c518] hover:bg-amber-400 text-black font-bold text-sm rounded-xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Submit Review & Collect +৳{snatchingMovie.commission.toLocaleString()}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* H. MOVIE DETAILS MODAL (ALL Movie Features) */}
      {selectedMovieDetail && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-left my-auto">
            {/* Header with Close */}
            <div className="p-4 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-lg">{selectedMovieDetail.name} ({selectedMovieDetail.year})</h3>
                <span className="text-xs text-neutral-400">{selectedMovieDetail.genre.join(', ')}</span>
              </div>
              <button
                onClick={() => setSelectedMovieDetail(null)}
                className="text-gray-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <img
                  src={selectedMovieDetail.poster}
                  alt={selectedMovieDetail.name}
                  className="w-36 aspect-2/3 object-cover rounded-xl border border-neutral-700 flex-shrink-0"
                />
                <div className="space-y-2 flex-1 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#f5c518] text-black font-black px-2 py-0.5 rounded text-xs">
                      PLEX {selectedMovieDetail.rating}/10
                    </span>
                    <span className="text-neutral-400 font-mono">PG-13</span>
                    <span className="text-neutral-400 font-mono">152 min</span>
                    <span className="text-emerald-400 font-bold font-mono ml-auto">
                      Box Office: {selectedMovieDetail.boxOffice || '$500M'}
                    </span>
                  </div>

                  <p className="text-neutral-300 leading-relaxed pt-1">
                    {selectedMovieDetail.introduction}
                  </p>

                  <div className="pt-2 space-y-1 text-neutral-400 text-xs">
                    <div>
                      <b className="text-neutral-200">Director:</b> {selectedMovieDetail.director}
                    </div>
                    <div>
                      <b className="text-neutral-200">Stars:</b> {selectedMovieDetail.stars}
                    </div>
                    <div>
                      <b className="text-neutral-200">Reviews:</b> {selectedMovieDetail.reviews}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons inside details */}
              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    toggleWatchlist(selectedMovieDetail.productId, selectedMovieDetail.name);
                  }}
                  className="flex-1 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-neutral-700"
                >
                  <Bookmark className="w-4 h-4 text-[#f5c518]" />
                  <span>
                    {watchlist.includes(selectedMovieDetail.productId)
                      ? 'In Your Watchlist'
                      : 'Add to Watchlist'}
                  </span>
                </button>

                <button
                  onClick={() => {
                    const m = selectedMovieDetail;
                    setSelectedMovieDetail(null);
                    handleInitiateTask(m);
                  }}
                  className="flex-1 py-2.5 bg-[#0b1d51] hover:bg-blue-800 text-[#d1dfe8] font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-blue-400/40 shadow-xs"
                >
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>⚡ Snatch Review Task (+৳{selectedMovieDetail.commission})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* I. WATCHLIST MANAGER MODAL */}
      {watchlistModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-left">
            <div className="p-4 bg-gradient-to-r from-neutral-900 to-[#161b22] border-b border-[#30363d] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-[#f5c518] fill-current" />
                <h3 className="font-bold text-white text-base">Your Watchlist ({watchlist.length})</h3>
              </div>
              <button
                onClick={() => setWatchlistModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto divide-y divide-neutral-800">
              {watchlist.length === 0 ? (
                <div className="py-8 text-center text-neutral-400 text-sm">
                  Your Watchlist is empty. Click the bookmark icon on any movie to save it!
                </div>
              ) : (
                products
                  .filter((p) => watchlist.includes(p.productId))
                  .map((movie) => (
                    <div key={movie.productId} className="py-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={movie.poster}
                          alt={movie.name}
                          className="w-12 h-16 object-cover rounded-md flex-shrink-0"
                        />
                        <div>
                          <div className="font-bold text-white text-sm">{movie.name}</div>
                          <div className="text-xs text-neutral-400">
                            {movie.year} · ★ {movie.rating}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setWatchlistModalOpen(false);
                            handleInitiateTask(movie);
                          }}
                          className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold cursor-pointer"
                        >
                          Snatch
                        </button>
                        <button
                          onClick={() => toggleWatchlist(movie.productId, movie.name)}
                          className="text-neutral-500 hover:text-red-400 p-1 cursor-pointer"
                          title="Remove from Watchlist"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* J. STAR RATING MODAL (1-10 Stars Rating) */}
      {ratingModalMovie && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl max-w-sm w-full p-5 text-center shadow-2xl animate-in zoom-in-95 duration-200 space-y-4">
            <h3 className="font-bold text-white text-base">Rate "{ratingModalMovie.name}"</h3>
            <div className="text-3xl font-black text-amber-400 font-mono">{tempRating} / 10</div>

            {/* 10 Star Buttons */}
            <div className="flex justify-center gap-1 text-amber-400">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setTempRating(num)}
                  className="cursor-pointer hover:scale-125 transition-transform"
                >
                  <Star
                    className={`w-5 h-5 ${
                      num <= tempRating ? 'fill-[#f5c518] text-[#f5c518]' : 'text-neutral-600'
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setRatingModalMovie(null)}
                className="flex-1 py-2 bg-neutral-800 text-neutral-300 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRating}
                className="flex-1 py-2 bg-[#f5c518] hover:bg-amber-400 text-black rounded-lg text-xs font-bold cursor-pointer"
              >
                Save Rating
              </button>
            </div>
          </div>
        </div>
      )}

      {/* K. ACCOUNT HISTORY & TRANSACTIONS MODAL */}
      {accountHistoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-left">
            <div className="p-4 bg-gradient-to-r from-neutral-900 to-[#161b22] border-b border-[#30363d] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-purple-400" />
                <h3 className="font-bold text-white text-base">Account Operations & Records</h3>
              </div>
              <button
                onClick={() => setAccountHistoryModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto divide-y divide-neutral-800 space-y-2">
              <div>
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                  Recent Transactions
                </h4>
                {transactions.map((tx) => (
                  <div key={tx.id} className="py-2 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">{tx.method || tx.type}</div>
                      <div className="text-[11px] text-neutral-500 font-mono">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-mono font-bold ${
                          tx.type === 'withdraw' ? 'text-red-400' : 'text-emerald-400'
                        }`}
                      >
                        {tx.type === 'withdraw' ? '-' : '+'}৳{tx.amount.toLocaleString()}
                      </div>
                      <span className="text-[10px] bg-neutral-800 text-neutral-300 px-1.5 py-0.2 rounded">
                        {tx.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                  Completed Media Tasks ({orderRecords.length})
                </h4>
                {orderRecords.slice(0, 5).map((ord) => (
                  <div key={ord.id} className="py-2 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">{ord.productName}</div>
                      <div className="text-[11px] text-neutral-500">Order #{ord.orderNumber}</div>
                    </div>
                    <div className="text-right font-mono">
                      <div className="text-amber-400 font-bold">+৳{ord.commission.toLocaleString()}</div>
                      <span className="text-[10px] text-emerald-400">Completed</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* L. HONOR SCORE MODAL */}
      {honorScoreModalOpen && (() => {
        const score = user.score || 100;
        const needleAngle = -90 + (score / 100) * 180;
        return (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-slate-900 border border-neutral-200">
              {/* Header */}
              <div className="bg-[#242424] text-white px-5 py-4 flex items-center justify-between">
                <h3 className="font-extrabold text-base tracking-wide uppercase text-center flex-1">
                  Credit Score
                </h3>
                <button
                  onClick={() => setHonorScoreModalOpen(false)}
                  className="text-gray-400 hover:text-white p-1 rounded-lg cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-5 flex flex-col items-center max-h-[80vh] overflow-y-auto">
                {/* Semicircle Gauge Chart */}
                <div className="relative w-full max-w-[240px] mx-auto pt-2">
                  <svg viewBox="0 0 200 120" className="w-full">
                    {/* Red segment (0-19) */}
                    <path
                      d="M 20 100 A 80 80 0 0 1 35.3 53"
                      fill="none"
                      stroke="#EA4335"
                      strokeWidth="28"
                    />
                    {/* Orange segment (20-39) */}
                    <path
                      d="M 35.3 53 A 80 80 0 0 1 75.3 23.9"
                      fill="none"
                      stroke="#FB8C00"
                      strokeWidth="28"
                    />
                    {/* Yellow segment (40-59) */}
                    <path
                      d="M 75.3 23.9 A 80 80 0 0 1 124.7 23.9"
                      fill="none"
                      stroke="#FDD835"
                      strokeWidth="28"
                    />
                    {/* Light Green segment (60-79) */}
                    <path
                      d="M 124.7 23.9 A 80 80 0 0 1 164.7 53"
                      fill="none"
                      stroke="#7CB342"
                      strokeWidth="28"
                    />
                    {/* Dark Green segment (80-100) */}
                    <path
                      d="M 164.7 53 A 80 80 0 0 1 180 100"
                      fill="none"
                      stroke="#43A047"
                      strokeWidth="28"
                    />

                    {/* Segment labels centered along arcs */}
                    <text x="35" y="80" fill="white" fontSize="6.5" fontWeight="black" textAnchor="middle" transform="rotate(-68, 35, 80)">0-19</text>
                    <text x="61" y="47" fill="white" fontSize="6.5" fontWeight="black" textAnchor="middle" transform="rotate(-36, 61, 47)">20-39</text>
                    <text x="100" y="36" fill="white" fontSize="6.5" fontWeight="black" textAnchor="middle">40-59</text>
                    <text x="139" y="47" fill="white" fontSize="6.5" fontWeight="black" textAnchor="middle" transform="rotate(36, 139, 47)">60-79</text>
                    <text x="165" y="80" fill="white" fontSize="6.5" fontWeight="black" textAnchor="middle" transform="rotate(68, 165, 80)">80-100</text>

                    {/* Pivot Point */}
                    <circle cx="100" cy="100" r="12" fill="#1b2536" />
                    <circle cx="100" cy="100" r="6" fill="#f5c518" />

                    {/* Gauge Needle pointing to user's score */}
                    <g transform={`rotate(${needleAngle}, 100, 100)`}>
                      <path
                        d="M 97 100 L 100 20 L 103 100 Z"
                        fill="#1b2536"
                        stroke="#1b2536"
                        strokeWidth="1"
                      />
                    </g>
                  </svg>
                </div>

                {/* Current Score Bar (Matches Golden outline container) */}
                <div className="w-full bg-[#fdfaf2] border border-[#f5cc98] rounded-full px-5 py-2.5 flex items-center justify-between shadow-xs">
                  <span className="text-gray-500 font-bold text-xs tracking-wide">
                    You currently have...
                  </span>
                  <span className="text-[#d84e43] font-black text-sm tracking-tight font-mono">
                    {score} Point
                  </span>
                </div>

                {/* Rules & Regulations Section */}
                <div className="w-full text-left space-y-3 px-1">
                  <h4 className="text-[#a83232] font-black text-xs tracking-wide uppercase border-b border-gray-100 pb-1.5">
                    Rules and Regulations
                  </h4>
                  
                  <ul className="space-y-2 text-[11px] text-gray-700 font-semibold leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-[#a83232] text-sm mt-[-4px]">•</span>
                      <span>Each complete 3 around of purchase will get 2 points</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#a83232] text-sm mt-[-4px]">•</span>
                      <span>Completing special purchase can get extra commission and points</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#a83232] text-sm mt-[-4px]">•</span>
                      <span>If the purchase is not completed for too long, the credit score will decrease</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#a83232] text-sm mt-[-4px]">•</span>
                      <span>Membership reach 100 points, Apply Entire Amount withdraw. Credit point down during withdraw process Need to make Credit score insurance</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => setHonorScoreModalOpen(false)}
                  className="w-full py-2.5 bg-[#f5c518] hover:bg-amber-400 text-black font-extrabold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* M. CUSTOMER SUPPORT MODAL */}
      {supportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl animate-in zoom-in-95 duration-200 space-y-4">
            <Headphones className="w-10 h-10 text-[#f5c518] mx-auto" />
            <h3 className="font-bold text-white text-base">PLEX 24/7 Customer Care</h3>
            <p className="text-xs text-neutral-300">
              Need assistance with withdrawals, task verification, or account binding? Connect with our dedicated representatives.
            </p>
            <div className="space-y-2 text-xs">
              <button
                onClick={() => showToast('Connecting to Live Agent...')}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl cursor-pointer"
              >
                Start Live Chat
              </button>
              <button
                onClick={() => showToast('Opening Telegram Support channel...')}
                className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold rounded-xl cursor-pointer"
              >
                Telegram Official Support
              </button>
            </div>
            <button
              onClick={() => setSupportModalOpen(false)}
              className="text-xs text-neutral-500 hover:text-neutral-300 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* N. HD VIDEO TRAILER MODAL */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-4 bg-neutral-800/90 border-b border-neutral-700 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-base">{activeVideoModal.title}</h3>
                <p className="text-xs text-neutral-400">{activeVideoModal.sub}</p>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="w-8 h-8 rounded-full bg-neutral-700 hover:bg-neutral-600 text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-16/9 bg-black relative flex items-center justify-center">
              <video
                src={activeVideoModal.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-4 flex flex-wrap items-center justify-between gap-2 bg-neutral-900 text-xs">
              <span className="text-neutral-400">Duration: {activeVideoModal.time} · 4K UHD</span>
              <button
                onClick={() => {
                  setActiveVideoModal(null);
                  handleInitiateTask(products[0]);
                }}
                className="bg-[#0b1d51] hover:bg-blue-800 text-[#d1dfe8] font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>Snatch Media Task for this Title</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= STICKY BOTTOM NAVIGATION BAR ================= */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1c1c1c] text-gray-400 py-2.5 border-t border-neutral-800 z-40 select-none shadow-2xl">
        <div className="relative max-w-md mx-auto flex items-center justify-between px-6 sm:px-8">
          
          {/* Tab 1: Home (Active) */}
          <button
            onClick={() => {
              setSelectedGenre("All");
              catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex flex-col items-center gap-0.5 text-white cursor-pointer transition-colors"
          >
            <Film className="w-5 h-5 text-[#f5c518]" />
            <span className="text-[9px] font-bold tracking-wide uppercase text-[#f5c518]">Home</span>
          </button>

          {/* Tab 2: Watchlist */}
          <button
            onClick={() => setWatchlistModalOpen(true)}
            className="flex flex-col items-center gap-0.5 hover:text-white cursor-pointer transition-colors pr-8"
          >
            <Bookmark className="w-5 h-5 text-gray-400" />
            <span className="text-[9px] font-bold tracking-wide uppercase">Watchlist</span>
          </button>

          {/* Central Circular Lightning Action Button */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-6">
            <button
              onClick={() => handleInitiateTask(products[0])}
              className="w-13 h-13 bg-[#f5c518] hover:bg-amber-400 rounded-full flex items-center justify-center border-4 border-[#1c1c1c] shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all"
              title="Start Reviewing"
            >
              <Zap className="w-6 h-6 text-black fill-current" />
            </button>
          </div>

          {/* Tab 3: Event */}
          <button
            onClick={() => navigate('/event')}
            className="flex flex-col items-center gap-0.5 hover:text-white cursor-pointer transition-colors pl-8"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="text-[9px] font-bold tracking-wide uppercase">Event</span>
          </button>

          {/* Tab 4: Profile */}
          <button
            onClick={() => setNavMenuOpen(true)}
            className="flex flex-col items-center gap-0.5 hover:text-white cursor-pointer transition-colors"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-[9px] font-bold tracking-wide uppercase">Profile</span>
          </button>

        </div>
      </div>
    </div>
  );
};
