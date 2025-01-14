import type React from 'react';

interface ButtonProps {
    onClick: () => void;
    label: string;
    href: string;
}

const LabelHandler: React.FC<ButtonProps> = ({ onClick, label, href }) => {
    return (
        <a href={href} onClick={onClick} style={{ textDecoration: 'none', fontSize: '16px', color: '#8F85F3' }}>
            {label}
        </a>
    );
}

export default LabelHandler;
