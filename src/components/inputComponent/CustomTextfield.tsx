/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

interface CustomTextFieldProps {
    name: string;
    formik?: any;
    multiline?: boolean;
    rows?: number;
    placeholder?: string;
    InputProps?: TextFieldProps["InputProps"];
    disabled?: boolean;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
    name,
    formik,
    multiline = false,
    rows = 0,
    placeholder = "Masukkan teks",
    InputProps = {},
    disabled = false,
    ...props
}) => {
    // const [field, meta] = useField(name);

    return (
        <TextField
            // {...field}
            disabled={disabled}
            {...props}
            name={name}
            multiline={multiline}
            rows={rows}
            placeholder={
                formik?.touched[name] && formik?.errors[name] ? formik.errors[name] : placeholder
            }
            value={formik?.values[name] || ""}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            error={formik?.touched[name] && Boolean(formik?.errors[name])}
            InputProps={InputProps}
            sx={{
                width: "100%",
                marginTop: "10px",
                "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: disabled ? "#EEEEF2" : (formik?.touched[name] && formik?.errors[name] ? "#ffcccc" : "inherit"),
                    '&:focus-within .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#8F85F3',
                    },
                },
                "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #ccc",
                },
                "& .MuiOutlinedInput-input": {
                    padding: "10px",
                    fontSize: "16px",
                },
            }}
        />
    );
};

export default CustomTextField;
