import React from "react";
import { RefreshControl, StyleSheet } from "react-native";
import { GAP } from "@/constants/Dimensions";
import {
  Label,
  Form,
  TextArea,
  YStack,
  Button,
  Spinner,
  XStack,
  Paragraph,
} from "tamagui";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Toast, { ToastType } from "@/utils/toasts";
import ScreenWrapper from "@/components/screen-wrapper";
import SelectInput from "@/components/ui/Select";
import {
  MAX_TASK_DESCRIPTION_LENGTH,
  MIN_TASK_DESCRIPTION_LENGTH,
} from "@/constants/Validations";
import DateTimePicker from "@/components/DatePicker";
import CheckboxWithLabel from "@/components/CheckboxWithLabel";
import apis from "@/apis";
import { router } from "expo-router";
import {
  useHoursOptions,
  useTaskTypesOptions,
  useVolunteersCountOptions,
} from "@/hooks/useFormValidationOptions";

const index = () => {
  const {
    data: hours_options,
    isLoading: is_hours_options_loading,
    refetch: refetch_hours_options,
  } = useHoursOptions();
  const {
    data: task_types_options,
    isLoading: is_task_types_options_loading,
    refetch: refetch_task_types_options,
  } = useTaskTypesOptions();
  const {
    data: volunteers_count_options,
    isLoading: is_volunteers_count_options_loading,
    refetch: refetch_volunteers_count_options,
  } = useVolunteersCountOptions();
  const is_loading =
    is_hours_options_loading ||
    is_task_types_options_loading ||
    is_volunteers_count_options_loading;

  const _is_loaded = React.useMemo(
    () =>
      !!hours_options?.length &&
      !!task_types_options?.length &&
      !!volunteers_count_options?.length,
    [hours_options, task_types_options, volunteers_count_options]
  );

  const today = React.useMemo(() => new Date(), []);
  const defaultStart = today;
  const defaultEnd = new Date(today.getTime() + 24 * 60 * 60 * 1000);

  const refetch = React.useCallback(() => {
    refetch_hours_options();
    refetch_task_types_options();
    refetch_volunteers_count_options();
  }, [
    refetch_hours_options,
    refetch_task_types_options,
    refetch_volunteers_count_options,
  ]);

  const schema = yup
    .object({
      task_description: yup
        .string()
        .min(MIN_TASK_DESCRIPTION_LENGTH)
        .max(MAX_TASK_DESCRIPTION_LENGTH)
        .required("Task description is required!"),
      task_category: yup.string().required("Task category is required!"),
      participants_required: yup.number().positive().integer().required(),
      hours_required_per_day: yup.number().positive().integer().required(),
      is_single_day: yup.boolean().default(true),
      start_datetime: yup.date().required("Start datetime is required!"),
      end_datetime: yup.date().when("is_single_day", {
        is: false,
        then: (schema) =>
          schema
            .required()
            .test(
              "end-after-start",
              "End must be at least 1 day after start",
              function (end) {
                const { start_datetime } = this.parent;
                if (!start_datetime || !end) return true;
                const diff = end.getTime() - new Date(start_datetime).getTime();
                return diff >= 24 * 60 * 60 * 1000;
              }
            ),
        otherwise: (schema) => schema.nullable(),
      }),
    })
    .required();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, isValid, isLoading, isValidating },
  } = useForm({
    defaultValues: {
      task_description:
        "Coordinating emergency relief, distributing supplies, setting up shelters, and helping victims in disaster-affected areas.",
      hours_required_per_day: 0,
      participants_required: 0,
      start_datetime: defaultStart,
      end_datetime: defaultEnd,
      task_category: "",
      is_single_day: true,
    },
    resolver: yupResolver(schema),
  });

  const isSingleDay = watch("is_single_day");
  const startDatetime = watch("start_datetime");
  const hoursRequired = watch("hours_required_per_day");

  React.useEffect(() => {
    if (isSingleDay) {
      const newEnd = new Date(startDatetime);
      newEnd.setHours(newEnd.getHours() + hoursRequired);
      setValue("end_datetime", newEnd, { shouldValidate: true });
    } else {
      const newEnd = new Date(startDatetime);
      newEnd.setDate(newEnd.getDate() + 1);
      setValue("end_datetime", newEnd, { shouldValidate: true });
    }
  }, [isSingleDay, startDatetime, hoursRequired]);

  const onSubmit: SubmitHandler<any> = async (data) => {
    const {
      hours_required_per_day,
      participants_required,
      start_datetime,
      end_datetime,
      task_category,
      task_description,
    } = data;

    const _request_body = {
      description: task_description,
      hours_required_per_day,
      volunteers_required: participants_required,
      starts_at: start_datetime.getTime(),
      completes_at: (end_datetime ?? start_datetime).getTime(),
      task_type: task_category,
      is_remote: true,
      priority: "medium",
    };
    try {
      const _response = await apis.create_task(_request_body);
      Toast.show(_response.data.message, ToastType.SUCCESS);
      router.push({
        pathname: "/community-tasks/[id]",
        params: { id: _response.data.data._id },
      });
    } catch (error: any) {
      Toast.show(
        error?.response?.data?.message || error?.message || "Error occurred",
        ToastType.ERROR
      );
    }
  };

  const _refreshControl = (
    <RefreshControl refreshing={is_loading} onRefresh={refetch} />
  );

  if (!_is_loaded) {
    return (
      <ScreenWrapper scrollable>
        <YStack
          style={styles.screen}
          alignItems="center"
          justifyContent="center"
        >
          <Spinner />
          <Paragraph>Loading</Paragraph>
        </YStack>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper scrollable refreshControl={_refreshControl}>
      <YStack style={styles.screen} gap={GAP * 1.5} px={GAP}>
        <Form onSubmit={handleSubmit(onSubmit)} gap={GAP}>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, onBlur }, fieldState }) => (
              <YStack>
                <Label htmlFor="task_description">Task description</Label>
                <TextArea
                  placeholder="Describe your task"
                  id="task_description"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  maxLength={MAX_TASK_DESCRIPTION_LENGTH}
                  minHeight="$4"
                  minBlockSize="$4"
                />
                {fieldState?.error && (
                  <Label color="$red10Dark">{fieldState.error.message}</Label>
                )}
              </YStack>
            )}
            name="task_description"
          />

          <XStack gap={GAP}>
            {volunteers_count_options ? (
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value }, fieldState }) => (
                  <YStack flex={1}>
                    <Label htmlFor="participants_required">
                      Number of participants
                    </Label>
                    <SelectInput
                      label="Number of participants"
                      placeHolder="Number of participants"
                      id="participants_required"
                      onChange={onChange}
                      options={volunteers_count_options}
                      value={`${value}`}
                      native
                    />
                    {fieldState.error && (
                      <Label color="$red10Dark">
                        {fieldState.error.message}
                      </Label>
                    )}
                  </YStack>
                )}
                name="participants_required"
              />
            ) : null}
            {hours_options ? (
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value }, fieldState }) => (
                  <YStack flex={1}>
                    <Label htmlFor="hours_required_per_day">
                      Hours required per day
                    </Label>
                    <SelectInput
                      label="Hours required"
                      placeHolder="Hours required"
                      id="hours_required_per_day"
                      onChange={onChange}
                      options={hours_options}
                      value={`${value}`}
                      native
                    />
                    {fieldState.error && (
                      <Label color="$red10Dark">
                        {fieldState.error.message}
                      </Label>
                    )}
                  </YStack>
                )}
                name="hours_required_per_day"
              />
            ) : null}
          </XStack>
          {task_types_options ? (
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value }, fieldState }) => (
                <YStack>
                  <Label htmlFor="task_category">Task category</Label>
                  <SelectInput
                    label="Task category"
                    placeHolder="Task category"
                    id="task_category"
                    onChange={onChange}
                    options={task_types_options}
                    value={value}
                    native
                  />
                  {fieldState.error && (
                    <Label color="$red10Dark">{fieldState.error.message}</Label>
                  )}
                </YStack>
              )}
              name="task_category"
            />
          ) : null}
          <Controller
            control={control}
            name="is_single_day"
            defaultValue={true}
            render={({ field: { value, onChange } }) => (
              <XStack gap={GAP} alignItems="center">
                <CheckboxWithLabel
                  size="$4"
                  defaultChecked={!!value}
                  onCheckedChange={(_state) => onChange(_state ?? false)}
                  label="Is same day task"
                />
              </XStack>
            )}
          />
          <Controller
            control={control}
            name="start_datetime"
            render={({ field: { onChange, value } }) => (
              <YStack>
                <Label>Start Date & Time</Label>
                <XStack gap={GAP}>
                  <DateTimePicker
                    flex={1}
                    mode="date"
                    date={value}
                    onChange={onChange}
                    placeholder="Select Start Date & Time"
                    minimumDate={today}
                  />
                  <DateTimePicker
                    flex={1}
                    mode="time"
                    date={value}
                    onChange={onChange}
                    placeholder="Select Start Date & Time"
                    minimumDate={today}
                  />
                </XStack>
              </YStack>
            )}
          />

          {!isSingleDay && (
            <Controller
              control={control}
              name="end_datetime"
              render={({ field: { onChange, value } }) => (
                <YStack>
                  <Label>End Date & Time</Label>
                  <DateTimePicker
                    mode="datetime"
                    date={value}
                    onChange={onChange}
                    placeholder="Select End Date & Time"
                    minimumDate={
                      new Date(startDatetime.getTime() + 24 * 60 * 60 * 1000)
                    }
                  />
                </YStack>
              )}
            />
          )}

          <Form.Trigger asChild>
            <Button
              theme="accent"
              disabled={isSubmitting || isLoading || isValidating || !isValid}
              icon={isSubmitting ? () => <Spinner /> : undefined}
              mt={GAP * 1.5}
            >
              <Button.Text>Submit</Button.Text>
            </Button>
          </Form.Trigger>
        </Form>
      </YStack>
    </ScreenWrapper>
  );
};

export default index;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: GAP * 0.5,
  },
});
