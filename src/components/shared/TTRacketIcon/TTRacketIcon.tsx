import { FaTableTennis } from 'react-icons/fa';

interface TTRacketIconProps {
  className?: string;
}

const TTRacketIcon = ({ className = "w-6 h-6" }: TTRacketIconProps) => {
  return <FaTableTennis className={className} data-testid="tt-racket-icon" />;
};

export default TTRacketIcon; 