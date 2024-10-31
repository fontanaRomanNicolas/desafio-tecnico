// eslint-disable-next-line react/prop-types
export default function SubHeading({ children, color = 'text-gray-800', size = 'text-xl', margin = 'm-0', padding = 'p-0', }) {
    return (
        <h3 className={`${color} ${margin} ${padding} font-semibold text-base md:${size} lg:text-2xl`}>
            {children}
        </h3>
    );
}
