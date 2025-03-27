import React from "react";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import { useLocalSearchParams } from "expo-router";
import useCommunityTaskById from "@/hooks/useCommunityTaskById";
import ScreenWrapper from "@/components/screen-wrapper";
import {
  Accordion,
  Adapt,
  Button,
  Dialog,
  Fieldset,
  Form,
  H5,
  Input,
  Label,
  Paragraph,
  Sheet,
  Spinner,
  TextArea,
  XStack,
  YStack,
} from "tamagui";
import { GAP } from "@/constants/Dimensions";
import {
  CalendarDays,
  Check,
  ChevronDown,
  Coins,
  Timer,
  Users,
  X,
} from "@tamagui/lucide-icons";
import { difference_in_days } from "@/utils/dates";
import apis from "@/apis";
import { formatDistance } from "date-fns";
import { format_number } from "@/utils/numbers";
import Toast, { ToastType } from "@/utils/toasts";
import { MAX_TASK_DESCRIPTION_LENGTH } from "@/constants/Validations";
import StarRating from "@/components/ui/StarRating";
import * as yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ParticipantType } from "@/types/apis";
import Avatar from "@/components/ui/Avatar";
import MediaGallery from "@/components/ui/MediaGallery";
import { Square } from "tamagui";
import useProfile from "@/hooks/useProfile";

// TODO:
// 1. Show task type and skills in the screen
// 2. Show participants data and button to accept participation
// 3. Show distance from current location for non-remote tasks and a get directions button to open maps app.
// 4. Show 'remote' text for remote tasks
// 5. Show score that the user would receive on participation.

const schema = yup
  .object({
    feedback_note: yup.string().optional(),
    rating: yup.number().min(1).max(5).optional(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const attendanceSchema = yup
  .object({
    code: yup
      .string()
      .required("Attendance code is required")
      .matches(/^\d{4}$/, "Code must be a 4-digit number"),
  })
  .required();

type AttendanceFormData = yup.InferType<typeof attendanceSchema>;

const index = () => {
  const { data: auth } = useProfile();
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const {
    data: response_data,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useCommunityTaskById(id);
  const data = response_data?.data;
  const _now = React.useMemo(() => new Date(), []);
  const today = _now.toISOString().split("T")[0];
  const show_today_attendance_code =
    auth?._id === data?.owner_id && data?.daily_attendance_codes?.[today];
  const todays_code = data?.daily_attendance_codes?.[today];
  const _name =
    data?.owner_id == auth?._id
      ? `${data?.owner_details.name} • You`
      : data?.owner_details.name;
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
  const _show_mark_as_complete_button =
    data?.owner_id === auth?._id &&
    data?.status !== "completed" &&
    data?.status !== "invalid";
  const _show_request_participation_button =
    data?.owner_id !== auth?._id &&
    !data?.participants.find(({ _id }) => _id === auth?._id);
  const _show_mark_attendance_button = data?.participants.find(
    ({ _id, status }) => _id === auth?._id && status === "accepted"
  );
  const _show_requested_button = data?.participants.find(
    ({ _id, status }) => _id === auth?._id && status === "requested"
  );
  const _show_rejected_button = data?.participants.find(
    ({ _id, status }) => _id === auth?._id && status === "rejected"
  );
  const _score = React.useMemo(() => {
    return data?.score_breakdown?.reduce(
      (acc, item) => acc + (item?.score ?? 0),
      0
    );
  }, [data?.score_breakdown]);
  const _on_participate = async () => {
    if (!data?._id) return;
    try {
      const _response = await apis.request_participation({
        task_id: data?._id,
      });
      refetch();
      const message = _response?.data?.message ?? "Request sent successfully!";
      Toast.show(message, ToastType.SUCCESS);
    } catch (error: any) {
      const error_message =
        error?.response?.data?.message ||
        error?.message ||
        "An error occurred!";
      Toast.show(error_message, ToastType.ERROR);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValidating },
  } = useForm<FormData>({
    defaultValues: {
      feedback_note: "",
      rating: 0,
    },
    resolver: yupResolver(schema),
  });

  const {
    control: attendanceControl,
    handleSubmit: handleAttendanceSubmit,
    formState: {
      isSubmitting: isAttendanceSubmitting,
      isValidating: isAttendanceValidating,
    },
  } = useForm<AttendanceFormData>({
    defaultValues: {
      code: "",
    },
    resolver: yupResolver(attendanceSchema),
  });

  const _is_disable_submit_button = isSubmitting || isValidating;

  const onMarkAsCompleteSubmit: SubmitHandler<FormData> = async (form_data) => {
    if (!data?._id) return;
    const { feedback_note, rating } = form_data;
    try {
      const _response = await apis.mark_task_as_complete_and_rate({
        task_id: data?._id,
        feedback_note,
        rating,
      });
      const message =
        _response?.data?.message ?? "Feedback submitted successfully!";
      Toast.show(message, ToastType.SUCCESS);
    } catch (error: any) {
      const error_message =
        error?.response?.data?.message ||
        error?.message ||
        "An error occurred!";
      Toast.show(error_message, ToastType.ERROR);
    }
  };

  const _onMarkAttendanceSubmit: SubmitHandler<AttendanceFormData> = async ({
    code,
  }) => {
    if (data?._id)
      try {
        const _response = await apis.mark_attendance({
          task_id: data?._id,
          code,
        });
        Toast.show(
          _response?.data?.message ?? "Attendance marked!",
          ToastType.SUCCESS
        );
        refetch();
      } catch (error: any) {
        const error_message =
          error?.response?.data?.message ||
          error?.message ||
          "An error occurred!";
        Toast.show(error_message, ToastType.ERROR);
      }
  };

  const ParticipationTile = ({
    name,
    profile_image,
    requested_at,
    status,
    updated_at,
    user_id,
  }: {} & ParticipantType) => {
    const _now = React.useMemo(() => new Date(), []);
    // const _show_cancel_request_button = status === "accepted";
    const _show_cancel_request_button = false;
    const _show_accept_request_button = status !== "accepted";
    const _name = user_id == auth?._id ? `${name} • You` : name;
    const _accept_request = async () => {
      if (!data?._id) return;
      try {
        const _response = await apis.accept_participation({
          participant_id: user_id,
          task_id: data?._id,
        });
        const message =
          _response?.data?.message ?? "Request sent successfully!";
        refetch();
        Toast.show(message, ToastType.SUCCESS);
      } catch (error: any) {
        const error_message =
          error?.response?.data?.message ||
          error?.message ||
          "An error occurred!";
        Toast.show(error_message, ToastType.ERROR);
      }
    };

    const _cancel_request = async () => {
      if (!data?._id) return;
      try {
        const _response = await apis.accept_participation({
          participant_id: user_id,
          task_id: data?._id,
        });
        const message =
          _response?.data?.message ?? "Request sent successfully!";
        refetch();
        Toast.show(message, ToastType.SUCCESS);
      } catch (error: any) {
        const error_message =
          error?.response?.data?.message ||
          error?.message ||
          "An error occurred!";
        Toast.show(error_message, ToastType.ERROR);
      }
    };

    return (
      <XStack
        alignItems="center"
        gap={GAP / 2}
        p={GAP}
        borderColor="$color"
        borderWidth="$0.25"
        borderRadius="$6"
      >
        <Avatar name={name} profile_image={profile_image} size={GAP * 2.5} />
        <XStack flex={1} gap={GAP} alignItems="center">
          <YStack flex={1}>
            <Paragraph fontSize={16} fontWeight="500" numberOfLines={1}>
              {_name}
            </Paragraph>
            <Paragraph fontSize="$2">
              {status === "requested"
                ? `Requested ${formatDistance(requested_at, _now)}`
                : null}
              {status === "accepted"
                ? `Accepted ${formatDistance(updated_at, _now)}`
                : null}
              {status === "rejected"
                ? `Rejected ${formatDistance(updated_at, _now)}`
                : null}
            </Paragraph>
          </YStack>
          <XStack gap={GAP}>
            {_show_accept_request_button ? (
              <Button theme="accent" size="$3" p="$2" onPress={_accept_request}>
                <Check size="$1" />
              </Button>
            ) : null}
            {_show_cancel_request_button ? (
              <Button
                theme="error_surface1"
                size="$3"
                p="$2"
                onPress={_cancel_request}
              >
                <X size="$1" />
              </Button>
            ) : null}
          </XStack>
        </XStack>
      </XStack>
    );
  };

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
        {response_data?.message ?? "Error: something went wrong!"}
      </Paragraph>
    </YStack>
  ) : (
    <YStack gap={GAP} py={GAP}>
      <XStack px={GAP} alignItems="center" gap={GAP}>
        <Avatar
          name={data?.owner_details.name}
          profile_image={data?.owner_details.profile_image}
          size={GAP * 3}
        />
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
      <Paragraph px={GAP}>{data?.description}</Paragraph>
      <MediaGallery media={data?.media} variant="list" />

      <XStack px={GAP} alignItems="center" justifyContent="space-between">
        <XStack alignItems="center" gap={4}>
          <Timer size={16} />
          <Paragraph fontSize={14}>{_hours_label}</Paragraph>
        </XStack>
        <XStack alignItems="center" gap={4}>
          <Users size={16} />
          <Paragraph fontSize={14}>{_volunteer_required_label}</Paragraph>
        </XStack>
      </XStack>
      <XStack px={GAP} alignItems="center" justifyContent="space-between">
        <XStack alignItems="center" gap={4}>
          <Coins size={16} />
          <Paragraph fontSize={14}>{format_number(_score ?? 0)}</Paragraph>
        </XStack>
        <XStack alignItems="center" gap={4}>
          <CalendarDays size={16} />
          <Paragraph fontSize={14}>{_days_from_label}</Paragraph>
        </XStack>
      </XStack>
      <YStack px={GAP}>
        <Accordion overflow="hidden" type="single" borderWidth={0}>
          <Accordion.Item value="a1">
            <Accordion.Trigger
              flexDirection="row"
              justifyContent="space-between"
              borderWidth={0}
            >
              {({ open }: { open: boolean }) => (
                <>
                  <Paragraph>Score breakdown</Paragraph>
                  <Square animation="quick" rotate={open ? "180deg" : "0deg"}>
                    <ChevronDown size="$1" />
                  </Square>
                </>
              )}
            </Accordion.Trigger>
            <Accordion.HeightAnimator animation="medium">
              <Accordion.Content
                animation="medium"
                exitStyle={{ opacity: 0 }}
                background="red"
              >
                <FlatList
                  scrollEnabled={false}
                  data={data?.score_breakdown}
                  renderItem={({ index, item }) =>
                    item?.score > 0 && item.key != "random_hook" ? (
                      <XStack key={index}>
                        <Paragraph flex={1}>{item?.label}</Paragraph>
                        <XStack justifyContent="space-between" w="$5">
                          <Paragraph>•</Paragraph>
                          <Paragraph>{item.score}</Paragraph>
                        </XStack>
                      </XStack>
                    ) : null
                  }
                />
              </Accordion.Content>
            </Accordion.HeightAnimator>
          </Accordion.Item>
        </Accordion>
      </YStack>
      {show_today_attendance_code ? (
        <YStack px={GAP}>
          <Paragraph>Today's attendance code</Paragraph>
          <H5>{todays_code}</H5>
        </YStack>
      ) : null}
      {(data?.rating ?? 0) > 0 ? (
        <YStack px={GAP}>
          <Paragraph>Rating</Paragraph>
          <StarRating initialRating={data?.rating} />
        </YStack>
      ) : null}
      {data?.feedback_note ? (
        <YStack px={GAP}>
          <Paragraph>Feedback Note</Paragraph>
          <Paragraph>{data?.feedback_note}</Paragraph>
        </YStack>
      ) : null}
      {_show_request_participation_button ? (
        <YStack px={GAP}>
          <Button onPress={_on_participate}>
            <Button.Text>Request Participation</Button.Text>
          </Button>
        </YStack>
      ) : null}

      {_show_mark_as_complete_button ? (
        <Dialog modal key="mark_as_complete">
          <Dialog.Trigger asChild>
            <Button theme="accent" mx={GAP}>
              <Button.Text>Mark As Complete</Button.Text>
            </Button>
          </Dialog.Trigger>
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
                      <Label htmlFor="feedback_note">
                        Leave a feedback note
                      </Label>
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
      ) : null}
      {_show_requested_button ? (
        <XStack px={GAP}>
          <Button flex={1} disabled variant="outlined" chromeless>
            <Button.Text>Requested</Button.Text>
          </Button>
        </XStack>
      ) : _show_rejected_button ? (
        <XStack px={GAP}>
          <Button flex={1} disabled variant="outlined" chromeless>
            <Button.Text>Rejected</Button.Text>
          </Button>
        </XStack>
      ) : null}
      {_show_mark_attendance_button ? (
        <Dialog modal key="mark_attendance">
          <Dialog.Trigger asChild>
            <Button theme="accent" mx={GAP}>
              <Button.Text>Mark Attendance</Button.Text>
            </Button>
          </Dialog.Trigger>
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
              <Sheet.Overlay backgroundColor="$shadow6" animation="lazy" />
            </Sheet>
          </Adapt>
          <Dialog.Portal>
            <Dialog.Overlay backgroundColor="$shadow6" animation="slow" />
            <Dialog.Content
              bordered
              elevate
              animation="quicker"
              enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
              exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
              gap={GAP}
            >
              <Dialog.Title>Mark your attendance</Dialog.Title>
              <Dialog.Description>
                <Paragraph>
                  Please enter today's 4-digit attendance code to claim your
                  score.
                </Paragraph>
              </Dialog.Description>
              <Form
                onSubmit={handleAttendanceSubmit(_onMarkAttendanceSubmit)}
                gap={GAP}
              >
                <Controller
                  control={attendanceControl}
                  name="code"
                  render={({
                    field: { onChange, value, onBlur },
                    fieldState,
                  }) => (
                    <Fieldset>
                      <Label htmlFor="code">Attendance Code</Label>
                      <Input
                        id="code"
                        keyboardType="numeric"
                        maxLength={4}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="Attendance code from the creator of the task"
                      />
                      {fieldState.error?.message && (
                        <Paragraph color="$red10">
                          {fieldState.error.message}
                        </Paragraph>
                      )}
                    </Fieldset>
                  )}
                />
                <YStack gap={GAP}>
                  <Dialog.Close displayWhenAdapted asChild>
                    <Form.Trigger asChild>
                      <Button
                        disabled={
                          isAttendanceSubmitting || isAttendanceValidating
                        }
                        theme="accent"
                        icon={
                          isAttendanceSubmitting ? () => <Spinner /> : undefined
                        }
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
      ) : null}
      {data?.owner_id === auth?._id ? (
        <YStack px={GAP}>
          <FlatList
            scrollEnabled={false}
            ListHeaderComponent={
              <Paragraph py={GAP}>{`Participation Requests • ${format_number(
                data?.participants?.length ?? 0
              )}`}</Paragraph>
            }
            renderItem={({ index, item }) => (
              <ParticipationTile
                _id={item._id}
                name={item.name}
                requested_at={item?.requested_at}
                status={item.status}
                updated_at={item.updated_at}
                user_id={item.user_id}
                key={index}
              />
            )}
            data={data?.participants}
          />
        </YStack>
      ) : null}
    </YStack>
  );

  return (
    <ScreenWrapper
      refreshControl={
        <RefreshControl refreshing={!!isRefetching} onRefresh={refetch} />
      }
    >
      {_content}
    </ScreenWrapper>
  );
};

export default index;
