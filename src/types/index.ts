import { Library, SpeedLevel, AnimationLevel } from "@/data/libraries";

export type { Library, SpeedLevel, AnimationLevel };

export interface UserConstraints {
    context: string; // 'dashboard' | 'marketing' | 'saas' | 'mobile'
    speed: SpeedLevel;
    animation: AnimationLevel;
    aiReliance: 'manual' | 'ai';
}
