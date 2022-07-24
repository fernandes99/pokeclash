export type PrimaryButtonType = {
    text: string;
    icon?: boolean;
    type?: string;
    color?: string;
    onClick?: void | any;
};

export type DefaultButtonType = {
    text: string;
    icon?: boolean;
    type?: string;
    onClick?: void | any;
}

export type ButtonType = {
    Primary: React.FC<PrimaryButtonType>,
    Default: React.FC<DefaultButtonType>
}