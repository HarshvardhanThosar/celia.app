import React from "react";
import { StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { RefreshControl } from "react-native";
import { Coins, CalendarDays } from "@tamagui/lucide-icons";
import { formatDistance } from "date-fns";
import { format_number } from "@/utils/numbers";
import { useFetchCouponById } from "@/hooks/useCouponById";
import ScreenWrapper from "@/components/screen-wrapper";
import { COUPON_CROP_IMAGE_ASPECT_RATIO, GAP } from "@/constants/Dimensions";
import { Image, XStack, YStack, Paragraph, Spinner, H5 } from "tamagui";
import mixpanel from "@/services/mixpanel";
import MixpanelEvents from "@/services/mixpanel-events";
import Auth from "@/context/auth.context";

const CouponDetailScreen = () => {
  const { data: auth } = Auth.useAuth();
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const { data, isLoading, isError, isRefetching, refetch } =
    useFetchCouponById(id);

  const _now = React.useMemo(() => new Date(), []);
  const _days_from_label = data?.expiry_date
    ? formatDistance(data.expiry_date, _now, { addSuffix: true })
    : "";

  React.useEffect(() => {
    if (data?._id) {
      mixpanel.track(MixpanelEvents.retail_item_view, {
        id: auth?._id,
      });
    }
  }, [data?._id]);

  if (isLoading) {
    return (
      <ScreenWrapper scrollable>
        <YStack
          flex={1}
          justifyContent="center"
          alignItems="center"
          gap={GAP}
          px={GAP}
        >
          <Spinner />
          <Paragraph>Loading coupon details...</Paragraph>
        </YStack>
      </ScreenWrapper>
    );
  }

  if (isError || !data) {
    return (
      <ScreenWrapper scrollable>
        <YStack
          flex={1}
          justifyContent="center"
          alignItems="center"
          gap={GAP}
          px={GAP}
        >
          <Paragraph color="$red10">Failed to load coupon</Paragraph>
        </YStack>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper
      scrollable
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
    >
      <YStack style={styles.coupon_container} p={GAP} gap={GAP}>
        <Image
          w="100%"
          aspectRatio={COUPON_CROP_IMAGE_ASPECT_RATIO}
          borderRadius={GAP / 2}
          alt=""
          objectFit="contain"
          backgroundColor="$background"
          source={{ uri: data?.thumbnail }}
        />
        <YStack gap={5}>
          <Paragraph numberOfLines={1}>{data?.name}</Paragraph>
          <Paragraph fontSize={12}>
            {data?.retailer.name} • {data?.retailer.store}
          </Paragraph>
        </YStack>
        <XStack
          alignItems="center"
          justifyContent="space-between"
          gap={GAP * 2}
        >
          <XStack alignItems="center" gap={GAP / 4} flex={1}>
            <Coins size={14} />
            <Paragraph numberOfLines={1} fontSize={14}>
              {format_number(data?.points ?? 0)}
            </Paragraph>
          </XStack>
          <XStack alignItems="center" gap={GAP / 4}>
            <CalendarDays size={16} />
            <Paragraph>{_days_from_label}</Paragraph>
          </XStack>
        </XStack>
      </YStack>
    </ScreenWrapper>
  );
};

export default CouponDetailScreen;

const styles = StyleSheet.create({
  coupon_container: {},
});
