const Image = ({ src, className, alt, w, h }) => {
  return (
    <img
      src={src}
      className={className}
      alt={alt}
      width={w}
      height={h}
      loading="lazy"
      style={{
        objectFit: 'cover',
        width: w ? `${w}px` : 'auto',
        height: h ? `${h}px` : 'auto'
      }}
    />
  );
};

export default Image;
