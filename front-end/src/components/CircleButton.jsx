/* eslint-disable react/prop-types */
import Paragraph from './Paragraph.jsx';
import useNavigateTo from '../utils/fuctionNavigate.jsx';

export default function CircleButton({ text, onClick, rutaIcon, path, bg = "bg-verde-custom" }) {

  const navigateTo = useNavigateTo();

  if (path) {
    onClick = () => navigateTo(path);
  }

  return (
    <div className="flex flex-col items-center mt-4">
      <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 ${bg} rounded-full`}
      >
        <img src={rutaIcon} alt="Ícono" className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 mb-2" />
      </button>
      <Paragraph width='w-max' textAlign='text-center'>{text}</Paragraph>
    </div>
  );
}
