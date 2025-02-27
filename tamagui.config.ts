import { config as configv3 } from "@tamagui/config/v3";
// import { defaultConfig as configv4 } from "@tamagui/config/v4";
import { createTamagui } from "tamagui";
import { themes } from "@/constants/Themes";

export const tamaguiConfig = createTamagui({
  // ...configv4,
  ...configv3,
  themes,
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
