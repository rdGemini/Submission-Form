import { useState } from "react";
import Input from "./components/Input.jsx";
import { validateForm } from "./hooks/formValidate.js";

function App() {
    const [form, setForm] = useState([
        {
            id: "first-name",
            name: "first-name",
            type: "text",
            placeholder: "First name",
            validate: ["isNotEmpty"],
            isValidated: false,
            errorFormName: "First name",
            error: "",
        },
        {
            id: "last-name",
            name: "last-name",
            type: "text",
            placeholder: "Last name",
            validate: ["isNotEmpty"],
            isValidated: false,
            errorFormName: "Last name",
            error: "",
        },
        {
            id: "email",
            name: "email",
            type: "email",
            placeholder: "Email",
            validate: ["isNotEmpty", "isEmail"],
            isValidated: false,
            errorFormName: "Email",
            error: "",
        },
    ]);

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        setForm(
            form.map(eachForm => {
                const formStatus = validateForm(
                    formData.get(eachForm.name),
                    eachForm.validate,
                    eachForm.errorFormName
                );
                eachForm.isValidated = !formStatus.isPass;
                eachForm.error = formStatus.message;
                return eachForm;
            })
        );
        alert("Form submitted!");
    }

    return (
        <div className="App">
            <div className="lg:min-h-screen font-poppins bg-primary-red-500 bg-intro-mobile lg:x` overflow-hidden bg-desktop-intro lg:flex py-24">
                <div className="container flex flex-grow justify-center">
                    <div className="w-full lg:w-1/2">
                        <div className="px-6 w-full flex items-center">
                            <div className="space-y-8 w-full">
                                <form
                                    className="bg-white rounded-lg shadow-hard-gray"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="p-8 text-sm space-y-6">
                                        {form.map((_form, _index) => {
                                            return (
                                                <Input
                                                    key={`form-${_index}`}
                                                    id={_form.id}
                                                    name={_form.name}
                                                    placeholder={
                                                        _form.placeholder
                                                    }
                                                    isValidated={
                                                        _form.isValidated
                                                    }
                                                    error={_form.error}
                                                />
                                            );
                                        })}
                                        <input
                                            type="submit"
                                            value="Sign Up"
                                            className="bg-primary-green-500 hover:bg-primary-green-600 active:bg-primary-green-700 cursor-pointer font-semibold text-white py-4 rounded-lg text-center w-full uppercase border-b-[6px] border-primary-green-600"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
