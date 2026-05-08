import { useState } from "react";
import { useEquipmentRecommend, RecommendRequest } from "@/hooks/equipment";
import SEOHead from "@/components/SEO/SEOHead";
import { SpecBar } from "@/components/shared/SpecBar/SpecBar";

const PLAYING_STYLES: {
  value: RecommendRequest["playing_style"];
  label: string;
}[] = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "attacker", label: "Attacker" },
  { value: "defender", label: "Defender" },
  { value: "all_rounder", label: "All-Rounder" },
];

const BRANDS = [
  "Butterfly",
  "Donic",
  "DHS",
  "Nittaku",
  "Xiom",
  "Tibhar",
  "Andro",
  "Stiga",
];

export default function SetupRecommenderPage() {
  const [style, setStyle] =
    useState<RecommendRequest["playing_style"]>("beginner");
  const [budget, setBudget] = useState<string>("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const recommendMutation = useEquipmentRecommend();

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  };

  const handleSubmit = () => {
    const request: RecommendRequest = {
      playing_style: style,
      budget_usd: budget ? parseFloat(budget) : undefined,
      preferred_brands: selectedBrands.length > 0 ? selectedBrands : undefined,
    };
    recommendMutation.mutate(request);
  };

  const result = recommendMutation.data;

  return (
    <>
      <SEOHead
        title="Find My Setup - TT Cyclopedia"
        description="Get personalized table tennis equipment recommendations based on your playing style, budget, and preferences."
        canonical="/setup-recommender"
      />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Find My Setup</h1>
          <p className="text-gray-400">
            Get personalized equipment recommendations
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Playing Style
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {PLAYING_STYLES.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setStyle(s.value)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    style === s.value
                      ? "bg-blue-600 text-white"
                      : "bg-white/5 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Budget (USD)
            </label>
            <input
              type="number"
              placeholder="e.g. 200"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full md:w-64 px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave empty for no budget limit
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Preferred Brands (optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {BRANDS.map((brand) => (
                <button
                  key={brand}
                  onClick={() => handleBrandToggle(brand)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    selectedBrands.includes(brand)
                      ? "bg-blue-600 text-white"
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={recommendMutation.isPending}
            className="w-full md:w-auto px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
          >
            {recommendMutation.isPending
              ? "Finding your setup..."
              : "Get Recommendations"}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">
              Your Recommended Setup
            </h2>

            {result.total_price_usd && (
              <p className="text-green-400 font-medium">
                Estimated Total: ${result.total_price_usd.toFixed(2)}
              </p>
            )}

            <div className="grid md:grid-cols-3 gap-6">
              {/* Blade */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-5">
                <div className="text-xs font-medium text-blue-400 uppercase tracking-wider mb-2">
                  Blade
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {result.blade.name}
                </h3>
                <p className="text-sm text-gray-400 mb-3">
                  {result.blade.brand}
                </p>
                {result.blade.blade_specs && (
                  <>
                    <SpecBar
                      label="Speed"
                      value={result.blade.blade_specs.speed}
                    />
                    <SpecBar
                      label="Control"
                      value={result.blade.blade_specs.control}
                    />
                    <SpecBar
                      label="Stiffness"
                      value={result.blade.blade_specs.stiffness}
                    />
                  </>
                )}
                {result.blade.price_usd && (
                  <p className="text-green-400 font-medium mt-3">
                    ${result.blade.price_usd.toFixed(2)}
                  </p>
                )}
              </div>

              {/* FH Rubber */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-5">
                <div className="text-xs font-medium text-red-400 uppercase tracking-wider mb-2">
                  Forehand Rubber
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {result.rubber_forehand.name}
                </h3>
                <p className="text-sm text-gray-400 mb-3">
                  {result.rubber_forehand.brand}
                </p>
                {result.rubber_forehand.rubber_specs && (
                  <>
                    <SpecBar
                      label="Speed"
                      value={result.rubber_forehand.rubber_specs.speed}
                    />
                    <SpecBar
                      label="Spin"
                      value={result.rubber_forehand.rubber_specs.spin}
                    />
                    <SpecBar
                      label="Control"
                      value={result.rubber_forehand.rubber_specs.control}
                    />
                  </>
                )}
                {result.rubber_forehand.price_usd && (
                  <p className="text-green-400 font-medium mt-3">
                    ${result.rubber_forehand.price_usd.toFixed(2)}
                  </p>
                )}
              </div>

              {/* BH Rubber */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-5">
                <div className="text-xs font-medium text-purple-400 uppercase tracking-wider mb-2">
                  Backhand Rubber
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {result.rubber_backhand.name}
                </h3>
                <p className="text-sm text-gray-400 mb-3">
                  {result.rubber_backhand.brand}
                </p>
                {result.rubber_backhand.rubber_specs && (
                  <>
                    <SpecBar
                      label="Speed"
                      value={result.rubber_backhand.rubber_specs.speed}
                    />
                    <SpecBar
                      label="Spin"
                      value={result.rubber_backhand.rubber_specs.spin}
                    />
                    <SpecBar
                      label="Control"
                      value={result.rubber_backhand.rubber_specs.control}
                    />
                  </>
                )}
                {result.rubber_backhand.price_usd && (
                  <p className="text-green-400 font-medium mt-3">
                    ${result.rubber_backhand.price_usd.toFixed(2)}
                  </p>
                )}
              </div>
            </div>

            {/* Reasoning */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                Why this setup?
              </h3>
              <div className="text-gray-300 whitespace-pre-line leading-relaxed">
                {result.reasoning}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
