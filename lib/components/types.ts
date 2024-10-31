export type FormI = {
    title?: string
    subTitle?: string
    inputs: FormBloc[]
}

export type FormBloc = {
    name: string
    label: string
    type: TypeEnum
    description?: string
    effect?: TypeEffect
    options?: { label: string; value: string }[]
    defaultValue?: string
}

export enum TypeEnum {
    INPUT_TEXT = "INPUT_TEXT",
    INPUT_DATE = "INPUT_DATE",
    INPUT_NUMBER = "INPUT_NUMBER",
    TEXT_AREA = "TEXT_AREA",
    SELECT = "SELECT",
    SWITCH = "SWITCH",
}

export enum TypeEffect {
    HIDDEN = "HIDDEN",
    DISABLED = "DISABLED",
}