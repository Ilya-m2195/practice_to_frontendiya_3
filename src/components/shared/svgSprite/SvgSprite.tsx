import { FC } from 'react';

interface Props {
  id: Nullable<string>;
  size?: [number | string, number | string];
  color?: string;
}

export const SvgSprite: FC<Props> = ({
  id = null,
  size = ['auto', 'auto'],
  color = 'white',
}) => {
  if (!id) return null;

  return (
    <svg className='svg-letter' fill={color} width={size[0]} height={size[1]}>
      <use href={`./svg-sprite.svg#${id}`} />
    </svg>
  );
};
