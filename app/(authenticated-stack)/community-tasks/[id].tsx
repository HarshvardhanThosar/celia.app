import React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useCommunityTaskById } from "@/hooks/useCommunityTaskById";
import ScreenWrapper from "@/components/screen-wrapper";
import {
  Adapt,
  Avatar,
  Button,
  Dialog,
  Fieldset,
  Form,
  Label,
  Paragraph,
  Sheet,
  Spinner,
  TextArea,
  XStack,
  YStack,
} from "tamagui";
import { GAP } from "@/constants/Dimensions";
import { CalendarDays, Timer, Users } from "@tamagui/lucide-icons";
import { difference_in_days } from "@/utils/dates";
import apis from "@/apis";
import { formatDistance } from "date-fns";
import Auth from "@/context/auth.context";
import { format_number } from "@/utils/numbers";
import Toast, { ToastType } from "@/utils/toasts";
import { MAX_TASK_DESCRIPTION_LENGTH } from "@/constants/Validations";
import StarRating from "@/components/ui/StarRating";
import * as yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// TODO:
// 1. Show task type and skills in the screen
// 2. Show participants data and button to accept participation
// 3. Show distance from current location for non-remote tasks and a get directions button to open maps app.
// 4. Show 'remote' text for remote tasks
// 5. Show score that the user would receive on participation.

// (ListRenderItemInfo<{
//     name: string;
//     profile_image?: string;
// }>): React.JSX.Element

const schema = yup
  .object({
    feedback_note: yup.string().optional(),
    rating: yup.number().min(1).max(5).optional(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const ParticipationTile = ({
  _id,
  name,
  profile_image,
}: {
  name: string;
  profile_image?: string;
  _id: string;
}) => {
  const { data: auth } = Auth.useAuth();

  const _name = _id == auth?._id ? `${name} • You` : name;
  const _avatar_initials = `${name.split(" ")[0].charAt(0)}${name
    .split(" ")[1]
    .charAt(0)}`;
  return (
    <XStack alignItems="center" gap={GAP}>
      <Avatar
        size={GAP * 3}
        circular
        backgroundColor="$background"
        alignItems="center"
        justifyContent="center"
      >
        {profile_image && (
          <Avatar.Image accessibilityLabel="Profile" src={profile_image} />
        )}
        <Avatar.Fallback alignItems="center" justifyContent="center">
          <Paragraph fontSize={GAP} textAlign="center">
            {_avatar_initials}
          </Paragraph>
        </Avatar.Fallback>
      </Avatar>
      <XStack>
        <Paragraph fontSize={16} fontWeight="500" numberOfLines={1}>
          {_name}
        </Paragraph>
        <Button onPress={null}>
          <Button.Text>Accept Participation</Button.Text>
        </Button>
      </XStack>
    </XStack>
  );
};

const index = () => {
  const _disable_adapt = false;
  const { data: auth } = Auth.useAuth();
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const {
    data: response_data,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useCommunityTaskById(id);
  const data = response_data?.data?.data;
  const _now = React.useMemo(() => new Date(), []);
  const _name =
    data?.owner_id == auth?._id
      ? `${data?.owner_details.name} • You`
      : data?.owner_details.name;
  const _avatar_initials = `${data?.owner_details?.name
    .split(" ")[0]
    .charAt(0)}${data?.owner_details?.name.split(" ")[1].charAt(0)}`;
  const _task_location_label = data?.is_remote ? "Remote" : "Athlone";
  const _days_label = difference_in_days(
    data?.starts_at ?? _now,
    data?.completes_at ?? _now
  );
  const _hours_label =
    _days_label < 2
      ? `${data?.hours_required_per_day}h`
      : `${data?.hours_required_per_day}h x ${_days_label}`;
  const _volunteer_required_label = data?.volunteers_required;
  const _days_from_label = formatDistance(data?.starts_at ?? _now, _now, {
    addSuffix: true,
  });

  const _on_participate = async () => {
    if (!data?._id) return;
    try {
      const _response = await apis.request_participation({
        task_id: data?._id,
      });
      console.log(_response);
      refetch();
    } catch (error: any) {
      const error_message =
        error?.response?.data?.message ||
        error?.message ||
        "An error occurred!";
      Toast.show(error_message, ToastType.ERROR);
    }
  };

  const _on_mark_as_complete = () => {};

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid, isValidating },
  } = useForm<FormData>({
    defaultValues: {
      feedback_note: "",
      rating: 0,
    },
    resolver: yupResolver(schema),
  });

  const _is_disable_submit_button = isSubmitting || isValidating;

  const onMarkAsCompleteSubmit: SubmitHandler<FormData> = async (form_data) => {
    if (!data?._id) return;
    const { feedback_note, rating } = form_data;
    try {
      // Replace with actual API call
      const _response = await apis.mark_task_as_complete_and_rate({
        feedback_note,
        rating,
        task_id: data?._id,
      });
      Toast.show("Feedback submitted successfully!", ToastType.SUCCESS);
    } catch (error) {
      Toast.show("Something went wrong!", ToastType.ERROR);
    }
  };

  console.log(data);

  const _content = !id ? (
    <YStack gap={GAP} p={GAP}>
      <Paragraph color="$red10">No task ID found</Paragraph>
    </YStack>
  ) : isLoading ? (
    <YStack alignItems="center" justifyContent="center" gap={GAP} p={GAP}>
      <ActivityIndicator />
    </YStack>
  ) : error ? (
    <YStack gap={GAP} p={GAP}>
      <Paragraph color="$red10">
        {response_data?.data.message ?? "Error: something went wrong!"}
      </Paragraph>
    </YStack>
  ) : (
    <YStack gap={GAP} p={GAP}>
      <XStack alignItems="center" gap={GAP}>
        <Avatar
          size={GAP * 3}
          circular
          backgroundColor="$background"
          alignItems="center"
          justifyContent="center"
        >
          {data?.owner_details?.profile_image && (
            <Avatar.Image
              accessibilityLabel="Profile"
              src={data?.owner_details?.profile_image}
            />
          )}
          <Avatar.Fallback alignItems="center" justifyContent="center">
            <Paragraph fontSize={GAP} textAlign="center">
              {_avatar_initials}
            </Paragraph>
          </Avatar.Fallback>
        </Avatar>
        <YStack>
          <Paragraph fontSize={16} fontWeight="500" numberOfLines={1}>
            {_name}
          </Paragraph>
          <Paragraph fontSize={12}>
            {_task_location_label}
            {" • "}
            {formatDistance(data?.created_at ?? _now, _now, {
              addSuffix: true,
            })}
          </Paragraph>
        </YStack>
      </XStack>
      <Paragraph>{data?.description}</Paragraph>
      <XStack alignItems="center" justifyContent="space-between">
        <XStack alignItems="center" gap={4}>
          <Timer size={16} />
          <Paragraph fontSize={14}>{_hours_label}</Paragraph>
        </XStack>
        <XStack alignItems="center" gap={4}>
          <Users size={16} />
          <Paragraph fontSize={14}>{_volunteer_required_label}</Paragraph>
        </XStack>
        <XStack alignItems="center" gap={4}>
          <CalendarDays size={16} />
          <Paragraph fontSize={14}>{_days_from_label}</Paragraph>
        </XStack>
      </XStack>
      <YStack>
        <Paragraph>Rating</Paragraph>
        <StarRating initialRating={data?.rating} />
      </YStack>

      <YStack>
        <Paragraph>Feedback Note</Paragraph>
        <Paragraph>{data?.feedback_note}</Paragraph>
      </YStack>
      <Button onPress={_on_participate}>
        <Button.Text>Request Participation</Button.Text>
      </Button>
      <Button onPress={_on_participate}>
        <Button.Text>Mark Attendance</Button.Text>
      </Button>
      <Dialog>
        <Dialog.Trigger asChild>
          <Button>Mark As Complete</Button>
        </Dialog.Trigger>
        {!_disable_adapt && (
          <Adapt when="sm" platform="touch">
            <Sheet
              animation="medium"
              zIndex={200000}
              modal
              dismissOnSnapToBottom
            >
              <Sheet.Frame padding={GAP} gap={GAP}>
                <Adapt.Contents />
              </Sheet.Frame>
              <Sheet.Overlay
                backgroundColor="$shadow6"
                animation="lazy"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
              />
            </Sheet>
          </Adapt>
        )}
        <Dialog.Portal>
          <Dialog.Overlay
            key="overlay"
            backgroundColor="$shadow6"
            animation="slow"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <Dialog.Content
            bordered
            elevate
            key="content"
            animateOnly={["transform", "opacity"]}
            animation={[
              "quicker",
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
            gap={GAP}
          >
            <Dialog.Title>Are you sure?</Dialog.Title>
            <Dialog.Description>
              <YStack>
                <Paragraph>
                  Are you sure you want to mark this task as complete?
                </Paragraph>
              </YStack>
            </Dialog.Description>
            <Form onSubmit={handleSubmit(onMarkAsCompleteSubmit)} gap={GAP}>
              <Controller
                control={control}
                name="feedback_note"
                render={({ field: { onChange, value, onBlur } }) => (
                  <Fieldset>
                    <Label htmlFor="feedback_note">Leave a feedback note</Label>
                    <TextArea
                      placeholder="Enter your feedback (optional)"
                      id="feedback_note"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      maxLength={MAX_TASK_DESCRIPTION_LENGTH}
                      minHeight={GAP}
                      minBlockSize={GAP}
                    />
                    <Paragraph pt={GAP}>
                      This note would only be visible just to you and the
                      participants who have worked on this task.
                    </Paragraph>
                  </Fieldset>
                )}
              />
              <Controller
                control={control}
                name="rating"
                render={({ field: { value, onChange } }) => (
                  <Fieldset>
                    <Label>Please rate the task</Label>
                    <StarRating
                      initialRating={value ?? 0}
                      onRatingChange={onChange}
                      size={GAP * 2.5}
                    />
                  </Fieldset>
                )}
              />
              <YStack gap={GAP}>
                <Dialog.Close displayWhenAdapted asChild>
                  <Form.Trigger asChild>
                    <Button
                      disabled={_is_disable_submit_button}
                      theme="accent"
                      aria-label="Submit"
                      icon={isSubmitting ? () => <Spinner /> : undefined}
                    >
                      <Button.Text>Submit</Button.Text>
                    </Button>
                  </Form.Trigger>
                </Dialog.Close>
                <Dialog.Close displayWhenAdapted asChild>
                  <Button theme="alt1" aria-label="Close">
                    Cancel
                  </Button>
                </Dialog.Close>
              </YStack>
            </Form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
      <FlatList
        scrollEnabled={false}
        ListHeaderComponent={
          <Paragraph>{`Participation Requests • ${format_number(
            data?.participants?.length ?? 0
          )}`}</Paragraph>
        }
        renderItem={
          ({ index, item }) => null
          // <ParticipationTile key={index} {...{ item }} />
        }
        data={data?.participants}
      />
    </YStack>
  );

  return (
    <ScreenWrapper
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
    >
      {_content}
    </ScreenWrapper>
  );
};

export default index;

const styles = StyleSheet.create({});
