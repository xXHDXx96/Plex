import React from 'react';
import { Calendar, MapPin, Tag } from 'lucide-react';

export const Event: React.FC = () => {
  const events = [
    {
      id: 1,
      title: 'Global Media Merchant Summit 2026',
      date: 'Sep 15, 2026',
      location: 'London, UK & Online Broadcast',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
      tag: 'Annual Summit',
      desc: 'Annual conference bringing together film distributors, review optimizers, and top-earning VIP reviewers.',
    },
    {
      id: 2,
      title: 'Super Autumn Multiplier Festival',
      date: 'Oct 01 - Oct 10, 2026',
      location: 'Worldwide Platform Event',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80',
      tag: 'Bonus Multiplier',
      desc: 'All snatching tasks receive an automatic +5% commission bonus with double mystery box frequencies.',
    },
    {
      id: 3,
      title: 'PLEX Media Review Creator Awards',
      date: 'Aug 20, 2026',
      location: 'Los Angeles, USA',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
      tag: 'Recognition Gala',
      desc: 'Honoring top partners who achieved maximum honor scores and unbroken daily check-in streaks.',
    },
    {
      id: 4,
      title: 'New Member Welcome Drive',
      date: 'Ongoing 2026',
      location: 'South Asia & Global',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
      tag: 'Cash Welcome',
      desc: 'Starter bonus incentives for new accounts upon first mobile banking binding and task round initialization.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Event Gallery</h1>
        <p className="text-sm text-gray-600">
          Discover exclusive platform campaigns, partner gatherings, and promotional bonus windows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col"
          >
            <div className="h-48 overflow-hidden relative">
              <img
                src={ev.image}
                alt={ev.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 right-3 bg-primaryButton text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {ev.tag}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-1">{ev.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{ev.desc}</p>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-primaryButton" />
                  {ev.date}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-primaryButton" />
                  {ev.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
