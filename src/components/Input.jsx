import { useState } from "react";
import iconError from "./../images/icon-error.svg";

export default function Input({
    id,
    name,
    type,
    placeholder,
    isValidated,
    error,
}) {
    const [value, setValue] = useState("");
    function handleChange(event) {
        setValue(event.target.value);
    }

    function inputClass() {
        const defaultClass = [
            "font-semibold",
            "rounded-md",
            "caret-accent-blue-500",
            "focus:outline-none",
            "focus:border-accent-blue-500",
            "w-full",
            "py-4",
            "pl-8",
        ];
        return isValidated
            ? [
                  ...defaultClass,
                  "pr-16",
                  "border-2",
                  "border-primary-red-500",
              ].join(" ")
            : [...defaultClass, "pr-6", "border", "border-gray-300"].join(" ");
    }

    const errorIcon = isShow => {
        if (isShow) {
            return (
                <img
                    className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-4"
                    src={iconError}
                    alt=""
                />
            );
        }
        return;
    };

    return (
        <div className="w-full space-y-2">
            <div className="w-full relative">
                <input
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={inputClass()}
                />
                {errorIcon(isValidated)}
            </div>
            <p className="text-right text-primary-red-500 italic font-semibold text-xs">
                {isValidated ? error : ""}{" "}
            </p>
        </div>
    );
}
