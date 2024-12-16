# Shadcn JSON Form Builder

shadcn-json-form-builder is a React library that allows you to generate dynamic forms based on a JSON file. It uses react-hook-form for form management, supports customizable components for each field, and integrates with ShadCN UI for advanced form customization.

## Installation

Install the library via npm:

```bash
npm install shadcn-json-form-builder
```

## Usage

Here is an example of using the library to create a dynamic form.

### Example Code

```tsx
import React from "react";
import AutoForm from "shadcn-json-form-builder";
import { Button } from "@/components/ui/button";

const jsonInput = JSON.stringify({
  title: "Registration",
  subTitle: "Please fill out the form",
  inputs: [
    { name: "name", label: "Name", type: "INPUT_TEXT", description: "Your full name" },
    { name: "date_of_birth", label: "Date of Birth", type: "INPUT_DATE" },
    { name: "number", label: "Number", type: "INPUT_NUMBER" },
    { name: "description", label: "Description", type: "TEXT_AREA" },
    {
      name: "choice",
      label: "Choose an option",
      type: "SELECT",
      options: [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
      ],
    },
    { name: "enable_notifications", label: "Enable Notifications", type: "SWITCH" },
  ],
});

const onSubmit = (data) => {
  console.log("Form Data:", data);
};

export default function App() {
  return (
    <AutoForm
      jsonInput={jsonInput}
      onSubmit={onSubmit}
      SubmitButton={() => <Button type="submit">Submit</Button>}
    />
  );
}
```

### AutoForm Properties

| Property      | Type                  | Description                                      |
|---------------|-----------------------|--------------------------------------------------|
| jsonInput     | string                | JSON string defining the form structure and fields |
| defaultValues | { name: string, value: string }[] | Default values to inject into form fields |
| components    | FormComponentsProps   | Custom component objects for fields (default: ShadCN fields) |
| onSubmit      | (data: FormI) => void | Form submission function |
| SubmitButton  | React.ElementType     | Custom component for submit button (default: ShadCN button) |

### Supported Field Types

The form supports the following field types:

- INPUT_TEXT: Text field
- INPUT_DATE: Date picker
- INPUT_NUMBER: Numeric field
- TEXT_AREA: Text area
- SELECT: Dropdown menu
- SWITCH: On/Off switch for options
- CHECKBOX: Checkbox field

### Configuration JSON

The expected JSON structure to configure the form follows the following format:

```json
{
  "title": "Form Title",
  "subTitle": "Form Subtitle",
  "inputs": [
    {
      "name": "field1",
      "label": "Label",
      "type": "INPUT_TEXT",
      "description": "Optional description",
      "defaultValue": "Default value",
      "effect": "DISABLED", // "HIDDEN" to hide the field
      "options": [ // Applicable for SELECT fields
        { "label": "Option 1", "value": "option1" },
        { "label": "Option 2", "value": "option2" }
      ]
    }
  ]
}
```

### Field Customization

AutoForm supports customization of certain fields through the `components` prop. You can replace fields with your own components by providing values in the `components` prop.

```tsx
import { CustomInput, CustomTextarea } from "./CustomComponents";

<AutoForm
  jsonInput={jsonInput}
  components={{
    Input: CustomInput,
    Textarea: CustomTextarea,
  }}
  onSubmit={onSubmit}
/>

```

### License

Distributed under the MIT License.

