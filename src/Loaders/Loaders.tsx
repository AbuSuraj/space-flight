
import React from 'react';
import './Loaders.scss'
interface HexBrickProps {
  type: string;
}

const HexBrick: React.FC<HexBrickProps> = ({ type }) => {
  return <div className={`hex-brick ${type}`}></div>;
};

const GelRow: React.FC<{ c: number; r: number }> = ({ c, r }) => {
  const hexBrickTypes = ['h1', 'h2', 'h3'];

  return (
    <div className={`gel c${c} r${r}`}>
      {hexBrickTypes.map((type, index) => (
        <HexBrick key={index} type={type} />
      ))}
    </div>
  );
};

const Loaders: React.FC = () => {
  const rows = [
    { c: 1, r: 1 },
    { c: 2, r: 1 },
    { c: 3, r: 1 },
    { c: 4, r: 1 },
    { c: 5, r: 1 },
    { c: 6, r: 1 },
    { c: 7, r: 2 },
    { c: 8, r: 2 },
    { c: 9, r: 2 },
    { c: 10, r: 2 },
    { c: 11, r: 2 },
    { c: 12, r: 2 },
    { c: 13, r: 2 },
    { c: 14, r: 2 },
    { c: 15, r: 2 },
    { c: 16, r: 2 },
    { c: 17, r: 2 },
    { c: 18, r: 2 },
    { c: 19, r: 3 },
    { c: 20, r: 3 },
    { c: 21, r: 3 },
    { c: 22, r: 3 },
    { c: 23, r: 3 },
    { c: 24, r: 3 },
    { c: 25, r: 3 },
    { c: 26, r: 3 },
    { c: 28, r: 3 },
    { c: 29, r: 3 },
    { c: 30, r: 3 },
    { c: 31, r: 3 },
    { c: 32, r: 3 },
    { c: 33, r: 3 },
    { c: 34, r: 3 },
    { c: 35, r: 3 },
    { c: 36, r: 3 },
    { c: 37, r: 3 },
  ];

  return (
    <div className="socket">
      <div className="gel center-gel">
        {rows.map((row, index) => (
          <GelRow key={index} c={row.c} r={row.r} />
        ))}
      </div>
    </div>
  );
};

export default Loaders;
