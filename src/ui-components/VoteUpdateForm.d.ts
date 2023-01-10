/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Vote } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type VoteUpdateFormInputValues = {
    voterId?: string;
    choice?: string;
};
export declare type VoteUpdateFormValidationValues = {
    voterId?: ValidationFunction<string>;
    choice?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type VoteUpdateFormOverridesProps = {
    VoteUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    voterId?: PrimitiveOverrideProps<TextFieldProps>;
    choice?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type VoteUpdateFormProps = React.PropsWithChildren<{
    overrides?: VoteUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    vote?: Vote;
    onSubmit?: (fields: VoteUpdateFormInputValues) => VoteUpdateFormInputValues;
    onSuccess?: (fields: VoteUpdateFormInputValues) => void;
    onError?: (fields: VoteUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: VoteUpdateFormInputValues) => VoteUpdateFormInputValues;
    onValidate?: VoteUpdateFormValidationValues;
} & React.CSSProperties>;
export default function VoteUpdateForm(props: VoteUpdateFormProps): React.ReactElement;
