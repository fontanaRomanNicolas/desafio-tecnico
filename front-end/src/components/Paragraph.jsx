// eslint-disable-next-line react/prop-types
export default function Paragraph({ children, width = 'w-full', textAlign = 'text-start', padding = 'p-4', margin = 'm-0' }) {
    return (
        <p className={`text-xs sm:text-sm md:text-base text-custom-gray-2 ${textAlign} ${width} ${padding} ${margin}`}>
            {children}
        </p>
    );
}
