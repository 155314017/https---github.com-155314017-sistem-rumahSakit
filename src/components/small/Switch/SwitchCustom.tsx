import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { FormControlLabel } from '@mui/material';
import { useState, useEffect } from "react";

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 48,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(20px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: '#7367F0',
                opacity: 1,
                border: 0,
                ...theme.applyStyles('dark', {
                    backgroundColor: '#7367F0',
                }),
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#7367F0',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.grey[100],
            ...theme.applyStyles('dark', {
                color: theme.palette.grey[600],
            }),
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.7,
            ...theme.applyStyles('dark', {
                opacity: 0.3,
            }),
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 24,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: '#E9E9EA',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
        ...theme.applyStyles('dark', {
            backgroundColor: '#39393D',
        }),
    },
}));

type SwitchCustomProps = {
    defaultValue?: boolean;
    onChangeValue: (value: boolean) => void;
    disable?: boolean;
};

const SwitchCustom: React.FC<SwitchCustomProps> = ({ defaultValue = false, onChangeValue, disable = false }) => {
    const [checked, setChecked] = useState(defaultValue);

    // Sync state with prop defaultValue when it changes
    useEffect(() => {
        setChecked(defaultValue);
    }, [defaultValue]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setChecked(isChecked);
        if (onChangeValue) {
            onChangeValue(isChecked);
        }
    };

    return (
        <FormControlLabel
            control={
                <IOSSwitch
                    sx={{ m: 1 }}
                    checked={checked}
                    onChange={handleChange}
                    disabled={disable}
                />
            }
            label="Data diri sama dengan pasien"
            sx={{
                color: '#747487',
                fontSize: '14px',
            }}
        />
    );
};

export default SwitchCustom;
