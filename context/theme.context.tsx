import React from "react";
import createGlobalState from "@/context/global";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./client";
import { ColorSchemeName, useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { TamaguiProvider } from "tamagui";
import { tamaguiConfig } from "../tamagui.config";

const useTheme = createGlobalState<ColorSchemeName>(["theme"], "light");

const Provider = ({ children }: React.PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeWrapper>{children}</ThemeWrapper>
    </QueryClientProvider>
  );
};

const ThemeWrapper = ({ children }: React.PropsWithChildren) => {
  const color_scheme = useColorScheme();
  const { data: theme, set } = useTheme();

  React.useEffect(() => {
    set(color_scheme);
    return;
  }, [color_scheme]);

  return (
    <React.Fragment>
      <TamaguiProvider config={tamaguiConfig} defaultTheme={theme as string}>
        <ThemeProvider
          // value={theme === "dark" ? DarkTheme : DefaultTheme}v
          value={DefaultTheme}
        >
          {children}
        </ThemeProvider>
      </TamaguiProvider>
    </React.Fragment>
  );
};

const Theme = { Provider, useTheme };

export default Theme;
