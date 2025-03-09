import { GAP } from "@/constants/Dimensions";
import { Check as CheckIcon } from "@tamagui/lucide-icons";
import type { CheckboxProps } from "tamagui";
import { Checkbox, Label, XStack, YStack } from "tamagui";

const CheckboxWithLabel = ({
  size,
  label = "Accept terms and conditions",
  ...checkboxProps
}: CheckboxProps & { label?: string }) => {
  const id = `checkbox-${(size || "").toString().slice(1)}`;
  return (
    <XStack width={300} alignItems="center" gap={GAP}>
      <Checkbox id={id} size={size} {...checkboxProps}>
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox>
      <Label size={size} htmlFor={id}>
        {label}
      </Label>
    </XStack>
  );
};

export default CheckboxWithLabel;
