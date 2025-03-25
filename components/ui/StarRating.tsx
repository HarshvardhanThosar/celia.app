// components/ui/StarRating.tsx

import React, { useState } from "react";
import { Pressable } from "react-native";
import { XStack, Text } from "tamagui";
import { Star } from "@tamagui/lucide-icons";
import { GAP } from "@/constants/Dimensions";

type StarRatingProps = {
  maxRating?: number;
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
  size?: number;
};

const StarRating = ({
  maxRating = 5,
  initialRating = 0,
  onRatingChange,
  size = GAP,
}: StarRatingProps) => {
  const [rating, setRating] = useState(initialRating);

  React.useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handlePress = (value: number) => {
    if (onRatingChange) {
      setRating(value);
      onRatingChange(value);
    }
  };

  return (
    <XStack space="$2" alignItems="center">
      {[...Array(maxRating)].map((_, index) => {
        const value = index + 1;
        const filled = value <= rating;

        return (
          <Pressable key={index} onPress={() => handlePress(value)}>
            <Star
              size={size}
              color={filled ? "#FFD700" : "#ccc"}
              fill={filled ? "#FFD700" : "none"}
            />
          </Pressable>
        );
      })}
      <Text>
        {rating}/{maxRating}
      </Text>
    </XStack>
  );
};

export default StarRating;
