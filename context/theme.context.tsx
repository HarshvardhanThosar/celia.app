import React from "react";
import createGlobalState from "@/context/global";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./client";
import { ColorSchemeName, Appearance } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { TamaguiProvider } from "tamagui";
import { tamaguiConfig } from "../tamagui.config";

const systemTheme = Appearance.getColorScheme() ?? "light";
const useTheme = createGlobalState<ColorSchemeName>(["theme"], systemTheme);

const Provider = ({ children }: React.PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeWrapper>{children}</ThemeWrapper>
    </QueryClientProvider>
  );
};

const ThemeWrapper = ({ children }: React.PropsWithChildren) => {
  const { data: theme, set } = useTheme();

  React.useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      set(colorScheme ?? "light");
    });

    return () => subscription.remove();
  }, []);

  const safeTheme = theme === "dark" || theme === "light" ? theme : "light";

  return (
    <React.Fragment>
      <TamaguiProvider
        config={tamaguiConfig}
        defaultTheme={safeTheme as string}
        key={safeTheme}
      >
        <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
          {children}
        </ThemeProvider>
      </TamaguiProvider>
    </React.Fragment>
  );
};

const Theme = { Provider, useTheme };

export default Theme;
