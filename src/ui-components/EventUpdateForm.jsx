/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Event } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function EventUpdateForm(props) {
  const {
    id: idProp,
    event,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    userGuid: "",
    name: "",
    attribues: "",
  };
  const [userGuid, setUserGuid] = React.useState(initialValues.userGuid);
  const [name, setName] = React.useState(initialValues.name);
  const [attribues, setAttribues] = React.useState(initialValues.attribues);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = eventRecord
      ? { ...initialValues, ...eventRecord }
      : initialValues;
    setUserGuid(cleanValues.userGuid);
    setName(cleanValues.name);
    setAttribues(
      typeof cleanValues.attribues === "string"
        ? cleanValues.attribues
        : JSON.stringify(cleanValues.attribues)
    );
    setErrors({});
  };
  const [eventRecord, setEventRecord] = React.useState(event);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp ? await DataStore.query(Event, idProp) : event;
      setEventRecord(record);
    };
    queryData();
  }, [idProp, event]);
  React.useEffect(resetStateValues, [eventRecord]);
  const validations = {
    userGuid: [],
    name: [],
    attribues: [{ type: "JSON" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value = getDisplayValue
      ? getDisplayValue(currentValue)
      : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          userGuid,
          name,
          attribues,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            Event.copyOf(eventRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "EventUpdateForm")}
      {...rest}
    >
      <TextField
        label="User guid"
        isRequired={false}
        isReadOnly={false}
        value={userGuid}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userGuid: value,
              name,
              attribues,
            };
            const result = onChange(modelFields);
            value = result?.userGuid ?? value;
          }
          if (errors.userGuid?.hasError) {
            runValidationTasks("userGuid", value);
          }
          setUserGuid(value);
        }}
        onBlur={() => runValidationTasks("userGuid", userGuid)}
        errorMessage={errors.userGuid?.errorMessage}
        hasError={errors.userGuid?.hasError}
        {...getOverrideProps(overrides, "userGuid")}
      ></TextField>
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userGuid,
              name: value,
              attribues,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextAreaField
        label="Attribues"
        isRequired={false}
        isReadOnly={false}
        value={attribues}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userGuid,
              name,
              attribues: value,
            };
            const result = onChange(modelFields);
            value = result?.attribues ?? value;
          }
          if (errors.attribues?.hasError) {
            runValidationTasks("attribues", value);
          }
          setAttribues(value);
        }}
        onBlur={() => runValidationTasks("attribues", attribues)}
        errorMessage={errors.attribues?.errorMessage}
        hasError={errors.attribues?.hasError}
        {...getOverrideProps(overrides, "attribues")}
      ></TextAreaField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || event)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || event) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
