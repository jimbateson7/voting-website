/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, SelectField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Vote } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function VoteUpdateForm(props) {
  const {
    id: idProp,
    vote,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    choice: undefined,
  };
  const [choice, setChoice] = React.useState(initialValues.choice);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = voteRecord
      ? { ...initialValues, ...voteRecord }
      : initialValues;
    setChoice(cleanValues.choice);
    setErrors({});
  };
  const [voteRecord, setVoteRecord] = React.useState(vote);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp ? await DataStore.query(Vote, idProp) : vote;
      setVoteRecord(record);
    };
    queryData();
  }, [idProp, vote]);
  React.useEffect(resetStateValues, [voteRecord]);
  const validations = {
    choice: [{ type: "Required" }],
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
          choice,
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
            Vote.copyOf(voteRecord, (updated) => {
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
      {...getOverrideProps(overrides, "VoteUpdateForm")}
      {...rest}
    >
      <SelectField
        label="Choice"
        placeholder="Please select an option"
        isDisabled={false}
        value={choice}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              choice: value,
            };
            const result = onChange(modelFields);
            value = result?.choice ?? value;
          }
          if (errors.choice?.hasError) {
            runValidationTasks("choice", value);
          }
          setChoice(value);
        }}
        onBlur={() => runValidationTasks("choice", choice)}
        errorMessage={errors.choice?.errorMessage}
        hasError={errors.choice?.hasError}
        {...getOverrideProps(overrides, "choice")}
      >
        <option
          children="Yes"
          value="YES"
          {...getOverrideProps(overrides, "choiceoption0")}
        ></option>
        <option
          children="No"
          value="NO"
          {...getOverrideProps(overrides, "choiceoption1")}
        ></option>
        <option
          children="Dont know"
          value="DONT_KNOW"
          {...getOverrideProps(overrides, "choiceoption2")}
        ></option>
      </SelectField>
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
          isDisabled={!(idProp || vote)}
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
              !(idProp || vote) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
