import { Controller } from "react-hook-form";
import Select from "react-select";

// eslint-disable-next-line react/prop-types
const CustomSelect = ({ control, name, label, options, placeholder, rules, error, handleFetch, ...other }) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => (
                <div className="mt-4">
                    <label htmlFor={name} className="text-gray-700">{label}</label>
                    <Select
                        id={name}
                        value={field.value}
                        onChange={(value) => {
                            field.onChange(value); 
                            if (handleFetch) handleFetch(value);
                        }}
                        options={options}
                        placeholder={placeholder}
                        className="mt-2"
                        {...other}
                    />
                    {/* eslint-disable-next-line react/prop-types */}
                    {error && <p className="text-red-500">{error.message}</p>}
                </div>
            )}
        />
    );
};

export default CustomSelect;
