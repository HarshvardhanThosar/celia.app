import React, { useState, useMemo } from "react";
import { Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { XStack, Input } from "tamagui";
import { Calendar, Clock } from "@tamagui/lucide-icons";

type IOSMode = "date" | "time" | "datetime" | "countdown";
type AndroidMode = "date" | "time";
interface DatePickerProps {
  mode?: IOSMode | AndroidMode;
  minimumDate?: Date;
  maximumDate?: Date;
  onChange?: (date: Date) => void;
  onConfirm?: (date: Date) => void;
}

const CustomDateTimePicker: React.FC<DatePickerProps> = ({
  mode = "date",
  minimumDate,
  maximumDate,
  onChange,
  onConfirm,
}) => {
  const _default_date = useMemo(() => new Date(), []);
  const [date, set_date] = useState<Date | null>(null);
  const [show, set_show] = useState(false);

  const handleConfirm = (event: any, selectedDate?: Date) => {
    set_show(false);
    if (selectedDate) {
      set_date(selectedDate);
      onConfirm?.(selectedDate);
      onChange?.(selectedDate);
    }
  };

  return (
    <>
      <Pressable onPress={() => set_show(true)}>
        <XStack alignItems="center" justifyContent="flex-end">
          <Input pointerEvents="none" editable={false} flexGrow={1}>
            {mode === "date" &&
              (date ? date.toLocaleDateString() : "Select Date")}
            {mode === "time" &&
              (date ? date.toLocaleTimeString() : "Select Time")}
            {mode === "datetime" &&
              (date ? date.toLocaleString() : "Select Date & Time")}
          </Input>

          <XStack paddingRight={10} position="absolute">
            {mode === "date" && <Calendar />}
            {mode === "time" && <Clock />}
            {mode === "datetime" && <Calendar />}
          </XStack>
        </XStack>
      </Pressable>

      {show && (
        <DateTimePicker
          value={date || _default_date}
          mode={mode === "datetime" ? "date" : mode}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          onChange={handleConfirm}
        />
      )}
    </>
  );
};

export default CustomDateTimePicker;
