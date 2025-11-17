import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CampaignBasicInfo({ data, onChange }) {
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      onChange({ cover_image_url: file_url });
    } catch (error) {
      console.error("Failed to upload image:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-6">Campaign Information</h2>
        <p className="text-gray-400 mb-6">
          Let's start with the basics. Name your campaign, choose your game system, and upload a cover image.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="title" className="text-white mb-2 block">Campaign Name *</Label>
          <Input
            id="title"
            value={data.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="Enter campaign name..."
            className="bg-[#1E2430] border-gray-700 text-white"
          />
        </div>

        <div>
          <Label htmlFor="system" className="text-white mb-2 block">Game System *</Label>
          <Select value={data.system} onValueChange={(value) => onChange({ system: value })}>
            <SelectTrigger className="bg-[#1E2430] border-gray-700 text-white">
              <SelectValue placeholder="Select game system" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Dungeons and Dragons 5e">Dungeons and Dragons 5e</SelectItem>
              <SelectItem value="Aetheneum">Aetheneum</SelectItem>
              <SelectItem value="Pathfinder 2nd Edition">Pathfinder 2nd Edition</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-white mb-2 block">Campaign Cover Image</Label>
          <div className="flex items-center gap-4">
            {data.cover_image_url && (
              <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-[#37F2D1]">
                <img src={data.cover_image_url} alt="Campaign cover" className="w-full h-full object-cover" />
              </div>
            )}
            <label htmlFor="cover-upload">
              <Button
                type="button"
                variant="outline"
                disabled={uploading}
                className="cursor-pointer text-[#2A3441]"
                onClick={() => document.getElementById('cover-upload').click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploading ? "Uploading..." : "Upload Image"}
              </Button>
              <input
                id="cover-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-sm text-gray-500 mt-2">Recommended size: 1200x600px</p>
        </div>
      </div>
    </div>
  );
}
