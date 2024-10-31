#!/bin/bash


# Array of all shadcn component names
components=(
    "accordion"
    "alert"
    "alert-dialog"
    "aspect-ratio"
    "avatar"
    "badge"
    "button"
    "calendar"
    "card"
    "carousel"
    "checkbox"
    "collapsible"
    "command"
    "context-menu"
    "dialog"
    "drawer"
    "dropdown-menu"
    "form"
    "hover-card"
    "input"
    "label"
    "menubar"
    "navigation-menu"
    "popover"
    "progress"
    "radio-group"
    "scroll-area"
    "select"
    "separator"
    "sheet"
    "skeleton"
    "slider"
    "switch"
    "table"
    "tabs"
    "textarea"
    "toast"
    "toggle"
    "tooltip"
)


# Function to install a component (Use suitable library shadcn or shadcn-ui)
install_component() {
    component=$1
    echo "Installing $component..."
    #npx shadcn-ui@latest add $component
    npx shadcn@latest add $component -y -o
}


# Main installation loop
for component in "${components[@]}"
do
    install_component $component
done


echo "All shadcn components have been installed successfully!"
