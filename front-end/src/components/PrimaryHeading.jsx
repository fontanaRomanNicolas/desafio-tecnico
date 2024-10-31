// eslint-disable-next-line react/prop-types
export default function PrimaryHeading({ children }) {
  return (
    <h2 className="text-xl md:text-2xl lg:text-3xl text-custom-gray-1 font-semibold">
      {children}
    </h2>
  );
}
