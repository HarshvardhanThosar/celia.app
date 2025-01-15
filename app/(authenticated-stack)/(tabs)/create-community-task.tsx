import React from "react";
import { StyleSheet } from "react-native";
import { GAP } from "@/constants/Dimensions";
import { Input, Label, Form, TextArea, YStack, Button, Spinner } from "tamagui";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// C O M P O N E N T S
import ScreenWrapper from "@/components/screen-wrapper";

const schema = yup
  .object({
    task_description: yup.string().required(),
    participants_required: yup.number().positive().integer().required(),
    hours_required: yup.number().positive().integer().required(),
    completion_date: yup.date().required(),
  })
  .required();

const index = () => {
  const {
    control,
    handleSubmit,
    formState: {
      isSubmitting,
      isLoading,
      isValidating,
      isDirty,
      isValid,
      errors,
    },
  } = useForm({
    defaultValues: {
      task_description: "",
      hours_required: 0,
      participants_required: 0,
      completion_date: new Date(),
    },
    resolver: yupResolver(schema),
  });
  const _is_disable_submit_button =
    isSubmitting ?? isDirty ?? isLoading ?? isValidating ?? !isValid;

  const onSubmit = (data: any) => console.log(data);

  return (
    <React.Fragment>
      <ScreenWrapper>
        <YStack style={styles.screen} gap={GAP * 1.5} px={GAP}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState,
                formState,
              }) => (
                <YStack>
                  <Label htmlFor="task_description">Task description</Label>
                  <TextArea
                    placeholder="Describe your task"
                    id="task_description"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    minHeight="$4"
                    maxHeight="$19"
                    borderWidth={2}
                  />
                  {fieldState.error ? (
                    <Label color="$red10Dark">
                      Error: {fieldState.error.message}
                    </Label>
                  ) : null}
                </YStack>
              )}
              name="task_description"
            />
            <Form.Trigger asChild disabled={_is_disable_submit_button}>
              <Button icon={isSubmitting ? () => <Spinner /> : undefined}>
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
