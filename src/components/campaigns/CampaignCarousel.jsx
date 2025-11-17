import React from "react";
import { Play, Square, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function CampaignCarousel({ title, campaigns, showPlayButton, grayscale }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4 flex-1">
          <h2 className="text-2xl font-bold" style={{ color: '#FF5722' }}>{title}</h2>
          <div className="flex-1 h-px bg-[#FF5722]" />
        </div>
        <button className="text-gray-400 hover:text-white ml-4">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {campaigns.map((campaign) => (
          <Link
            key={campaign.id}
            to={createPageUrl("ActiveCampaign") + `?id=${campaign.id}`}
            className="flex-shrink-0 group relative"
          >
            <div className="w-64 aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700 group-hover:scale-105 transition-transform">
              <img
                src={campaign.cover_image_url || 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&h=300&fit=crop'}
                alt={campaign.title}
                className={`w-full h-full object-cover ${grayscale ? 'grayscale' : ''}`}
              />
              
              {showPlayButton && (
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                  <button className="w-12 h-12 rounded-full bg-[#37F2D1] flex items-center justify-center hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-[#1E2430] fill-current" />
                  </button>
                  <button className="w-12 h-12 rounded-full bg-[#FF5722] flex items-center justify-center hover:scale-110 transition-transform">
                    <Square className="w-5 h-5 text-white fill-current" />
                  </button>
                </div>
              )}
            </div>
            
            <p className="text-sm mt-2 font-medium truncate text-white">{campaign.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
