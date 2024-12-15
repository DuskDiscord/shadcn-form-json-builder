import {ScrollArea} from "@/components/ui/scroll-area.tsx"
import {useState} from "react"
import {AutoForm} from "@/main.ts"

const FormBuilder = () => {

    const defaultValuesOverride = {
        item_two: "12/12/2024"
    }

    const objectPlaceholder = {
        title: "Application Form Title",
        subTitle: "Application Form Subtitle",
        inputs: [
            {
                name: "item_one",
                label: "Input Text Label",
                type: "INPUT_TEXT",
                description: "Description input text",
                defaultValue: "Default value"
            },
            {
                name: "item_two",
                label: "Input Date Label",
                type: "INPUT_DATE",
                description: "Description input date"
            },
            {
                name: "item_three",
                label: "Textarea Label",
                type: "TEXT_AREA",
                description: "Description textarea"
            },
            {
                name: "item_four",
                label: "Select Label",
                type: "SELECT",
                description: "Description select",
                options: [
                    {
                        label: "Label",
                        value: "Value"
                    }
                ]
            },
            {
                name: "item_five",
                label: "Switch Label",
                type: "SWITCH",
                description: "Description switch"
            },
            {
                name: "item_six",
                label: "Checbox Label",
                type: "CHECKBOX",
                description: "Description checkbox"
            }
        ]
    }

    const [jsonInput, setJsonInput] = useState(JSON.stringify(objectPlaceholder, null, 4))

    return (
        <main>
            <div className="h-[calc(100vh-67px)]">
                <ScrollArea className="h-[calc(100vh-67px)] w-full">
                    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
                        <div className="flex items-center justify-between space-y-2">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">Form Builder</h2>
                                <p className="text-muted-foreground">Create Dynamic Forms</p>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col gap-8">
                            <div className="grid lg:grid-cols-12 gap-8 h-[calc(100vh-230px)]">
                                <div className="lg:col-span-6 order-2 lg:order-1">
                                    <div className="relative flex-col items-start gap-5 md:flex h-full">
                                        <textarea className="h-full w-full text-black" value={jsonInput}
                                                  onInput={(e) => setJsonInput(e.currentTarget.value)}></textarea>
                                    </div>
                                </div>
                                <div className="lg:col-span-6 order-1 lg:order-2">
                                    <AutoForm jsonInput={jsonInput} onSubmit={(data) => console.log("data", data)}
                                              defaultValues={defaultValuesOverride} />
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </div>
        </main>
    )
}

export default FormBuilder
