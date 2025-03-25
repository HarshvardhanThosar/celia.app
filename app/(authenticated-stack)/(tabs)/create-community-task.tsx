import React from "react";
import { StyleSheet } from "react-native";
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

// C O M P O N E N T S
import ScreenWrapper from "@/components/screen-wrapper";
import SelectInput from "@/components/ui/Select";
import {
  MAX_TASK_DESCRIPTION_LENGTH,
  MIN_TASK_DESCRIPTION_LENGTH,
} from "@/constants/Validations";
import DateTimePicker from "@/components/DatePicker";
import CheckboxWithLabel from "@/components/CheckboxWithLabel";
import apis from "@/apis";
import { OptionBody } from "@/types/apis";
import { router } from "expo-router";

const index = () => {
  const [hours_options, set_hours_options] = React.useState<OptionBody[]>([]);
  const [task_types_options, set_task_types_options] = React.useState<
    OptionBody[]
  >([]);
  const [volunteers_count_options, set_volunteers_count_options] =
    React.useState<OptionBody[]>([]);
  const [_is_loaded, set_is_loaded] = React.useState(false);

  const today = React.useMemo(() => new Date(), []);

  const schema = yup
    .object({
      task_description: yup
        .string()
        .min(
          MIN_TASK_DESCRIPTION_LENGTH,
          `Task should have at least ${MIN_TASK_DESCRIPTION_LENGTH} characters.`
        )
        .max(
          MAX_TASK_DESCRIPTION_LENGTH,
          `Task should have maximum of ${MAX_TASK_DESCRIPTION_LENGTH} characters.`
        )
        .required("Task description is required!"),
      task_category: yup.string().required("Task category is required!"),
      participants_required: yup
        .number()
        .positive("Task should require at least 1 participant!")
        .integer("Participants must be whole numbers!")
        .required("Number of participants is required!"),
      hours_required_per_day: yup
        .number()
        .positive("Task should require at least 1 hour per day!")
        .integer("Hours per day must be a whole number!")
        .required("Hours required per day is required!"),
      is_single_day: yup.boolean().default(true),
      start_date: yup.date().required("Start date is required!"),
      start_time: yup.date().required("Start time is required!"),
      end_date: yup.date().when("is_single_day", {
        is: false,
        then: (schema) =>
          schema
            .required("End date is required for multi-day tasks!")
            .test(
              "end-date-valid-hours",
              "The task must last at least the specified hours per day!",
              function (endDate) {
                const { start_date, hours_required_per_day } = this.parent;
                if (!start_date || !endDate || !hours_required_per_day)
                  return true;
                const minEndTime = new Date(start_date);
                minEndTime.setHours(
                  minEndTime.getHours() + hours_required_per_day
                );
                return endDate >= minEndTime;
              }
            ),
        otherwise: (schema) => schema.nullable().notRequired(),
      }),
      end_time: yup.date().when("is_single_day", {
        is: false,
        then: (schema) =>
          schema
            .required("End time is required for multi-day tasks!")
            .test(
              "end-time-after-start",
              "End time must be at least 1 hour after start time!",
              function (endTime) {
                const { start_time } = this.parent;
                if (!start_time || !endTime) return true;
                const minEndTime = new Date(start_time);
                minEndTime.setHours(minEndTime.getHours() + 1);
                return endTime >= minEndTime;
              }
            ),
        otherwise: (schema) => schema.nullable().notRequired(),
      }),
    })
    .required();

  type FormData = yup.InferType<typeof schema>;

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, isDirty, isValid, isLoading, isValidating },
  } = useForm({
    defaultValues: {
      task_description:
        "Coordinating emergency relief, distributing supplies, setting up shelters, and helping victims in disaster-affected areas.",
      hours_required_per_day: 0,
      participants_required: 0,
      start_date: today,
      start_time: today,
      end_date: today,
      end_time: today,
      task_category: "",
      is_single_day: true,
    },
    resolver: yupResolver(schema),
  });

  // Watch form values
  const startDate = watch("start_date");
  const startTime = watch("start_time");
  const isSingleDay = watch("is_single_day");
  const hoursRequired = watch("hours_required_per_day");

  // Handle toggle for `is_single_day`

  React.useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const result = await Promise.all([
          apis.fetch_hour_options(),
          apis.fetch_volunteers_count(),
          apis.fetch_task_types(),
        ]).catch((error) => {
          console.log(
            "Error fetching options for create task route",
            JSON.stringify(error, null, 2)
          );
          return undefined;
        });

        if (isMounted && result) {
          const [_hours_options, _volunteers_options, _task_types] = result;
          set_hours_options(_hours_options.data.data);
          set_volunteers_count_options(_volunteers_options.data.data);
          set_task_types_options(_task_types.data.data);
          set_is_loaded(true);
        }
      } catch (error) {
        console.log(
          "Error fetching options for create task route",
          JSON.stringify(error, null, 2)
        );
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  // Auto-set end_date & end_time if task is single-day
  React.useEffect(() => {
    if (isSingleDay) {
      setTimeout(() => {
        const newEndDate = new Date(startDate);
        newEndDate.setHours(startTime.getHours() + hoursRequired);
        setValue("end_date", newEndDate, { shouldValidate: true });
        setValue("end_time", newEndDate, { shouldValidate: true });
      }, 0);
    }
  }, [isSingleDay, startDate, startTime, hoursRequired, setValue]);

  // Compute minEndDate (at least 1 hour from start date & time)
  const minEndDate = React.useMemo(() => {
    if (!startDate || !startTime || isSingleDay) return undefined;
    const newMinDate = new Date(startDate);
    newMinDate.setHours(startTime.getHours() + 1);
    return newMinDate;
  }, [startDate, startTime, isSingleDay]);

  const _is_disable_submit_button =
    isSubmitting || isLoading || isValidating || !isValid;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const {
      hours_required_per_day,
      participants_required,
      start_time,
      task_category,
      task_description,
      end_time,
    } = data;

    const starts_at = Math.floor(start_time.getTime() / 1000);
    const completes_at = Math.floor(end_time!.getTime() / 1000);

    const _request_body = {
      description: task_description,
      hours_required_per_day,
      volunteers_required: participants_required,
      starts_at,
      completes_at,
      task_type: task_category,
      is_remote: true,
      priority: "medium",
    };

    try {
      const _response = await apis.create_task(_request_body);
      const _data = _response.data;
      Toast.show(_data.message, ToastType.SUCCESS);
      router.push({
        pathname: "/community-tasks/[id]",
        params: {
          id: _data.data._id,
        },
      });
    } catch (error: any) {
      const error_message =
        error?.response?.data?.message ||
        error?.message ||
        "An error occurred!";
      Toast.show(error_message, ToastType.ERROR);
    }
  };

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
    <React.Fragment>
      <ScreenWrapper scrollable>
        <YStack style={styles.screen} gap={GAP * 1.5} px={GAP}>
          <Form onSubmit={handleSubmit(onSubmit)} gap={GAP}>
            {/* Task Description */}
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

            {/* Participants Required */}
            <XStack gap={GAP}>
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
            </XStack>

            {/* Task Category */}
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

            {/* Start date & time */}
            <Controller
              control={control}
              name="start_date"
              render={({ field: { onChange, value } }) => (
                <YStack>
                  <Label>Start date & time</Label>
                  <XStack gap={GAP}>
                    <DateTimePicker
                      flex={1}
                      mode="date"
                      date={value}
                      placeholder="Select Start Date"
                      minimumDate={today}
                      onChange={onChange}
                      key="start-date"
                    />
                    <DateTimePicker
                      flex={1}
                      mode="time"
                      date={value}
                      placeholder="Select Start Time"
                      minimumDate={today}
                      onChange={onChange}
                      key="start-time"
                    />
                  </XStack>
                </YStack>
              )}
            />

            {/* End date & time (Only if multi-day task) */}
            {!isSingleDay && (
              <Controller
                control={control}
                name="end_date"
                render={({ field: { onChange, value } }) => (
                  <YStack>
                    <Label>End date & time</Label>
                    <XStack gap={GAP}>
                      <DateTimePicker
                        flex={1}
                        mode="date"
                        date={value}
                        placeholder="Select End Date"
                        minimumDate={minEndDate}
                        onChange={onChange}
                        key="end-date"
                      />
                      <DateTimePicker
                        flex={1}
                        mode="time"
                        date={value}
                        placeholder="Select End Time"
                        minimumDate={minEndDate}
                        onChange={onChange}
                        key="end-time"
                      />
                    </XStack>
                  </YStack>
                )}
              />
            )}

            {/* Submit Button */}
            <Form.Trigger asChild>
              <Button
                disabled={_is_disable_submit_button}
                icon={isSubmitting ? () => <Spinner /> : undefined}
                mt={GAP * 1.5}
              >
                <Button.Text>Submit</Button.Text>
              </Button>
            </Form.Trigger>
          </Form>
        </YStack>
      </ScreenWrapper>
    </React.Fragment>
  );
};

export default index;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: GAP * 0.5,
  },
});
