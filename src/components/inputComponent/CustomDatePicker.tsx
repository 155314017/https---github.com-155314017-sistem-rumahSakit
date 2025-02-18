/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Field } from "formik";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

interface CustomDatePickerProps {
    name: string;
    label?: string;
    placeholder?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
    name,
    placeholder = "Masukkan Tanggal Lahir",
}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Field name={name}>
                {({ field, meta }: any) => (
                    <DatePicker
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(newValue: Dayjs | null) => {
                            const formattedDate = newValue ? newValue.format("YYYY-MM-DD") : "";
                            field.onChange({ target: { name, value: formattedDate } });
                        }}
                        slotProps={{
                            textField: {
                                placeholder,
                                error: meta.touched && Boolean(meta.error),
                                helperText: meta.touched && meta.error,
                                sx: {
                                    width: "100%",
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        height: '50px',
                                        backgroundColor: meta.touched && meta.error ? "#ffcccc" : "inherit",
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            border: "1px solid #ccc",
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#8F85F3',
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#8F85F3',
                                        },
                                    },
                                    '& .MuiInputBase-input': {
                                        padding: "10px",
                                        fontSize: "16px",
                                    },
                                },
                            },
                        }}
                    />
                )}
            </Field>
        </LocalizationProvider>
    );
};

export default CustomDatePicker;
