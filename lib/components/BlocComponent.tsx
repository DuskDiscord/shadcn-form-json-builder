import {FormBloc, TypeEffect, TypeEnum} from "@/components/types.ts"
import {FieldValues} from "react-hook-form"
import {Input} from "@/components/ui/input.tsx"
import {Textarea} from "@/components/ui/textarea.tsx"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx"
import {Switch} from "@/components/ui/switch.tsx"
import {FormControl, FormDescription, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx"
import {FormComponentsProps} from "@/components/AutoForm.tsx"

export const BlocComponent = ({field, bloc, components, uuid}: {
    bloc: FormBloc
    field: FieldValues,
    components?: FormComponentsProps,
    uuid: string
}) => {
    const {
        Input: CustomInput = Input,
        Textarea: CustomTextarea = Textarea,
        Select: CustomSelect = Select,
        Switch: CustomSwitch = Switch,
    } = {...components}

    switch (bloc.type) {
        case TypeEnum.INPUT_TEXT:
            return <FormItem className="mb-4">
                <FormLabel htmlFor={uuid}>{bloc.label}</FormLabel>
                <FormControl>
                    <CustomInput id={uuid} disabled={bloc.effect === TypeEffect.DISABLED} type="text" {...field} />
                </FormControl>
                <FormDescription>{bloc.description}</FormDescription>
                <FormMessage/>
            </FormItem>
        case TypeEnum.INPUT_DATE:
            return <FormItem className="mb-4">
                <FormLabel htmlFor={uuid}>{bloc.label}</FormLabel>
                <FormControl>
                    <CustomInput id={uuid} disabled={bloc.effect === TypeEffect.DISABLED} type="date" {...field}
                                 value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""}
                    />
                </FormControl>
                <FormDescription>{bloc.description}</FormDescription>
                <FormMessage/>
            </FormItem>
        case TypeEnum.INPUT_NUMBER:
            return <FormItem className="mb-4">
                <FormLabel htmlFor={uuid}>{bloc.label}</FormLabel>
                <FormControl>
                    <CustomInput id={uuid} disabled={bloc.effect === TypeEffect.DISABLED} type="number" {...field} />
                </FormControl>
                <FormDescription>{bloc.description}</FormDescription>
                <FormMessage/>
            </FormItem>
        case TypeEnum.TEXT_AREA:
            return <FormItem className="mb-4">
                <FormLabel htmlFor={uuid}>{bloc.label}</FormLabel>
                <FormControl>
                    <CustomTextarea id={uuid} disabled={bloc.effect === TypeEffect.DISABLED} {...field} />
                </FormControl>
                <FormDescription>{bloc.description}</FormDescription>
                <FormMessage/>
            </FormItem>
        case TypeEnum.SELECT:
            return <FormItem className="mb-4">
                <FormLabel htmlFor={uuid}>{bloc.label}</FormLabel>
                <FormControl>
                    <CustomSelect disabled={bloc.effect === TypeEffect.DISABLED} onValueChange={field.onChange}
                                  defaultValue={field.value}>
                        <SelectTrigger id={uuid}>
                            <SelectValue>{field.value}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {bloc.options?.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </CustomSelect>
                </FormControl>
                <FormDescription>{bloc.description}</FormDescription>
                <FormMessage/>
            </FormItem>
        case TypeEnum.SWITCH:
            return <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <FormLabel htmlFor={uuid} className="text-base">
                        {bloc.label}
                    </FormLabel>
                    <FormDescription>
                        {bloc.description}
                    </FormDescription>
                </div>
                <FormControl>
                    <CustomSwitch
                        id={uuid}
                        disabled={bloc.effect === TypeEffect.DISABLED}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                    />
                </FormControl>
            </FormItem>
    }
}