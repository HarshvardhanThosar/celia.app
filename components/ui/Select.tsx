import React from "react";
import { Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import type { FontSizeTokens } from "tamagui";
import { Adapt, Select, Sheet, YStack, getFontSize } from "tamagui";
import type { SizeTokens } from "@tamagui/core";
import { LinearGradient } from "tamagui/linear-gradient";

type Option = {
  name: string;
  value: string;
};

type SelectInputProps = {
  id?: string;
  label: string;
  placeHolder: string;
  defaultValue?: string;
  value: string;
  onChange: (x: string) => void;
  native?: boolean;
  options: Option[];
  size?: number | "unset" | SizeTokens | undefined;
};

const SelectInput = ({
  onChange,
  value,
  defaultValue,
  options,
  ...props
}: SelectInputProps) => {
  return (
    <Select
      value={value ? value : defaultValue ? defaultValue : props.placeHolder}
      onValueChange={onChange}
      disablePreventBodyScroll
      defaultValue={
        value ? value : defaultValue ? defaultValue : props.placeHolder
      }
      {...props}
    >
      <Select.Trigger iconAfter={ChevronDown}>
        <Select.Value placeholder={props.placeHolder} />
      </Select.Trigger>
      <Adapt when="sm" platform="touch">
        <Sheet
          native={true}
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: "spring",
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>
      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={["$background", "transparent"]}
            borderRadius="$4"
          />
        </Select.ScrollUpButton>
        <Select.Viewport
          animation="quick"
          animateOnly={["transform", "opacity"]}
          enterStyle={{ o: 0, y: -10 }}
          exitStyle={{ o: 0, y: 10 }}
          minWidth={200}
        >
          <Select.Group>
            <Select.Label>{props.label}</Select.Label>
            {React.useMemo(
              () =>
                options.map((option, _index) => {
                  return (
                    <Select.Item
                      index={_index}
                      key={option.value}
                      value={option.value}
                    >
                      <Select.ItemText>{option.name}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  );
                }),
              [options]
            )}
          </Select.Group>
          {props.native && (
            <YStack
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              alignItems="center"
              justifyContent="center"
              width={"$4"}
              height={"$4"}
              pointerEvents="none"
            >
              <ChevronDown
                size={getFontSize((props.size as FontSizeTokens) ?? "$true")}
              />
            </YStack>
          )}
        </Select.Viewport>
        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronDown size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={["transparent", "$background"]}
            borderRadius="$4"
          />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
};

export default SelectInput;
