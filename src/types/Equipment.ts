export type BladeSpecs = {
  id: string;
  equipment_id: string;
  speed?: number;
  control?: number;
  stiffness?: number;
  hardness?: number;
  weight_min?: number;
  weight_max?: number;
  plies?: number;
  material?: string;
  thickness?: number;
  head_size?: string;
  handle_types?: string;
};

export type RubberSpecs = {
  id: string;
  equipment_id: string;
  speed?: number;
  spin?: number;
  control?: number;
  tackiness?: number;
  grip?: number;
  sponge_thickness?: string;
  sponge_hardness?: string;
  top_sheet?: string;
  weight?: string;
  durability?: number;
};

export type Equipment = {
  id: string;
  name: string;
  brand: string;
  category: "blade" | "rubber" | "ball" | "table" | "net" | "shoes" | "other";
  subcategory?: string;
  description?: string;
  image_url?: string;
  price_usd?: number;
  release_year?: number;
  discontinued: number;
  timestamp: string;
  avg_rating?: number;
  review_count: number;
};

export type EquipmentDetail = Equipment & {
  blade_specs?: BladeSpecs;
  rubber_specs?: RubberSpecs;
};

export type EquipmentReview = {
  id: string;
  equipment_id: string;
  user_id: string;
  username: string;
  rating: number;
  speed_rating?: number;
  spin_rating?: number;
  control_rating?: number;
  review_text?: string;
  setup_blade_id?: string;
  setup_rubber_forehand_id?: string;
  setup_rubber_backhand_id?: string;
  timestamp: string;
};

export type SetupRecommendation = {
  blade: EquipmentDetail;
  rubber_forehand: EquipmentDetail;
  rubber_backhand: EquipmentDetail;
  total_price_usd?: number;
  reasoning: string;
};
