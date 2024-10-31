/* eslint-disable react/prop-types */
export default function Button({
    text,
    text_size = 'text-base',
    icon,
    bg = 'bg-blue-700',
    width = 'w-full',
    height = 'h-12',
    padding = 'p-4',
    margin = 'mt-4',
    onClick,
}) {
    return (
        <button
            className={`${bg} ${width} ${height} ${padding} ${margin} ${text_size} flex items-center justify-center text-white font-bold rounded-md`}
            onClick={onClick}
        >
            {icon && (
                <img
                    src={icon}
                    alt="Icono"
                    className="w-6 h-6 mr-2"
                />
            )}
            <span>{text}</span>
        </button>
    );
}
