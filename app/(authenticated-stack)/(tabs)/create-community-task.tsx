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
  Input,
  XStack,
} from "tamagui";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// C O M P O N E N T S
import ScreenWrapper from "@/components/screen-wrapper";
import SelectInput from "@/components/ui/Select";
import {
  MAX_TASK_DESCRIPTION_LENGTH,
  HOURS_OPTIONS,
  NUMBER_OF_PARTICIPANTS_OPTIONS,
  CATEGORY_MASTER,
} from "@/constants/Validations";
import DateTimePicker from "@/components/DatePicker";

const schema = yup
  .object({
    task_description: yup.string().required("Task description is required!"),
    task_category: yup.string().required("Task category is required!"),
    participants_required: yup
      .number()
      .positive("Task should require atleast 1 participant!")
      .integer("Task should require atleast 1 participant!")
      .required("Task should require atleast 1 participant!"),
    hours_required: yup
      .number()
      .positive("Task should require atleast 1 hour!")
      .integer("Task should require atleast 1 hour!")
      .required("Task should require atleast 1 hour!"),
    start_date: yup.date().required("Task should have a start date!"),
    end_date: yup.date().required("Task should have a completion date!"),
  })
  .required();

const index = () => {
  const today = React.useMemo(() => new Date(), []);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isLoading, isValidating, isDirty, isValid },
  } = useForm({
    defaultValues: {
      task_description: "",
      hours_required: 0,
      participants_required: 0,
      start_date: today,
      end_date: today,
    },
    resolver: yupResolver(schema),
  });
  const _is_disable_submit_button =
    isSubmitting ?? isDirty ?? isLoading ?? isValidating ?? !isValid;

  const onSubmit = (data: any) => console.log(data);

  return (
    <React.Fragment>
      <ScreenWrapper scrollable>
        <YStack style={styles.screen} gap={GAP * 1.5} px={GAP}>
          <Form onSubmit={handleSubmit(onSubmit)} gap={GAP}>
            <DateTimePicker />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <YStack>
                  <Label htmlFor="task_description">Task description</Label>
                  <TextArea
                    placeholder="Describe your task"
                    id="task_description"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    borderWidth={2}
                    maxLength={MAX_TASK_DESCRIPTION_LENGTH}
                  />
                  {fieldState.error ? (
                    <Label color="$red10Dark">{fieldState.error.message}</Label>
                  ) : null}
                </YStack>
              )}
              name="task_description"
            />
            <XStack gap={GAP}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState,
                }) => (
                  <YStack flex={1}>
                    <Label htmlFor="participants_required">
                      Number of participants
                    </Label>
                    <SelectInput
                      label="Number of participants"
                      placeHolder="Number of participants"
                      id="participants_required"
                      onChange={onChange}
                      options={NUMBER_OF_PARTICIPANTS_OPTIONS}
                      value={`${value}`}
                      native
                    />
                    {fieldState.error ? (
                      <Label color="$red10Dark">
                        {fieldState.error.message}
                      </Label>
                    ) : null}
                  </YStack>
                )}
                name="participants_required"
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState,
                }) => (
                  <YStack flex={1}>
                    <Label htmlFor="hours_required">Hours required</Label>
                    <SelectInput
                      label="Hours required"
                      placeHolder="Hours required"
                      id="hours_required"
                      onChange={onChange}
                      options={HOURS_OPTIONS}
                      value={`${value}`}
                      native
                    />
                    {fieldState.error ? (
                      <Label color="$red10Dark">
                        {fieldState.error.message}
                      </Label>
                    ) : null}
                  </YStack>
                )}
                name="hours_required"
              />
            </XStack>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <YStack>
                  <Label htmlFor="task_category">Task category</Label>
                  <SelectInput
                    label="Task category"
                    placeHolder="Task category"
                    id="task_category"
                    onChange={onChange}
                    options={CATEGORY_MASTER}
                    value={value}
                    native
                  />
                  {fieldState.error ? (
                    <Label color="$red10Dark">{fieldState.error.message}</Label>
                  ) : null}
                </YStack>
              )}
              name="task_category"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <YStack>
                  <Label htmlFor="start_date">Start date</Label>
                  <Input
                    id="start_date"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={`${value}`}
                  />
                  {fieldState.error ? (
                    <Label color="$red10Dark">{fieldState.error.message}</Label>
                  ) : null}
                </YStack>
              )}
              name="start_date"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <YStack>
                  <Label htmlFor="end_date">End date</Label>
                  <Input
                    id="end_date"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={`${value}`}
                  />
                  {fieldState.error ? (
                    <Label color="$red10Dark">{fieldState.error.message}</Label>
                  ) : null}
                </YStack>
              )}
              name="end_date"
            />
            <Form.Trigger asChild disabled={_is_disable_submit_button}>
              <Button
                icon={isSubmitting ? () => <Spinner /> : undefined}
                variant="outlined"
              >
                Submit
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
    // dimensions
    flex: 1,
    gap: GAP * 0.5,
  },
  heading1_container: {
    // design
    paddingHorizontal: GAP,
  },
});
