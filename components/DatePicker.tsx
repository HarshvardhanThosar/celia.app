import React from "react";
import { Pressable, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { XStack, Input, TamaguiElement, StackProps } from "tamagui";
import { Calendar, Clock } from "@tamagui/lucide-icons";
import { GAP } from "@/constants/Dimensions";

type IOSMode = "date" | "time" | "datetime" | "countdown";
type AndroidMode = "date" | "time";

interface DatePickerProps extends StackProps {
  mode?: IOSMode | AndroidMode;
  date?: Date;
  minimumDate?: Date;
  maximumDate?: Date;
  placeholder?: string;
  onChange?: (date: Date) => void;
  onConfirm?: (date: Date) => void;
}

const CustomDateTimePicker = React.forwardRef<TamaguiElement, DatePickerProps>(
  (
    {
      mode = "date",
      date,
      minimumDate,
      maximumDate,
      placeholder,
      onChange,
      onConfirm,
      ...tamaguiProps
    },
    ref
  ) => {
    const _default_date = React.useMemo(() => new Date(), []);
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
      date || null
    );
    const [show, setShow] = React.useState(false);

    // Sync state with external `date` prop
    React.useEffect(() => {
      if (date) {
        setSelectedDate(date);
      }
    }, [date]);

    const handleConfirm = (event: any, selectedDate?: Date) => {
      setShow(false);
      if (selectedDate) {
        setSelectedDate(selectedDate);
        onConfirm?.(selectedDate);
        onChange?.(selectedDate);
      }
    };

    return (
      <XStack
        ref={ref}
        {...tamaguiProps}
        style={{
          position: "relative",
        }}
      >
        <Pressable onPress={() => setShow(true)} style={{ flex: 1, zIndex: 0 }}>
          <XStack alignItems="center" justifyContent="flex-end">
            <Input
              pointerEvents="none"
              editable={false}
              flexGrow={1}
              value={
                Platform.OS == "ios" && show
                  ? ""
                  : {
                      date: selectedDate
                        ? selectedDate.toLocaleDateString()
                        : placeholder || "Select Date",
                      time: selectedDate
                        ? selectedDate.toLocaleTimeString()
                        : placeholder || "Select Time",
                      datetime: selectedDate
                        ? selectedDate.toLocaleString()
                        : placeholder || "Select Date & Time",
                      countdown: selectedDate
                        ? selectedDate.toLocaleTimeString()
                        : placeholder || "Select Time",
                    }[mode]
              }
            />
            <XStack paddingRight={10} position="absolute">
              {mode === "date" && <Calendar size={GAP} />}
              {mode === "time" && <Clock size={GAP} />}
              {mode === "datetime" && <Calendar size={GAP} />}
            </XStack>
          </XStack>
        </Pressable>

        {show && (
          <DateTimePicker
            value={selectedDate || _default_date}
            mode={mode === "datetime" ? "date" : mode}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            onChange={handleConfirm}
            collapsable
            collapsableChildren
            display={Platform.select({ ios: "compact", android: "compact" })}
            textColor=""
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              minHeight: "100%",
              zIndex: 1,
              borderRadius: 10,
              alignItems: "flex-start",
            }}
          />
        )}
      </XStack>
    );
  }
);

export default CustomDateTimePicker;
