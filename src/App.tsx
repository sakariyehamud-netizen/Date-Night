/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Heart, 
  Bell, 
  Search, 
  Star, 
  Utensils, 
  Compass, 
  Home, 
  Trees, 
  Banknote,
  User,
  Heart as HeartIcon
} from 'lucide-react';
import { motion } from 'motion/react';
import { DateIdea, Category } from './types';

const FEATURED_IDEAS: DateIdea[] = [
  {
    id: '1',
    title: 'Starlit Rooftop Dinner',
    description: 'Experience gourmet dining under the urban constellations.',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    category: 'Outdoor',
    tags: ['Romantic', 'Dinner']
  },
  {
    id: '2',
    title: 'Serene Beach Picnic',
    description: 'Golden hour vibes with wine and artisanal treats.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    category: 'Outdoor',
    tags: ['Beach', 'Relaxing']
  }
];

const NEW_IDEAS: DateIdea[] = [
  {
    id: '3',
    title: 'Sunset Vineyard Tour',
    description: 'Taste the finest local blends while watching the sun go down.',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b0ca7df?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    category: 'Relaxing',
    tags: ['RELAXING']
  },
  {
    id: '4',
    title: 'Italian Cooking Night',
    description: 'Master the art of pasta-making from the comfort of home.',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    category: 'Stay-at-Home',
    tags: ['STAY-AT-HOME']
  }
];

const CATEGORIES = [
  { name: 'Cozy Dinners', icon: Utensils, color: 'bg-primary' },
  { name: 'Adventure', icon: Compass, color: 'bg-primary' },
  { name: 'Stay-at-Home', icon: Home, color: 'bg-primary' },
  { name: 'Outdoor', icon: Trees, color: 'bg-primary' },
  { name: 'Budget Friendly', icon: Banknote, color: 'bg-primary', fullWidth: true },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'Home' | 'Browse' | 'Favorites' | 'Profile'>('Browse');
  const [activeFilter, setActiveFilter] = useState<Category>('All');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const filters: Category[] = ['All', 'Indoor', 'Outdoor', 'Active', 'Relaxing'];

  // Extract unique tags from all ideas
  const allIdeas = [...FEATURED_IDEAS, ...NEW_IDEAS];
  const availableTags = Array.from(new Set(allIdeas.flatMap(idea => idea.tags.map(t => t.toUpperCase())))).sort();

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filterIdeas = (ideas: DateIdea[]) => {
    return ideas.filter(idea => {
      const categoryMatch = activeFilter === 'All' || idea.category === activeFilter;
      const tagMatch = selectedTags.length === 0 || idea.tags.some(tag => selectedTags.includes(tag.toUpperCase()));
      return categoryMatch && tagMatch;
    });
  };

  const filteredFeatured = filterIdeas(FEATURED_IDEAS);
  const filteredNew = filterIdeas(NEW_IDEAS);

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return (
          <div className="px-4 pt-6 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
              <p className="text-slate-400">Ready for your next adventure?</p>
            </section>
            
            <section className="bg-primary/10 p-6 rounded-2xl border border-primary/20">
              <h3 className="text-lg font-bold mb-2">Surprise Me! 🎲</h3>
              <p className="text-sm text-slate-300 mb-4">Can't decide? Let us pick the perfect date for you based on your mood.</p>
              <button className="w-full bg-primary py-3 rounded-xl font-bold shadow-lg shadow-primary/20">
                Generate Random Idea
              </button>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4">Trending Now</h3>
              <div className="grid grid-cols-2 gap-4">
                {FEATURED_IDEAS.map(idea => (
                  <div key={idea.id} className="space-y-2">
                    <img src={idea.image} className="aspect-square object-cover rounded-xl" alt={idea.title} referrerPolicy="no-referrer" />
                    <h4 className="font-bold text-sm">{idea.title}</h4>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );
      case 'Browse':
        return (
          <>
            {/* Tag Filters Section */}
            <section className="mt-4 px-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Filter by Tags</h2>
                {selectedTags.length > 0 && (
                  <button 
                    onClick={() => setSelectedTags([])}
                    className="text-xs font-bold text-primary"
                  >
                    Clear All
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {availableTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border ${
                      selectedTags.includes(tag)
                        ? 'bg-primary border-primary text-white'
                        : 'bg-primary/5 border-primary/20 text-slate-400'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </section>

            {/* Featured Carousel */}
            <section className="mt-6">
              <div className="px-4 flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold">Top Rated Date Ideas</h2>
                <button className="text-sm font-semibold text-primary">View all</button>
              </div>
              {filteredFeatured.length > 0 ? (
                <div className="flex overflow-x-auto no-scrollbar gap-4 px-4 pb-2">
                  {filteredFeatured.map((idea) => (
                    <motion.div 
                      key={idea.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.02 }}
                      className="flex-none w-72 group"
                    >
                      <div className="relative h-48 rounded-xl overflow-hidden mb-2">
                        <img 
                          src={idea.image} 
                          alt={idea.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <button className="absolute top-3 right-3 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-primary transition-colors">
                          <HeartIcon className="w-5 h-5" />
                        </button>
                        <div className="absolute bottom-3 left-3 flex items-center gap-1">
                          <Star className="text-yellow-400 w-4 h-4 fill-current" />
                          <span className="text-white text-xs font-bold">{idea.rating}</span>
                        </div>
                      </div>
                      <h3 className="font-bold text-base">{idea.title}</h3>
                      <p className="text-slate-400 text-xs line-clamp-1">{idea.description}</p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-8 text-center text-slate-500 text-sm italic">
                  No featured ideas match your filters.
                </div>
              )}
            </section>

            {/* Categories Section */}
            <section className="mt-8 px-4">
              <h2 className="text-lg font-bold mb-4">Categories</h2>
              <div className="grid grid-cols-2 gap-3">
                {CATEGORIES.map((cat) => (
                  <motion.div
                    key={cat.name}
                    whileTap={{ scale: 0.98 }}
                    className={`bg-primary/20 p-4 rounded-xl flex items-center gap-3 cursor-pointer ${cat.fullWidth ? 'col-span-2' : ''}`}
                  >
                    <div className="bg-primary p-2 rounded-lg text-white">
                      <cat.icon className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-sm">{cat.name}</span>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* New For You Section */}
            <section className="mt-8 px-4">
              <h2 className="text-lg font-bold mb-4">New For You</h2>
              <div className="space-y-4">
                {filteredNew.length > 0 ? (
                  filteredNew.map((idea) => (
                    <motion.div 
                      key={idea.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex gap-4 bg-primary/5 p-3 rounded-xl cursor-pointer"
                    >
                      <img 
                        src={idea.image} 
                        alt={idea.title}
                        referrerPolicy="no-referrer"
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-sm">{idea.title}</h3>
                          <HeartIcon className="text-primary w-5 h-5" />
                        </div>
                        <p className="text-slate-400 text-xs mt-1">{idea.description}</p>
                        <div className="mt-2 flex gap-2">
                          {idea.tags.map(tag => (
                            <span key={tag} className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="py-8 text-center text-slate-500 text-sm italic">
                    No new ideas match your filters.
                  </div>
                )}
              </div>
            </section>
          </>
        );
      case 'Favorites':
        return (
          <div className="px-4 pt-6">
            <h2 className="text-2xl font-bold mb-6">Your Favorites</h2>
            <div className="space-y-4">
              {FEATURED_IDEAS.map(idea => (
                <div key={idea.id} className="flex gap-4 bg-primary/5 p-3 rounded-xl">
                  <img src={idea.image} className="w-20 h-20 rounded-lg object-cover" alt={idea.title} referrerPolicy="no-referrer" />
                  <div className="flex-1 py-1">
                    <h3 className="font-bold text-sm">{idea.title}</h3>
                    <p className="text-slate-400 text-xs mt-1 line-clamp-2">{idea.description}</p>
                  </div>
                  <button className="text-primary self-center">
                    <HeartIcon className="w-6 h-6 fill-current" />
                  </button>
                </div>
              ))}
              <div className="py-12 text-center text-slate-500">
                <HeartIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Save more ideas to see them here!</p>
              </div>
            </div>
          </div>
        );
      case 'Profile':
        return (
          <div className="px-4 pt-6 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary">
                <User className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Sakariye Hamud</h2>
                <p className="text-slate-400 text-sm">sakariyehamud@gmail.com</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Settings</h3>
              <div className="bg-primary/5 rounded-2xl overflow-hidden">
                <button className="w-full px-4 py-4 flex items-center justify-between border-b border-primary/10">
                  <span>Notifications</span>
                  <div className="w-10 h-5 bg-primary rounded-full relative">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                  </div>
                </button>
                <button className="w-full px-4 py-4 flex items-center justify-between border-b border-primary/10">
                  <span>Privacy Policy</span>
                  <Compass className="w-4 h-4 text-slate-500" />
                </button>
                <button className="w-full px-4 py-4 flex items-center justify-between text-primary font-bold">
                  <span>Log Out</span>
                </button>
              </div>
            </div>

            <div className="bg-primary/10 p-6 rounded-2xl">
              <h3 className="font-bold mb-2">Premium Member</h3>
              <p className="text-sm text-slate-300 mb-4">Unlock exclusive date ideas and expert planning tools.</p>
              <button className="text-primary font-bold text-sm">Upgrade Now →</button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 flex flex-col pb-24">
      {/* Header - Only show for Browse */}
      {activeTab === 'Browse' && (
        <header className="sticky top-0 z-20 bg-background-dark/80 backdrop-blur-md px-4 pt-6 pb-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <Heart className="text-primary fill-primary w-8 h-8" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Browse Ideas</h1>
            <button className="flex items-center justify-center p-2 rounded-full bg-primary/20 text-primary">
              <Bell className="w-6 h-6" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search for romantic date ideas..."
              className="w-full bg-primary/10 border-none rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary/50 text-slate-100 placeholder:text-slate-500 outline-none"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeFilter === filter 
                    ? 'bg-primary text-white' 
                    : 'bg-primary/20 text-slate-300'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </header>
      )}

      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-background-dark border-t border-primary/20 px-6 py-3 pb-8 z-30">
        <div className="flex items-center justify-between">
          <NavItem icon={Home} label="Home" active={activeTab === 'Home'} onClick={() => setActiveTab('Home')} />
          <NavItem icon={Compass} label="Browse" active={activeTab === 'Browse'} onClick={() => setActiveTab('Browse')} />
          <NavItem icon={HeartIcon} label="Favorites" active={activeTab === 'Favorites'} onClick={() => setActiveTab('Favorites')} />
          <NavItem icon={User} label="Profile" active={activeTab === 'Profile'} onClick={() => setActiveTab('Profile')} />
        </div>
      </nav>
    </div>
  );
}

function NavItem({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-primary' : 'text-slate-500'}`}
    >
      <Icon className={`w-6 h-6 ${active ? 'fill-current' : ''}`} />
      <span className={`text-[10px] ${active ? 'font-bold' : 'font-medium'}`}>{label}</span>
    </button>
  );
}
