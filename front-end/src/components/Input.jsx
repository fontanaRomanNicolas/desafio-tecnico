// eslint-disable-next-line react/prop-types
export default function Input({ icon, textLabel, type = 'text', name, id, color = 'text-gray-800', size = 'text-base', margin = 'm-0', padding = 'p-1', placeholder = 'Ingrese texto', register, validation = null, error, ...rest }) {
    return (
        <div className={`flex flex-col ${margin}`}>
            {textLabel && (
                <label htmlFor={id} className={`mb-1 ${color} ${size}`}>
                    {textLabel}
                </label>
            )}
            <div className="flex items-center border border-gray-300 rounded-md focus-within:border-blue-500 transition duration-200 ease-in-out">
                {icon && <img src={icon} alt="icon" className="w-6 h-6 mr-2" />}
                <input
                    type={type}
                    placeholder={placeholder}
                    id={id}
                    name={name}
                    {...(validation ? register(name, validation) : register(name))}
                    className={`flex-grow ${color} ${size} ${padding} border-none outline-none rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                    {...rest}
                />
            </div>
            {error && (
                <p className="text-red-600 text-sm mt-1">{error}</p>
            )}
        </div>
    );
}
