import {Form, FormField} from "@/components/ui/form.tsx"
import {Button} from "@/components/ui/button.tsx"

import {useForm} from "react-hook-form"
import React from 'react'
import {FormBloc, FormI, TypeEffect} from "./types.ts"
import {BlocComponent} from "@/components/BlocComponent.tsx"
import {Loader2} from "lucide-react";

interface FormRendererProps {
    jsonInput: string
    defaultValues?: { [key:string]: string | number | boolean | undefined }
    components?: FormComponentsProps
    onSubmit: (data: FormI) => void
    isLoading?: boolean
    SubmitButton?: React.ElementType
}

export interface FormComponentsProps {
    Input?: React.ElementType
    Textarea?: React.ElementType
    Select?: React.ElementType
    Switch?: React.ElementType
}

const hashCode = (s: string) =>
    s.split("").reduce((a, b) => {
        a = Math.random() * (a << 5) - a + b.charCodeAt(0)
        return a & a
    }, 0)

const AutoForm = ({jsonInput, components, onSubmit, SubmitButton, defaultValues, isLoading}: FormRendererProps) => {
    const parseAndInjectDefaults = () => {
        try {
            const json = JSON.parse(jsonInput)
            defaultValues && Object.keys(defaultValues).forEach((key) => {
                const bloc = json.inputs.find((bloc: FormBloc) => bloc.name === key)
                if (bloc) bloc.defaultValue = defaultValues[key]
            })
            return json
        } catch {
            return null
        }
    }

    const formObject = parseAndInjectDefaults()

    // Initialiser `useForm` avant les conditions de retour
    const formEl = useForm<FormI>({
        mode: "onChange",
        defaultValues: formObject?.inputs.reduce((acc: FormBloc[], bloc: FormBloc) => {
            if (bloc.name && bloc.defaultValue !== undefined) {
                // @ts-expect-error Overtime, `name` will be a string
                acc[bloc.name] = bloc.defaultValue
            }
            return acc
        }, {}),
    })

    // Vérifier si le formulaire est invalide ou vide après l'initialisation de `useForm`
    if (!formObject) return <p>Formulaire invalide</p>
    if (!formObject.inputs) return <p>Formulaire vide (aucun bloc)</p>

    return (
        <>
            <div className="flex items-center justify-between space-y-2 mb-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">{formObject.title}</h2>
                    <p className="text-muted-foreground">{formObject.subTitle}</p>
                </div>
            </div>
            <Form {...formEl}>
                <form onSubmit={formEl.handleSubmit(onSubmit)}>
                    {formObject.inputs.map((bloc: FormBloc) => {
                        const uuid = hashCode(JSON.stringify(bloc)).toString()

                        if (bloc.effect === TypeEffect.HIDDEN) return null

                        return (
                            <FormField
                                key={uuid}
                                control={formEl.control}
                                // @ts-expect-error Overtime, `name` will be a string
                                name={bloc.name}
                                defaultValue={bloc.defaultValue}
                                render={({field}) => (
                                    <BlocComponent
                                        field={field}
                                        bloc={bloc}
                                        components={components}
                                        uuid={uuid}
                                    />
                                )}
                            />
                        )
                    })}
                    {SubmitButton ? (
                        <SubmitButton/>
                    ) : (
                        <Button type="submit" variant="outline" className="float-end mt-5" disabled={isLoading}>
                            {isLoading && <Loader2 className="animate-spin" />}
                            Valider
                        </Button>
                    )}
                </form>
            </Form>
        </>
    )
}


export default AutoForm
