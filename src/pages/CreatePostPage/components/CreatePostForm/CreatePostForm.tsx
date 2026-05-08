import { usePostPost } from '@/hooks/posts/usePostPosts';
import { useEquipment } from '@/hooks/equipment';
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import InputField from "../InputField/InputField";
import TextAreaField from "../TextAreaField/TextAreaField";
import ImageUploadField from "../ImageUploadField/ImageUploadField";
import FormActions from "../FormActions/FormActions";
import { useAuth } from '@/contexts/AuthContext';
import type { StatsState, Location } from '@/types/Post';
import { StatBar } from '@/components/shared/PostStats/PostStats';
import { STAT_CONFIG } from '@/config/statConfig';
import { toast } from "sonner";

const DEFAULT_STAT = '5';

function getInitialStats() {
  const initial: Record<string, string> = {};
  STAT_CONFIG.forEach(({ key }) => {
    initial[key] = DEFAULT_STAT;
  });
  return initial;
}

const ACTIVITY_TYPES = [
  { value: 'tournament', label: '🏆 Tournament' },
  { value: 'training', label: '🎯 Training' },
  { value: 'match', label: '⚽ Match' },
  { value: 'social', label: '👥 Social' },
] as const;

export default function CreatePostForm() {
  const { mutateAsync: createPost, isError, isPending } = usePostPost();
  const formRef = useRef<HTMLFormElement>(null);
  const inputTitleRef = useRef<HTMLInputElement>(null);
  const inputContentRef = useRef<HTMLTextAreaElement>(null);
  const inputImageRef = useRef<HTMLInputElement>(null);
  const [stats, setStats] = useState<StatsState>(getInitialStats());
  
  // Location state
  const [includeLocation, setIncludeLocation] = useState(false);
  const [location, setLocation] = useState<Location>({
    address: '',
    city: '',
    country: '',
    coordinates: undefined
  });

  // Activity state
  const [isActivity, setIsActivity] = useState(false);
  const [activityType, setActivityType] = useState<string>('');
  const [activityDate, setActivityDate] = useState('');

  // Equipment state
  const [includeEquipment, setIncludeEquipment] = useState(false);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string>('');
  const { equipment: equipmentList } = useEquipment();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const handleStatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let num = parseFloat(value);
    if (isNaN(num) || value === '') {
      num = 5;
    } else if (num < 5) {
      num = 5;
    } else if (num > 10) {
      num = 10;
    }
    setStats((prev) => ({
      ...prev,
      [name]: num.toString(),
    }));
  };

  const validateStats = () => {
    for (const [key, value] of Object.entries(stats)) {
      const num = parseFloat(value);
      if (isNaN(num) || num < 5 || num > 10) {
        toast.error(`${key.charAt(0).toUpperCase() + key.slice(1)} must be a number between 5 and 10`);
        return false;
      }
    }
    return true;
  };

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();

    const title = inputTitleRef.current?.value.trim() || "";
    const content = inputContentRef.current?.value.trim() || "";
    const imageFile = inputImageRef.current?.files?.[0];

    if (!title) {
      toast.error("Please enter a title");
      return;
    }

    if (!content) {
      toast.error("Please enter content");
      return;
    }

    if (!validateStats()) {
      return;
    }

    if (includeLocation && (!location.address || !location.city || !location.country)) {
      toast.error("Please fill in all location fields");
      return;
    }

    if (isActivity && (!activityType || !activityDate)) {
      toast.error("Please select activity type and date");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      // Use the logged-in user's username as author, or fallback
      formData.append('author', user?.username ?? 'Unknown User');
      if (imageFile != undefined) {
        formData.append('image', imageFile);
      }
      // Build the stats object from form state
      const statsObj: Record<string, number> = {};
      Object.entries(stats).forEach(([key, value]) => {
        statsObj[key] = parseFloat(value);
      });
      formData.append('stats', JSON.stringify(statsObj));

      // Add location if provided
      if (includeLocation && location.address && location.city && location.country) {
        formData.append('location', JSON.stringify(location));
      }

      // Add activity info if provided
      if (isActivity && activityType && activityDate) {
        formData.append('activityType', activityType);
        formData.append('activityDate', activityDate);
      }

      // Add equipment link if provided
      if (includeEquipment && selectedEquipmentId) {
        formData.append('equipment_id', selectedEquipmentId);
      }

      await createPost({ formData });
      queryClient.invalidateQueries({ queryKey: ["mainComments"] });
      toast.success("Post successfully created!");
      formRef.current?.reset();
      setStats(getInitialStats());
      navigate("/");
    } catch (error) {
      toast.error("Failed to create post");
    }
  };

  const handleCancel = () => {
    formRef.current?.reset();
    setStats(getInitialStats());
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8" data-testid="create-post-container">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10">
        <form
          ref={formRef}
          onSubmit={handleAddPost}
          className="space-y-6"
          data-testid="create-post-form"
        >
          <div>
            <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
            <p className="text-sm text-gray-300 mb-8">Share your thoughts with the community</p>
          </div>

          <div className="space-y-4">
            <InputField
              label="Title"
              id="title"
              inputRef={inputTitleRef}
              placeholder="Enter post title"
            />
            <TextAreaField
              label="Content"
              id="content"
              inputRef={inputContentRef}
              placeholder="Write your post content..."
            />
            <ImageUploadField inputRef={inputImageRef} />
            
            {/* Activity Section */}
            <div className="border-t border-white/10 pt-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActivity}
                  onChange={(e) => setIsActivity(e.target.checked)}
                  className="w-5 h-5 rounded border-white/20 bg-white/5 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-300 font-medium">This is an activity/event</span>
              </label>
              
              {isActivity && (
                <div className="mt-4 space-y-4 pl-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Activity Type</label>
                    <select
                      value={activityType}
                      onChange={(e) => setActivityType(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select activity type</option>
                      {ACTIVITY_TYPES.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Date & Time</label>
                    <input
                      type="datetime-local"
                      value={activityDate}
                      onChange={(e) => setActivityDate(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Equipment Section */}
            <div className="border-t border-white/10 pt-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeEquipment}
                  onChange={(e) => setIncludeEquipment(e.target.checked)}
                  className="w-5 h-5 rounded border-white/20 bg-white/5 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-300 font-medium">Link to equipment (review)</span>
              </label>
              
              {includeEquipment && (
                <div className="mt-4 pl-8">
                  <label htmlFor="equipment-select" className="block text-sm font-medium text-gray-300 mb-2">Select Equipment</label>
                  <select
                    id="equipment-select"
                    value={selectedEquipmentId}
                    onChange={(e) => setSelectedEquipmentId(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select equipment...</option>
                    {equipmentList?.map(equip => (
                      <option key={equip.id} value={equip.id}>
                        {equip.brand} {equip.name} ({equip.category})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Location Section */}
            <div className="border-t border-white/10 pt-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeLocation}
                  onChange={(e) => setIncludeLocation(e.target.checked)}
                  className="w-5 h-5 rounded border-white/20 bg-white/5 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-300 font-medium">Include location</span>
              </label>
              
              {includeLocation && (
                <div className="mt-4 space-y-4 pl-8">
                  <InputField
                    label="Address"
                    id="address"
                    value={location.address}
                    onChange={(e) => setLocation({ ...location, address: e.target.value })}
                    placeholder="Street address"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      label="City"
                      id="city"
                      value={location.city}
                      onChange={(e) => setLocation({ ...location, city: e.target.value })}
                      placeholder="City"
                    />
                    <InputField
                      label="Country"
                      id="country"
                      value={location.country}
                      onChange={(e) => setLocation({ ...location, country: e.target.value })}
                      placeholder="Country"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8">
              <p className="mb-4 text-gray-300 text-sm font-medium text-center">Blade stats: <span className="font-normal">You can rate them from 5 to 10</span></p>
              <div className="flex flex-col gap-6 items-center">
                <div className="w-full max-w-md">
                  <h3 className="text-lg font-semibold text-white text-center mb-4">Stats</h3>
                  {STAT_CONFIG.map(({ key, label, color, tooltip }) => (
                    <div key={key} className="flex items-center gap-2 mb-4">
                      <label htmlFor={key} className="w-20 text-sm font-medium text-gray-300 flex items-center gap-1">
                        {label}
                        <span className="ml-1 text-sm text-gray-500" title={tooltip}>ⓘ</span>
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min={5}
                        max={10}
                        name={key}
                        id={key}
                        value={stats[key as keyof StatsState]}
                        onChange={handleStatChange}
                        className="w-20 px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors hover:bg-white/20 focus:bg-white/10 text-center"
                        placeholder="5.0"
                        required
                      />
                      <div className="flex-1">
                        <StatBar
                          label={label}
                          value={parseFloat(stats[key as keyof StatsState]) || 0}
                          color={color}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {isError && (
            <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded-md">
              Error: Failed to create post. Please try again.
            </div>
          )}

          <FormActions onCancel={handleCancel} isPending={isPending} />
        </form>
      </div>
    </div>
  );
}